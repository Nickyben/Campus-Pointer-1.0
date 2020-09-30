import Hall from '../models/hall';

const hallArr = [
  ['Lab 3f7', '750', require('../assets/images/hall2.jpg'), 'Computer Engineering'],
  ['Lab 4r5', '550', require('../assets/images/hall.jpg'), 'CEET'],
  ['Hall 9e5', '250', require('../assets/images/hall3.jpg'), 'CEET'],
  ['Lab 7y3', '150', require('../assets/images/hall.jpg'), 'Computer Engineering'],
  ['Hall 2t3', '350', require('../assets/images/hall2.jpg'), 'CEET'],
  ['Hall 3f2', '450', require('../assets/images/hall2.jpg'), 'CEET'],
  ['Lab 9p8', '265', require('../assets/images/hall2.jpg'), 'CEET'],
  ['Hall 4g3', '435', require('../assets/images/hall3.jpg'), 'Computer Engineering'],
  ['Lab 9p8', '225', require('../assets/images/hall2.jpg'), 'CEET'],
  ['Hall 4g3', '420', require('../assets/images/hall3.jpg'), 'Computer Engineering'],
];
const contentArr = [];
for (let s = 1; s <= 25; s++) {
  const hall = hallArr[+(Math.random() * (hallArr.length-2)).toFixed(0)];
  contentArr.push(
    new Hall(
      Math.random().toString(),
      hall[0],
      hall[3],
      hall[2],
      hall[1]
    )
  );
}

const halls = contentArr;

export default halls;

