import messages, { userMsgs, chatIds, chatMsgs } from "../../data/messages";
import { FETCH_MESSAGES } from "../actions/messageActions";
import { uniqueArray } from "../../constants/MyFunctions";


const initialState = {
  availableMessages: userMsgs,
  availableChatPersonsId: chatIds,
  availableChatMsgs: chatMsgs,
  readMessages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES: {
      return ({
        ...state,
        availableMessages: state.availableMessages

      })
    }
  }

  return (state);
}