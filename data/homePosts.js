import HomePost from '../models/homePost';
import { rand } from '../constants/MyFunctions';
import HomePostComment, { HomePostLike } from '../models/homeComment';
import students from './students';

export const homePostResponses = [
	['Helpful', 'Wow!', 'Interesting', 'Amazing', 'WorldClass', 'Good info'],
	['Helpful', 'Wow!', 'Interesting', 'Amazing', 'Resourceful', 'Good info'],
	['Helpful', 'Wow!', 'Interesting', 'Amazing', 'Brilliant', 'Good info'],
	['Really helpful', 'Helpful', 'Interesting', "I'll attend", 'Brilliant', 'Good info'],
	['Noted', 'Helpful', 'Interesting', "I'll attend", 'Brilliant', 'Good info'],
	['Noted', 'Helpful', 'Interesting', "I'll attend", 'Brilliant', 'Good info'],
	['Really helpful', 'Helpful', 'Interesting', 'Amazing', 'Brilliant', 'Resourceful'],
];

const getContent = () => {
	let posts = [
		[
			'US on Visa to Nigerians',
			'Global',
			'US president halts issuing of visa to Nigerians. 100Level students should prepare for their Test on Tuesday',
		],
		[
			'To The Course Reps',
			'Departmental',
			'Course Reps should meet me in my office on Friday with their respective class lists. 100Level students should prepare for their Test on Tuesday',
		],
		[
			'Registration and Payments',
			'Departmental',
			'You are advised to make all your payments and registrations as soon as possible as exam starts soon',
		],
		['FG And ASUU', 'National', 'FG assures ASUU of the implementation'],
		[
			'Nigeria Celebrates Independence Day',
			'National',
			'Nigerians from different parts of the country celebrate national independence in Abuja',
		],
		['Climate Changes', 'Global', 'Current changes in climate affect temperature in Africa'],
		['FG Gives Mandate', 'National', 'Federal government gives their mandate on restoring peace in the country'],
		['Association Awards', 'Departmental', 'Date for Association Awards has been shifted to next weekend'],
		['Convention', 'Departmental', 'Annual convention will hold on the last Friday of this month'],
		['Faculty Staff Meeting', 'Faculty', 'No lectures tomorrow till 3pm as faculty staff meeting holds'],
		[
			'Free Tutorials',
			'Departmental',
			'Association executives to organize free tutorial classes for 200 level students on saturday',
		],
		[
			'Department Staff Meeting',
			'Departmental',
			'Department staff meeting to hold on Friday. No afternoon lectures will hold',
		],
	];

	const images = [
		require('../assets/images/news1.jpg'),
		require('../assets/images/news2.jpg'),
		require('../assets/images/news3.jpg'),
		require('../assets/images/news4.jpg'),
		require('../assets/images/news5.jpg'),
		require('../assets/images/news6.jpg'),
		require('../assets/images/news7.jpg'),
		require('../assets/images/news8.jpg'),
		require('../assets/images/news9.jpg'),
		require('../assets/images/news10.jpg'),
		require('../assets/images/news11.jpg'),
		null,
	];

	const authorImages = [
		require('../assets/images/femaleStaff.png'),
		require('../assets/images/femaleStudent.png'),
		require('../assets/images/femaleStudent.png'),
		require('../assets/images/maleStaff.png'),
		require('../assets/images/maleStaff.png'),
		require('../assets/images/maleStudent.png'),
		require('../assets/images/me.jpg'),
	];
	const authors = [
		{ fullName: 'Dr.A. B. Someone', designation: 'Senior Staff', office: 'HOD', image: rand(authorImages) },
		{
			fullName: 'Prof.C.D. Anyone',
			designation: 'Senior Staff',
			office: 'Staff Adviser',
			image: rand(authorImages),
		},
		{ fullName: 'Nicholas Ikechukwu', level: 400, office: 'President', image: rand(authorImages) },
		{ fullName: 'Bernard Nickyben', level: 400, post: 'Course Rep', image: rand(authorImages) },
		{ fullName: 'Nick Chukwuka', level: 200, post: ' Assistant Course Rep', image: rand(authorImages) },
		{ fullName: 'Anyone Somebody', level: 400, office: 'VicePresident', image: rand(authorImages) },
	];
	const types = ['Global', 'International', 'National', 'University', 'Faculty', 'Departmental', 'General']; //'Personal', 'Official'

	posts = posts.map((p, i) => {
		types.map((t, i) => {
			if (p[1] === types[i]) {
				p.push(homePostResponses[i]);
			}
		});
		return p;
	});

	const contentArr = [];
	const comments = [];
	const likes = [];
	for (let s = 1; s <= 22; s++) {
		const postArr = rand(posts);
		const author = rand(authors);
		const commentAuthorType = rand(['staff', 'admin', 'postAuthor']);

		const postId = Math.random().toString();
		contentArr.push(
			new HomePost({
				id: postId,
				title: postArr[0],
				type: postArr[1],
				date: new Date(new Date().getTime() - 1000 * 60 * (s * 15000)),
				source: postArr[1], //for now, should be local, twitter,facebook, website,link etc
				author: author,
				featuredAuthor: author,
				image: rand(images),
				text: postArr[2],
				responses: postArr[3],
			})
		);
		for (let r = 1; r <= parseInt(Math.random() * 15000); r++) {
			comments.push(
				new HomePostComment({
					id: postId + new Date().toLocaleDateString() + Math.random().toString(),
					ownPostId: postId,
					date: new Date(new Date().getTime() - 1000 * 60 * (r * 15)),
					authorType: commentAuthorType,
					author: rand(students),
					text: rand(postArr[3]),
				})
			);
		}

		for (let r = 1; r <= parseInt(Math.random() * 15000); r++) {
			likes.push(
				new HomePostLike({
					id: Math.random().toString() + new Date().toLocaleDateString(),
					date: new Date(new Date().getTime() - 1000 * 60 * (r * 15)),
					postId,
					liker: rand(students),
				})
			);
		}
	}
	return [contentArr, comments, likes];
};

const content = getContent();
const homePosts = content[0].reverse();
export const comments = content[1];
export const likes = content[2];

export default homePosts.sort((p1, p2) => p2.date.getTime() - p1.date.getTime());
