import Message from "../../models/message";




export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const VIEW_MESSAGE = 'VIEW_MESSAGE';
export const SEARCH_MESSAGE = 'SEARCH_MESSAGE';
export const SEARCH_MSG_PERSON = 'SEARCH_MSG_PERSON';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const READ_MESSAGE = 'READ_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';



export const fetchChatMessages = () => {
  return ({
    type: FETCH_MESSAGES,
    //,//from server
  });
}

export const addChatMessage = (msg)=>{
  return({
    type: ADD_MESSAGE,
    chatId: msg.receiverId,
    message: msg,
  })
};

export const sendChatMessage = (msg) => {//(chatId, senderId, receiverId, text) => {
  return({
    type: SEND_MESSAGE,
    chatId: msg.receiverId,
    message: msg,
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
  });
}