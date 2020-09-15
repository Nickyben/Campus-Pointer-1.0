class Staff {
  constructor(id, name, staffNumber, gender, employYear, department, faculty, 
    designation, office, phoneNumber, courses, allocatedLevel, image, isAcademic) {
    this.id = id;
    this.name = name;//you should extract first and last name from here
    this.firstName = this.name.firstName;
    this.lastName = this.name.lastName;
    this.fullName = this.name.firstName + ' ' + this.name.lastName
    this.gender =  gender;
    this.entryYear = employYear
    this.designation = designation;
    this.office = office; // make this array of offices
    this.staffNumber = staffNumber;
    this.department = department;
    this.faculty = faculty;
    this.phoneNumber = phoneNumber; 
    this.image = image;
    this.courses = courses; //array  containing course objs which have properties including memberLecturers, coordinator
    this.allocatedLevel = allocatedLevel;
    this.isAcademic = isAcademic;
   
    //this.allocatedResult 
    this.allocatedCourses = courses.filter(course => {
      const isAllocated = course.memberLecturers.some(member =>
        member.name === this.name
      );
      return isAllocated;
    });
    this.coordinatorCourses = courses.filter(course => {
      return (course.courseCoordinator.name === this.name);
    });
  };
}


export default Staff;