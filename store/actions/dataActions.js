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
    type: LOAD_DEPT_DATA,// should  all be replaced with data fetched from server/db
    availableStudents: students,
    availableStaff: staff,
    availableHalls: halls,
    availableCourses: courses,
    availableEvents: events,
    availableTimetables: timetables,
  });
}

export const addItem = (itemDataObj, actionType) => {
	//console.warn(userEmail, userPassword);
	return async (dispatch) => {
    
		if (true) {
			//change
			let response;
			try {
				//edit the api url based on the action type
				response = await fetch(
					//the api url for the node, eg// `https://rn-firebase-expo-project.firebaseio.com/myProducts.json?auth=${idToken}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(itemDataObj),
					}
				);
			} catch (err) {
				if (err.message.toLowerCase().includes('network'))
					throw new Error(
						'Hmm...Something is wrong with your Network Connection. Please check your connection!'
					);
			}

			if (!response.ok) {
				//edit this according to the api docs
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg;

				//EDIT THIS BASED ON THE DOCUMENTATION
				switch (respErrMsg) {
					case 'EMAIL_NOT_FOUND': {
						errMsg = `There is no account with email , please create an account!`;
						break;
					}

					case 'INVALID_PASSWORD': {
						errMsg = `The password you entered is incorrect`;
						break;
					}

					case 'USER_DISABLED': {
						errMsg = `We are so sorry but, this account has been disabled!`;
						break;
					}
					default:
						errMsg = 'Hmm...Something went wrong!';
				}

				//make sure to handle all errors, example: network error
				//console.warn(errMsg);
				throw new Error(errMsg);
			}

			const responseData = await response.json(); //waits form the response before continuing the exe

			//console.log(responseData);//to see the response of the POST

			//dispatch
			dispatch({
				type: actionType,
				itemData: itemDataObj,
			});
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('PLEASE FILL IN ALL FIELDS!');
		}
	};
};
