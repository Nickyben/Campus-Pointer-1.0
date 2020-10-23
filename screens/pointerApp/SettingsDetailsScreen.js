import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import ItemIcon from '../../components/UI/ItemIcon';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';

const SettingsDetailsScreen = ({ navigation, route: { params } }) => {
  const { settingTitle } = params;

  const Temp = () => (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>Hmm... Looks like the</Text>
      <Text style={styles.highlight}>{settingTitle}</Text>
      <Text style={styles.screenText}>screen is unavailable!</Text>
      <Text style={styles.screenText2}>Please update the App to the latest version.</Text>
    </View>
  );
  const Temp2 = ({ source: { option } }) => (
    <View style={styles.screen2}>
      <Text style={styles.screenText}>{option}</Text>
    </View>
  );

  let Screen;

  switch (settingTitle) {
    case 'Change Password':
      Screen = Temp2;
      break;
    case 'Change Username':
      Screen = Temp2;
      break;
    case 'Notifications':
      Screen = Temp;
      break;
    case 'Sound':
      Screen = Temp;
      break;
    case 'Languages':
      Screen = Temp;
      break;

    default:
      Screen = Temp;

  }
  return (
    <View style={styles.screen}>
      <Screen
        navig={navigation}
        source={{ option: settingTitle, }}
      />
    </View>
  );

};

export const screenOptions = ({ route: { params } }) => {
  const { settingTitle } = params;
  return (
    {
      headerTitle: settingTitle,
    });
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

export default SettingsDetailsScreen;
