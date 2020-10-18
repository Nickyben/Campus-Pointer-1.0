
import { Attendance } from '../models/result';
import students from './students';
import courses from './courses';



const levels = [100, 200, 300, 400, 500];//should be dept.levels array
const sessions = ['2019/2020', '2020/2021', '2021/2022'];
const depts = ['Computer Engineering', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Agric and Bio Resource'];
const semesters = ['First', 'Second'];
const colors = ['#55a5ff', '#f58915', '#24df90', '#ff55dd', '#ee3e11', '#7722ff', '#cc3466', '#65de27', '#a829ff'];
const atd = [];
for (let i = 35; i <= 90; i++) {
  if (i % 6 === 0) { atd.push(i); }
}
const rand = (arr) => {
  let index = +(Math.random() * (arr.length)).toFixed(0);
  const validIndex = (index < arr.length ? index : index === arr.length ? index - 1 : arr.length - 1);
  return arr[validIndex];
}



const attendances = [];
for (let i = 1; i <= 120; i++) {
  const dept = 'Computer Engineering';//rand(depts);
  const lev = rand(levels);
  const sem = rand(semesters);
  const isFinals = (levels.indexOf(lev) === levels.length - 1) && (semesters.indexOf(sem) === semesters.length - 1)

  const ATD_Data = courses.filter(c =>
    c.courseLevel === lev && c.department === dept && c.semester === sem
  ).map((course, ind) => {

    const ATD_Sheet = students.filter(student =>
      student.department === dept //&& student.level === lev.toString()
    ).map(student => {
      const atdPercentage = rand(atd);

      return ({
        name: student.fullName,
        regNumber: student.regNumber,
        course: course,
        attendance: atdPercentage,
        barColor: atdPercentage >= 70 ? '#22eeaa' :
          atdPercentage >= 65 ? '#6688ff' :
            atdPercentage >= 60 ?'#ff8833' :
              atdPercentage >= 50 ?  '#ff33aa' : '#ff3333'

      });
    });

    return ({
      course: course,
      ATD_Sheet: ATD_Sheet,
      color: ind < colors.length ? colors[ind] : rand(colors)
    });
  });

  attendances.push(
    new Attendance(
      Math.random().toString(),
      !isFinals ? 'Non_Degree_Exam' : 'Degree_Exam',
      lev,
      sem,
      rand(sessions), //for now
      dept,
      'CEET',
      students.filter(s => s.department === dept && +s.level > lev),
      courses.filter(c => c.department === dept && c.courseLevel === lev && c.semester === sem),
      ATD_Data
    )
  );

}


export default attendances;//should also contain results of previous levels of students eg 100level result of someone in 400level

