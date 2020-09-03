import { Platform } from 'react-native';

let theme = 'normal';
let Colors, primary,switchPrimary, switchWhite, accent, switchAccent, white, black, grey0, grey1, grey2,
  grey3, grey4, grey5, grey6, grey_0, grey_1, grey_2,
  grey_3, grey_4, grey_5, grey_6, greyOutline, searchBg,
  success, error, warning, divider;

primary = '#00bbcc'; 
accent = '#994400';
white = '#fff';
black = '#000';
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
success = '#ccffdd'
error = '#ffddcc';
warning = '#ffddaa'
divider = '#ddd';

if (Platform.OS == 'android') {
  switchPrimary = primary;
  switchAccent = accent;
  switchWhite = white;

} else {
  switchPrimary = white;
  switchAccent = white;
  switchWhite = primary;
}

const ColorsNormal = {
  primary, accent, switchWhite,
  switchPrimary, switchAccent,
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
  primary, accent, switchWhite,
  switchPrimary, switchAccent,
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

Colors = theme === 'normal'? ColorsNormal: ColorsDark;

export default Colors;