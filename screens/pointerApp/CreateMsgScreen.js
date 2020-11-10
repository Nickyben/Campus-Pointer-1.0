import React from 'react';
import {
  StyleSheet,
  View,
  Text

} from 'react-native';

const CreateMsgScreen = ({ }) => {

  return (
    <View style={
      styles.screen
    }>
      <Text> Create </Text>
    </View>

  );
};

export const screenOptions = () => {
  return ({
    headerTitle: 'New message'
  });
};

const styles = StyleSheet.create({
  screen: {},
});

export default CreateMsgScreen;