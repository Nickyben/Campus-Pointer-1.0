class University {
  constructor(
    id, name, universityCode, vc, offices, universityCourses,
    staff, courseReps, students, halls, sug, departments, faculties, currSection, currSem, welcome, timetable,
    state, country, address, postalCode, numberOfColleges, numberOfDepartments,logo, color
  ) {
    this.id = id;
    this.name = name;
    this.universityCode = universityCode; //MOUAU
    //this.levels = levels;//array of levels with objs containing courses for each level
    this.universityCourses = universityCourses; //eg array
    this.VC = vc;
    this.offices = offices;//dean, staffAdviser, examsOfficer,etc
    this.staff = staff; //array
    this.courseReps = courseReps;//array;
    this.students = students;//array
    this.departments = departments;
    this.faculties = faculties;
    this.halls = halls;
    this.SUG = sug;
    this.welcomeMessage = welcome;
    this.timetable = timetable;
    this.currentSession = currSection;//*** 
    this.currentSemester = currSem;//*** 

    this.state = state;
    this.country= country;
    this.address= address;
    this.postalCode = postalCode;
    this.numberOfColleges = numberOfColleges;
    this.numberOfDepartments = numberOfDepartments;
    this.color;
    this.logo;
    
  };
}

export default University;