import React, { useReducer, useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View, Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Touch from './Touch';

const TouchIcon = ({ onTouch, touched, toggleIcons, size, name, color }) => {

  return (
    <View style={{
      borderRadius: 20,
      overflow: 'hidden'
    }}>
      <Touch
        onTouch={onTouch}
        style={{
          width: size + 10,
          height: size + 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Ionicons
          name={
            touched() ?
              Platform.OS === 'android' ? `md-${toggleIcons[1]}` : `ios-${toggleIcons[1]}` :
              Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}` //initial state
          }
          size={size}
          color={color}
        />
      </Touch>
    </View>

  );
};

const styles = StyleSheet.create({

});

export default TouchIcon;
