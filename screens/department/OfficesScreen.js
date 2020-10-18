import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform, ImageBackground
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import TouchCard from '../../components/UI/TouchCard';
import Btn from '../../components/UI/Btn';


const _Item = ({ content: { id, fullName, image, designation, office, level, capacity }, onSelect }) => (

  <TouchCard

    onTouch={onSelect}
    style={{ ...styles.itemCard, }}>

    <View style={styles.itemContainer}>
      <ImageBackground
        style={styles.ImageBackground}
        source={require('../../assets/images/assoc5.jpg')}
        imageStyle={{}}
      >
        <View style={{ ...styles.ImageBackground, backgroundColor: '#ffffffe0' }}>
          <View style={styles.imageContainer}>
            <Image style={{
              ...styles.listImage,

            }} source={image} />
          </View>
        </View>

      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          {fullName && <Text style={styles.title} numberOfLines={2}>{
            fullName} </Text>}
          {office && <Text style={styles.title} numberOfLines={2}> Office of the {
            office} </Text>}
        </View>

        <View style={{
          width: '100%',
          paddingHorizontal: 20,
          alignItems:'flex-end'
          //backgroundColor: 'red'
        }}>
          <Btn
            style={styles.btn}
            bgColor={'transparent'}
            borderColor={Colors.primary}
            onPress={onSelect}
            textColor={Colors.primary}
          >
            View
          </Btn>
        </View>



      </View>

    </View>


  </TouchCard>

);

const OfficesScreen = ({ navig }) => {
  const studentOffices = useSelector(state => state.dataReducer.availableStudents)
    .filter(student => student.office && student.department === 'Computer Engineering');


  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item} onSelect={() => {
      navig.navigate('DeptDetails', { item: item, itemId: item.id, title: item.constructor.name })
    }} />
  );



  return (
    <View style={styles.screen}>

      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        keyExtractor={(item, index) => item.id}
        data={studentOffices}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#fff',//'#e3e6e7',
  },


  ImageBackground: {
    width: '100%',
    alignItems: 'center',
    padding: 0,
  },

  itemCard: {
    padding: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 180, //please please, set these with respect to window size
    height: 180,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',

  },
  listImage: {
    width: 150, //please please, set these with respect to window size
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
  },
  infoContainer: {
    width: '100%',
    //marginTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  btn: {
    width: '25%',
    minWidth: 100,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    //alignSelf: 'flex-end',
    //borderTopStartRadius: 25,
    backgroundColor: Colors.primary + '11',
    //backgroundColor: '#f5f5f5',
    padding: 10,
  },

  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    //color: Colors.primary//,
    color: '#444',
  }
});
export default OfficesScreen;