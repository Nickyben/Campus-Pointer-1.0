import Timetable from '../models/timetable';
import courses from '../data/courses';
import halls from '../data/halls';

const tempCourses = courses.filter(c => c.department === 'Computer Engineering');
const tempHalls = halls.filter(h => h.department === 'Computer Engineering');
const depts = ['Computer Engineering'];//should be department objs
const faculties = ['CEET'];
const universities = ['MOUAU']
const sessions = ['2020/2021'];
const semesters = ['First'];
const timetableTypes = ['Lectures', 'Exam'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri',// 'Saturday', 'Sunday'
];
const times = ['8am - 9am', '9am - 10am', '10am - 11am', '11am - 12pm', //'12pm - 1pm',
  '1pm - 2pm', '2pm - 3pm', '3pm - 4pm', '4pm - 5pm', '5pm - 6pm'];
const colors = ['#8edf26', '#ef2464', '#55a5ff', '#ffcc00', '#f58915', '#24df90', '#ff55dd', '#ee3e11', '#7722ff'];
const periods = [];
for (let i = 1; i <= 9; i++) {
  const num = i !== 10 ? `0${i}` : i;
  periods.push('period' + num)
}

export const dayRows = {};//obj of day keys( having period keys(having course, venue and time keys))
//like dayRows.Monday.period7.course.courseCode;

for (let i = 1; i <= days.length; i++) {
  dayRows[days[i - 1]] = {};
  for (let j = 1; j <= periods.length; j++) {
    dayRows[days[i - 1]][periods[j - 1]] = {
      course: tempCourses[+(Math.random() * (tempCourses.length - 2)).toFixed(0)],
      venue: tempHalls[+(Math.random() * (tempHalls.length - 2)).toFixed(0)],
      time: times[j - 1],
      color: colors[j - 1],
    };
  }
}

export const daysRowsArr = [];
for (let d in dayRows) {
  const periodsArr = [];
  for (let p in dayRows[d]) {
    periodsArr.push(dayRows[d][p])
  }
  daysRowsArr.push({
    day: d,
    periods: periodsArr,
  });

}

const timetables = [];
for (let i = 1; i <= depts.length; i++) {
  timetables.push(
    new Timetable(
      Math.random().toString + depts[0],
      depts[0] + ' ' + timetableTypes[0] + ' Timetable for ' + semesters[0] + ' Semester, ' + sessions[0] + ' Session.',
      depts[0],
      faculties[0],
      universities[0],
      semesters[0],
      sessions[0],
      [100, 200, 300, 400, 500],
      timetableTypes[0],
      daysRowsArr//dayRows,  //
    )
  );
}

export default timetables;