import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function
import {
  StyleSheet,  Text,
  View, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';

const CheckBox = ({ title, checkedColor, textStyle, checked, size, onCheck}) => {

  return (
    <Touch onTouch={onCheck}   style={{flexDirection: 'row', justifyContent: 'flex-start', padding:5, paddingVertical:3,}}>
      <View style={{ marginHorizontal: 10, marginRight:20, alignItems: 'flex-start' }}>
        <TouchIcon
          onTouch={onCheck}
          touched={() => checked} 
          name={Ionicons}
          size={size?size:24}
          color={checkedColor? checkedColor:Colors.switchWhite}
          toggleIcons={['radio-button-off', 'radio-button-on']}
        >
        </TouchIcon>
      </View>
      <Text
        style={{...styles.titleStyle, ...textStyle}}>{title}</Text>
    </Touch>

  )
};

export const screenOptions = () => {
  return ({});
};

const styles = StyleSheet.create({
  screen: {},
  titleStyle:{
    fontFamily: 'OpenSansBold',
    color: '#555',
    fontSize: 15,

  }
});

export default CheckBox;



