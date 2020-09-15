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

screenOptions =()=>{
  return({});
};

const styles = StyleSheet.create({
  screen: {},
});

export default Template;
