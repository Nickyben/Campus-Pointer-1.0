import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import dummyHomePosts from '../../data/homePosts';
import HomePost from '../../models/homePost';
import HomeComment, { HomePostLike } from '../../models/homeComment';
import { endpoints } from '../../src/firebase';
import { thunkFetch } from '../../constants/backendFunctions';
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

export const homeActionTypes = [
	SEND_POST,
	DELETE_POST,
	LIKE_POST,
	SHARE_POST,
	LOAD_HOME_DATA,
	LOAD_HOME_POST_LIKES,
	LOAD_HOME_POST_COMMENTS,
	COMMENT_POST,
	DELETE_COMMENT,
];

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

export const sendHomePost = (postObj) => {
	const getThunkAsyncFunc = async () => {
		let pushToken;
		// try {
		// 	let notificationsPermStatusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		// 	if (notificationsPermStatusObj.status !== 'granted') {
		// 		notificationsPermStatusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		// 	}
		// 	if (notificationsPermStatusObj.status !== 'granted') {
		// 		pushToken = null;
		// 		//alert
		// 	} else {
		// 		pushToken = (await Notifications.getExpoPushTokenAsync()).data;
		// 	}
		// } catch (err) {
		// 	throw new Error('Request was not processed!');
		// }

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
				homePostItem: postObj,
			});
		};

		const thunkAsyncFunc = thunkFetch(urlArr, consumerFunc);
		return thunkAsyncFunc;
	};

	const thunkAsyncFunc = getThunkAsyncFunc();
	//return thunkAsyncFunc;

	return {
		type: SEND_POST,
		//	id: responseData.name,
		//pushToken: pushToken,
		//ownerId: userId,
		homePostItem: new HomePost({
			id: Math.random().toString() + new Date().getTime().toString(),
			date: new Date(),
			...postObj,
		}),
	};
};

export const deletePost = ({postId}) => {
	const getThunkAsyncFunc = async () => {
		let pushToken;

		const urlArr = [
			{
				url: endpoints.postData('homePosts'),
				init: {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({}),
				},
			},
		];

		const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch }) => {
			const responseData = arrOfRespJsonS[0];
			dispatch({
				type: DELETE_POST,
				id: responseData.name,
				pushToken: pushToken,
				ownerId: userId,
				homePostItem: postObj,
			});
		};

		const thunkAsyncFunc = thunkFetch(urlArr, consumerFunc);
		return thunkAsyncFunc;
	};

	const thunkAsyncFunc = getThunkAsyncFunc();
	//return thunkAsyncFunc;
console.warn(postId)
	return {
		type: DELETE_POST,
		//	id: responseData.name,
		//pushToken: pushToken,
		//ownerId: userId,
		postId: postId,
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
