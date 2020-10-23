import React, { } from 'react';
import {
  StyleSheet,
  View, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ItemIcon = ({ size, name, color, style, borderColor, bgColor, bigBackground }) => {

  return (
    <View style={{
      ...styles.container,
      borderColor: borderColor,
      borderWidth: borderColor ? 1 : 0,
      width: bigBackground ? size + 28 : size + 10,
      height: bigBackground ? size + 25 : size + 10,
      backgroundColor: bgColor ? bgColor : Colors.primary + '22',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <Ionicons
        name={
          Platform.OS === 'android' ? `md-${name}` : `ios-${name}`
        }
        size={size}
        color={color}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',

  }
});

export default ItemIcon;
