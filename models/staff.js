class Staff {
  constructor(id, name, staffNumber, employYear, department, faculty, 
    designation, offices, phoneNumber, courses, allocatedLevel, image) {
    this.id = id;
    this.name = name;//you should extract first and last name from here
    this.entryYear = employYear
    this.designation = designation;
    this.offices = offices;//array of offices
    this.staffNumber = staffNumber;
    this.department = department;
    this.faculty = faculty;
    this.phoneNumber = phoneNumber; 
    this.image = image;
    this.courses = courses; //array  containing course objs which have properties including memberLecturers, coordinator
    this.allocatedLevel = allocatedLevel;
   
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