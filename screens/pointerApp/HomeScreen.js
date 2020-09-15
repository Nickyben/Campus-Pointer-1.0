import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import { Announcement, News } from '../../models/homeWall';
import Student from '../../models/student';
import Colors from '../../constants/Colors';


const content = (type) => {
  const contentArr = [];
  if (type === 'homeWall') {
    for (let s = 1; s <= 15; s++) {
      contentArr.push(
        new Announcement(
          Math.random().toString(),
          'Departmental Announcement ' + s,
          'General',
          new Date().toLocaleDateString(),
          { name: 'Nicholas Ikechukwu', level: 400, office: 'President' },
          { name: 'Nicholas Ikechukwu', level: 400, office: 'Secretary General' },
          { image: null, text: 'There will be a Congress meeting on 20th September, 2020' }
        )
      );
    }
  }
  return contentArr;
}
const HomeScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const Item = ({ content: { title, type, author: { name, office }, text }, onSelect }) => (
    <View style={styles.row}>
      <View style={styles.postContainer}>
        <View style={styles.authorContent}>
          <View style={styles.authorImageContainer}>
            <TouchableCmp
              onPress={() => { console.log('working') }} style={{
                width: 100, height: 100,
                borderRadius: 50,
                //borderRadius: 50,
                backgroundColor: Colors.primary
              }}>
              <Image
                source={require('../../assets/images/user.png')}
                style={styles.authorImage} />
            </TouchableCmp>
          </View>
          <View style={styles.authorDetails}>
            <Text style={styles.courseCode}>{name}</Text>
            <Text style={styles.courseCode}>{office}</Text>
          </View>
        </View>
        <View style={styles.infoContent}>
          <View style={styles.infoImage}></View>
          <View style={styles.infoText}>
            <Text style={styles.courseTitle}>{title}</Text>
            <Text style={styles.courseCode}>{type}</Text>
            <Text style={styles.courseCode}>{text}</Text>
          </View>
          <View style={styles.infoActions}></View>
        </View>


      </View>
    </View>

  );
  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <Item content={item} onSelect={() => { }} />
  );



  return (
    <View style={styles.screen}>

      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        keyExtractor={(item, index) => item.id}
        data={content('homeWall')}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

export const screenOptions = (navProps) => {
  const searchIcon = Platform.OS == 'android' ? 'md-search' : 'ios-search';
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';

  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Home',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Search'
            iconName={searchIcon}
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
      headerLeft: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {

              navProps.navigation.toggleDrawer();
              //console.log(navProps);
              // console.log(props);
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
    backgroundColor: '#fff',

  },
  listContainer: {
  },
  row: {
    //maxHeight: 350,
    borderTopColor: '#fff',
    borderBottomColor: '#e5e5e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#f5f5f5',
    //backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 25,

  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  authorContent: {
    //backgroundColor:'#ffd',
    flexDirection: 'row',

  },

  authorImageContainer: {
    backgroundColor: '#efefef',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorImage: {
    width: 50, height: 50,
    borderRadius: 25,
    borderColor: '#f7f7f7',
    borderWidth: 2,
  },
  authorDetails: {
    marginLeft: 20,
  },
  infoContent: {},
  infoImage: {},
  infoText: {},

});


export default HomeScreen;