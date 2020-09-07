export class News {
  constructor(id, title, type, date, authorizedAuthor, featuredAuthor, body) {
    this.id = id;
    this.title = title;
    this.type = type; 
    this.date = date;
    this.author = authorizedAuthor;
    this.featuredAuthor = featuredAuthor;
    this.image = body.image;
    this.text = body.text; 
  }
};

export class Announcement {
  constructor(id, title, type, date, postPerson, featuredAuthor, body) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.date = date;
    this.author = postPerson;
    this.featuredAuthor = featuredAuthor;
    this.image = body.image;
    this.text = body.text;
  }
};


