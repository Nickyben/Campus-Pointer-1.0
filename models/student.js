class Student {
  constructor(id, name, regNumber, gender, adminYear, level, dept,
    faculty, post, office, phoneNumber, mostRecentResult,image) {

    //const levelIsValid = this.department.levels.some(deptLevel => (deptLevel === level));

    this.id = id;
    this.name = name;//you should extract first and last name from here
    this.firstName = this.name.firstName;
    this.lastName = this.name.lastName;
    this.fullName = this.name.firstName + ' ' + this.name.lastName
    this.regNumber = regNumber;
    this.gender = gender;
    this.entryYear = adminYear;
    this.post = post; //like courseRep or assistant
    this.office = office;//like President etc

    this.level = level;//levelIsValid ? level : level + 100;

    this.department = dept;
    this.faculty = faculty;
    this.phoneNumber = phoneNumber;
    this.image= image;


   //this.courses = this.department.courses;//arr containing all courses for that department


    // this.result = mostRecentResult; //obj containing both assessment, exams scores and grades, prev,curr,cumulative
    // this.presentLevelCourses = courses.filter(course => {
    //   return (levelIsValid && (course.courseLevel === this.level));
    // });
    // this.previousLevelCourses = this.courses.filter(course => {
    //   return (course.courseLevel === (this.level - 100));
    // });
    // this.previousCourses = this.courses.filter(course => {
    //   return (course.courseLevel < (this.level));
    // });
    // this.presentCourses = this.result.courses.filter(resultCourse => {
    //   return (resultCourse.grade === 'F');
    // }).concat(this.presentLevelCourses);
    



  };
}

export default Student;