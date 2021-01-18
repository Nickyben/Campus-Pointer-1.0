export const toTitleCase = (str) => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

export const dashed = (str) => {
	return str.replace(' ', '-');
};

export const unDashed = (str) => {
	return str.replace('-', ' ');
};

export const rand = (arr) => {
	let index = +(Math.random() * arr.length).toFixed(0);
	const validIndex = index < arr.length ? index : index === arr.length ? index - 1 : arr.length - 1;
	return arr[validIndex];
};

export const shuffle = (arr) => {
	let newArr = [];

	for (let k = 1; ; k++) {
		let newElem = rand(arr);
		if (!newArr.includes(newElem)) {
			newArr.push(newElem);
		}
		if (newArr.length === arr.length) {
			break;
		}
	}
	return newArr;
};

export const getSince = (when) => {
	let postTime = +((new Date().getTime() - when.getTime()) / 1000).toFixed(0);
	let timeUnit = 's';

	if (postTime >= 60 * 60 * 24 * 7) {
		postTime = (postTime / (60 * 60 * 24 * 7)).toFixed(0);
		timeUnit = 'w';
	} else if (postTime >= 60 * 60 * 24) {
		postTime = (postTime / (60 * 60 * 24)).toFixed(0);
		timeUnit = 'd';
	} else if (postTime >= 60 * 60) {
		postTime = (postTime / (60 * 60)).toFixed(0);
		timeUnit = 'h';
	} else if (postTime >= 60) {
		postTime = (postTime / 60).toFixed(0);
		timeUnit = 'm';
	}
	return [postTime, timeUnit, postTime + timeUnit];
};

export const getWhen = (when) => {
	let postTime = +((new Date().getTime() - when.getTime()) / 1000).toFixed(0);
	let timeUnit = 's';
	let moment,
		extra = '';
	const test = new Date().getUTCDate;
	const now = new Date();
	const hours = when.getHours();
	const mins = when.getMinutes();
	const weekNum = when.getDay(); //sun==0
	const monthNum = when.getMonth(); //jan===0
	const dayOfMonthNum = when.getDate();
	const year = when.getFullYear();

	const minTime = mins > 9 ? mins : '0' + mins;
	const hourTime = hours > 12 ? hours - 12 : hours == 0 ? 12 : hours < 12 ? hours : hours;
	const hourMeridian = hours >= 12 ? 'pm' : hours == 0 ? 'am' : hours < 12 ? 'am' : 'am';
	const day = dayOfMonthNum > 9 ? dayOfMonthNum : '0' + dayOfMonthNum;
	const fullTime = hourTime + ':' + minTime + ' ' + hourMeridian;
	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const dateMoment = day + ' ' + months[monthNum];

	if (now.getFullYear() !== year) {
		moment = dateMoment + ', ' + year;
		extra = fullTime;
	} else if (postTime >= 60 * 60 * 24) {
		moment = dateMoment;
		extra = fullTime;
	} else if (postTime >= 60 * 60) {
		moment = now.getDay() !== weekNum ? 'Yesterday' : fullTime;
		extra = now.getDay() !== weekNum ? fullTime : '';
	} else {
		//if (postTime >= (60))
		moment = fullTime;
	}
	// } else if (postTime >= (10)){
	//   moment = postTime+ ' secs ago'
	// }else {
	//   moment = 'now'
	// }

	return [postTime, extra, moment];
};

export const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

export const objToArr = (obj, arrType = '_1D_Arr') => {
	let arr = [];
	switch (arrType) {
		case '_2D_Arr':
			for (let prop in obj) {
				arr.push([prop, obj[prop]]);
			}
			break;
		case '_1D_Arr':
			for (let prop in obj) {
				arr.push(obj[prop]);
			}
			break;
	}

	return arr;
};

export const arrToObj = (arr, arrType = '_1D_Arr') => {
	let obj = {};
	switch (arrType) {
		case '_2D_Arr':
			for (let index in arr) {
				obj[arr[index][0]] = arr[index][1];
			}
			break;
		case '_1D_Arr':
			for (let index in arr) {
				obj[(+index + 1).toString()] = arr[index];
			}
			break;
	}

	return obj;
};

export const uniqueArray = (arr) => {
	//note thisArr and arr are the same
	return arr.filter((val, i, thisArr) => arr.indexOf(val) === i);
};

// informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

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

			responseDataConsumer(arrOfResponseJsonS, { idToken, userId, dispatch, state },);
		} catch (err) {
			console.warn(err);
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
