export const thunkFetch = (arrOfFetchUrlAndInitObjs, responseDataConsumer) => {
	return async (dispatch, getState) => {
		// const urls = arrOfFetchUrlAndInitObjs.map(({url},i)=> url);
		// const inits = arrOfFetchUrlAndInitObjs.map(({init},i)=> init);
		const state = getState();
		const idToken = state.authReducer.idToken;
		const userId = state.authReducer.userId;

		try {
			const arrOfResponseJsonS = await Promise.all(
				arrOfFetchUrlAndInitObjs.map(async ({ url, init }, i) => {
					const response = await fetch(url, {
						method: 'GET',
						...init,
					});

					if (response && !response.ok) {
						//edit this according to the api docs
						const responseJson = await response.json();
						const respErrMsg = responseJson.error.message;

						if (!!respErrMsg || (typeof responseJson.error === 'string' && responseJson.error)) {
							throw new Error(respErrMsg || responseJson.error);
						} else {
							throw new Error('Hmm...something went wrong!');
						}
					} else {
						if (!response) throw new Error('Hmm...something went wrong!');
					}

					const responseJson = await response.json(); //response.bodyUsed? {} :
					return responseJson;
				})
			);

			responseDataConsumer(arrOfResponseJsonS, { idToken, userId, dispatch, state });
		} catch (err) {
			//console.warn(err);
			let errMsg;
			const hasToDoWith = (keyword) => {
				return err.message.toLowerCase().includes(keyword);
			};

			//SPECIFIC CHECK
			//EDIT THIS BASED ON THE DOCUMENTATION
			switch (err.message) {
				case 'EMAIL_NOT_FOUND': {
					errMsg = `There is no account with email  please create an account!`;
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
				case 'NO RESPONSE': {
					errMsg = err.message;
					break;
				}
				case 'Permission denied': {
					errMsg = 'Hmm...action not allowed!';
					break;
				}
			}

			//GENERAL CHECK
			switch (true) {
				case hasToDoWith('network'): {
					errMsg = `Hmm...Network request failed!`;
					break;
				}
				case hasToDoWith('url'): {
					errMsg = `Hmm...there was a problem in completing the url action!`;
					break;
				}

				case hasToDoWith('request'): {
					errorMsg = `Request could not be processed!`;
					break;
				}

				case hasToDoWith('timeout'): {
					errMsg = `Hmm...looks like your connection is not okay. Please check your connection!`;
					break;
				}
			}

			if (errMsg) {
				//throw new Error(errMsg);
			} else {
				//throw new Error('Hmm...something went wrong!'); //err.message
			}
		}
	};
};


