import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import RegisterCourseScreen from './RegisterCourseScreen';
import CoursesScreen from '../department/CoursesScreen';
import Btn from '../../components/UI/Btn';
import { registerCourses } from '../../store/actions/courseAppActions';


const CourseAppScreen = ({ navigation, route: { params: { title, studentId } } }) => {
  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);
  const dispatch = useDispatch();

  const submitCourseHandler = useCallback(() => {
    dispatch(registerCourses(markedCourses));
  });

  

  const Temp = () => (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>Hmm... Looks like the <Text style={styles.highlight}>{title}</Text> screen is unavailable!</Text>
      <Text style={styles.screenText2}>Please update the App to the latest version.</Text>
    </View>)

  let Screen;
  let onRegister;
  switch (title) {
    case 'Register':
      Screen = CoursesScreen;
      break;
    case 'Pending':
      Screen = Temp;
      break;
    case 'Registered':
      Screen = CoursesScreen;
      break;
    case 'Approved':
      Screen = Temp;
      break;
    case 'Add/Drop':
      Screen = Temp;
      break;
    case 'Apply For Excess':
      Screen = Temp;
      break;
    default:
      Screen = Temp;
      break;

  }

  useEffect(() => {
    const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
    const printIcon = Platform.OS == 'android' ? 'md-print' : 'ios-print';

    navigation.setOptions({
      headerRight: () => title === 'Register' ?
        <View style={{ paddingRight: 10 }}>
          <Btn
            icon={{ iconName: 'cloud-upload' }}
            onPress={submitCourseHandler}//function to upload the selected(register) courses array...get this from main component
            bgColor={Colors.switchPrimary}
            borderColor={Colors.switchWhite}
          // textColor={ Colors.switchWhite}
          >Submit</Btn>
        </View> :
        title === 'Registered' ?
          (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                tile='Print'
                iconName={printIcon}
                onPress={() => {
                }}
              />
            </HeaderButtons>
          ) :
          (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                tile='Notifications'
                iconName={notificationIcon}
                onPress={() => {
                }}
              />
            </HeaderButtons>
          ),

      // formSubmit: formSubmitHandler
    });
  }, [submitCourseHandler]);


  return (
    <View style={styles.screen}>
      <Screen
        navig={navigation}
        source={{ title: title, studentId: studentId }}
      />
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {

  const title = params.title;
  return (
    {
      headerTitle: title ? title : 'Course Applications',

    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  screen2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  screenText: {
    fontSize: 17,
    fontFamily: 'OpenSansBold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',

  },
  screenText2: {
    fontSize: 15,
    fontFamily: 'OpenSansBold',
    color: '#777',
    textAlign: 'center',
  },
  highlight: {
    color: Colors.primary
  }
});

export default CourseAppScreen;