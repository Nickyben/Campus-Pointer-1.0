import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, Image, useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';


const DeptOverviewScreen = props => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;

  const welcomeMessage = ''
  const content = (type) => {
    const contentArr = [];
    if (type === 'staff') {
      for (let s = 1; s <= 10; s++) {
        contentArr.push(
          {
            id: Math.random().toString(),
            image: require('../../assets/images/staff.png'),
            name: 'Nicholas Ikechukwu',
            designation: 'Software Engineer',
            office: 'HOD'
          }
        );
      }
    }
    else if (type === 'courseReps') {
      for (let s = 1; s <= 5; s++) {
        contentArr.push(
          {
            id: Math.random().toString(),
            image: require('../../assets/images/user.png'),
            name: 'Nicholas Ikechukwu',
            level: (s * 100).toString(),
          }
        );
      }
    }
    else if (type === 'halls') {
      for (let s = 1; s <= 5; s++) {
        contentArr.push(
          {
            id: Math.random().toString(),
            image: require('../../assets/images/hall.jpg'),
            name: 'Hall ' + (s).toString(),
            capacity: (s * 75),
          }
        );
      }
    }


    return contentArr;
  };

  const Item = ({ content: { id, name, image, designation, office, level, capacity }, onSelect }) => (
    <TouchCard
      onTouch={onSelect}
      style={{ ...styles.itemCard, maxWidth: styles.itemCard.maxWidth + !!capacity * 100 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Image style={{
          ...styles.listImage,
          width: styles.listImage.width + !!capacity * 100,
          borderRadius: !capacity * 75 + !!capacity* 5,
        }} source={image} />
        {name && <Text style={styles.title}>{name}</Text>}
        {designation && <Text style={styles.title}>{designation}</Text>}
        {office && <Text style={styles.title}>{office}</Text>}
        {level && <Text style={styles.title}>level: {level}</Text>}
        {capacity && <Text style={styles.title}>capacity: {capacity}</Text>}
      </View>
    </TouchCard>
  );
  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <Item content={item} onSelect={() => { }} />
  );

  // const DATA = [
  //   { id: Math.random().toString(), title: 'Department Staff', data: content('staff') },
  //   { id: Math.random().toString(), title: 'Class Reps', data: content('courseReps') },
  //   { id: Math.random().toString(), title: 'Halls and Labs', data: content('halls') }
  // ];
  // console.log(content('staff'));
  return (

    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}

      >

        <View style={styles.welcomeItemContainer}>
          <Card style={styles.welcomeMsgCard}>

            <Text style={styles.welcomeMsgHeader}>
              WELCOME MESSAGE
                </Text>
            <Text style={styles.welcomeMsg}>

              I welcome you to the department of Computer Engineering in the College of Engineering and
              Engineering Technology, Michael Okpara University of Agriculture, Umudike.

              The Department is known for its outstanding academic excellence. We offer undergraduate
              and postgraduate courses which are carefully planned to suit our academic need, and to
              meet the man power requirements for Computer Engineering and Information Communication
              Technology revolution in the country as a whole. The department trained and educates students
              that will be in the fore front of indigenous technological development of the nation,
              predicated on sound theoretical framework and inter-woven with sufficient practical contents
              of exposure. The practical contents of our training are adequate to make our students self-reliant
              and job creators. The philosophy of this department is in line with the overall mandate and
              mission of the University meeting all necessary criteria and peculiarities of the dynamic
              nature of the programme.
                </Text>


          </Card>

        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Staff</Text>
          <FlatList
          showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={content('staff')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Course Reps</Text>
          <FlatList
          showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={content('courseReps')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Halls and Labs</Text>
          <FlatList
          showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={content('halls')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>

    </View>
  );
};

export const screenOptions = (navProps) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'My Department',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#e0e0ff',
  },

  welcomeItemContainer: {
    minHeight: 350,
   // marginBottom: 20,
    backgroundColor: '#f7f7f7',
    borderBottomColor: '#f0f0ff',
    borderBottomWidth: 2,
    padding: 20,

  },

  row: {
    flex: 1,
    height: 350,
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
    color: '#333',

  },
  welcomeMsgCard: {

  },

  welcomeMsgHeader: {
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },

  welcomeMsg: {
    fontFamily: 'OpenSansRegular',
    fontSize: 15,
    textAlign: 'justify',
    color: '#444',
  },

  listImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  listContainer: {
    paddingVertical: 15,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemCard: {
    padding: 0,
    flex: 1,
    height: '100%',
    maxWidth: 200,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginLeft: 25,
  },
  title:{
    fontFamily: 'OpenSansRegular',
    fontSize: 15,
    color: '#333',
  }
});

export default DeptOverviewScreen;










{/* <SectionList
  sections={DATA}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Item title={item} />}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={styles.header}>{title}</Text>
  )}
/> */}


{/* <FlatList
  // {(item, index) => item + index}
  keyExtractor={(item, index) => item.id}
  data={content('halls')}
  renderItem={renderItem}
  horizontal={true}
  style={{ backgroundColor: 'red', height: 400, }}
  contentContainerStyle={styles.listContainer}
/> */}
