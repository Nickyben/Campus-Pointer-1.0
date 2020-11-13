import React from 'react';
import {
  StyleSheet,
  View,
  Text

} from 'react-native';

const MsgSettingsScreen = ({ }) => {

  return (
    <View style={
      styles.screen
    }>
      <Text> Msg Settings </Text>
    </View>

  );
};

export const screenOptions = () => {
  return ({
    headerTitle: 'Direct Messages'
  });
};

const styles = StyleSheet.create({
  screen: {},
});

export default MsgSettingsScreen;