import messages, { userMsgs, chatIds, chatMsgs, getChatIds, getChatMsgs } from '../../data/messages';
import { FETCH_MESSAGES, SEND_MESSAGE } from '../actions/messageActions';
import { uniqueArray } from '../../constants/MyFunctions';

const initialState = {
	//networked sourced msg missing!!!!
	availableMessages: userMsgs,
	// availableChatPersonsId: chatIds,
	availableChatMsgs: chatMsgs,
	readMessages: [],
	isFetchingMessages: false,
	hasReceivedMessages: false,
	lastFetched: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MESSAGES: {
			const availableUserMsgs = action.availableMessages;
			const availableChatMsgs = getChatMsgs(availableUserMsgs, getChatIds(availableUserMsgs)).sort(
				(chat2, chat1) => {
					let chat1LastMsg = chat1.messages.sort(
						(chat1, chat2) => chat2.date.getTime() - chat1.date.getTime()
					)[0];
					let chat2LastMsg = chat2.messages.sort(
						(chat1, chat2) => chat2.date.getTime() - chat1.date.getTime()
					)[0];
					return chat1LastMsg.date.getTime() - chat2LastMsg.date.getTime();
				}
			);
			return {
				...state,
				availableMessages: availableUserMsgs,
				availableChatMsgs: availableChatMsgs,
				// readMessages: []
			};
		}
		case SEND_MESSAGE: {
			const updatedUserMsgs = [...state.availableMessages].concat(action.message);
			const availableChatMsgs = getChatMsgs(updatedUserMsgs, getChatIds(updatedUserMsgs)).sort((chat2, chat1) => {
				let chat1LastMsg = chat1.messages.sort(
					(chat1, chat2) => chat2.date.getTime() - chat1.date.getTime()
				)[0];
				let chat2LastMsg = chat2.messages.sort(
					(chat1, chat2) => chat2.date.getTime() - chat1.date.getTime()
				)[0];
				return chat1LastMsg.date.getTime() - chat2LastMsg.date.getTime();
			});

			return {
				...state,
				availableMessages: updatedUserMsgs,
				//availableChatPersonsId: getChatIds(updatedUserMsgs),
				availableChatMsgs: availableChatMsgs,
				readMessages: [],
			};
		}
	}

	return state;
};
