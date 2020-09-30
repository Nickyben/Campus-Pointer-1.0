import Staff from '../models/staff';

const content = (department = null) => {
  //you can implement department later
  const titles = ['Best Department Staff', 'Most Social Staff', 'Most Good-Looking Staff', 'Most Humorous Staff',
    'Most Humble Staff', 'Best-Dressed Staff', 'Most Audible Staff', 'Most Cooperative Staff'];
  const years = ['2016/2017', '2017/2018', '2018/2019', '2019/2020', '2020/2021'];
  const staff = [];

  for (let i = 1; i <= 200; i++) {
    const j = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : i % 5 == 0 ? 1 : 0;
    const honours = [
      {
        title: titles[+(Math.random() * (titles.length - 2)).toFixed(0)],
        category: 'Staff Awards',
        year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
      },

    ]
    i % 5 === 0 && honours.push(
      {
        title: titles[+(Math.random() * (titles.length - 2)).toFixed(0)],
        year: years[+(Math.random() * (years.length - 2)).toFixed(0)],
        category: 'Staff Awards',
      }
    );
    staff.push(
      new Staff(
        Math.random().toString(),
        i % 8 === 0 ? { firstName: `Nicholas${i}`, lastName: 'James' } :
          i % 7 === 0 ? { firstName: 'Max', lastName: 'Shwarzmiller' } :
            {
              firstName: ['Bernard', 'Tony', `Chukwuka${i}`, `Nickyben${i}`, 'Jerry'][j],
              lastName: [`Nick${i}`, 'Stark', 'Kelvin', 'Iyke', 'Larry'][j]
            },
        i % 2 === 0 ?
          'MOUAU/STAFF/ACAD/CME/' + (+(Math.random() * 100000).toFixed(0)).toString() :
          'MOUAU/STAFF/NON-ACAD/CME/' + (+(Math.random() * 100000).toFixed(0)).toString(),
        i % 4 === 0 ? 'female' : 'male',
        i % 5 === 0 ? '2010' : '2015',
        i < 45 ? 'Computer Engineering' : 'CEET Engineering', //this should be an instance of Department
        'CEET',
        i % 5 === 0 ? 'Senior Staff' : i % 3 === 0 ? 'Junior Staff' : 'Assisting Staff',
        ['Professor','Doctor of Philosophy', 'Masters Holder','PGD Holder','Graduate', 'HND Holder'][+(Math.random() * 4).toFixed(0)],
        i % 4 === 0 ? i % 32 === 0 ? 'HOD' : i % 3 === 0 ? 'Staff Adviser' : 'Course Adviser' : null,
        '081' + (+(Math.random() * 100000000).toFixed(0)).toString(),
        [],
        i % 5 === 0 ? (i % 10 === 0 ? '' : i % 3 === 0 ? '' :
          (i % 15 === 0 ? '100 Level' : i % 20 === 0 ? '200 Level' : i % 25 === 0 ? '300 Level' : i % 30 === 0 ? '400 Level' : '500 Level')) : null,

        i % 4 === 0 ? require('../assets/images/femaleStaff1.png') : require('../assets/images/maleStaff.png'),

        i % 3 === 0 ? true : false,

        i% 5===0? honours: null

      )
    );
  }
  return (
    staff.sort(
      (s1, s2) => {
        return (s2.designation < s1.designation && s1.designation - s2.designation) || (s2.designation > s1.designation && s2.designation - s1.designation); //ie lexicographically/alphabetically/ascii eg Senior staff > junior staff
      }
    )
  )
};


const staff = content();

export default staff;

