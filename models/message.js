export default class Message {
  constructor(id, type, date,senderId, receiverId, body, groupId) {
    this.id = id;
    this.type = type; //group, individual
    this.date = date;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.groupId = groupId;
    this.image = body.image;
    this.text = body.text;
  }
};



