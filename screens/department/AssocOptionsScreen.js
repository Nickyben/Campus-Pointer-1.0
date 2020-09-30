import React, { useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchDeptData  } from '../../store/actions/dataActions';
import OfficesScreen from './OfficesScreen';
import EventsTableScreen from './EventsTableScreen';
import HallOfHonoursScreen from './HallOfHonoursScreen';
import ElectionsPortalScreen from './ElectionsPortalScreen';



const AssocOptionsScreen = ({ navigation, route: { params: { title, } } }) => {
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
    , [ loadData]);

  let Screen = () => (<View><Text >This is the {title} screen</Text></View>);
  switch (title) {
    case 'Offices':
      Screen = OfficesScreen;
      break;
    case 'Events Table':
      Screen = EventsTableScreen;
      break;
    case 'Hall of Honours':
      Screen = HallOfHonoursScreen;
      break;
    case 'Elections Portal':
      Screen = ElectionsPortalScreen;
      break;
    case 'Dues and Payments':
      Screen = Screen;
      break;
    case 'Souvenir and Uniforms':
      Screen = Screen;
      break;
    case 'Projects':
      Screen = Screen;
      break;
    default:
      Screen = Screen;

  }
  return (
    <View  style={styles.screen}>
      <Screen navig={navigation} source={{option: title}}/>
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  const title = params.title;
  return (
    {
      headerTitle: title ? title : 'AssocOptionsScreen',
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
});

export default AssocOptionsScreen;