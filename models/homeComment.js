export default class HomePostComment {
	constructor({ id, ownPostId, date, authorType, author, text }) {
		//responses
		(this.ownPostId = ownPostId), (this.id = id);
		this.date = date;
		this.author = author;
		this.authorType = authorType; //staff, student, admin, courseRep,etc
		this.text = text;
		this.type = '';
		//this.responses = responses; //might be implemented on a later date
	}
}

export class HomePostLike {
	constructor({ id, postId, date, liker }) {
		this.postId = postId;
		this.id = id;
		this.date = date;
		this.liker = liker;
	}
}
