import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const WelcomeScreen = props =>{
  return(
    <View style={styles.screen}>
      <Text>This is the WelcomeScreen</Text>
    </View>
  );
};

export const screenOptions = () =>{
  return({

  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;