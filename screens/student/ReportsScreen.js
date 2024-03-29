import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
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
import ResultsScreen from '../student/ResultsScreen';
import { fetchReportsData } from '../../store/actions/reportsActions';

const ReportsScreen = ({ navigation, route: { params: { title, studentId } } }) => {

  useLayoutEffect(() => {
    const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
    const printIcon = Platform.OS == 'android' ? 'md-print' : 'ios-print';

    navigation.setOptions({
      headerRight: () => 
        title === 'Results' ?
          (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                title='Print'
                iconName={printIcon}
                onPress={() => {
                }}
              />
            </HeaderButtons>
          ) :
          (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
              <Item
                title='Notifications'
                iconName={notificationIcon}
                onPress={() => {
                }}
              />
            </HeaderButtons>
          ),

      // formSubmit: formSubmitHandler
    });
  },[title]);

  const dispatch = useDispatch();

  const loadResultCourses = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchReportsData());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadResultCourses);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadResultCourses]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadResultCourses().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadResultCourses]);



  const Temp = () => (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>Hmm... Looks like the <Text style={styles.highlight}>{title}</Text> screen is unavailable!</Text>
      <Text style={styles.screenText2}>Please update the App to the latest version.</Text>
    </View>)

  let Screen;
  let onRegister;
  switch (title) {
    case 'Results':
      Screen = ResultsScreen;
      break;
    case 'Assessments':
      Screen = ResultsScreen;
      break;
    case 'General Attendance':
      Screen = ResultsScreen;
      break;
    case 'CGPA Tracker':
      Screen = Temp;
      break;
    default:
      Screen = Temp;
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
      headerTitle: title ? title : 'Student Reports',
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

export default ReportsScreen;