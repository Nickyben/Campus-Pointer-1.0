class Faculty {
  constructor(
    id, name, facultyCode, dean, offices, facultyCourses,
    staff, courseReps, students, halls, assoc,departments, university, currSection, currSem, welcome, timetable
  ) {
    this.id = id;
    this.name = name;
    this.facultyCode = facultyCode; //CEET
   //this.levels = levels;//array of levels with objs containing courses for each level
    this.facultyCourses = facultyCourses; //eg array
    this.Dean = dean;
    this.offices = offices;//dean, staffAdviser, examsOfficer,etc
    this.staff = staff; //array
    this.courseReps = courseReps;//array;
    this.students = students;//array
    this.departments=departments;
    this.university= university;
    this.halls = halls;
    this.association = assoc;
    this.welcomeMessage = welcome;
    this.timetable = timetable;
    this.currentSession = currSection;//*** 
    this.currentSemester = currSem;//*** 
  };
}

export default Faculty;