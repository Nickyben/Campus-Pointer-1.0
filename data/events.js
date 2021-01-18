import Event from '../models/event';
import { rand } from '../constants/MyFunctions';

const eventArr = [
	['Induction Ceremony', 'Departmental'],
	['Freshers Orientation', 'Seminar'],
	["Students' Awards Ceremony", 'Departmental'],
	['Staff Awards Ceremony', 'Departmental'],
	['Social Awards Ceremony', 'Socials'],
	['Sports Awards Ceremony', 'Sports'],
	['Academic Awards Ceremony', 'Academics'],
	['Matriculation Ceremony', 'General'],
	['Convocation Ceremony', 'General'],
	['Inaugural Lectures', 'Seminar'],
	['Association Convention', 'Departmental'],
	['Outing Day', 'Departmental'],
	['Jogging Day', 'Sports'],
	['General Elections', 'General'],
	['Association Elections', 'Departmental'],
	['Association Week', 'Socials, Sports'],
	['Exam Ethics Seminar', 'Ethics'],
	['Association Prays Week', 'Spiritual'],
	['Projects Week', 'Projects'],
	['Uniforms Week', 'Departmental'],
	['Exhibitions Day', 'Faculty'],
	['Burn-Fire Day', 'Departmental'],
	['Weekend Tutorials', 'Departmental'],
	['Department Seminar', 'Seminar'],
	['Faculty Seminar', 'Seminar'],
];
const venue = ['Multipurpose Hall', 'School Auditorium', 'School Stadium', 'Department Main Hall', 'Faculty Main Hall'];
const semester = ['First Semester', 'Second Semester'];
const session = ['2020/2021', '2019/2020'];
const date = new Date();
const universities = ['MOUAU'];

let events = [];
for (let i = 1; i <= 30; i++) {
	const eventItem = eventArr[+(Math.random() * (eventArr.length - 2)).toFixed(0)];
	const dateArg = new Date(
		date.getFullYear(),
		(+Math.random() * 11).toFixed(0),
		(+Math.random() * 28 + 1).toFixed(0),
		(+Math.random() * 8 + 8).toFixed(0)
	);
	const isPM = +dateArg.getHours() > 12;
	const isNoon = +dateArg.getHours() === 12;
	events.push(
		new Event({
			id: Math.random().toString(),
			title: eventItem[0],
			type: eventItem[1],
			date: dateArg.toDateString(),
			time:
				(isPM && !isNoon ? +dateArg.getHours() - 12 : +dateArg.getHours()).toString() +
				':' +
				['00', '30', '45'][(+Math.random() * 2).toFixed(0)] +
				(isPM || isNoon ? 'pm' : 'am'),
			venue: venue[(+Math.random() * 3).toFixed(0)],
			image: require('../assets/images/nacomesLogo.png'),
			semester: semester[(+Math.random() * 1).toFixed(0)],
			session: session[(+Math.random() * 1).toFixed(0)],
			association: rand(['SUG', 'NACOMES', 'NACOMES']),
			department: 'Computer Engineering',
			faculty: 'CEET',
			university: universities[0],
		})
	);
}

events = events.sort((a, b) => new Date(a.date) - new Date(b.date));
export default events;
