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
import CoursesScreen from './CoursesScreen';

const SchoolOptionsScreen = ({ navigation, route: { params: { title, }} }) => {
  let Screen;
  switch (title) {
    case 'Courses':
      Screen = CoursesScreen;
      break;
    case 'Calendar and Events':
      Screen = View;
      break;
    case 'Timetable':
      Screen = View;
      break;
    case 'Fees':
      Screen = View;
      break;
    case 'Library':
      Screen = View;
      break;
    case 'Labs and Research':
      Screen = View;
      break;
    default:
      Screen = View; 

  }
  return (
    <View style={styles.screen}>
      <Screen navig={navigation}/>
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  const title = params.title;
  return (
    {
      headerTitle: title? title: 'SchoolOptions',
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
});

export default SchoolOptionsScreen;