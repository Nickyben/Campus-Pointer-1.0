class Staff {
  constructor(id, name, staffNumber, gender, employYear, department, faculty, university,
    designation, rank,office, phoneNumber, courses, allocatedLevel, image, isAcademic, honours) {
    this.id = id;
    this.name = name;//you should extract first and last name from here
    this.firstName = this.name.firstName;
    this.lastName = this.name.lastName;
    this.fullName = this.name.firstName + ' ' + this.name.lastName
    this.gender = gender;
    this.entryYear = employYear
    this.designation = designation;
    this.rank = rank;
    this.office = office; // make this array of offices
    this.staffNumber = staffNumber;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
    this.phoneNumber = phoneNumber;
    this.image = image;
    this.courses = courses; //array  containing course objs which have properties including memberLecturers, coordinator
    this.allocatedLevel = allocatedLevel;
    this.isAcademic = isAcademic;
    this.honours = honours;
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