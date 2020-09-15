import React, { useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import {registerCourses} from '../../store/actions/courseAppActions';


const CourseAppScreen = ({ navigation, route: { params: { title, studentId } } }) => {
  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);
  const dispatch = useDispatch();

  const submitCourseHandler =useCallback(()=>{
    dispatch(registerCourses(markedCourses));  
  });

  useEffect(() => {
    const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';

    navigation.setOptions({
      headerRight: () => title === 'Register' ?
        <View style={{ paddingRight: 10 }}>
          <Btn
            onPress={submitCourseHandler}//function to upload the selected(register) courses array...get this from main component
            bgColor={Colors.switchPrimary}
            borderColor={Colors.switchWhite}
          >Submit</Btn>
        </View> :
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
  });
  let Screen;
  let onRegister;
  switch (title) {
    case 'Register':
      Screen = CoursesScreen;
      break;
    case 'Pending':
      Screen = View;
      break;
    case 'Registered':
      Screen = CoursesScreen;
      break;
    case 'Approved':
      Screen = View;
      break;
    case 'Add/Drop':
      Screen = View;
      break;
    case 'Apply For Excess':
      Screen = View;
      break;
    default:
      Screen = View;
      break;

  }
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
});

export default CourseAppScreen;