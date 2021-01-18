export default class HomePost {
	constructor({ id, title, type, date, source, author, featuredAuthor, image, text, responses }) {
		this.id = id;
		this.title = title;
		this.type = type; //announcements, news, awards, general events, admin and authorized posts
		this.date = date;
		this.author = author;
		this.featuredAuthor = featuredAuthor;
		this.source = source; //website, department, faculty, general
		this.image = image;
		this.text = text;
		this.responses = responses;
	}
}
