import React, { useEffect, useCallback, } from 'react';
import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function

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
import { fetchDeptData } from '../../store/actions/dataActions';

const SchoolOptionsScreen = ({ navigation, route: { params: { title, } } }) => {
  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchDeptData());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadData]);

  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadData().then(() => {
        //       setIsLoading(false);
      });
    }
    , [loadData]);




  const Temp = () => (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>Hmm... Looks like the <Text style={styles.highlight}>{title}</Text> screen is unavailable!</Text>
      <Text style={styles.screenText2}>Please update the App to the latest version.</Text>
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

export default SchoolOptionsScreen;