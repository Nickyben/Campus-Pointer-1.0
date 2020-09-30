class Course {
  constructor(id, courseTitle, courseCode, courseOutline, creditUnits, courseLevel,dept,  semester, courseCoordinator, memberLecturers) {
    this.id = id;
    this.courseTitle = courseTitle;
    this.courseCode = courseCode;
    this.courseOutline = courseOutline;
    this.creditUnits = creditUnits;
    this.courseLevel = courseLevel;
    this.department = dept;
    this.semester = semester;
    this.courseCoordinator = courseCoordinator;
    this.memberLecturers = memberLecturers;
  };
}

// const obj = new Course(2,3,5,6,3,4,5,6,7,7,4);
// obj.semester= 23;
// console.log(obj);

export default Course;