
import Result from '../models/result';
import students from '../data/students';
import courses from '../data/courses';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//eg {
//Mth111 : [{regNum : 94423 : score: 78, grade : 'A'},{regNum : 92463 : score: 58, grade : 'C'}, ...],
//Mth113: [{ regNum: 94423 : score: 78, grade: 'A' }, { regNum: 92463 : score: 62, grade: 'B' }, ...],
//}

export const getGrade = (score = (0 || '0'), scale = '5.0') => {
  //A=70-100,B =60-69,C=50-59,D=45-49,E=40-44, F=0-39
  if (scale === '5.0' || scale === 5 || scale === '5') {
    if ((score / 70) >= 1) {
      if (score > 100) {
        return 'Invalid Score (above 100)!'
      }
      return 'A'
    } else if ((score / 60) >= 1) {
      return 'B'
    } else if ((score / 50) >= 1) {
      return 'C'
    } else if ((score / 45) >= 1) {
      return 'D'
    } else if ((score / 40) >= 1) {
      return 'E'
    } else {
      if (score < 0) {
        return 'Invalid score (below 0)!'
      }
      return 'F'
    }
  }

  return 'Only 5.0 grading is available for now!'
};


const getPoints = (grade) =>{
  const grades = ['F', 'E', 'D', 'C', 'B', 'A']
  return (grades.indexOf(grade));

};

const rand = (arr) => {
  let index = +(Math.random() * (arr.length)).toFixed(0);
  const validIndex = (index < arr.length ? index : index === arr.length ? index - 1 : arr.length - 1);
  return arr[validIndex];
}
const levels = [100, 200, 300, 400, 500];
const sessions = ['2019/2020', '2020/2021', '2021/2022'];
const depts = ['Computer Engineering', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Agric and Bio Resource'];
const semesters = ['First', 'Second'];
const colors = ['#55a5ff', '#f58915', '#24df90', '#ff55dd', '#ee3e11', '#7722ff', '#cc3466', '#65de27', '#a829ff'];


const results = [];
for (let i = 1; i <= 120; i++) {
  const dept = rand(depts);
  const lev = rand(levels);
  const sem = rand(semesters);
  const scores = [];
  for (let i = 20; i <= 95; i++) {
    scores.push(i);
  }
  //console.log(lev, dept)

  const resultData = courses.filter(c =>
    c.courseLevel === lev && c.department === dept && c.semester === sem
  ).map((course, ind) => {

    const gradeData = students.filter(student =>
      student.department === dept //&& student.level === lev.toString()
    ).map(student => {
      const score = rand(scores);

      return ({
        name: student.fullName,
        regNumber: student.regNumber,
        course: course,
        score: score,
        grade: {
          value: getGrade(score),
          color: getGrade(score) === 'F' ? '#ff3333' : getGrade(score) === 'A' ? '#11ff33' : '#222',
        
        }, 
        points: getPoints(getGrade(score))
      });
    });

    return ({
      course: course,
      gradeData: gradeData,
      color: ind < colors.length ? colors[ind] : rand(colors)
    });
  });

  results.push(
    new Result(
      Math.random().toString(),
      'Non_Degree_Exam',
      lev,
      sem,
      rand(sessions), //for now
      dept,
      'CEET',
      students.filter(s => s.department === dept), // && s.level === lev.toString()),
      courses.filter(c => c.department === dept && c.courseLevel === lev && c.semester === sem),
      resultData
    )
  );

}


export default results;//should also contain results of previous levels of students eg 100level result of someone in 400level

// import results from '../../data/results';


// console.log(results.find(r => r.department === 'Computer Engineering').resultData[0].gradeData.length)
