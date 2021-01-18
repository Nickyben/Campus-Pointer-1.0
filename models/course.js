class Course {
  constructor({id, courseTitle, courseCode, courseOutline, creditUnits,
    courseLevel, department, semester, courseCoordinator, memberLecturers, courseType}) {
    this.id = id;
    this.courseTitle = courseTitle;
    this.courseCode = courseCode;
    this.courseOutline = courseOutline;
    this.creditUnits = creditUnits;
    this.courseLevel = courseLevel;
    this.department = department;
    this.semester = semester;
    this.courseCoordinator = courseCoordinator;
    this.memberLecturers = memberLecturers;
    this.courseType = courseType;//eg university,faculty, department
  };
}

// const obj = new Course(2,3,5,6,3,4,5,6,7,7,4);
// obj.semester= 23;
// console.log(obj);

export default Course;