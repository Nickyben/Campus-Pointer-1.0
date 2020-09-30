class Department {
  constructor(
    id, name, deptCode, levels, hod, offices, courses,
    staff, courseReps, students, halls, assoc, faculty,welcome, timetable
  ) {
    this.id = id;
    this.name = name;
    this.departmentCode = deptCode; //CME
    this.levels= levels;//array of levels with objs containing courses for each level
    this.courses = courses; //eg array
    this.HOD = hod;
    this.offices = offices;//hod, staffAdviser,etc
    this.staff = staff; //array
    this.courseReps = courseReps;//array;
    this.students = students;//array
    this.halls = halls;
    this.association = assoc;
    this.faculty = faculty;
    this.welcomeMessage = welcome;
    this.timetable = timetable;
  };
}

export default Department;