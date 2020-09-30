

export default class ElectoralApplicant {
  constructor(applId, studentData, office, coverQuote, manifesto, experiences) {
    this.studentData = studentData;
    this.aspiringOffice = office;
    this.coverQuote = coverQuote;
    this.manifesto = manifesto;
    this.experiences = experiences;
    this.applicantId = applId;
  }
}