import React from 'react';
import {
  StyleSheet,
  View, Text
  
} from 'react-native';

const Template = ({}) => {
  
  return (
    <View style={styles.screen}>
      <Text>This is ... screen</Text>
    </View>

  );
};

export const screenOptions =()=>{
  return({});
};

const styles = StyleSheet.create({
  screen: {},
});

export default Template;



navigation.navigate('Root', {
  screen: 'Settings',
  params: {
    screen: 'Sound',
    params: {
      screen: 'Media',
    },
  },
});