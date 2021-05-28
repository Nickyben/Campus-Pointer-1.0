import { executiveOffices, tempRegCandidates } from '../../data/executiveOffices'; //should rather be from server
import { LOAD_ELECTION_DATA, VOTE_OFFICE } from '../actions/electionPortalActions';

const initialState = {
	//get some data from the logged in user
	//votes must be server-based
	availableOffices: executiveOffices, //you can temp. create this here.
	availableVoters: [], //id,regNum, office voted keys in objs
	validVoters: [],
	registeredApplicants: tempRegCandidates, //...id, name, image, office, cover-quote, manifesto,in objs
	validCandidates: [],
	officeVotes: [], //for all voters ===server based
	votedVoters: [], //for all voters ===server based

	userOfficesVoted: [],
	totalVotes: 0,
	isElectionDeadline: false, //should be from server or db set time
	isApplicantDeadline: true, //should be from server or db set time
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ELECTION_DATA: {
			const officeVotesTemplate = [...state.availableOffices].map((office) => {
				return {
					office: office[0],
					candidates: [...state.registeredApplicants].map((candidate) => {
						if (candidate.aspiringOffice[0] === office[0]) {
							return {
								candidate: candidate,
								voters: [],
								voteCount: 0,
							};
						}
					}),
				};
			});
			return {
				...state,
				validCandidates: state.registeredApplicants.filter(
					(ap) => !ap.studentData.office && !ap.studentData.post
				),
				officeVotes: officeVotesTemplate,
			};
		}
		case VOTE_OFFICE: {
			const updatedOfficeVotes = [...state.officeVotes].map((o) => {
				if (o.office === action.office) {
					return {
						office: o.office,
						candidates: o.candidates.map((c) => {
							if (c && c.candidate === action.candidate) {
								//console.log( )

								return {
									candidate: c.candidate,
									voters: !c.voters.some((v) => v.regNumber === action.voter.regNumber)
										? c.voters.concat(action.voter)
										: c.voters,
									voteCount: !c.voters.some((v) => v.regNumber === action.voter.regNumber)
										? c.voteCount + 1
										: c.voteCount,
								};
							} else {
								return c;
							}
						}),
					};
				} else {
					return o;
				}
			});
			return {
				...state,
				officeVotes: updatedOfficeVotes,
				userOfficesVoted: state.userOfficesVoted.concat({
					[action.office]: action.candidate.studentData.fullName,
				}),
			};
		}
	}
	return state;
};

// const officeVotesTemplate = [];
// for (let office of state.availableOffices) {
//   officeVotesTemplate.push(
//     {
//       office: office[0],
//       candidates: [],
//     }
//   );
//   for (let candidate of state.registeredApplicants.filter(c => c.aspiringOffice[0] === office[0])) {
//     officeVotesTemplate.find(o => o.office === office[0]).candidates.push(
//       {
//         candidate: candidate,
//         voters: [],
//         voteCount: 0,
//       }
//     );
//   }
// }

// const updatedOfficeVotes = [];
// for (let o of [...state.officeVotes]) {
//   for (let c of o.candidates) {
//     if(c.candidate === action.candidate){

//     }

//     officeVotesTemplate.find(o => o.office === office[0]).candidates.push(
//       {
//         candidate: candidate,
//         voters: []
//       }
//     );
//   }
// }
