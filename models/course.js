class Course {
  constructor(id, courseTitle, courseCode, courseOutline, creditUnits, courseLevel,  courseSemester, courseCoordinator, memberLecturers) {
    this.id = id;
    this.courseTitle = courseTitle;
    this.courseCode = courseCode;
    this.courseOutline = courseOutline;
    this.creditUnits = creditUnits;
    this.courseLevel = courseLevel;
    this.courseSemester = courseSemester;
    this.courseCoordinator = courseCoordinator;
    this.memberLecturers = memberLecturers;
  };
}

export default Course;