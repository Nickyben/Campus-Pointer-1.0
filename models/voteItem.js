export default class VoteItem {
	constructor({ id, voteOffice, voterUserId, voterUserEmail, voteDate, electionType, electionTitle, voteChoiceCandidateId }) {
		this.id = id;
		this.voteOffice = voteOffice;
		this.voteChoiceCandidateId = voteChoiceCandidateId;
		this.voterUserId = voterUserId; 
		this.voterUserEmail = voterUserEmail; 
		this.voteDate = voteDate;
		this.electionType = electionType;
		this.electionTitle= electionTitle;
	}
}
