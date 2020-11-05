import React from 'react';
import {
  StyleSheet,
  View, Text,
  Modal,
} from 'react-native';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import TouchCard from '../UI/TouchCard';

const MyModal = ({ children, showModal, handleRequestClose, modalType, headerText }) => {

  return (
    <Modal
      animationType={'fade'}
      visible={showModal}
      transparent
      onRequestClose={handleRequestClose}
    >
      <TouchCard disableCard onTouch={handleRequestClose} style={{flex:1}}>
        <View style={styles.modal}>
          <View style={styles.contentBox}>
            {headerText && <Text style={styles.contentBoxHeader}>{headerText}</Text>}
            {children}
          </View>
        </View>

      </TouchCard>

    </Modal>


  );
};

export const screenOptions = () => {
  return ({});
};

const styles = StyleSheet.create({
  screen: {},
  modal: {
    flex: 1,
    backgroundColor: '#000b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    backgroundColor: '#fff',
    width: '80%',
    minHeight: 150,
    borderRadius: 10,
    paddingTop: 0,
    paddingBottom: 15,
  },
  contentBoxHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    padding: 15,
    width: '100%',
    backgroundColor: Colors.switchPrimary,
    color: Colors.switchWhite,
    borderBottomColor: '#e3e6e7',
    borderBottomWidth: 1,
  },
});

export default MyModal;
