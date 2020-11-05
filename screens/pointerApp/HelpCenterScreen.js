import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import ItemIcon from '../../components/UI/ItemIcon';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';


const HelpCenterScreen = ({ }) => {

  return (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>Hmm... Looks like the</Text>
      <Text style={styles.highlight}>Help Center</Text>
      <Text style={styles.screenText}>screen is unavailable!</Text>
      <Text style={styles.screenText2}>Please update the App to the latest version.</Text>
    </View>
  );
};

export const screenOptions = (navProps) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Help Center',
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
    fontSize: 17,
    fontFamily: 'OpenSansBold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    color: Colors.primary
  }
});

export default HelpCenterScreen;
