import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import dummyHomePosts from '../../data/homePosts';
import HomePost from '../../models/homePost';
import HomeComment, { HomePostLike } from '../../models/homeComment';
import { endpoints } from '../../src/firebase';
import { thunkFetch } from '../../constants/MyFunctions';
import HomePostComment from '../../models/homeComment';

export const SEND_POST = 'SEND_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';
//export const UNLIKE_POST ='UNLIKE_POST'
export const SHARE_POST = 'SHARE_POST';

export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';
export const LOAD_HOME_POST_LIKES = 'LOAD_HOME_POST_LIKES';
export const LOAD_HOME_POST_COMMENTS = 'LOAD_HOME_POST_COMMENTS';

export const COMMENT_POST = 'COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const fetchHomeData = () => {
	const urlArr = [{ url: endpoints.getData('homePosts'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
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

export const fetchHomeReactions = (reactionType) => {
	const isComments = reactionType === 'comments';
	const isLikes = reactionType === 'likes';
	//const node = isLikes ? 'homeLikes' : isComments ? 'homeComments' : 'otherReactions';

	//YOU NEED TO RUN SOME QUERIES HERE uni, faculty, dept, etc !!!! check the node below!!
	const urlArr = [{ url: endpoints.getData(`homePosts/${reactionType}`), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const responseData = arrOfRespJsonS[0];
		const homeReactions =
			responseData && !responseData.error
				? []
				: isLikes
				? state.homeReducer.availableGeneralLikes
				: state.homeReducer.availableComments;

		if (responseData && !responseData.error && isLikes) {
			for (const key in responseData) {
				const postItem = responseData[key];
				homeReactions.push(new HomePostLike(postItem));
			}
		}

		if (responseData && !responseData.error && isComments) {
			for (const key in responseData) {
				const postItem = responseData[key];
				homeReactions.push(new HomePostComment(postItem));
			}
		}

		if (isLikes) {
			dispatch({
				type: LOAD_HOME_POST_LIKES,
				availableGeneralLikes: homeReactions,
			});
		}

		if (isComments) {
			dispatch({
				type: LOAD_HOME_POST_COMMENTS,
				availableComments: homeReactions,
			});
		}
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
		likeData: new HomePostLike({
			id: Math.random().toString() + new Date().toLocaleDateString(),
			date: new Date(),
			postId,
			liker,
		}),
	};
};

export const commentPost = (postId, commentAuthor, authorType, text) => {
	// console.log('comment dispatched with', postId,commentAuthor.fullName,authorType,text)
	return {
		type: COMMENT_POST,
		comment: new HomePostComment({
			id: postId + new Date().toLocaleDateString() + Math.random().toString(),
			ownPostId: postId,
			date: new Date(),
			authorType: authorType,
			author: commentAuthor,
			text: text,
		}),
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
