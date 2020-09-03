import React from 'react';
import {
  StyleSheet,
  Text,
  View, TouchableOpacity, Platform,
TouchableNativeFeedback
} from 'react-native';
import Card from './Card';

const TouchCard = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.touchCard, ...props.style }}>
      <TouchableCmp
        style={styles.touchable}
        onPress={props.onTouch}
      >
        {props.children}
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,

  },
  touchCard:{
    padding:0,
    overflow: (Platform.OS === 'android' && Platform.Version >= 21)
      ? 'hidden'
      : 'visible',
  }
});

export default TouchCard;
