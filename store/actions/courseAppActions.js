export const REGISTER_COURSES = 'REGISTER_COURSES';
export const MARK_COURSE = 'MARK_COURSE'
export const MARK_ALL_COURSES = 'MARK_ALL_COURSES'

export const registerCourses = (markedCourses)=>{
  return({
    type: REGISTER_COURSES,
    submittedCourses: markedCourses,
  });
}

export const markCourse =(course)=>{
  return({
    type: MARK_COURSE,
    markedCourse: course,
  });
};

export const markAllCourses = (courses) => {
  return ({
    type: MARK_ALL_COURSES,
    markedCourses: courses,
  });
};