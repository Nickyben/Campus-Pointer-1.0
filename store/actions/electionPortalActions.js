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
	return {
		type: LOAD_ELECTION_DATA,
	};
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
