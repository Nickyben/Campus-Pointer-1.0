import React from 'react';
import {
  StyleSheet, Text, View, 
} from 'react-native';

import TouchCard from '../../components/UI/TouchCard';

const SelectOption = ({onSelect,data,color,style}) => {

  return (
  <TouchCard style={{...styles.itemCard, ...style} } onTouch={() => {onSelect(data) }} >
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
      </View>
    </TouchCard>

  );
};

const styles = StyleSheet.create(
  {
    itemCard: {
      //flex: 1,
      width: '47.5%',//please do this with respect to the device dimensions
      //margin: '5%',
      height: 200, //please do this with respect to the device dimensions
      borderRadius: 10,
      padding: 0,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 15,
    },
    title: {
      fontFamily: 'OpenSansBold',
      fontSize: 22,
      textAlign: 'right',
      color: '#777'
    },
  }
);

export default SelectOption;