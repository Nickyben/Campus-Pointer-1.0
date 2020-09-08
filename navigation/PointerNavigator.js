import React from 'react';
import {
  Platform, SafeAreaView, Button, View,
  TouchableOpacity, TouchableNativeFeedback, Text, Image
} from 'react-native';
import { useDispatch } from 'react-redux';

//react navigation version 5
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator, DrawerItemList,
  DrawerItem, DrawerContentScrollView,
} from '@react-navigation/drawer'

import { Ionicons } from '@expo/vector-icons';

import DeptOverviewScreen, {
  screenOptions as deptScreenOpts
} from '../screens/department/DeptOverviewScreen';
import DeptDetailScreen, {
  screenOptions as deptDetailScreenOpts
} from '../screens/department/DeptDetailScreen';

import FacultyOverviewScreen, {
  screenOptions as facultyScreenOpts
} from '../screens/pointerApp/FacultyOverviewScreen';

//Academics
import SchoolOverviewScreen, {
  screenOptions as schScreenOpts
} from '../screens/department/SchoolOverviewScreen';
import SchoolOptionsScreen, {
  screenOptions as schOptsScreenOpts
} from '../screens/department/SchoolOptionsScreen';

import HomeScreen, {
  screenOptions as homeScreenOpts
} from '../screens/pointerApp/HomeScreen';
import AssocOverviewScreen, {
  screenOptions as assocScreenOpts
} from '../screens/department/AssocOverviewScreen';
import StudentProfileScreen, {
  screenOptions as stdProfScreenOpts
} from '../screens/student/StudentProfileScreen';

import SettingsScreen, {
  screenOptions as settingsScreenOpts
} from '../screens/student/SettingsScreen';

import Colors from '../constants/Colors';
import { FacultyTabNavigator, facultyTabNavScreenOptions } from './MaterialTopTabNav';


let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}


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

const defaultTabStacksOpts = ({ route }) => ({
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

})

const DeptStackNav = createStackNavigator();

const DeptStackNavigator = () => {
  return (
    <DeptStackNav.Navigator screenOptions={defaultNavOptions}>
      <DeptStackNav.Screen
        name='DeptOverview'
        component={DeptOverviewScreen}
        options={deptScreenOpts}
      />
      <DeptStackNav.Screen
        name='DeptDetail'
        component={DeptDetailScreen}
        options={deptDetailScreenOpts}
      />
      {/*<DeptStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </DeptStackNav.Navigator>
  );
};

const FacultyStackNav = createStackNavigator();

const FacultyStackNavigator = () => {
  return (
    <FacultyStackNav.Navigator screenOptions={defaultNavOptions}>
      <FacultyStackNav.Screen
        name='FacultyOverview'
        component={FacultyTabNavigator}
        options={facultyTabNavScreenOptions}
      />
      {/* <FacultyStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <FacultyStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </FacultyStackNav.Navigator>
  );
};


const SchoolStackNav = createStackNavigator();

const SchoolStackNavigator = () => {
  return (
    <SchoolStackNav.Navigator screenOptions={defaultNavOptions}>
      <SchoolStackNav.Screen
        name='SchoolOverview'
        component={SchoolOverviewScreen}
        options={schScreenOpts}
      />
      <SchoolStackNav.Screen
        name='SchoolOptions'
        component={SchoolOptionsScreen}
        options={schOptsScreenOpts}
      />
      {/*
      <SchoolStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </SchoolStackNav.Navigator>
  );
};

const HomeStackNav = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStackNav.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNav.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={homeScreenOpts}
      />
      {/* <HomeStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <HomeStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </HomeStackNav.Navigator>
  );
};


const AssocStackNav = createStackNavigator();

const AssocStackNavigator = () => {
  return (
    <AssocStackNav.Navigator screenOptions={defaultNavOptions}>
      <AssocStackNav.Screen
        name='AssocOverview'
        component={AssocOverviewScreen}
        options={assocScreenOpts}
      />
      {/* <AssocStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <AssocStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </AssocStackNav.Navigator>
  );
};

const StdProfStackNav = createStackNavigator();

const StdProfStackNavigator = () => {
  return (
    <StdProfStackNav.Navigator screenOptions={defaultNavOptions}>
      <StdProfStackNav.Screen
        name='StudentProfile'
        component={StudentProfileScreen}
        options={stdProfScreenOpts}
      />
      {/* <StdProfStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <StdProfStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </StdProfStackNav.Navigator>
  );
};

const SettingsStackNav = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <SettingsStackNav.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNav.Screen
        name='StudentProfile'
        component={SettingsScreen}
        options={settingsScreenOpts}
      />
      {/* <SettingsStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <SettingsStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </SettingsStackNav.Navigator>
  );
};


//TABS NAVIGATION****************************************************

const DeptTabNav = createBottomTabNavigator();

export const DeptTabNavigator = () => {
  return (
    <DeptTabNav.Navigator initialRouteName='Home' screenOptions={defaultTabStacksOpts}

      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: '#777',
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: '#f7f8f9', //'#effdff',
        //labelPosition: true,

        showLabel: (Platform.OS !== 'android'),
        keyboardHidesTabBar: true,
        style: {
          height: 56,
        },
        // tabStyle: {

        // },
        labelStyle: {
          fontFamily: 'OpenSansBold',
          fontSize: 12,
          textAlign: 'center',
          //marginBottom: 10,
        }
      }}>
      <DeptTabNav.Screen
        name='Department'
        component={DeptStackNavigator}
        options={{ tabBarBadge: 3, }}
      />
      <DeptTabNav.Screen
        name='Academics'
        component={SchoolStackNavigator}
      //options={stdProfScreenOpts}
      />
      <DeptTabNav.Screen
        name='Home'
        component={HomeStackNavigator}
      //options={stdProfScreenOpts}
      />
      <DeptTabNav.Screen
        name='Association'
        component={AssocStackNavigator}
      //options={prodDetailScreenOptions}
      />
      <DeptTabNav.Screen
        name='Profile'
        component={StdProfStackNavigator}
      // options={cartScreenOptions}
      />
    </DeptTabNav.Navigator>
  );
};














//DRAWER NAVIGATION++++++++++++++++++++++++++++++++++++++++++++++++++++++


const PointerDrawerNav = createDrawerNavigator();

export const PointerDrawerNavigator = () => {
  const dispatch = useDispatch();

  return (
    <PointerDrawerNav.Navigator drawerLabel='Menu'
      drawerContent={
        (props) => {
          return (

            <DrawerContentScrollView {...props} style={{ flex: 1, height: '100%', backgroundColor: Colors.switchPrimary }}
              contentContainerStyle={{ height: '100%', }}>
              <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'white' }}>

                <View>
                  <View style={{
                    padding: 20,
                    width: '100%',
                    height: 140,
                    backgroundColor: Colors.switchPrimary,
                    // flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: 'center',

                  }}>
                    {/* <TouchableCmp > */}
                    <TouchableCmp
                      onPress={() => { console.log('working') }} style={{
                        width: 100, height: 100,
                        borderRadius: 50,
                        //borderRadius: 50,
                        backgroundColor: Colors.primary
                      }}>
                      <Image
                        source={require('../assets/images/user.png')}
                        style={{
                          width: 100, height: 100,
                          borderRadius: 50,
                          borderColor: '#f7f7f7',
                          borderWidth: 2,
                        }} />
                    </TouchableCmp>
                    {/* <View style={{
                      //width: '70%', height: '100%',
                      borderRadius: 8,
                      backgroundColor: '#f8f8f8'
                    }}>
                    </View> */}
                  </View>
                  <DrawerItemList {...props} itemStyle={{
                    // marginHorizontal: 0, 
                    //borderRadius: 0 
                  }} />
                </View>
                <View style={{}}>
                  <DrawerItem {...props}
                    style={{
                      marginHorizontal: 0,
                      marginVertical: 0,
                      padding: 10,
                      borderRadius: 0,
                      //marginTop: '95%',color: '#fff', 
                      backgroundColor: Colors.switchPrimary//'#ff2244',
                    }
                    }
                    label='Logout'
                    labelStyle={{
                      color: Colors.switchWhite,
                      fontSize: 17,
                      fontFamily: 'OpenSansBold',
                    }}
                    icon={
                      ({ focused, color, size }) =>
                        <Ionicons name='ios-log-out' size={size + 1}
                          color={Colors.switchWhite}
                        //color={color}
                        />
                    }
                    onPress={() => {
                      //dispatch(authActions.logout());
                      //props.navigation.navigate('Auth')//already handled by the renderer(AppNavigator) of the ShopNavigator @ app.js
                    }}
                  />
                </View>
              </View>
            </DrawerContentScrollView>

          );
        }
      }
      drawerStyle={
        {
          paddingHorizontal: 0,
          backgroundColor: '#fff',
        }
      }
      drawerContentOptions={
        {

          activeBackgroundColor: Colors.primary, //'#f0f0f0',
          inactiveBackgroundColor: '#fcfcfc',
          activeTintColor: '#fff', //Colors.primary,//'#006f8f',
          inactiveTintColor: '#444',
          labelStyle: {
            fontFamily: 'OpenSansBold',
            fontSize: 16,
          },

        }
      }
    >
      <PointerDrawerNav.Screen
        name='DepartmentTabNav'
        component={DeptTabNavigator}
        options={
          {//can also be set in the 2nd arg of this stack' s create func
            drawerLabel: 'Department',
            drawerIcon: ({ color }) => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-clipboard' : 'ios-clipboard'}
                size={23}
                color={color}
              />
            )

          }
        }
      />
      {/* CHECK WHY STACK NAVIGATOR ROTATES FASTER ON DEVICE ROTATE */}
      <PointerDrawerNav.Screen
        name='Faculty'
        component={FacultyStackNavigator}
        options={
          {//can also be set in the 2nd arg of this stack' s create func
            drawerLabel: 'Faculty',
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-business' : 'ios-business'}
                size={23}
                color={props.color}
              />
            )
          }
        }
      />

      <PointerDrawerNav.Screen
        name='Settings'
        component={SettingsStackNavigator}
        options={
          {//can also be set in the 2nd arg of this stack' s create func
            drawerLabel: 'Settings',
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
                size={23}
                color={props.color}
              />
            )
          }
        }
      />

    </PointerDrawerNav.Navigator>
  );
};



