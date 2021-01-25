export default class Message {
  constructor({id, type, date,senderId, receiverId, sender, receiver, image, text, groupId}) {
    this.id = id;
    this.type = type; //group, individual
    this.date = date;
    this.senderId = senderId;
    this.sender = sender;
    this.receiver = receiver;
    this.receiverId = receiverId;
    this.groupId = groupId;
    this.image = image;
    this.text = text;
  }
};



