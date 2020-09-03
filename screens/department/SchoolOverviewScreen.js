import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Platform, ScrollView,
  TouchableOpacity, TouchableNativeFeedback, FlatList,
  useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SliderBox } from "react-native-image-slider-box";

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import SelectOption from '../../components/pointerComponents/SelectOption';


const SchoolOverviewScreen = props => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;
  const sliderImages = [
    require('../../assets/images/slide1.jpg'),
    require('../../assets/images/slide2.jpg'),
    require('../../assets/images/slide3.jpg'),
    require('../../assets/images/slide4.jpg'),
    require('../../assets/images/slide5.jpg')
  ];

  const academicOptions = [
    { id: Math.random().toString(), slider: true },
    { id: Math.random().toString(), none: true },
    { id: Math.random().toString(), title: 'Courses' },
    { id: Math.random().toString(), title: 'Calender and Events' },
    { id: Math.random().toString(), title: 'Timetable' },
    { id: Math.random().toString(), title: 'Fees' },
    { id: Math.random().toString(), title: 'Library' },
    { id: Math.random().toString(), title: 'Labs and research' },

  ];

  

  const selectOptionHandler = (optionData) => {
    console.log(optionData.title);
  };




  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <Item content={item} />
  );

  return (
    <View style={styles.screen}
    // onLayout={onLayoutImageSlide}
    >
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}

      >
        <View style={styles.imageSlide} >
          <SliderBox
            images={sliderImages}
            dotColor={Colors.accent}
            inactiveDotColor={'white'}
            parentWidth={WIDTH}
            ImageComponentStyle={{ borderRadius: 5, width: '94%', }}
            sliderBoxHeight={250}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            paginationBoxVerticalPadding={20}
            paginationBoxHorizontalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
              width: WIDTH * 0.9
            }}

          />
        </View>

        <View style={styles.row}>
          <SelectOption
            data={academicOptions[2]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
          <SelectOption
            data={academicOptions[3]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
        </View>
        <View style={styles.row}>
          <SelectOption
            data={academicOptions[4]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
          <SelectOption
            data={academicOptions[5]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
        </View>
        <View style={styles.row}>
          <SelectOption
            data={academicOptions[6]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
          <SelectOption
            data={academicOptions[7]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
        </View>
        <View style={styles.row}>
          <SelectOption
            data={academicOptions[2]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
          <SelectOption
            data={academicOptions[4]}
            color={'#d5d5ff'} onSelect={selectOptionHandler} />
        </View>
        {/* <Text>{WIDTH}</Text>
        <Text>{ HEIGHT}</Text> */}
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navProps) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Academics',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={notificationIcon}
            onPress={() => {
              // navProps.navigation.navigate(
              //   {
              //     name: 'Cart',
              //     params: {

              //     }
              //   }
              // );
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {
              //console.log(navProps);
              // console.log(props);
              navProps.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    }
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  scrollView: {
    //width: '100%',
    flex: 1,
    backgroundColor: '#e0e0ff',
  },

  imageSlide: {
    //padding: 25,
    backgroundColor: '#f7f7ff',
    height: 250,
    marginTop: 20,
  },

  row: {
    flex: 1,
    //marginVertical: 20,
    //backgroundColor: 'red',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',


    borderTopColor: '#fff',
    borderBottomColor: '#f0f0ff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f7f7ff',
    paddingVertical: 10,

  },
  rowLabel: {
    marginLeft: 25,
    fontFamily: 'OpenSansBold',
    fontSize: 17,

  },

  
});

export default SchoolOverviewScreen;