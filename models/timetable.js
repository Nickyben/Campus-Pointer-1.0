class Timetable {
  constructor({id, title, department, faculty, university,semester, session, levels, timetableType, dayRows}) {
    this.id = id;
    this.title = title;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
    this.levels = levels;
    this.semester = semester;
    this.session = session;
    this.dayRows = dayRows;  //obj of day keys( having period keys(having course, venue and time keys))
    this.timetableType = timetableType;
  };
}

export default Timetable;


// const dayRows =
// {
//   Monday: {
//     period1: { course: 'theCourseObj', venue: 'theHallObj', time: '8am - 9am', },
//     period2: { course: 'theCourseObj', venue: 'theHallObj', time: '9am - 10am', },
//     period3: { course: 'theCourseObj', venue: 'theHallObj', time: '10am - 11am', },
//     period4: { course: 'theCourseObj', venue: 'theHallObj', time: '11am - 12pm', },
//     period5: { course: 'theCourseObj', venue: 'theHallObj', time: '12pm - 1pm', },
//     period6: { course: 'theCourseObj', venue: 'theHallObj', time: '1pm - 2pm', },
//     period7: { course: 'theCourseObj', venue: 'theHallObj', time: '2pm - 3pm', },
//     period8: { course: 'theCourseObj', venue: 'theHallObj', time: '3pm - 4pm', },
//     period9: { course: 'theCourseObj', venue: 'theHallObj', time: '4pm - 5pm', },
//     period10: { course: 'theCourseObj', venue: 'theHallObj', time: '5pm - 6pm', },
//   },

//   TuesDay: {
//     period1: { course: 'theCourseObj', venue: 'theHallObj', time: '8am - 9am', },
//     period2: { course: 'theCourseObj', venue: 'theHallObj', time: '9am - 10am', },
//     period3: { course: 'theCourseObj', venue: 'theHallObj', time: '10am - 11am', },
//     period4: { course: 'theCourseObj', venue: 'theHallObj', time: '11am - 12pm', },
//     period5: { course: 'theCourseObj', venue: 'theHallObj', time: '12pm - 1pm', },
//     period6: { course: 'theCourseObj', venue: 'theHallObj', time: '1pm - 2pm', },
//     period7: { course: 'theCourseObj', venue: 'theHallObj', time: '2pm - 3pm', },
//     period8: { course: 'theCourseObj', venue: 'theHallObj', time: '3pm - 4pm', },
//     period9: { course: 'theCourseObj', venue: 'theHallObj', time: '4pm - 5pm', },
//     period10: { course: 'theCourseObj', venue: 'theHallObj', time: '5pm - 6pm', },
//   },

//   Wednesday: {
//     period1: { course: 'theCourseObj', venue: 'theHallObj', time: '8am - 9am', },
//     period2: { course: 'theCourseObj', venue: 'theHallObj', time: '9am - 10am', },
//     period3: { course: 'theCourseObj', venue: 'theHallObj', time: '10am - 11am', },
//     period4: { course: 'theCourseObj', venue: 'theHallObj', time: '11am - 12pm', },
//     period5: { course: 'theCourseObj', venue: 'theHallObj', time: '12pm - 1pm', },
//     period6: { course: 'theCourseObj', venue: 'theHallObj', time: '1pm - 2pm', },
//     period7: { course: 'theCourseObj', venue: 'theHallObj', time: '2pm - 3pm', },
//     period8: { course: 'theCourseObj', venue: 'theHallObj', time: '3pm - 4pm', },
//     period9: { course: 'theCourseObj', venue: 'theHallObj', time: '4pm - 5pm', },
//     period10: { course: 'theCourseObj', venue: 'theHallObj', time: '5pm - 6pm', },
//   },

//   Thursday: {
//     period1: { course: 'theCourseObj', venue: 'theHallObj', time: '8am - 9am', },
//     period2: { course: 'theCourseObj', venue: 'theHallObj', time: '9am - 10am', },
//     period3: { course: 'theCourseObj', venue: 'theHallObj', time: '10am - 11am', },
//     period4: { course: 'theCourseObj', venue: 'theHallObj', time: '11am - 12pm', },
//     period5: { course: 'theCourseObj', venue: 'theHallObj', time: '12pm - 1pm', },
//     period6: { course: 'theCourseObj', venue: 'theHallObj', time: '1pm - 2pm', },
//     period7: { course: 'theCourseObj', venue: 'theHallObj', time: '2pm - 3pm', },
//     period8: { course: 'theCourseObj', venue: 'theHallObj', time: '3pm - 4pm', },
//     period9: { course: 'theCourseObj', venue: 'theHallObj', time: '4pm - 5pm', },
//     period10: { course: 'theCourseObj', venue: 'theHallObj', time: '5pm - 6pm', },

//   },

//   Friday: {
//     periods: {
//       period1: { course: 'theCourseObj', venue: 'theHallObj', time: '8am - 9am', },
//       period2: { course: 'theCourseObj', venue: 'theHallObj', time: '9am - 10am', },
//       period3: { course: 'theCourseObj', venue: 'theHallObj', time: '10am - 11am', },
//       period4: { course: 'theCourseObj', venue: 'theHallObj', time: '11am - 12pm', },
//       period5: { course: 'theCourseObj', venue: 'theHallObj', time: '12pm - 1pm', },
//       period6: { course: 'theCourseObj', venue: 'theHallObj', time: '1pm - 2pm', },
//       period7: { course: 'theCourseObj', venue: 'theHallObj', time: '2pm - 3pm', },
//       period8: { course: 'theCourseObj', venue: 'theHallObj', time: '3pm - 4pm', },
//       period9: { course: 'theCourseObj', venue: 'theHallObj', time: '4pm - 5pm', },
//       period10: { course: 'theCourseObj', venue: 'theHallObj', time: '5pm - 6pm', },

//     }
//   },
// };
