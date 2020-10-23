import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions, Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Ionicons } from '@expo/vector-icons';
import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';
import Btn from '../../components/UI/Btn';

import { fetchDeptData } from '../../store/actions/dataActions';
import Input from '../UI/Input';
import Form from '../UI/Form';
import ItemIcon from '../UI/ItemIcon';
import TouchIcon from '../UI/TouchIcon';


{/* 
          <Input
            id='title'
            label='Title'
            errorMsg='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect={true}
            returnKeyType='next'
            onInputChange={formInputHandler}//using()=>formInputHandler(, ,) causes the a problem because it rebuilds as its dependencies change since its a useCallback 
            initialValue={editProduct ? editProduct.title : ''}
            initialValidity={!!editProduct} //editProduct ? true : false
            required
          /> */}

const inputItems = [
  { id: 'FirstName', label: 'First Name', placeholder: 'first name', icon: { iconName: 'person' } },
  { id: 'LastName', label: 'Last Name', placeholder: 'last name', icon: { iconName: 'person' } },
  { id: 'RegNumber', label: 'Reg-Number', placeholder: 'reg number', icon: { iconName: 'search' } },
  { id: 'AspiringOffice', label: 'Aspiring Position', placeholder: 'position', icon: { iconName: 'attach' } },
  { id: 'Experiences', label: 'Leadership Experiences', placeholder: 'experiences...', icon: { iconName: 'list' } },
  { id: 'CoverQuote', label: 'Personal Quote', placeholder: 'cover-quote', icon: { iconName: 'text' } },
  { id: 'Manifesto', label: 'Campaign Manifesto', placeholder: 'manifesto', icon: { iconName: 'paper' } },

];


const ApplicantScreen = ({ changeScreen, navig }) => {

  return (
    <View style={styles.screen}>
      <View style={{ backgroundColor: '#fdfeff' ,
      flexDirection: 'row', alignItems: 'center', padding: 15, paddingHorizontal:20 }}>
        <TouchIcon
          onTouch={changeScreen.bind(this, 'overview')}
          name={'arrow-dropleft-circle'}
          size={23}
          color={Colors.accent}
        />
        <Text
          style={styles.navigText}
        >Description/Overview</Text>
      </View>
      <Form navig={navig} id={'electionContestForm' + Math.random().toString()}
        title={'Contestant Form'} submitTitle={'Register'} items={inputItems}
      >
        {/* <Input  id={inputItems[0]}/>
        <Input  id={inputItems[1]}/>
        <Input  id={inputItems[2]}/>
        <Input id={inputItems[3]} />
        <Input  id={inputItems[4]}/>
        <Input id={inputItems[5]} />
        <Input id={inputItems[6]} /> */}

      </Form>

    </View>

  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f6f7', paddingBottom:50 },
  navigText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: Colors.accent
  }

});

export default ApplicantScreen;