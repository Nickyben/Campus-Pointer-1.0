import { Platform } from 'react-native';


let theme = 'normal';
let Colors, primary, primary2, switchPrimary, switchPrimary2, switchWhite, switchWhiteAccent, accent, accent2, switchAccent, white, black, grey0, grey1, grey2,
  grey3, grey4, grey5, grey6, grey_0, grey_1, grey_2,
  grey_3, grey_4, grey_5, grey_6, greyOutline, searchBg,
  success, error, warning, divider;

const dark = (lightColor) => {
  let a = lightColor.split('');
  a.shift();
  a = a.map((c, i) => {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let index = chars.indexOf(c);
    let lIndex = chars.length - 1;

    return chars[lIndex - index]

  });

  a.unshift('#');
  return a.join('')
};




export const lightTheme = {
  primary: ['#00a7e7', '#e75224', '#ee2499', '#04df90', '#ee0942', '#9004df'],
  accent: ['#7097d7', '#d74294', '#de9489', '#74cf80', '#de7932', '#8074cf'],
  accent2: '#ef7f0a',

  mainViews: '#ffffff',
  background: '#f3f6f7',
  titleTexts: '#333333',
  normalTexts: '#444444',
  lowEmphasisText: '#555555',
  veryLowEmphasisText: '#777777',

  //optionColors: ['#f58915', '#55a5ff', '#aa88ee', '#ff55dd', '#9eff46', '#ef2464', '#f5a492', '#ff11b0', '#44ffb0'],
};


export const darkTheme = {
  primary: lightTheme.primary,
  accent: lightTheme.accent,
  accent2: lightTheme.accent2,

  mainViews: '#1f2f3f',
  background: '#131617',
  titleTexts: dark(lightTheme.titleTexts),
  normalTexts: dark(lightTheme.normalTexts),
  lowEmphasisText: dark(lightTheme.lowEmphasisText),
  veryLowEmphasisText: dark(lightTheme.veryLowEmphasisText),

  //optionColors: lightTheme.optionColors,
};




primary = lightTheme.primary[2]; //0,2,3,5
accent = lightTheme.accent[2];//0,2,3,5
accent2 = '#ef7f0a';
white = '#ffffff';
black = '#000000';
grey0 = '#888899';
grey1 = '#9999aa';
grey2 = '#aaaabb';
grey3 = '#bbbbcc';
grey4 = '#ccccdd';
grey5 = '#ddddee';
grey6 = '#eeeeff';
grey_0 = '#777788';
grey_1 = '#666677';
grey_2 = '#555566';
grey_3 = '#444455';
grey_4 = '#333344';
grey_5 = '#222233';
grey_6 = '#111122';
greyOutline = '#ccc';
searchBg = '#eee';
success = '#eeffee'
error = '#ffeeee';
warning = '#ffddaa'
divider = '#ddd';

if (Platform.OS == 'ios') {
  switchPrimary = primary;
  switchPrimary2 = primary2;
  switchAccent = accent;
  switchWhite = white;
  switchWhiteAccent = white;

} else {
  switchPrimary = white;
  switchPrimary2 = white;
  switchAccent = white;
  switchWhite = primary;
  switchWhiteAccent = accent;
}

const ColorsNormal = {
  primary, primary2, accent, accent2, switchWhite,
  switchPrimary, switchAccent, switchWhiteAccent,
  white, black,
  grey0, grey1,
  grey2, grey3,
  grey4, grey5,
  grey6, grey_0,
  grey_1, grey_2,
  grey_3, grey_4,
  grey_5, grey_6,
  greyOutline, searchBg,
  success, error,
  warning, divider,
  android: {

  },
  ios: {

  }
};

const ColorsDark = {
  primary, primary2, accent, accent2, switchWhite,
  switchPrimary, switchAccent, switchWhiteAccent,
  white, black,
  grey0, grey1,
  grey2, grey3,
  grey4, grey5,
  grey6, grey_0,
  grey_1, grey_2,
  grey_3, grey_4,
  grey_5, grey_6,
  greyOutline, searchBg,
  success, error,
  warning, divider,
  android: {

  },
  ios: {

  }
};

Colors = theme === 'normal' ? ColorsNormal : ColorsDark;

export default Colors;









