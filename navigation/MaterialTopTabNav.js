import React from 'react';
import { Platform, SafeAreaView, Button, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../components/UI/HeaderBtn';
import FacultyOverviewScreen from '../screens/pointerApp/FacultyOverviewScreen'
import Colors from '../constants/Colors';


const defaultNavOptions = (props) => {
  //console.log(props);
  return ({

    headerTitle: 'Pointer',
    headerTitleStyle: {
      fontFamily: 'OpenSansBold',
    },

    headerBackTitleStyle: {//for the back button text...seen in ios
      fontFamily: 'OpenSansRegular',
    },
    headerStyle: {
      backgroundColor: Colors.switchPrimary,
    },
    headerTintColor: Colors.switchWhite,
    headerTitleAlign: 'center',

  })
};

const defaultTabStacksOpts = ({route}) => {
  // console.log('running');
  // const route={
  //   name: name
  // }
  return({
  
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let iconSize;
    if (route.name === 'Department') {
      iconName = !focused
        ? 'ios-list'
        : 'md-list';
    } else if (route.name === 'Faculty') {
      iconName = !focused
        ? 'ios-list'
        : 'md-list';
    }
    else if (route.name === 'Academics') {
      iconName = !focused
        ? 'ios-school'
        : 'md-school';
    }
    else if (route.name === 'Home') {
      iconName = !focused
        ? 'ios-home'
        : 'md-home';
    } else if (route.name === 'Association' || route.name === 'FacultyAssociation') {
      iconName = !focused
        ? 'ios-people'
        : 'md-people';
    } else if (route.name === 'Profile') {
      iconName = !focused
        ? 'ios-person'
        : 'md-person';
    }
    //iconSize = focused ? 28: 24;
    // You can return any component that you like here!
    return <Ionicons name={iconName} size={26} color={color} />;
  },

})};


const FacultyTabNav = createMaterialTopTabNavigator();
//const FacultyTabNav = createBottomTabNavigator();
export const FacultyTabNavigator = () => {
  return (
    <FacultyTabNav.Navigator initialRouteName='Home'  screenOptions={defaultTabStacksOpts}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: '#667788',
        indicatorStyle:{
          backgroundColor: Colors.primary,
        },
        // activeBackgroundColor: 'white',
        // inactiveBackgroundColor: '#effdff',
        showIcon: true,
        showLabel: (Platform.OS !== 'android')
        // tabStyle:{

        // },
        // labelStyle:{
        //   // fontFamily: 'OpenSansBold',
        //   // fontSize: 12,
        // }
      }}>
      <FacultyTabNav.Screen
        name='Faculty'
        component={FacultyOverviewScreen}
      />
      <FacultyTabNav.Screen
        name='Home'
        component={FacultyOverviewScreen}
      />
      <FacultyTabNav.Screen
        name='FacultyAssociation'
        component={FacultyOverviewScreen}
      />
      {/* <FacultyTabNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <FacultyTabNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </FacultyTabNav.Navigator>
  );
};

export const facultyTabNavScreenOptions = (navProps) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'My Faculty',
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
      headerLeft: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {
              //console.log(navProps);
              // console.log(props);
              navProps.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    }
  );
};
