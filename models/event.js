class Event {
  constructor({id, title, type, date, time, venue, image, semester, session, 
    association,department, faculty, university}) {
    this.id = id;
    this.title = title;
    this.type = type;  //eg social, sports, academic, project, general,association
    this.date = date;
    this.time = time;
    this.venue = venue;
    this.image = image;
    this.semester = semester; 
    this.session = session;
    this.association = association;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
  }
};

export default Event;