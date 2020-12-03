class Association {
  constructor(
    id, name, deptCode, levels, hod, offices, courses,
    staff, courseReps, students, halls, assoc, faculty, university, currSection, currSem, welcome, timetable
  ) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.faculty = faculty;
    this.university= university;
    this.type= type;
    this.adviser = adviser; 
    this.offices = offices;
    this.criterion = criterion;//array
    this.logo = logo;
    this.color = color;
    this.images = images;
    this.welcomeMessage = welcome;
  };
}

export default Association;