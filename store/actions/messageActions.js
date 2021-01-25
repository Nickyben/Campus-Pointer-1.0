import { thunkFetch } from '../../constants/backendFunctions';
import Message from '../../models/message';
import { endpoints } from '../../src/firebase';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const SEARCH_MESSAGE = 'SEARCH_MESSAGE';
export const SEARCH_MSG_PERSON = 'SEARCH_MSG_PERSON';
export const READ_MESSAGE = 'READ_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const messageActionTypes = [
	FETCH_MESSAGES,
	SEARCH_MESSAGE,
	SEARCH_MSG_PERSON,
	READ_MESSAGE,
	ADD_MESSAGE,
	SEND_MESSAGE,
];

export const fetchChatMessages = () => {
	const urlArr = [{ url: endpoints.getData('messages'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const responseData = arrOfRespJsonS[0];
		const messages = responseData && !responseData.error ? [] : state.messageReducer.availableMessages;

		if (responseData && !responseData.error) {
			for (const key in responseData) {
				const msgItem = responseData[key];
				messages.push(new Message(msgItem));
			}
		}

		dispatch({
			type: FETCH_MESSAGES,
			availableMessages: messages,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
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

export const sendChatMessage = ({ chatId, chatPerson, text, newMessage }) => {
	return async (dispatch, getState) => {
		//console.log(msg);
		const user = getState().authReducer.userAppData;

		const message =
			user &&
			chatId &&
			chatPerson &&
			text &&
			new Message({
				id: 'studentUserId' + chatId + new Date().toLocaleDateString() + Math.random(),
				type: 'individual',
				date: new Date(),
				senderId: user.id,
				sender: user,
				receiver: chatPerson,
				receiverId: chatId,
				text: text,
				image: null,
				groupId: null,
			});

		//Send to firebase or backend

		dispatch({
			type: SEND_MESSAGE,
			chatId: message ? message.receiverId : newMessage ? newMessage.receiverId : null,
			message: message ? message : newMessage ? newMessage : null,
		});
	};
};

// //GIRLFRIEND HUNT ALGORITHM (by @ikNickyben)
// fetch(girlFriendHunt, initialHuntingSkills)
// 	.then((girlHuntResponse) => {
// 		try {
// 			if (girlHuntResponse.girlSignal === 'green') {
// 				shootYourShot(girlHuntResponse.meetingPoint);
// 			} else if (girlHuntResponse.girlSignal === 'red') {
// 				restartHunt(girlFriendHunt, [...initialHuntingSkills, ...newerSkills]);
// 			}
// 		} catch (shotError) {
// 			throw new ShotGoneWrongException('She does not want a boyfriend', shotError);
// 		}
// 	})
// 	.catch((totalRejection) => {
// 		remainSingle(totalRejection.message).then(() => {
// 			findAHolidate();
// 		});
// 	});
