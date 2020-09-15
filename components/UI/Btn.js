import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  Platform
} from 'react-native';

import Colors from '../../constants/Colors';


const Btn = ({ type, onPress, style, children, bgColor, textColor, borderColor, }) => {

  let BtnComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    BtnComponent = TouchableNativeFeedback;
  }

  let btnColor = Colors.primary
  switch (type) {
    case 'accent':
      btnColor = Colors.accent;
      break;
    case 'accent2':
      btnColor = Colors.accent2;
      break;
  }


  return (
    <View style={{
      ...styles.touchable,
      backgroundColor: bgColor ? bgColor : btnColor,
      borderColor: bgColor === 'white' ?
        Colors.primary :
        borderColor ? borderColor :
          'transparent',
      borderWidth: (borderColor || bgColor === 'white') ? 1 : 0,
      ...style,
    }}>
      <BtnComponent onPress={onPress}
        activeOpacity={0.7}>
        <View style={{
          ...styles.button,


        }} >
          <Text
            style={{
              ...styles.btnText,
              color: textColor ?
                textColor :
                (bgColor === 'white' || bgColor == '#fff') ?
                  Colors.primary :
                  styles.btnText.color
            }}>
            {children}
          </Text>

        </View>
      </BtnComponent>
    </View>


  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    // maxWidth: 150,
    width: '100%',
    minWidth: 80,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,

  },

  btnText: {
    color: 'white',
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    textAlign: 'center'
  }

});

export default Btn;
