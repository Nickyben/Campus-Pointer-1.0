import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const INDICATE_TRIED_TO_AUTO_LOGIN = 'INDICATE_TRIED_TO_AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';

let timer;

export const tryAutoLogin = () => {
	return { type: INDICATE_TRIED_TO_AUTO_LOGIN }; ///???
};

export const authenticate = (idToken, userId, expiryTime, pushToken, userEmail) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime)); // check well!!!!
		dispatch({
			type: AUTHENTICATE,
			idToken: idToken,
			userId: userId,
			userEmail: userEmail,
			pushToken,
		});
	};
};

export const signup = (userEmail, userPassword) => {
	//console.log(userEmail, userPassword);
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account

		if (userEmail && userPassword) {
			//SEND REQUEST FOR SIGNUP

			let response;
			try {
				response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${''}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: userEmail,
						password: userPassword,
						returnSecureToken: true,
					}),
				});
			} catch (err) {
				if (err.message.toLowerCase().includes('network'))
					throw new Error(
						'Hmm...Something is wrong with your Network Connection. Please check your connection!'
					);
			}

			//HANDLE BAD RESPONSE
			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'EMAIL_EXISTS': {
						errMsg = `An account already exists with this email ${userEmail}!`;
					}

					case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
						errMsg = `You have made too many attempts. Kindly try again later!`;
					}

					case 'OPERATION_NOT_ALLOWED': {
						errMsg = `We are so sorry but, you are not allowed to do this!`;
					}
					default:
						errMsg = 'Hmm...Something went wrong';
				}

				//make sure to handle all errors, example: network error

				//console.log(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();

			//LOGGING IN AFTER SIGN-UP???!!!
			dispatch(
				authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn) * 1000),
				'pushToken',
				responseData.email
			);
			//dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId });
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, 'pushToken', responseData.email); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};

//YOU CAN ALSO CHOOSE TO COMBINE THE TWO ACTION CREATORS INTO JUST ONE ACTION CREATOR(FUNC)
export const login = (userEmail, userPassword) => {
	//console.warn(userEmail, userPassword);
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword) {
			let response;
			try {
				response = await fetch(
					`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${''}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: userEmail,
							password: userPassword,
							returnSecureToken: true,
						}),
					}
				);
			} catch (err) {
				if (err.message.toLowerCase().includes('network'))
					throw new Error(
						'Hmm...Something is wrong with your Network Connection. Please check your connection!'
					);
			}

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no account with email ${userEmail}, please create an account!`;
					}

					case 'INVALID_PASSWORD': {
						errMsg = `The password you entered is incorrect`;
					}

					case 'USER_DISABLED': {
						errMsg = `We are so sorry but, this account has been disabled!`;
					}
					default:
						errMsg = 'Hmm...Something went wrong!';
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					'pushToken',
					responseData.email
				)
			);

			//getting the future date/time when the token expires
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, 'pushToken', responseData.email); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};

export const logout = async () => {
	clearLogoutTimer();
	await AsyncStorage.removeItem('userData'); //you can still choose to wait for this
	return {
		type: LOGOUT,
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (tokenExpiryTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			// REM: I ignored the yellow box msg about long timers
			dispatch(logout());
		}, tokenExpiryTime);
	};
};

const saveDataToStorage = async (idToken, userId, tokenExpiry, pushToken, emailAddress) => {
	try {
		const jsonValue = JSON.stringify({
			idToken: idToken,
			userId: userId,
			expiryDate: tokenExpiry.toISOString(),
			userEmail: emailAddress,
			//pushToken: ....,//check if this is possible
		});
		await AsyncStorage.setItem('userData', jsonValue);
	} catch (e) {
		throw new Error('There was a problem with storage in your device!');
	}
};

export const verifyPassword = (userEmail, userPassword) => {
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword) {
			let response;
			try {
				response = await fetch(
					`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${''}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: userEmail,
							password: userPassword,
							returnSecureToken: true,
						}),
					}
				);
			} catch (err) {
				if (err.message.toLowerCase().includes('network'))
					throw new Error(
						'Hmm...Something is wrong with your Network Connection. Please check your connection!'
					);
			}

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no account with email the ${userEmail}! please logout try logging in again`;
					}

					case 'INVALID_PASSWORD': {
						errMsg = `The password you entered as old password is incorrect!`;
					}

					case 'USER_DISABLED': {
						errMsg = `We are so sorry but, this account has been disabled!`;
					}
					default:
						errMsg = 'Hmm...Something went wrong!';
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					'pushToken',
					responseData.email
				)
			);

			//getting the future date/time when the token expires
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, 'pushToken', responseData.email); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
			// if (userEmail === null || userPassword === null) {
			// 	throw new Error('OPERATION NOT ALLOWED, PLEASE LOGOUT AND LOGIN AGAIN!');
			// } else {
				throw new Error('PLEASE FILL IN THE FIELDS CORRECTLY!');
		//	}
		}
	};
};

export const changePassword = (idToken, newUserPassword) => {
		console.warn(idToken, newUserPassword);

	return async (dispatch) => {
		if (idToken && newUserPassword) {
			let response;
			try {
				response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${''}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						idToken: idToken,
						password: newUserPassword,
						returnSecureToken: true,
					}),
				});
			} catch (err) {
				if (err.message.toLowerCase().includes('network'))
					throw new Error(
						'Hmm...Something is wrong with your Network Connection. Please check your connection!'
					);
			}

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'INVALID_ID_TOKEN': {
						errMsg = `You are currently not logged in, please log in again!`;
					}

					case 'WEAK_PASSWORD': {
						errMsg = `The password you entered is too weak, please enter a stronger password!`;
					}

					default:
						errMsg = 'Hmm...Something went wrong!';
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					'pushToken',
					responseData.email
				)
			);

			//getting the future date/time when the token expires
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, 'pushToken', responseData.email); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
				throw new Error('PLEASE FILL IN THE FIELDS CORRECTLY!');
		}
	};
};

export const changeEmail = (idToken, userEmail) => {};
