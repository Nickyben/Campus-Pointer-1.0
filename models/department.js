class Department {
  constructor(
    {id, name, deptCode, levels, hod, offices, courses,
    staff, courseReps, students, halls, assoc, faculty,university, currSection, currSem, welcome, timetable, images,
 } ) {
    this.id = id;
    this.name = name;
    this.departmentCode = deptCode; //CME
    this.levels = levels;//array of levels with objs containing courses for each level
    this.courses = courses; //eg array
    this.HOD = hod;
    this.offices = offices;//hod, staffAdviser,etc
    this.staff = staff; //array
    this.courseReps = courseReps;//array;
    this.students = students;//array
    this.halls = halls;
    this.images = images;
    this.association = assoc;
    this.faculty = faculty;
    this.university = university;
    this.welcomeMessage = welcome;
    this.timetable = timetable;
    this.currentSession = currSection;
    this.currentSemester = currSem;
  };
}

export default Department;