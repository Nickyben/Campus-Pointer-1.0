import Student from '../models/student';
import { rand } from '../constants/MyFunctions';

const content = (department = null) => {
	//you can implement department later
	const titles = [
		['Most Handsome Student', 'Social Awards'],
		['Mr. Association', 'Social Awards'],
		['Mrs. Association', 'Social Awards'],
		['Most Humorous Student', 'Social Awards'],
		['Most Humble Student', 'General Awards'],
		['Most Cooperative Student', 'General Awards'],
		['Neatest Student', 'General Awards'],
		['Best Graduating Student', 'Academic Awards'],
		['Highest CGPA Pointer 100Level', 'Academic Awards'],
		['Highest CGPA Pointer 200Level', 'Academic Awards'],
		['Highest CGPA Pointer 300Level', 'Academic Awards'],
		['Best Dressed Student', 'General Awards'],
		['Most Beautiful Student', 'Social Awards'],
		['Mr. Book', 'Social Awards'],
		['Mrs.Book', 'Social Awards'],
		['Football Gold Medalist', 'Sports Awards'],
		['Athletic Gold Medalist', 'Sports Awards'],
		['Basketball Gold Medalist', 'Sports Awards'],
		['Best Exhibition Project', 'Project Awards'],
		['Best Final Year Project', 'Project Awards'],
		['Best Semester Project', 'Project Awards'],
		['Best Session Project', 'Project Awards'],
	];
	const years = ['2016/2017', '2017/2018', '2018/2019', '2019/2020', '2020/2021'];
	const firstNames = [
		`Nicholas`,
		'Bernard',
		'Nick',
		'Nicky',
		'Tony',
		'Max',
		`Chukwuka`,
		`Nickyben`,
		'Chukwuka',
		'Frank',
		'Victory',
		'James',
		'Jerry',
		'Tressy',
		'Delight',
		'Angela',
		'Augusta',
		'GodLead',
		'Anita',
		'Stephen',
		'MacFord',
		'MacFurry',
		'Stephenie',
		'Nora',
		'Clara',
		'Nelly',
		'Victoria',
		'Amanda',
		'Kelvin',
		'Mary',
		'Silver',
		'Anabelle',
		'Bella',
		'MacStephen',
		'Kelly',
		'Humphery',
		'Melanin',
		'Angel',
		'Terry',
		'John',
		'Mack',
		'Clevelyn',
		'Jones',
	];
	const lastNames = [
		`Ikechukwu`,
		'Iyke',
		'Cyriacus',
		'Cyril',
		'Stark',
		'Bernard',
		'Shwarzmiller',
		'Iyke',
		'Nick',
		'Stark',
		'Smith',
		'Johnson',
		'Anthony',
		'Clevery',
		'Smart',
		'Harry',
		'Wilson',
		'Will',
		'Brad',
		'Roberts',
		'Griphen',
		'Grinder',
		'Best',
		'George',
		'Marcus',
		'Martial',
		'Greenwood',
	];

	const students = [];

	for (let i = 1; i <= 6000; i++) {
		const j = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : i % 5 == 0 ? 1 : 0;
		const title = titles[+(Math.random() * (titles.length - 2)).toFixed(0)];
		const title2 = titles[+(Math.random() * (titles.length - 2)).toFixed(0)];
		const deptCodes = {
			Electrical: 'EEE',
			Mechanical: 'MEE',
			Civil: 'CIE',
			Chemical: 'CHE',
			'Agric and Bio Resource': 'ABE',
		};
		const dept = rand(['Electrical', 'Mechanical', 'Civil', 'Chemical', 'Agric and Bio Resource']);
		const universities = ['MOUAU'];
		const deptCode = deptCodes[dept];
		const honours = [
			{
				title: title[0],
				category: title[1],
				year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
			},
		];
		i % 3 === 0 &&
			honours.push({
				title: title2[0],
				category: title2[1],
				year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
			});
		// {
		//   firstName: [`Nicholas${i}`, 'Bernard', 'Tony', 'Max', `Chukwuka${i}`, `Nickyben${i}`, 'Chukwuka'][+(Math.random() * 6).toFixed(0)],
		//     lastName: [`Nick${i}`, 'Stark', 'Bernard', 'Shwarzmiller', 'Iyke', 'Nick', 'Stark'][+(Math.random() * 6).toFixed(0)]
		// }
		if (i === 1) {
			students.push(
				new Student({
					id: 'studentUserId',

					firstName: 'Nicholas',

					lastName: 'Ikechukwu',

					regNumber: 'MOUAU/DEPT/YR/NUMBER',

					gender: 'male',

					adminYear: '2016',

					level: '400',

					department: 'Computer Engineering',

					faculty: 'CEET',

					university: universities[0],

					post: null,

					office: 'President',

					phoneNumber: '08100000000',

					mostRecentResult: null,

					image: require('../assets/images/Me2.jpg'),

					honours: honours,

					bioData: {},
				})
			);
		}

		students.push(
			new Student({
				id: Math.random().toString(),

				firstName: firstNames[+(Math.random() * (firstNames.length - 2)).toFixed(0)],

				lastName: lastNames[+(Math.random() * (lastNames.length - 2)).toFixed(0)],

				regNumber:
					i < 1001
						? `MOUAU/CME/${['16', '17', '18', '19', '20'][+(Math.random() * 4).toFixed(0)]}/` +
						  (+(Math.random() * 100000).toFixed(0)).toString()
						: `MOUAU/${deptCode}/${['16', '17', '18', '19', '20'][+(Math.random() * 4).toFixed(0)]}/` +
						  (+(Math.random() * 100000).toFixed(0)).toString(),

				gender: i % 10 === 0 ? 'female' : 'male',

				entryYear: ['2016', '2017', '2018', '2019', '2020'][+(Math.random() * 4).toFixed(0)],

				level: ['100', '200', '300', '400', '500'][+(Math.random() * 4).toFixed(0)],

				department:
					i < 1001 //this should be an instance of Department
						? 'Computer Engineering'
						: dept + ' Engineering',

				faculty: 'CEET',
				university: universities[0],

				post: i % 84 === 0 ? ['Assistant Course Rep', 'Course Rep'][+(Math.random() * 1.7).toFixed(0)] : null,

				office:
					i % 96 === 0
						? [
								'President',
								'Vice President',
								'SEC GEN',
								'A SEC GEN',
								'DOF',
								'DOP',
								'DOT',
								'DOS',
								'DOPR',
								'Treasurer',
						  ][+(Math.random() * 9).toFixed(0)]
						: null,

				phoneNumber: '081' + (+(Math.random() * 100000000).toFixed(0)).toString(),

				mostRecentResult: null,

				image:
					i % 10 === 0
						? require('../assets/images/femaleStudent.png')
						: require('../assets/images/maleStudent.png'),

				honours: i % 55 === 0 ? honours : null,

				bioData: {},
			})
		);
	}
	return students
		.sort((s1, s2) => {
			return (s2.post < s1.post && s1.post - s2.post) || (s2.post > s1.post && s2.post - s1.post);
		})
		.sort((s1, s2) => {
			return (s2.office < s1.post && s1.post - s2.post) || (s2.office > s1.post && s2.post - s1.post);
		})
		.sort((s1, s2) => {
			return (s2.level < s1.level && s1.level - s2.level) || (s2.level > s1.level && s2.level - s1.level);
		})
		.sort((s1, s2) => {
			return s2.office === 'President'
				? s2.office === 'President'
				: (s2.level < s1.level && s1.level - s2.level) || (s2.level > s1.level && s2.level - s1.level);
		});
};

const students = content();

export default students;
