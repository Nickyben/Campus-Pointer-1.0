import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Card = props => {
  return (
    <View style={{ ...myStyles.card, ...props.style }} >
      {props.children}
    </View>
  );
};

const myStyles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5

  },
});

export default Card;
