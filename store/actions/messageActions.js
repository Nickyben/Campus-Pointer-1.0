import Message from '../../models/message';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const VIEW_MESSAGE = 'VIEW_MESSAGE';
export const SEARCH_MESSAGE = 'SEARCH_MESSAGE';
export const SEARCH_MSG_PERSON = 'SEARCH_MSG_PERSON';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const READ_MESSAGE = 'READ_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const fetchChatMessages = () => {
	return {
		type: FETCH_MESSAGES,
		//,//from server
	};
};

// export const fetchMessages = () => {
// 	return function (dispatch) {
// 		dispatch(startFetchingMessages());

// 		firebase
// 			.database()
// 			.ref('messages')
// 			.on('value', (snapshot) => {
// 				// gets around Redux panicking about actions in reducers
// 				setTimeout(() => {
// 					const messages = snapshot.val() || [];

// 					dispatch(receiveMessages(messages));
// 				}, 0);
// 			});
// 	};
// };

// export const receiveMessages = (messages) => {
// 	return function (dispatch) {
// 		Object.values(messages).forEach((msg) => dispatch(addMessage(msg)));

// 		dispatch(receivedMessages());
// 	};
// };



export const addChatMessage = (msg) => {
	return (dispatch) => {
		dispatch({
			type: ADD_MESSAGE,
			chatId: msg.receiverId,
			message: msg,
		});
	};
};

export const sendChatMessage = (msg) => {
	//(chatId, senderId, receiverId, text) => {
	return async dispatch => {
		dispatch({
			type: SEND_MESSAGE,
			chatId: msg.receiverId,
			message: msg,
		});
		//  new Message(
		//   senderId + receiverId + new Date().toLocaleDateString() + Math.random(),
		//   'individual',
		//   new Date(),
		//   senderId,
		//   receiverId,
		//   {
		//     text,
		//     image: null,
		//   },
		//   null
		// )
	};
};
