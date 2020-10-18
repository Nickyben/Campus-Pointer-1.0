export default class HomeComment {
  constructor(id, postId,date, authorType, author, text) { //responses
    this.ownPostId = postId,
    this.id = id;
    this.date = date;
    this.author = author;
    this.authorType = authorType //staff, student, admin, courseRep,etc
    this.text = text;
    this.type = '';
    //this.responses = responses; //might be implemented on a later date
  }
};


