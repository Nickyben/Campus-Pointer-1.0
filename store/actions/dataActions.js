import courses from '../../data/courses'; // should be replaced with data fetched from server/db and departments
import students from '../../data/students'; // should be replaced with data fetched from server/db and departments
import staff from '../../data/staff';
import events from '../../data/events';
import halls from '../../data/halls';
import timetables from '../../data/timetables';


export const LOAD_ADMINS = 'LOAD_ADMINS';
export const LOAD_COURSES = 'LOAD_COURSES';//Should probably depend on the departments
export const LOAD_STUDENTS = 'LOAD_STUDENTS';//Should probably depend on the departments
export const LOAD_STAFF = 'LOAD_STAFF';//Should probably depend on the departments
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_FACULTIES = 'LOAD_FACULTIES';
export const LOAD_ASSOCIATIONS = 'LOAD_ASSOCIATIONS';
export const LOAD_DEPT_DATA = 'LOAD_DEPT_DATA';
export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';



export const fetchCourses = () => {
  return ({
    type: LOAD_COURSES,
    availableCourses: courses,// should be replaced with data fetched from server/db
  });
}

export const fetchDeptData = () => {
 
  return ({
    type: LOAD_DEPT_DATA,
    availableStudents: students,// should  all be replaced with data fetched from server/db
    availableStaff: staff,
    availableHalls: halls,
    availableCourses: courses,
    availableEvents: events,
    availableTimetables: timetables,
  });
}

