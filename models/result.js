class Result {
  constructor(id, type, level, semester, session, department, faculty, university, students, courses, resultData) {
    this.id = id;
    this.type = type; //eg Degree_Exam, Non-Degree_Exam
    this.level = level;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
    this.isDegree = (this.type === 'Degree_Exam'); //true if level and semester is last// &&(this.type === 'Exam Result') // bool
    this.students = students;
    this.courses = courses; //? courses : this.level.courses; //array or 
    this.resultData = resultData; //an arr containing course properties as arrays(courses) of
    // objs(with regNum, score and grade props)
    //eg {
    //Mth111 : [{regNum : 94423 : score: 78, grade : 'A'},{regNum : 92463 : score: 58, grade : 'C'}, ...],
    //Mth113: [{ regNum: 94423 : score: 78, grade: 'A' }, { regNum: 92463 : score: 62, grade: 'B' }, ...],
    //}
  }
};

export class Assessment {
  constructor(id, type, level, semester, session, department, faculty, university, students, courses, CA_Data) {
    this.id = id;
    this.type = type;
    this.level = level;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
    this.isDegree = (this.type === 'Degree_Exam'); // &&(this.type === 'Exam Result') // bool
    this.students = students;
    this.courses = courses
    this.assessmentData = CA_Data;
  }
};

export class Attendance {
  constructor(id, type, level, semester, session, department, faculty, students, courses, ATD_Data) {
    this.id = id;
    this.type = type; 
    this.level = level;
    this.semester = semester;
    this.session = session;
    this.department = department;
    this.faculty = faculty;
    this.isDegree = (this.type === 'Degree_Exam'); // &&(this.type === 'Exam Result') // bool
    this.students = students;
    this.courses = courses
    this.attendanceData = ATD_Data;
  }
};


export default Result;