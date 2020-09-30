import React, { u } from 'react';
//import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function

import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import CoursesScreen from './CoursesScreen';
import EventsTableScreen from './EventsTableScreen';
import TimetableScreen from './TimetableScreen';

const SchoolOptionsScreen = ({ navigation, route: { params: { title, } } }) => {

  const Temp = () => (
    <View style={styles.screen}>
      <Text>This is {title} screen</Text>
    </View>)

  let Screen;
  switch (title) {
    case 'Courses':
      Screen = CoursesScreen;
      break;
    case 'Calendar and Events':
      Screen = EventsTableScreen;
      break;
    case 'Timetable':
      Screen = TimetableScreen;
      break;
    case 'Fees':
      Screen = Temp;
      break;
    case 'Library':
      Screen = Temp;
      break;
    case 'Labs and Research':
      Screen = Temp;
      break;
    default:
      Screen = Temp;

  }
  return (
    <View style={styles.screen}>
      <Screen
        navig={navigation}
        source={{ option: title, }}
      />
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  const title = params.title;
  return (
    {
      headerTitle: title ? title : 'SchoolOptions',
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