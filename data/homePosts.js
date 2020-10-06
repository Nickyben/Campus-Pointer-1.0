import HomePost from '../models/homePost';

const content = () => {
  const posts = [
    ['US on Visa to Nigerians', 'Global', 'US president halts issuing of visa to Nigerians. 100Level students should prepare for their Test on Tuesday'],
    ['To The Course Reps', 'Departmental',
      'Course Reps should meet me in my office on Friday with their respective class lists. 100Level students should prepare for their Test on Tuesday'],
    ['Registration and Payments', 'Departmental', 'You are advised to make all your payments and registrations as soon as possible as exam starts soon'
    ],
    ['FG And ASUU', 'National', 'FG assures ASUU of the implementation'],
    ['Nigeria Celebrates Independence Day', 'National', 'Nigerians from different parts of the country celebrate national independence in Abuja'],
    ['Climate Changes', 'Global', 'Current changes in climate affect temperature in Africa'],
    ['FG Gives Mandate', 'National', 'Federal government gives their mandate on restoring peace in the country'],
    ['Association Awards', 'Departmental', 'Date for Association Awards has been shifted to next weekend'],
    ['Convention', 'Departmental', 'Annual convention will hold on the last Friday of this month'],
    ['Faculty Staff Meeting', 'Faculty', 'No lectures tomorrow till 3pm as faculty staff meeting holds'],
    ['Free Tutorials', 'Departmental', 'Association executives to organize free tutorial classes for 200 level students on saturday'],
    ['Department Staff Meeting', 'Departmental', 'Department staff meeting to hold on Friday. No afternoon lectures will hold']
  ];
  const authors = [
    { name: 'Dr.A. B. Someone', designation: 'Senior Staff', office: 'HOD' },
    { name: 'Prof.C.D. Anyone', designation: 'Senior Staff', office: 'Staff Adviser' },
    { name: 'Nicholas Ikechukwu', level: 400, office: 'President' },
    { name: 'Bernard Nickyben', level: 400, post: 'Course Rep' },
    { name: 'Nick Chukwuka', level: 200, post: ' Assistant Course Rep' },
    { name: 'Anyone Somebody', level: 400, office: 'VicePresident' },



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
    null, null, null
  ];

  const contentArr = [];
  for (let s = 1; s <= 22; s++) {
    const postArr = posts[+((Math.random() * (posts.length - 2)).toFixed(0))];
    const authorsArr = authors[+((Math.random() * (authors.length - 2)).toFixed(0))];
    contentArr.push(
      new HomePost(
        Math.random().toString(),
        postArr[0],
        postArr[1],
        new Date().toLocaleDateString(),
        postArr[1],
        authorsArr,
        authorsArr,
        {
          image: images[+((Math.random() * (images.length - 2)).toFixed(0))],
          text: postArr[2],
        }
      )
    );
  }
  return contentArr;
}

const homePosts = content();

export default homePosts;












