import {
	LOAD_ADMINS,
	LOAD_ASSOCIATIONS,
	LOAD_COURSES,
	LOAD_DEPARTMENTS,
	LOAD_FACULTIES,
	LOAD_STAFF,
	LOAD_STUDENTS,
	LOAD_DEPT_DATA,
	LOAD_HOME_DATA,
  LOAD_DEPT_EVENTS,
} from '../actions/dataActions';

import courses from '../../data/courses'; // should be replaced with data fetched from server/db and departments
import students from '../../data/students'; // should be replaced with data fetched from server/db and departments
import staff from '../../data/staff';
import events from '../../data/events';
import halls from '../../data/halls';
import timetables from '../../data/timetables';

const initialState = {
	//!!remember that students etc should be from departments[department ] depending on app owners
	//userId: students.find(s => s.id === 'studentUserId').id,
	availableStudents: students, // [],
	availableDepartments: [],
	availableFaculties: [],
	availableStaff: staff, // [],
	availableAssociations: [],
	availableCourses: courses, // [],
	availableHalls: halls, //[],
	availableEvents: events, // [],
	availableTimetables: timetables, // [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_COURSES: {
			return {
				...state,
				availableCourses: action.availableCourses,
			};
		}
		case LOAD_DEPT_DATA: {
			return {
				...state,
				availableStudents: action.availableStudents,
				availableStaff: action.availableStaff,
				availableHalls: action.availableHalls,
				// availableTimetables: action.availableTimetables,
			};
		}
		case LOAD_DEPT_EVENTS: {
			return {
				...state,
				availableCourses: action.availableCourses,
			};
		}
	}
	return state;
};
