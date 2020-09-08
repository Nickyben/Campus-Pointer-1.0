import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';

const SelectOption = ({ onSelect, icon, data, color, style }) => {

  return (
    // <TouchCard style={{ ...styles.itemCard, ...style }} onTouch={() => { onSelect(data) }} >
    //   <View style={{ ...styles.container, backgroundColor: '#fff' }}>
    //     <Text style={{ ...styles.title, color: color }} numberOfLines={2}>
    //       {data.title}
    //     </Text>
    //   </View>
    // </TouchCard>

    <TouchCard style={{ ...styles.itemCard, ...style }} onTouch={() => { onSelect(data) }} >
      <View style={styles.container}>
        <View style={styles.actionIconContainer}>
          <Ionicons
            name={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
            size={100}
            color={color}
          />
        </View>
        <View style={{...styles.actionLabelContainer,}}>

          {/* color: 'Colors.primary' */}
          <Text style={{ ...styles.actionLabel, color: '#048' }}> {data.title}</Text>
        </View>
        
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
      //height: '100%', //please do this with respect to the device dimensions
      borderRadius: 15,
      padding: 0,
      //backgroundColor: 'red',
    },
    container: {
    
      height: '100%',
    },
    title: {
      fontFamily: 'OpenSansBold',
      fontSize: 20,
      textAlign: 'right',
      //color: '#333'
    },
    actionIconContainer: {
      padding: 25,
      paddingBottom: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: Colors.primary,
    },
    actionLabelContainer:{
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
      paddingVertical: 15,
    },
    actionLabel: {
      //backgroundColor: 'red',
      
      fontFamily: 'OpenSansBold',
      fontSize: 18,
      //color: 'black',//'#444',
    },
  }
);

export default SelectOption;