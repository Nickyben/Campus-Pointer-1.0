import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';


const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>This is the HomeScreen</Text>
    </View>
  );
};

export const screenOptions = (navProps) => {
  const searchIcon = Platform.OS == 'android' ? 'md-search' : 'ios-search';
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';

  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Home',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Search'
            iconName={searchIcon}
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
              
              navProps.navigation.toggleDrawer();
              //console.log(navProps);
              // console.log(props);
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;