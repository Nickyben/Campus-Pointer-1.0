import courses from '../../data/courses'; // should be replaced with data fetched from server/db and departments
import students from '../../data/students'; // should be replaced with data fetched from server/db and departments
import staff from '../../data/staff';
import events from '../../data/events';
import halls from '../../data/halls';
import timetables from '../../data/timetables';
import Staff from '../../models/staff';
import Hall from '../../models/hall';
import Student from '../../models/student';
import { endpoints } from '../../src/firebase';
import Course from '../../models/course';
import Event from '../../models/event';
import Timetable from '../../models/timetable';
import { thunkFetch } from '../../constants/backendFunctions';

export const LOAD_ADMINS = 'LOAD_ADMINS';
export const LOAD_COURSES = 'LOAD_COURSES'; //Should probably depend on the departments
export const LOAD_STUDENTS = 'LOAD_STUDENTS'; //Should probably depend on the departments
export const LOAD_STAFF = 'LOAD_STAFF'; //Should probably depend on the departments
export const LOAD_HALLS = 'LOAD_HALLS';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_FACULTIES = 'LOAD_FACULTIES';
export const LOAD_ASSOCIATIONS = 'LOAD_ASSOCIATIONS';
export const LOAD_DEPT_DATA = 'LOAD_DEPT_DATA';
export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';
export const LOAD_DEPT_EVENTS = 'LOAD_DEPT_EVENTS';
export const LOAD_TIMETABLES = 'LOAD_TIMETABLES';

export const dataActionTypes = [
	LOAD_ADMINS,
	LOAD_COURSES,
	LOAD_STUDENTS,
	LOAD_STAFF,
	LOAD_HALLS,
	LOAD_DEPARTMENTS,
	LOAD_FACULTIES,
	LOAD_ASSOCIATIONS,
	LOAD_DEPT_DATA,
	LOAD_HOME_DATA,
	LOAD_DEPT_EVENTS,
	LOAD_TIMETABLES,
];

export const fetchDeptHomeData = () => {
	const urlArr = [
		{ url: endpoints.getData('staff'), init: {} },
		{ url: endpoints.getData('students'), init: {} },
		{ url: endpoints.getData('halls'), init: {} },
	];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const staffResponseJson = arrOfRespJsonS[0];
		const studentsResponseJson = arrOfRespJsonS[1];
		const hallsResponseJson = arrOfRespJsonS[2];
		const dummyDeptData = [staff, students, halls];

		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		// for (const respJson of arrOfRespJsonS) {
		const deptStaff = staffResponseJson && !staffResponseJson.error ? [] : state.dataReducer.availableStaff;
		const deptStudents =
			studentsResponseJson && !studentsResponseJson.error ? [] : state.dataReducer.availableStudents;
		const deptHalls = hallsResponseJson && !hallsResponseJson.error ? [] : state.dataReducer.availableHalls;

		if (staffResponseJson && !staffResponseJson.error) {
			for (const key in staffResponseJson) {
				const staffItem = staffResponseJson[key];
				const {
					firstName,
					lastName,
					staffNumber,
					gender,
					entryYear,
					department,
					faculty,
					university,
					designation,
					rank,
					office,
					phoneNumber,
					courses,
					allocatedLevel,
					image,
					isAcademic,
					honours,
				} = staffItem;

				deptStaff.push(
					new Staff({
						key,
						firstName,
						lastName,
						staffNumber,
						gender,
						entryYear,
						department,
						faculty,
						university,
						designation,
						rank,
						office,
						phoneNumber,
						faculty,
						university,
						designation,
						rank,
						office,
						phoneNumber,
						courses,
						allocatedLevel,
						image,
						isAcademic,
						honours,
					})
				);
			}
		}

		if (studentsResponseJson && !studentsResponseJson.error) {
			for (const key in studentsResponseJson) {
				const studentItem = studentsResponseJson[key];
				deptStudents.push(new Student(studentItem));
			}
		}

		if (hallsResponseJson && !hallsResponseJson.error) {
			for (const key in hallsResponseJson) {
				const hallItem = hallsResponseJson[key];
				deptHalls.push(new Hall(hallItem));
			}
		}

		// }

		dispatch({
			type: LOAD_DEPT_DATA,
			availableStaff: deptStaff,
			availableStudents: deptStudents,
			availableHalls: deptHalls,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const fetchCoursesData = () => {
	const urlArr = [
		{ url: endpoints.getData('courses'), init: {} },
		{ url: endpoints.getData('registeredCourses'), init: {} },
		{ url: endpoints.getData('pendingCourses'), init: {} },
		{ url: endpoints.getData('approvedCourses'), init: {} },
	];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const staffResponseJson = arrOfRespJsonS[0];
		const studentsResponseJson = arrOfRespJsonS[1];
		const hallsResponseJson = arrOfRespJsonS[2];
		const previousDataArrays = [
			state.dataReducer.availableCourses,
			state.courseAppReducer.registeredCourses,
			state.courseAppReducer.pendingCourses,
			state.courseAppReducer.approvedCourses,
		];

		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);
		let coursesData, registeredCoursesData, pendingCoursesData, approvedCoursesData;

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Course(item));
				}
			}
			switch (index) {
				case 0: {
					coursesData = initialArr;
					break;
				}
				case 1: {
					registeredCoursesData = initialArr;
					break;
				}
				case 2: {
					pendingCoursesData = initialArr;
					break;
				}
				case 3: {
					approvedCoursesData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_COURSES,
			availableCourses: coursesData,
			registeredCourses: registeredCoursesData,
			pendingCourses: pendingCoursesData,
			approvedCourses: approvedCoursesData,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const fetchEvents = () => {
	const urlArr = [{ url: endpoints.getData('deptEvents'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const previousDataArrays = [state.dataReducer.availableEvents];

		let deptEventsData;
		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Event(item));
				}
			}
			switch (index) {
				case 0: {
					deptEventsData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_DEPT_EVENTS,
			availableEvents: deptEventsData, // should be replaced with data fetched from server/db
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const fetchTimeTables = () => {
	const urlArr = [{ url: endpoints.getData('timeTables'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const previousDataArrays = [state.dataReducer.availableEvents];

		let timeTablesData;
		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Timetable(item));
				}
			}
			switch (index) {
				case 0: {
					timeTablesData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_TIMETABLES,
			availableTimetables: timeTablesData, // should be replaced with data fetched from server/db
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const fetchStaff = () => {
	const urlArr = [{ url: endpoints.getData('staff'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const previousDataArrays = [state.dataReducer.availableStaff];

		let deptStaffData;
		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Staff(item));
				}
			}
			switch (index) {
				case 0: {
					deptStaffData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_STAFF,
			availableStaff: deptStaffData,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};


export const fetchStudents = () => {
	const urlArr = [{ url: endpoints.getData('students'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const previousDataArrays = [state.dataReducer.availableStudents];

		let deptStudentsData;
		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Student(item));
				}
			}
			switch (index) {
				case 0: {
					deptStudentsData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_STUDENTS,
			availableStudents: deptStudentsData,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};


export const fetchHalls = () => {
	const urlArr = [{ url: endpoints.getData('halls'), init: {} }];
	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const previousDataArrays = [state.dataReducer.availableStaff];

		let deptHallsData;
		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		for (const [index, respJson] of arrOfRespJsonS.entries()) {
			const initialArr = respJson && !respJson.error ? [] : previousDataArrays[index];

			if (respJson && !respJson.error) {
				for (const key in respJson) {
					const item = respJson[key];
					initialArr.push(new Staff(item));
				}
			}
			switch (index) {
				case 0: {
					deptHallsData = initialArr;
					break;
				}
			}
		}

		dispatch({
			type: LOAD_HALLS,
			availableHalls: deptHallsData,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const fetchDeptData = () => {
	return {
		type: LOAD_DEPT_DATA, // should  all be replaced with data fetched from server/db
		availableStudents: students,
		availableStaff: staff,
		availableHalls: halls,
		availableCourses: courses,
		availableEvents: events,
		availableTimetables: timetables,
	};
};

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
