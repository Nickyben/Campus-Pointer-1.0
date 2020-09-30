import {
  LOAD_ADMINS, LOAD_ASSOCIATIONS, LOAD_COURSES,
  LOAD_DEPARTMENTS, LOAD_FACULTIES, LOAD_STAFF,
  LOAD_STUDENTS, LOAD_DEPT_DATA, LOAD_HOME_DATA
} from "../actions/dataActions";

const initialState = {
  availableStudents: [],
  availableDepartments: [],
  availableFaculties: [],
  availableStaff: [],
  availableAssociations: [],
  availableCourses: [],
  availableHalls: [],
  availableEvents: [],
  availableTimetables: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSES:
      return (
        {
          ...state,
          availableCourses: action.availableCourses,
        }
      );

    case LOAD_DEPT_DATA:
      
      return (
        {
          ...state,
          availableStudents: action.availableStudents,
          availableStaff: action.availableStaff,
          availableHalls: action.availableHalls,
          availableCourses: action.availableCourses,
          availableEvents: action.availableEvents,
          availableTimetables: action.availableTimetables,
        }
      );
   
  
  }
  return state;
};