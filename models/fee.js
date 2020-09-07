class Fee {
  constructor(id, title, type, level, semester, session, department, faculty) {
    this.id = id;
    this.title = title;
    this.type = type; //eg Tuition, Accommodation, DeptAssociation, CollegeAssociation,
    this.level = level;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;
   
  }
};

export default Fee;