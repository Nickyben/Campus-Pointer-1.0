import Message from '../models/message';
import { rand, uniqueArray } from '../constants/MyFunctions';
import students from '../data/students';

let messages = [];

const testStudents = students.filter((s, i) => i < 21);
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
  const text2 = rand(['hello', 'guy', 'hi', 'boss', 'how\'re you doing', 'bro', 'sis', 'hey', 'wow', 'nice'])

  messages.push(
    new Message(
      ((Math.random() * (10 ** 10)).toFixed(0)) + ((Math.random() * (10 ** 10)).toFixed(0)),
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

export const userMsgs = messages.filter(m => m.senderId === 'studentUserId' || m.receiverId === 'studentUserId');
export const chatIds = uniqueArray(userMsgs.map((msg, i) => msg.senderId === 'studentUserId' ? msg.receiverId : msg.senderId));
export const chatMsgs = chatIds.map((id, i) => ({
  id: id,
  messages: userMsgs.filter(m => m.senderId === id || m.receiverId === id),
})).sort((c1, c2) => {
  return c2.messages[c2.messages.length - 1].date - c1.messages[c1.messages.length - 1].date;
});



