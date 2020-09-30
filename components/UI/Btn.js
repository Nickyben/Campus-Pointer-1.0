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
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';


const Btn = ({ type, onPress, disabled, style, children, bgColor, textColor, borderColor, icon, }) => {

  let BtnComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    BtnComponent = TouchableNativeFeedback;
  }

  let btnColor = !disabled ? Colors.primary : Colors.primary + '77';
  switch (type) {
    case 'accent':
      btnColor = !disabled ? Colors.accent : Colors.accent + '77';
      break;
    case 'accent2':
      btnColor = !disabled ? Colors.accent2 : Colors.accent2 + '77';
      break;
  }


  return (
    <View style={{
      ...styles.touchable,
      backgroundColor: bgColor ? !disabled ? bgColor : bgColor + '77' : btnColor,
      borderColor: bgColor === 'white' ?
        Colors.primary :
        borderColor ? borderColor :
          'transparent',
      borderWidth: (borderColor || bgColor === 'white') ? 1 : 0,
      ...style,
    }}>
      <BtnComponent onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
      >

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
          {icon &&
            <View style={{ marginLeft: 10 }}>
              <Ionicons
                name={
                  Platform.OS === 'android' ? `md-${icon.iconName}` : `ios-${icon.iconName}`
                }
                size={23}
                color='#fff'
              />
            </View>

          }
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
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },

  btnText: {
    color: 'white',
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    textAlign: 'center'
  }

});

export default Btn;
