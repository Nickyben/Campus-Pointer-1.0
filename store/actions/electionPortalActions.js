//import contestants from '../../data/contestants';
//import executiveOffices from '../../data/executiveOffices';

import { thunkFetch } from '../../constants/backendFunctions';
import ElectoralApplicant from '../../models/electoralApplicant';
import Office from '../../models/office';
import VoteItem from '../../models/voteItem';
import { endpoints } from '../../src/firebase';

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

export const fetchElectionData = ({ userId, idToken }) => {
	const urlArr = [
		{ url: endpoints.getData('availableOffices', idToken), init: {} },
		{ url: endpoints.getData('validCandidates', idToken), init: {} },
		{ url: endpoints.getData(`userOfficesVoted/${userId}`, idToken), init: {} },
	];

	const consumerFunc = (arrOfRespJsonS, { idToken, userId, dispatch, state }) => {
		const availableOfficesResponseJson = arrOfRespJsonS[0];
		const validCandidatesResponseJson = arrOfRespJsonS[1];
		const userOfficesVotedResponseJson = arrOfRespJsonS[2];

		const allAreOkay = arrOfRespJsonS.every((jsonObj) => jsonObj && !jsonObj.error);

		// for (const respJson of arrOfRespJsonS) {
		const availableOffices =
			availableOfficesResponseJson && !availableOfficesResponseJson.error
				? []
				: state.electionPortalReducer.availableOffices;

		const validCandidates =
			validCandidatesResponseJson && !validCandidatesResponseJson.error
				? []
				: state.electionPortalReducer.validCandidates;

		const userOfficesVoted =
			userOfficesVotedResponseJson && !userOfficesVotedResponseJson.error
				? []
				: state.electionPortalReducer.userOfficesVoted;

		if (availableOfficesResponseJson && !availableOfficesResponseJson.error) {
			for (const key in availableOfficesResponseJson) {
				const availableOfficesItem = availableOfficesResponseJson[key];
				availableOffices.push(new Office(availableOfficesItem));
			}
		}

		if (validCandidatesResponseJson && !validCandidatesResponseJson.error) {
			for (const key in validCandidatesResponseJson) {
				const validCandidatesItem = validCandidatesResponseJson[key];
				validCandidates.push(new ElectoralApplicant(validCandidatesItem));
			}
		}

		if (userOfficesVotedResponseJson && !userOfficesVotedResponseJson.error) {
			for (const key in userOfficesVotedResponseJson) {
				const userOfficesVotedItem = userOfficesVotedResponseJson[key];
				userOfficesVoted.push(new VoteItem(userOfficesVotedItem));
			}
		}

		// }

		dispatch({
			type: LOAD_ELECTION_DATA,
			availableOffices: availableOffices,
			validCandidates: validCandidates,
			userOfficesVoted: userOfficesVoted,
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
