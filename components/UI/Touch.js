import React from 'react';
import {
  StyleSheet,
  View, TouchableOpacity, Platform,
  TouchableNativeFeedback
} from 'react-native';

const Touch = ({onTouch, children, style, useIos})=> {
  let TouchableCmp = TouchableOpacity;

  if ((Platform.OS === 'android' && Platform.Version >= 21) && !!useIos !== true) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      style={{...styles.touchable,}}
      onPress={onTouch}
    ><View style={{...styles.children, ...style}}>
        {children}
      </View>

    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  touchable: {
    //flex: 1,
  },
  children: {
   alignItems: 'center',
   justifyContent: 'center',
  }
});

export default Touch;
