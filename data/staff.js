import Staff from '../models/staff';

const content = (department = null) => {
	//you can implement department later
	const titles = [
		'Best Department Staff',
		'Most Social Staff',
		'Most Good-Looking Staff',
		'Most Humorous Staff',
		'Most Humble Staff',
		'Best-Dressed Staff',
		'Most Audible Staff',
		'Most Cooperative Staff',
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

	const staff = [];

	for (let i = 1; i <= 200; i++) {
		const j = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : i % 5 == 0 ? 1 : 0;
		const universities = ['MOUAU'];
		const honours = [
			{
				title: titles[+(Math.random() * (titles.length - 2)).toFixed(0)],
				category: 'Staff Awards',
				year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
			},
		];
		i % 5 === 0 &&
			honours.push({
				title: titles[+(Math.random() * (titles.length - 2)).toFixed(0)],
				year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
				category: 'Staff Awards',
			});
		staff.push(
			new Staff({
				id: Math.random().toString(),

				firstName: firstNames[+(Math.random() * (firstNames.length - 2)).toFixed(0)],

				lastName: lastNames[+(Math.random() * (lastNames.length - 2)).toFixed(0)],

				staffNumber:
					i % 2 === 0
						? 'MOUAU/STAFF/ACAD/CME/' + (+(Math.random() * 100000).toFixed(0)).toString()
						: 'MOUAU/STAFF/NON-ACAD/CME/' + (+(Math.random() * 100000).toFixed(0)).toString(),
				gender: i % 4 === 0 ? 'female' : 'male',
				entryYear: i % 5 === 0 ? '2010' : '2015',
				department: i < 60 ? 'Computer Engineering' : 'CEET Engineering', //this should be an instance of Department
				faculty: 'CEET',
				university: universities[0],
				designation: i % 5 === 0 ? 'Senior Staff' : i % 3 === 0 ? 'Junior Staff' : 'Assisting Staff',
				rank: ['Professor', 'Doctor of Philosophy', 'Masters Holder', 'PGD Holder', 'Graduate', 'HND Holder'][
					+(Math.random() * 4).toFixed(0)
				],
				office: i % 4 === 0 ? (i % 32 === 0 ? 'HOD' : i % 3 === 0 ? 'Staff Adviser' : 'Course Adviser') : null,
				phoneNumber: '081' + (+(Math.random() * 100000000).toFixed(0)).toString(),
				courses: [],
				allocatedLevel:
					i % 5 === 0
						? i % 10 === 0
							? ''
							: i % 3 === 0
							? ''
							: i % 15 === 0
							? '100 Level'
							: i % 20 === 0
							? '200 Level'
							: i % 25 === 0
							? '300 Level'
							: i % 30 === 0
							? '400 Level'
							: '500 Level'
						: null,

				image:
					i % 4 === 0
						? require('../assets/images/femaleStaff1.png')
						: require('../assets/images/maleStaff.png'),

				isAcademic: i % 3 === 0 ? true : false,

				honours: i % 5 === 0 ? honours : null,
			})
		);
	}
	return staff.sort((s1, s2) => {
		return (
			(s2.designation < s1.designation && s1.designation - s2.designation) ||
			(s2.designation > s1.designation && s2.designation - s1.designation)
		); //ie lexicographically/alphabetically/ascii eg Senior staff > junior staff
	});
};

const staff = content();

export default staff;
