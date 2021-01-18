class Student {
	constructor({
		id,
		firstName,
		lastName,
		regNumber,
		gender,
		entryYear,
		level,
		department,
		faculty,
		university,
		post,
		office,
		phoneNumber,
		mostRecentResult,
		image,
		honours,
		bioData,
	}) {
		//const levelIsValid = this.department.levels.some(deptLevel => (deptLevel === level));

		this.id = id;
		this.name = {
			firstName,
			lastName,
		};
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = firstName + ' ' + lastName;
		this.regNumber = regNumber;
		this.gender = gender;
		this.entryYear = entryYear;
		this.post = post; //like courseRep or assistant
		this.office = office; //like President etc

		this.level = level; //levelIsValid ? level : level + 100;
		this.honours = honours;
		this.department = department;
		this.faculty = faculty;
		this.university = university;
		this.phoneNumber = phoneNumber;
		this.image = image;

		this.jambNumber = bioData && bioData.jambNumber;
		this.entryMode = bioData && bioData.entryMode;
		this.email = bioData && bioData.email;
		this.middleName = bioData && bioData.middleName;
		this.DOB = bioData && bioData.dateOfBirth;
		this.maritalStatus = bioData && bioData.maritalStatus;
		this.residentAddress = bioData && bioData.residentAddress;
		this.stateOfOrigin = bioData && bioData.stateOfOrigin;
		this.LGA = bioData && bioData.LGA;
		this.sponsorName = bioData && bioData.sponsorName;
		this.sponsorEmail = bioData && bioData.sponsorEmailAddress;
		this.sponsorPhoneNumber = bioData && bioData.sponsorPhoneNumber;

		//this.courses = this.department.courses;//arr containing all courses for that department

		// this.result = mostRecentResult; //obj containing both assessment, exams scores and grades, prev,curr,cumulative
		// this.presentLevelCourses = courses.filter(course => {
		//   return (levelIsValid && (course.courseLevel === this.level));
		// });
		// this.previousLevelCourses = this.courses.filter(course => {
		//   return (course.courseLevel === (this.level - 100));
		// });
		// this.previousCourses = this.courses.filter(course => {
		//   return (course.courseLevel < (this.level));
		// });
		// this.presentCourses = this.result.courses.filter(resultCourse => {
		//   return (resultCourse.grade === 'F');
		// }).concat(this.presentLevelCourses);
	}
}

export default Student;