import Message from '../models/message';
import { rand, uniqueArray } from '../constants/MyFunctions';
import students from '../data/students';

let messages = [];

const testStudents = students.filter((s, i) => (i===1 )|| (i%200 ===0));
const commIds = () => {
  let senderId = rand(testStudents).id;
  let receiverId = rand(testStudents).id;
  if (senderId === receiverId) {
    return (commIds())
  }
  return ([senderId, receiverId]);
}


for (let i = 1; i <= 25000; i++) {
  const msgType = rand(['individual', 'individual', 'individual', 'individual', 'individual', 'group']);
  const [senderId, receiverId] = commIds();
  const text1 = rand(['hello', 'guy', 'hi', 'boss', 'how\'re you doing', 'bro', 'sis', 'hey', 'wow', 'nice'])
  const text2 = rand(['sunshine', 'how is it going', 'are you off to work?',
    'dear, missed you', 'how\'re you doing?', 'fella, playing today', 'it was a hectic day.', 'what\'s going on',
    'hope you\'re feeling well', 'was really a nice day'])

  messages.push(
    new Message(
      senderId + receiverId + new Date().toLocaleDateString() + Math.random(),
      msgType,
      new Date(new Date().getTime() - (1000 * 60 * (i * 15))),
      senderId,
      receiverId,
      {
        text: text1 + ' ' + text2,
        image: null,
      },
      msgType === 'group' ? (Math.random() * (10 ** 10).toFixed(0)) + (Math.random() * (10 ** 10).toFixed(0)) : null,
    )
  );
}

messages = messages.sort((m1, m2) => {
  return m1.date.getTime() - m2.date.getTime();
});

export const getChatIds = (userMsgs) => {
  return uniqueArray(userMsgs.map((msg, i) => msg.senderId === 'studentUserId' ? msg.receiverId : msg.senderId));
}

export const getChatMsgs = (userMsgs, chatIds) => {
  return chatIds.map((id, i) => ({
    id: id,
    messages: userMsgs.filter(m => m.senderId === id || m.receiverId === id),
  })).sort((c1, c2) => {
    return c2.messages[0].date - c1.messages[0].date;
  });
};

export const userMsgs = messages.filter(m => m.senderId === 'studentUserId' || m.receiverId === 'studentUserId');


// export const chatIds = uniqueArray(userMsgs.map((msg, i) => msg.senderId === 'studentUserId' ? msg.receiverId : msg.senderId));
// export const chatMsgs = chatIds.map((id, i) => ({
//   id: id,
//   messages: userMsgs.filter(m => m.senderId === id || m.receiverId === id),
// })).sort((c1, c2) => {
//   return c2.messages[c2.messages.length - 1].date - c1.messages[c1.messages.length - 1].date;
// });

export const chatIds = getChatIds(userMsgs)
export const chatMsgs = getChatMsgs(userMsgs, chatIds)


