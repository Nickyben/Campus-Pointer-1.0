import React, { useReducer, useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View, Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Touch from './Touch';

const TouchIcon = ({ disabled, useIos, onTouch, touched, toggleIcons, size, name, color, style, bgColor,borderColor }) => {
  //const [icon, setIcon] = useState(Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}`);

  // const changeIconHandler = () => {
  //   setIcon(prev =>
  //     (icon === `md-${toggleIcons[0]}`) || (prev === `ios-${toggleIcons[0]}`) ?
  //       Platform.OS === 'android' ? `md-${toggleIcons[1]}` : `ios-${toggleIcons[1]}` :
  //       Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}`

  //   );
  //   onTouch();
  // }
  return (
    <View style={{
      ...styles.container, 
      borderColor: borderColor,
      borderWidth: borderColor ? 1 : 0,...style,
            backgroundColor: bgColor ? bgColor : 'transparent',

    }}>
      <Touch
        disabled={disabled}
        onTouch={onTouch}//{changeIconHandler}
        useIos={useIos}
        style={{
          width: size + 10,
          height: size + 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Ionicons
          name={
            //icon
            toggleIcons ?
              touched() ?
                Platform.OS === 'android' ? `md-${toggleIcons[1]}` : `ios-${toggleIcons[1]}` :
                Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}` //initial state
              : Platform.OS === 'android' ? `md-${name}` : `ios-${name}`
          }
          size={size}
          color={color}
        />
      </Touch>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden'
  }
});

export default TouchIcon;
