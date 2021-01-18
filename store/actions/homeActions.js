import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import dummyHomePosts from '../../data/homePosts';
import HomePost from '../../models/homePost';
import HomeComment from '../../models/homeComment';
import { endpoints } from '../../src/firebase';
import { thunkFetch } from '../../constants/MyFunctions';

export const SEND_POST = 'SEND_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';
//export const UNLIKE_POST ='UNLIKE_POST'
export const SHARE_POST = 'SHARE_POST';
export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';
export const COMMENT_POST = 'COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// export const fetchHomeData = () => {
// 	//should comprise of announcements, news,  awards, general events, admin and authorized posts
// 	return async (dispatch, getState) => {
// 		//async code
// 		const idToken = getState().authReducer.idToken;
// 		const userId = getState().authReducer.userId;
// 		try {
// 			let response;
// 			try {
// 				//CHECK IF YOU CAN ALSO GET THE PUSH TOKEN FOR THAT DEVICE
// 				//edit the api url based on the action type
// 				response = await fetch(endpoints.getData('homePosts'), {
// 					method: 'GET', //already the default, hence is unnecessary
// 				});
// 			} catch (err) {
// 				requestErrorHandler(err);
// 			}

// 			if (response && !response.ok) {
// 				//edit this according to the api docs
// 				const responseJSON = await response.json();
// 				const respErrMsg = responseJSON && responseJSON.error.message;
// 				let errMsg;

// 				//EDIT THIS BASED ON THE DOCUMENTATION
// 				switch (respErrMsg) {
// 					case 'EMAIL_NOT_FOUND': {
// 						errMsg = `There is no account with email ${userEmail}, please create an account!`;
// 						break;
// 					}

// 					case 'INVALID_PASSWORD': {
// 						errMsg = `The password you entered is incorrect`;
// 						break;
// 					}

// 					case 'USER_DISABLED': {
// 						errMsg = `We are so sorry but, this account has been disabled!`;
// 						break;
// 					}
// 				}

// 				//make sure to handle all errors, example: network error
// 				//console.warn(errMsg);
// 				if (errMsg) {
// 					throw new Error(errMsg);
// 				} else {
// 					//throw new Error()
// 				}
// 			} else {
// 				if (!response) throw new Error('NO RESPONSE');
// 			}

// 			const responseData = await response.json(); //waits form the response before continuing with other exe below
// 			// and then returns an obj in this case

// 			const homePosts = responseData ? [] : dummyHomePosts;
// 			for (const key in responseData) {
// 				//const tempImageUrl = '../../assets/splash.png'; //imageUrl;//get from web

// 				homePosts.push(
// 					new HomePost(
// 						key,
// 						responseData[key].title,
// 						responseData[key].type,
// 						responseData[key].date,
// 						responseData[key].source, //for now, should be local, twitter,facebook, website,link etc
// 						responseData[key].author,
// 						responseData[key].featuredAuthor,
// 						{
// 							image: responseData[key].image,
// 							text: responseData[key].text,
// 						},
// 						responseData[key].responses
// 					)
// 				);
// 			}

// 			//console.log(responseData);

// 			dispatch({
// 				type: LOAD_HOME_DATA,
// 				availablePosts: homePosts,
// 			});
// 		} catch (err) {
// 			console.warn(err.message);
// 			let errMsg;

// 			switch (err) {
// 				case 'EMAIL_NOT_FOUND': {
// 					errMsg = `There is no account with email ${userEmail}, please create an account!`;
// 					break;
// 				}

// 				case 'INVALID_PASSWORD': {
// 					errMsg = `The password you entered is incorrect`;
// 					break;
// 				}

// 				case 'USER_DISABLED': {
// 					errMsg = `We are so sorry but, this account has been disabled!`;
// 					break;
// 				}
// 			}
// 			if (errMsg) {
// 				throw new Error(errMsg);
// 			} else {
// 				throw new Error(err.message);
// 			}
// 		}
// 	};
// };

export const fetchHomeData = () => {
	const urlArr = [{ url: endpoints.getData('homePosts'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state}) => {
		const responseData = arrOfRespJsonS[0];
		const homePosts = responseData && !responseData.error ? [] : state.homeReducer.availablePosts;

		if (responseData && !responseData.error) {
			for (const key in responseData) {
				const postItem = responseData[key];
				homePosts.push(new HomePost(postItem));
			}
		}

		dispatch({
			type: LOAD_HOME_DATA,
			availablePosts: homePosts,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};



export const sendPost = (postObj) => {
	const getThunkAsyncFunc = async () => {
		let pushToken;
		try {
			let notificationsPermStatusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			if (notificationsPermStatusObj.status !== 'granted') {
				notificationsPermStatusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			}
			if (notificationsPermStatusObj.status !== 'granted') {
				pushToken = null;
				//alert
			} else {
				pushToken = (await Notifications.getExpoPushTokenAsync()).data;
			}
		} catch (err) {
			throw new Error('Request was not processed!');
		}

		const urlArr = [
			{
				url: endpoints.postData('homePosts'),
				init: {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						...postObj,
						//or ownerPushToken
						devicePushToken: pushToken, //what if the person logs in with another device?????
						//this probably should be from db stored/updated (which should change each time the user logs in with a new device(and new app)) in order to capture the right device/app installation
					}),
				},
			},
		];

		const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch }) => {
			const responseData = arrOfRespJsonS[0];
			dispatch({
				type: SEND_POST,
				id: responseData.name,
				pushToken: pushToken,
				ownerId: userId,
				...postObj,
			});
		};

		const thunkAsyncFunc = thunkFetch(urlArr, consumerFunc);
		return thunkAsyncFunc;
	};

	const thunkAsyncFunc = getThunkAsyncFunc();
	return thunkAsyncFunc;
};

export const deletePost = (postId, postAuthorId) => {
	return async (dispatch, getState) => {
		//async code
		const idToken = getState().authReducer.idToken;
		const userId = getState().authReducer.userId;
		try {
			let response;
			try {
				//CHECK IF YOU CAN ALSO GET THE PUSH TOKEN FOR THAT DEVICE
				//edit the api url based on the action type
				response = await fetch(endpoints.deleteData(`myProducts/${postId}`, idToken), {
					method: 'DELETE',
				});
			} catch (err) {
				requestErrorHandler(err);
			}

			if (response && !response.ok) {
				//edit this according to the api docs
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				//EDIT THIS BASED ON THE DOCUMENTATION
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
						errMsg = 'Hmm...Something went wrong!';
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			} else {
				if (!response) throw new Error('NO RESPONSE');
			}

			const responseData = await response.json(); //waits form the response before continuing with other exe below

			dispatch({
				type: DELETE_POST,
				postId: postId,
				postAuthorId: postAuthorId,
			});
		} catch (err) {
			let errMsg;
			switch (err) {
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
					errMsg = 'Hmm...Something went wrong!';
			}
			throw new Error(errMsg);
		}
	};
};

export const likePost = (postId, liker) => {
	return {
		type: LIKE_POST,
		likeData: {
			id: Math.random().toString() + new Date().toLocaleDateString(),
			date: new Date(),
			postId,
			liker,
		},
	};
};

export const commentPost = (postId, commentAuthor, authorType, text) => {
	// console.log('comment dispatched with', postId,commentAuthor.fullName,authorType,text)
	return {
		type: COMMENT_POST,
		comment: new HomeComment(
			postId + new Date().toLocaleDateString() + Math.random().toString(),
			postId,
			new Date(),
			authorType,
			commentAuthor,
			text
		),
	};
};

export const deleteComment = (postId, commentAuthorId, commentId) => {
	return {
		type: DELETE_COMMENT,
		postId: postId,
		commentId: commentId,
		commentAuthorId: commentAuthorId,
	};
};

export const sharePost = (postId) => {
	return {
		type: SHARE_POST,
		postId: postId,
	};
};

// export const unLikePost = (postId) => {
//   return ({
//     type: UNLIKE_POST,
//     postId: postId,
//   });
// };
