export default class Office {
	constructor({
		id,
		title,
		secondaryTitle,
		lastOfficer,
		isVacant,
		officeRoom,
		tenureLength,
		officerLaws,
		isStudentOffice,
		isStaffOffice,
	}) {
		this.id = id;
		this.title = title;
		this.secondaryTitle = secondaryTitle;
		this.lastOfficer = lastOfficer;
		this.isVacant = isVacant;
		this.officeRoom = officeRoom;
		this.tenureLength = tenureLength;
		this.officerLaws = officerLaws;
		this.isStudentOffice = isStudentOffice;
		this.isStaffOffice = isStaffOffice;
	}
}
