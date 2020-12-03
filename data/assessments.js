
import { Assessment } from '../models/result';
import students from './students';
import courses from './courses';



const levels = [100, 200, 300, 400, 500];//should be dept.levels array
const sessions = ['2019/2020', '2020/2021', '2021/2022'];
const depts = ['Computer Engineering', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Agric and Bio Resource'];
const universities = ['MOUAU']
const semesters = ['First', 'Second'];
const colors = ['#55a5ff', '#f58915', '#24df90', '#ff55dd', '#ee3e11', '#7722ff', '#cc3466', '#65de27', '#a829ff'];
const scores = []; const scores2 = [];
const testScores = [];
for (let i = 0; i <= 15; i++) {
  scores.push(i);
}
for (let i = 0; i <= 15; i++) {
  scores2.push(i);
}
for (let i = 0; i <= 30; i++) {
  testScores.push(i);
}

const rand = (arr) => {
  let index = +(Math.random() * (arr.length)).toFixed(0);
  const validIndex = (index < arr.length ? index : index === arr.length ? index - 1 : arr.length - 1);
  return arr[validIndex];
}

const getCA = (q1, q2, t) => {
  if (!isNaN(q1) && (0 <= q1 <= 15)) {
    if (!isNaN(q2) && (0 <= q2 <= 15)) {
      if (!isNaN(t) && (0 <= t <= 30)) {
        return (
          (((q1 + q2 + t) / 60) * 30).toFixed(0)
        );
      } else {
        if (!isNaN(t)) {
          return (
            'Invalid Test Score!'
          )
        } else {
          return (
            (((q1 + q2) / 30) * 30).toFixed(0)
          );
        }

      }
    } else {
      if (!isNaN(q2)) {
        return (
          'Invalid Quiz 2 Score!'
        )
      } else {
        if (!isNaN(t) && (0 <= t <= 30)) {
          return (
            (((q1 + t) / 45) * 30).toFixed(0)
          );
        }
      }

    }
  }
  else {
    if (!isNaN(q1)) {
      return (
        'Invalid Quiz 1 Score!'
      )
    } else {
      if (!isNaN(q2) && (0 <= q2 <= 15)) {
        if (!isNaN(t) && (0 <= t <= 30)) {
          return (
            (((q2 + t) / 45) * 30).toFixed(0)
          );
        }
      }
    }

  }
};

const assessments = [];
for (let i = 1; i <= 120; i++) {
  const dept = 'Computer Engineering';//rand(depts);
  const lev = rand(levels);
  const sem = rand(semesters);
  const isFinals = (levels.indexOf(lev) === levels.length - 1) && (semesters.indexOf(sem) === semesters.length - 1)
  
  //console.log(lev, dept)

  const CA_Data = courses.filter(c =>
    c.courseLevel === lev && c.department === dept && c.semester === sem
  ).map((course, ind) => {

    const CA_Sheet = students.filter(student =>
      student.department === dept //&& student.level === lev.toString()
    ).map(student => {
      const score = rand(scores);
      const score2 = rand(scores2);
      const testScore = rand(testScores);
      const totalScore = getCA(score, score2, testScore);

      return ({
        name: student.fullName,
        regNumber: student.regNumber,
        course: course,
        quiz1: score,
        quiz2: score2,
        test: testScore,
        CA: totalScore
      });
    });

    return ({
      course: course,
      CA_Sheet: CA_Sheet,
      color: ind < colors.length ? colors[ind] : rand(colors)
    });
  });

  assessments.push(
    new Assessment(
      Math.random().toString(),
      !isFinals ? 'Non_Degree_Exam' : 'Degree_Exam',
      lev,
      sem,
      rand(sessions), //for now
      dept,
      'CEET',
      universities[0],
      students.filter(s => s.department === dept && +s.level > lev),
      courses.filter(c => c.department === dept && c.courseLevel === lev && c.semester === sem),
      CA_Data
    )
  );

}


export default assessments;//should also contain results of previous levels of students eg 100level result of someone in 400level

