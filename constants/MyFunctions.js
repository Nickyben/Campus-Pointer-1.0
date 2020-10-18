export const rand = (arr) => {
  let index = +(Math.random() * (arr.length)).toFixed(0);
  const validIndex = (index < arr.length ? index : index === arr.length ? index - 1 : arr.length - 1);
  return arr[validIndex];
}

export const shuffle = (arr) => {
  let newArr = [];

  for (let k = 1; ; k++) {
    let newElem = rand(arr);
    if (!newArr.includes(newElem)) {
      newArr.push(newElem)
    }
    if (newArr.length === arr.length) {
      break;
    }
  }
  return newArr;
};

export const getSince = (when) => {
  let postTime = ((new Date().getTime() - when.getTime()) / (1000)).toFixed(0);
  let timeUnit = 's';

  if (postTime >= (60 * 60 * 24 * 7)) {
    postTime = (postTime / (60 * 60 * 24 * 7)).toFixed(0);
    timeUnit = 'w';
  } else if (postTime >= (60 * 60 * 24)) {
    postTime = (postTime / (60 * 60 * 24)).toFixed(0);
    timeUnit = 'd';
  } else if (postTime >= (60 * 60)) {
    postTime = (postTime / (60 * 60)).toFixed(0);
    timeUnit = 'h';
  } else if (postTime >= (60)) {
    postTime = (postTime / (60)).toFixed(0);
    timeUnit = 'm';
  }
  return ([postTime.toString() , timeUnit.toString(), postTime.toString() + timeUnit.toString()])

};



const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
