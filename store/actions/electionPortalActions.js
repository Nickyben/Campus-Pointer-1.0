//import contestants from '../../data/contestants';
//import executiveOffices from '../../data/executiveOffices';

export const VOTE_OFFICE = 'VOTE_OFFICE';
export const SUBMIT_VOTES = 'SUBMIT_VOTES';
export const LOAD_ELECTION_DATA = 'LOAD_ELECTION_DATA';
export const SUBMIT_APPLICATION = 'SUBMIT_APPLICATION';
export const REGISTER_APPLICANT = 'REGISTER_APPLICANT';
export const LOAD_ELECTION_RESULT = 'LOAD_ELECTION_RESULT';

export const electionPortalActionTypes = [
	VOTE_OFFICE,
	SUBMIT_VOTES,
	LOAD_ELECTION_DATA,
	SUBMIT_APPLICATION,
	REGISTER_APPLICANT,
	LOAD_ELECTION_RESULT, 
];


export const fetchElectionData = () => {
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
			type: LOAD_ELECTION_DATA,
			availableStaff: deptStaff,
			availableStudents: deptStudents,
			availableHalls: deptHalls,
		});
	};
	return thunkFetch(urlArr, consumerFunc);
};

export const registerContestant = () => {};

export const voteOffice = (office, candidate, voter) => {
	//console.log({office, level: candidate.studentData.level, voter:voter.fullName})
	return {
		type: VOTE_OFFICE,
		office,
		candidate,
		voter,
	};
};

export const submitVotes = () => {};

export const submitApplication = () => {};

export const fetchElectionResult = () => {};
