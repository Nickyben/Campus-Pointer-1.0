import React from 'react';
import {
  StyleSheet,
  View, TouchableOpacity, Platform,
  TouchableNativeFeedback
} from 'react-native';

const Touch = ({disabled, onTouch, children, style, useIos}) => {
  let TouchableCmp = TouchableOpacity;

  if ((Platform.OS === 'android' && Platform.Version >= 21) && !!useIos !== true) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <TouchableCmp
      disabled={disabled}
        activeOpacity={0.4}
        style={{ ...styles.touchable, }}
        onPress={onTouch}
      ><View style={{ ...styles.children, ...style }}>
          {children}
        </View>

      </TouchableCmp>
    </View>

  );
};

const styles = StyleSheet.create({
  container:{
  },
  touchable: {
   
  },
  children: {
    alignItems: 'center',
    justifyContent: 'center', 
    //width: 'auto',
  }
});

export default Touch;
