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


const ApplicantScreen = ({ changeScreen }) => {

  return (
    <View>
      <Input />
      {/* <Text onPress={changeScreen.bind(this, 'overview')}>Apply screen</Text> */}

    </View>

  );
};

export default ApplicantScreen;