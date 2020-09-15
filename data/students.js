import Student from '../models/student';

const students = (department = null) => {
  //you can implement department later
  const students = [];
  for (let i = 1; i <= 6000; i++) {
    const j = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : i % 5 == 0 ? 1 : 0;
    students.push(
      new Student(
        Math.random().toString(),

        {
          firstName: [`Nicholas${i}`, 'Bernard', 'Tony', 'Max', `Chukwuka${i}`, `Nickyben${i}`, 'Chukwuka'][+(Math.random() * 6).toFixed(0)],
          lastName: [`Nick${i}`, 'Stark', 'Bernard', 'Shwarzmiller', 'Iyke', 'Nick', 'Stark'][+(Math.random() * 6).toFixed(0)]
        },

        i < 1001 ?
          `MOUAU/CME/${['16', '17', '18', '19', '20'][+(Math.random() * 4).toFixed(0)]}/` + (+(Math.random() * 100000).toFixed(0)).toString() :
          `MOUAU/${['CIE', 'EEE', 'MEE', 'ABE', 'CHE'][+(Math.random() * 4).toFixed(0)]}/${['16', '17', '18', '19', '20'][+(Math.random() * 4).toFixed(0)]}/` + (+(Math.random() * 100000).toFixed(0)).toString(),

        i % 10 === 0 ? 'female' : 'male',

        ['2016', '2017', '2018', '2019', '2020'][+(Math.random() * 4).toFixed(0)],

        ['100', '200', '300', '400', '500'][+(Math.random() * 4).toFixed(0)],

        i < 1001 ?//this should be an instance of Department
          'Computer Engineering' :
          ['Electrical', 'Mechanical', 'Civil', 'Chemical', 'Agric and Bio Resource'][+(Math.random() * 4).toFixed(0)] + ' Engineering',

        'CEET',

        i % 84 === 0 ? ['Course Rep', 'Assistant Course Rep'][+(Math.random() * 1.7).toFixed(0)] : null,

        i % 100 === 0 ? ['President', 'Vice President', 'SEC GEN', 'ASG', 'DOF', 'DOP', 'DOT', 'DOS', 'DOPR', 'Treasurer'][+(Math.random() * 9).toFixed(0)] : null,

        '081' + (+(Math.random() * 100000000).toFixed(0)).toString(),

        null,

        i % 10 === 0 ? require('../assets/images/femaleStudent.png') : require('../assets/images/maleStudent.png'),


      )
    );
  }
  return (
    students.sort(
      (s1, s2) => {
        return s2.office ? s1.office? -1 : 1: -1;
      }
    )
  )
};

export default students;