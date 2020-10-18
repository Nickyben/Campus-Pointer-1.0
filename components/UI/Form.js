import React from 'react';
import {
  StyleSheet,
  View, Text

} from 'react-native';

const Form = ({ }) => {

  return (
    <View style={styles.screen}>
      <Text>This is ... screen</Text>
    </View>

  );
};

export const screenOptions = () => {
  return ({});
};

const styles = StyleSheet.create({
  screen: {},
});

export default Form;
