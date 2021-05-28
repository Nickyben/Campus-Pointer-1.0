import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints } from '../../src/firebase';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const INDICATE_TRIED_TO_AUTO_LOGIN = 'INDICATE_TRIED_TO_AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_APP_DATA = 'UPDATE_USER_APP_DATA';

export const authActionTypes = [AUTHENTICATE, INDICATE_TRIED_TO_AUTO_LOGIN, LOGOUT, UPDATE_USER_APP_DATA];

let timer;

export const tryAutoLogin = () => {
	return { type: INDICATE_TRIED_TO_AUTO_LOGIN }; ///???
};

const reFetchUserAppData = async (idToken, userId) => {
	//from backend or provider
	return {};
};

export const updateUserAppData = () => {
	return async (dispatch, getState) => {
		const { idToken, userId, pushToken, userEmail } = getState().authReducer;
		let userData;
		try {
			userData = await AsyncStorage.getItem('userData');
		} catch (e) {
			// error reading value
		}
		const userDataObj = userData != null ? JSON.parse(userData) : null;
		const { expiryDate } = userDataObj; //added pushToken
		const expiryDateObj = new Date(expiryDate);
		const expiryTime = expiryDateObj.getTime() - new Date().getTime();

		//const
		dispatch(authenticate(idToken, userId, expiryTime, pushToken, userEmail, reFetchUserAppData(idToken, userId)));
	};
};

export const authenticate = (idToken, userId, expiryTime, pushToken, userEmail, userAppData) => {
	return async (dispatch) => {
		const fetchedUserAppData = userAppData ? userAppData : await reFetchUserAppData(idToken, userId);
		dispatch(setLogoutTimer(expiryTime)); // check well!!!!
		dispatch({
			type: AUTHENTICATE,
			idToken: idToken,
			userId: userId,
			userEmail: userEmail,
			pushToken,
			userAppData: fetchedUserAppData,
		});

		const expiryDate = new Date(new Date().getTime() + expiryTime);
		saveDataToStorage(idToken, userId, expiryDate, pushToken, userEmail, fetchedUserAppData); //just like you stored it in redux store(mem), but here, in the device storage
	};
};

export const signup = ({ userEmail, userPassword, userRegNumber, userName }) => {
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account

		if (userEmail && userPassword && userRegNumber && userName) {
			//SEND REQUEST FOR SIGNUP

			let response;
			try {
				response = await fetch(endpoints.signUp, {
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
						break;
					}

					case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
						errMsg = `You have made too many attempts. Kindly try again later!`;
						break;
					}

					case 'OPERATION_NOT_ALLOWED': {
						errMsg = `We are so sorry but, you are not allowed to do this!`;
						break;
					}
					default:
						errMsg = 'Hmm...Something went wrong';
				}

				//make sure to handle all errors, example: network error

				//console.log(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			const userAppData = await uploadUserAppData({
				userName,
				userEmail,
				userRegNumber,
				idToken: responseData.idToken,
				userId: responseData.localId,
			});

			//LOGGING IN AFTER SIGN-UP???!!!
			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					'pushToken',
					responseData.email,
					userAppData
				)
			);
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
				response = await fetch(endpoints.login, {
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

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no account with email ${userEmail}, please create an account!`;
						break;
					}

					case 'INVALID_PASSWORD': {
						errMsg = `The password you entered is incorrect`;
						break;
					}

					case 'USER_DISABLED': {
						errMsg = `We are so sorry but, this account has been disabled!`;
						break;
					}
					default:
						errMsg = 'Hmm...Something went wrong!'; //respErrMsg
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)

			const userAppData = await fetchUserAppData({ userId: responseData.localId });

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					'pushToken',
					responseData.email,
					userAppData
				)
			);
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		clearLogoutTimer();
		await AsyncStorage.removeItem('userData'); //you can still choose to wait for this
		dispatch({
			type: LOGOUT,
		});
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

const saveDataToStorage = async (idToken, userId, tokenExpiry, pushToken, emailAddress, userAppData) => {
	try {
		const jsonValue = JSON.stringify({
			idToken: idToken,
			userId: userId,
			expiryDate: tokenExpiry.toISOString(),
			userEmail: emailAddress,
			userAppData,
			pushToken, //check if this is possible
		});
		await AsyncStorage.setItem('userData', jsonValue);
	} catch (e) {
		throw new Error('There was a problem with storage on your device!');
	}
};

const fetchUserAppData = async ({ userId }) => {
	// return async(dispatch, getState) => {
	// 	//async code
	// const userId = getState().authRed.userId;
	try {
		//the u1 will be replaced with a specific authenticated user
		const response = await fetch(endpoints.getData(`userAppData/${userId}`), {
			method: 'GET', //already the default, hence is unnecessary
		});

		//optional
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		const responseData = await response.json(); //waits form the response before continuing with other exe below
		if (!responseData) throw new Error('Something went wrong!');

		let userAppData;
		for (const key in responseData) {
			const itemObj = responseData[key];
			userAppData = {
				signupId: itemObj.signupId,
				userName: itemObj.userName,
				userEmail: itemObj.userEmail,
				userRegNumber: itemObj.userRegNumber,
				signupDate: new Date(itemObj.signupDate),
			};
		}
		return userAppData;
	} catch (err) {
		//send to custom analytics server
		throw err; //handle this on the screen file
	}
	// };
};

const uploadUserAppData = async ({ userName, userEmail, userRegNumber, idToken, userId }) => {
	// return async (dispatch, getState) => {
	// const idToken = getState().authRed.idToken;
	// const userId = getState().authRed.userId;
	const date = new Date();
	let response;
	try {
		response = await fetch(endpoints.postData(`userAppData/${userId}`, idToken), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName,
				userEmail,
				userRegNumber,
				signupDate: date.toISOString(),
			}),
		});
	} catch (err) {
		throw new Error(err);
	}
	if (!response.ok) {
		console.warn(response);
		throw new Error(response.error);
	}
	const responseData = await response.json(); //waits form the response before continuing the exe
	if (!responseData) throw new Error('Something went wrong with response');
	const userAppData = {
		signupId: responseData.name,
		userName,
		userEmail,
		userRegNumber,
		signupDate: date,
	};
	return userAppData;
};

export const verifyPassword = (userEmail, userPassword) => {
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword) {
			let response;
			try {
				response = await fetch(endpoints.login, {
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

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				switch (respErrMsg) {
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no account with email the ${userEmail}! please logout try logging in again`;
						break;
					}

					case 'INVALID_PASSWORD': {
						errMsg = `The password you entered as old password is incorrect!`;
						break;
					}

					case 'USER_DISABLED': {
						errMsg = `We are so sorry but, this account has been disabled!`;
						break;
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
				response = await fetch(endpoints.update, {
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
						break;
					}

					case 'WEAK_PASSWORD': {
						errMsg = `The password you entered is too weak, please enter a stronger password!`;
						break;
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

export const resetPassword =async({userEmail})=>{
		//this fetch request creates an new user and returns info about the new account

		if (userEmail ) {
			//SEND REQUEST FOR SIGNUP
			let response;
			try {
				response = await fetch(endpoints.resetPassword, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						requestType:"PASSWORD_RESET",
						email: userEmail,
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
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no registered account with this email, ${userEmail}!`;
						break;
					}

					default:
						errMsg = 'Hmm...Something went wrong';
				}

				//make sure to handle all errors, example: network error

				//console.log(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			const successEmail = responseData.email;

			return successEmail;
		} else {
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	
}
