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

const AssocOverviewScreen = props => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;
  const sliderImages = [
    require('../../assets/images/assoc5.jpg'),
    require('../../assets/images/assoc3.jpg'),
    require('../../assets/images/assoc1.jpg'),
    require('../../assets/images/assoc4.jpg'),
    require('../../assets/images/assoc2.jpg')
  ];

  const assocOptions = [
    { id: Math.random().toString(), title: 'Offices' },
    { id: Math.random().toString(), title: 'Events Table' },
    { id: Math.random().toString(), title: 'Hall of Fame' },
    { id: Math.random().toString(), title: 'Election' },
    { id: Math.random().toString(), title: 'Dues and Payments' },
    { id: Math.random().toString(), title: 'Souvenir and Uniforms' },
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
            // sliderBoxWidth={WIDTH * 0.9}
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
            data={assocOptions[0]} icon='person'
            color={'#f58915'} onSelect={selectOptionHandler} />
          <SelectOption
            data={assocOptions[1]} icon='calendar'
            color={'#55a5ff'} onSelect={selectOptionHandler} />
        </View>
        <View style={styles.row}>
          <SelectOption
            data={assocOptions[2]} icon='medal'
            color={'#aa88ee'} onSelect={selectOptionHandler} />
          <SelectOption
            data={assocOptions[3]} icon='finger-print'
            color={'#ff55dd'} onSelect={selectOptionHandler} />
        </View>
        <View style={styles.row}>

          <SelectOption
            data={assocOptions[4]} icon='cash'
            color={'#9eff46'} onSelect={selectOptionHandler} />
          <SelectOption
            data={assocOptions[5]} icon='shirt'
            color={'#ef2464'} onSelect={selectOptionHandler} />
          {/* <SelectOption
            data={assocOptions[4]} icon='cash'
            color={'#f5a492'} onSelect={selectOptionHandler} /> */}
        </View>
        <View style={styles.row}>
          <SelectOption
            data={assocOptions[2]} icon='analytics'
            color={'#ff11b0'} onSelect={selectOptionHandler} />
          <SelectOption
            data={assocOptions[4]} icon='analytics'
            color={'#44ffb0'} onSelect={selectOptionHandler} />
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
      headerTitle: 'Association',
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
  },

  scrollView: {
    //width: '100%',
    flex: 1,
    backgroundColor: '#efefef',//'#e0e0ff',
  },

  imageSlide: {
    //padding: 25,
    backgroundColor: '#f5f5f5',//'#efefef',//'#f7faff',
    height: 250,
    marginTop: 10,
  },

  row: {
    flex: 1,
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',//'#efefef',//'#f7faff',
    paddingVertical: 10,
  },


});

export default AssocOverviewScreen;