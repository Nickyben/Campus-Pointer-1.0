class Event {
  constructor(id, title, type, date, time, venue, image, semester, session, department, faculty) {
    this.id = id;
    this.title = title;
    this.type = type;  //eg social, sports, academic, project, general
    this.date = date;
    this.time = time;
    this.venue = venue;
    this.image = image;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;
  }
};

export default Event;