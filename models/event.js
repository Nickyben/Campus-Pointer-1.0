class Event {
  constructor(id, title, type, date, semester, session, department, faculty) {
    this.id = id;
    this.title = title;
    this.type = type; //eg Tuition, Accommodation, DeptAssociation, CollegeAssociation,
    this.date = date;
    this.level = level;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;

  }
};

export default Event;