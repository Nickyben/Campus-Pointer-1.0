import { REGISTER_COURSES, MARK_COURSE, MARK_ALL_COURSES } from "../actions/courseAppActions";

const initialState = {
  registeredCourses: [],
  approvedCourses: [],
  addedCourses: [],
  droppedCourses: [],
  excessCreditCourses: [],
  markedCourses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_COURSES:
      //console.log(action.submittedCourses);
      return (
        {
          ...state,
          registeredCourses: action.submittedCourses,//do you want to replace or add??
          markedCourses: [],
        }
      );
    case MARK_COURSE:
      // console.log(state.markedCourses);

      return ({
        ...state,
        markedCourses: state.markedCourses.includes(action.markedCourse) ?
          [...state.markedCourses].filter(course => course !== action.markedCourse) :
          [...state.markedCourses].concat(action.markedCourse),
      });
    case MARK_ALL_COURSES:
     

      const notMarked = action.markedCourses.filter(course =>
        !state.markedCourses.includes(course)
      );
      //console.warn('returning state with: ' + notMarked)
      //console.warn('state: ' + state.markedCourses)

      return (
        {
          ...state,
          markedCourses: action.markedCourses.every(course =>
            state.markedCourses.includes(course)
          ) ?
            [...state.markedCourses].filter(course => !action.markedCourses.includes(course)):
            [...state.markedCourses].concat(notMarked),
        });

  }
  return state;
};