export default class HomePost {
  constructor(id, title, type, date, source, authorizedAuthor, featuredAuthor, body) {
    this.id = id;
    this.title = title;
    this.type = type; //announcements, news, awards, general events, admin and authorized posts
    this.date = date;
    this.author = authorizedAuthor;
    this.featuredAuthor = featuredAuthor;
    this.source = source //website, department, faculty, general
    this.image = body.image;
    this.text = body.text;
    this.likes = 0;
  }
};

 

