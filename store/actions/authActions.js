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

// export const setDidTryAutoLogin = () => {
// 	return { type: SET_DID_TRY_AUTO_LOGIN }; ///???
// };

// export const restoreUserData = (idToken, userId, pushToken) => {
// 	return { type: RESTORE_TOKEN, idToken, userId,  pushToken }; ///???
// };

export const authenticate = (idToken, userId, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime)); // check well!!!!
		dispatch({
			type: AUTHENTICATE,
			idToken: idToken,
			userId: userId,
		});
	};
};

export const signup = (userEmail, userPassword) => {
	//console.log(userEmail, userPassword);
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account

		if (userEmail && userPassword) {
			//SEND REQUEST FOR SIGNUP
			const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${''}`, {
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
						errMsg = 'Hmm...we encountered an error while doing this. Please check your connectivity';
				}

				//make sure to handle all errors, example: network error

				//console.log(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)
			dispatch(authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn) * 1000));
			//dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId });
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};

//YOU CAN ALSO CHOOSE TO COMBINE THE TWO ACTION CREATORS INTO JUST ONE ACTION CREATOR(FUNC)
export const login = (userEmail, userPassword) => {
  console.warn(userEmail, userPassword);
  return({type: 'TEST'})
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword) {
			const response = await fetch(
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
						errMsg = 'Hmm...we encountered some error while doing this. Please check your connectivity';
				}

				//make sure to handle all errors, example: network error
				//console.log(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json();
			//console.log(responseData)

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000
				)
			);

			//getting the future date/time when the token expires
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData'); //you can still choose to wait for this
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

const saveDataToStorage =async (idToken, userId, tokenExpiry) => {
  try {
    const jsonValue = JSON.stringify({
			idToken: idToken,
			userId: userId,
      expiryDate: tokenExpiry.toISOString(),
      //pushToken: ....,//check if this is possible
		})
    await AsyncStorage.setItem('userData', jsonValue)
  } catch (e) {
    // saving error
  }


	// AsyncStorage.setItem(
	// 	'userData',
	// 	JSON.stringify({
	// 		idToken: idToken,
	// 		userId: userId,
  //     expiryDate: tokenExpiry.toISOString(),
  //     //pushToken: ....,//check if this is possible
	// 	})
	// );
};
