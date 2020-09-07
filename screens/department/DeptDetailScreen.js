import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';

const DeptDetailScreen = ({ route }) => {
  const { id, image, name , designation, office, level,capacity} = route.params.item;
  return (
    <View style={styles.screen}>
      <ScrollView
       //contentContainerStyle={styles.scroll}
       style={styles.scroll}
       >
       <View style={styles.row}>
         <View style={{ ...styles.detailImageContainer }}>
          <Image style={{...styles.detailImage,  width: !!capacity ?  '100%' : 250}}  source={image} />
        </View> 
       </View>
        
        <View style={styles.row}>
          <View style={{padding: 20, height: 250}}>
            {name && <Text style={styles.title}>Name: {name}</Text>}
            {designation && <Text style={styles.title}>Designation: {designation}</Text>}
            {office && <Text style={styles.title}>Office: {office}</Text>}
            {level && <Text style={styles.title}>level: {level}</Text>}
            {capacity && <Text style={styles.title}>Capacity: {capacity}</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  const title = params.item.name;
  return (
    {
      headerTitle: title,
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={notificationIcon}
            onPress={() => {
              // navProps.navigation.navigate(
              //   {
              //     name: 'Cart',
              //     params: {

              //     }
              //   }
              // );
            }}
          />
        </HeaderButtons>
      ),

    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
   // alignItems: 'center',
  },
  scroll: {
    width: '100%',
    //backgroundColor: 'blue',
  },
  row:{
    //height: 250,
    // borderTopColor: '#fff',
    borderBottomColor: '#e7e7e7',
    // borderTopWidth: 3,
    // borderBottomWidth: 3,
    backgroundColor: '#f5f5f5',
    //paddingVertical: 10,
  },
  detailImageContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    
  },
  detailImage: {
    //width: 250,
    height: 250,
    borderRadius: 5,
  },
});

export default DeptDetailScreen;