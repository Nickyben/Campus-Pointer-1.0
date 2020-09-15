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
  //remember to change this and get only the id from the params/rout(ie don't pass an obj through where you are navigating from)
  //you can then search the obj in your data (eg from db) array with array.find()
  const {
    id, image, fullName, designation, department, post,
    staffNumber, regNumber, phoneNumber, office, gender, level, capacity
  } = route.params.item;


  return (
    <View style={styles.screen}>
      <ScrollView
        //contentContainerStyle={styles.scroll}
        style={styles.scroll}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={{ ...styles.detailImageContainer }}>
              <Image
                style={{
                  ...styles.detailImage,
                  borderWidth: !capacity ? 2 : 0,
                  borderColor: !capacity ? 'white' : 'transparent',
                  width: !!capacity ? '100%' : 250,
                  borderRadius: !!capacity ? 15 : 15,//250 / 2,
                }}
                source={image}
              />
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <View style={{ padding: 20, height: 250 }}>
                {fullName && <Text style={styles.title} numberOfLines={2}>Name: {
                  fullName} </Text>}
                {designation && <Text style={styles.title}>Designation: {designation}</Text>}
                {office && <Text style={styles.title}>Office: {office}</Text>}
                {department && <Text style={styles.title}>Department: {department}</Text>}
                {staffNumber && <Text style={styles.title}>Staff Number: {staffNumber}</Text>}
                {regNumber && <Text style={styles.title}>Reg Number: {regNumber}</Text>}
                {gender && <Text style={styles.title}>Gender: {gender}</Text>}
                {post && <Text style={styles.title}>Post: {post}</Text>}
                {phoneNumber && <Text style={styles.title}>Phone Number: {phoneNumber}</Text>}
                {level && <Text style={styles.title}>level: {level}</Text>}
                {capacity && <Text style={styles.title}>Capacity: {capacity}</Text>}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  const title = params.item;
  return (
    {
      headerTitle: title.fullName,
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={notificationIcon}
            onPress={() => {
             
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

  },
  container: {
    flex: 1,
    backgroundColor: 'white',//,Colors.primary,
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
    //paddingTop: 20,
    //backgroundColor: '#fff',
    borderTopStartRadius: 70,//please set this wrt screen dimensions
    borderColor: Colors.primary,
    borderTopWidth: 1,
    borderStartWidth: 1,
    overflow: 'hidden',
  },
  row: {

    borderBottomColor: '#e7e7e7',

    backgroundColor: '#f5f5f5',

  },
  detailImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',//,Colors.primary,//
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,

  },
  detailImage: {
    backgroundColor: 'white',
    //width: 250,
    height: 250,
    //borderRadius: 250/2,
  },
});

export default DeptDetailScreen;