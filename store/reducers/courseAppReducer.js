import { REGISTER_COURSES, MARK_COURSE, MARK_ALL_COURSES } from "../actions/courseAppActions";

const initialState = {
  registeredCourses: [],
  approvedCourses: [],
  addedCourses: [],
  droppedCourses: [],
  excessCreditCourses: [],
  markedCourses: [],
};

export default (state = initialState, action) => {

  switch (action.type) {
    
    case REGISTER_COURSES:      const sorted = action.submittedCourses.sort((a, b) =>( a.courseCode < b.courseCode && a.courseCode - b.courseCode)
        || (a.courseCode > b.courseCode && b.courseCode - a.courseCode));

      console.log(sorted.map(c=> c.courseCode));
      return (
        {
          ...state,
          registeredCourses: sorted,//do you want to replace or add??
          markedCourses: [],
        }
      );
    case MARK_COURSE:
      if (action.mark) {
        return ({

          ...state,
          markedCourses: !state.markedCourses.includes(action.markedCourse) ?
            [...state.markedCourses].concat(action.markedCourse) :
            state.markedCourses,
        });
      } else {
        return ({
          ...state,
          markedCourses: state.markedCourses.includes(action.markedCourse) ?
            [...state.markedCourses].filter(course => course !== action.markedCourse) :
            state.markedCourses,
        });

      }


    case MARK_ALL_COURSES:


      const withoutThoseInSection = state.markedCourses.filter(course => !action.markedCourses.includes(course));
      if (action.mark) {

        return ({
          ...state,
          markedCourses: !action.markedCourses.every(course =>
            state.markedCourses.includes(course)) ?
            withoutThoseInSection.concat(action.markedCourses) :
            state.markedCourses,
        });
      } else {
        return (
          {
            ...state,
            markedCourses: action.markedCourses.every(course =>
              state.markedCourses.includes(course)) ?
              state.markedCourses.filter(course => !action.markedCourses.includes(course)) :
              state.markedCourses,
              
          });
      }


      // return (
      //   {
      //     ...state,
      //     markedAllCourses: action.markedAllCourses.every(course =>
      //       state.markedAllCourses.includes(course)) ?
      //       state.markedAllCourses.filter(course => !action.markedAllCourses.includes(course)) :
      //       withoutThoseInSection.concat(action.markedAllCourses),
      //   });

  }
  return state;
};