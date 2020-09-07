class Course {
  constructor(id, courseTitle, courseCode, courseOutline, creditUnit, courseLevel, courseCoordinator, memberLecturers) {
    this.id = id;
    this.courseTitle = courseTitle;
    this.courseCode = courseCode;
    this.courseOutline = courseOutline;
    this.creditUnit = creditUnit;
    this.courseLevel = courseLevel;
    this.courseCoordinator = courseCoordinator;
    this.memberLecturers = memberLecturers;
  };
}

export default Course;