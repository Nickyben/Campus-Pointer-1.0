import messages, { userMsgs, chatIds, chatMsgs, getChatIds, getChatMsgs } from "../../data/messages";
import { FETCH_MESSAGES, SEND_MESSAGE } from "../actions/messageActions";
import { uniqueArray } from "../../constants/MyFunctions";


const initialState = {
  //networked sourced msg missing!!!!
  availableMessages: userMsgs,
 // availableChatPersonsId: chatIds,
  availableChatMsgs: chatMsgs,
  readMessages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES: {
      return ({
        ...state,
        // availableMessages: updatedUserMsgs,
        // availableChatPersonsId: getChatIds(updatedUserMsgs),
        // availableChatMsgs: getChatMsgs(updatedUserMsgs, getChatIds(updatedUserMsgs)),
        // readMessages: []

      })
    }
    case SEND_MESSAGE: {
      const updatedUserMsgs = [...state.availableMessages].concat(action.message)
      return ({
        ...state,
        availableMessages: updatedUserMsgs,
        //availableChatPersonsId: getChatIds(updatedUserMsgs),
        availableChatMsgs: getChatMsgs(updatedUserMsgs, getChatIds(updatedUserMsgs)),
        readMessages: []
      });
    }
  }

  return (state);
}