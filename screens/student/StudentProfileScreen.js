import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image,
  TouchableOpacity,
  TouchableNativeFeedback, FlatList, Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import SelectOption from '../../components/pointerComponents/SelectOption';
import HeaderBtn from '../../components/UI/HeaderBtn';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';


const StudentProfileScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const Item = ({ content: { courseTitle, courseCode }, onSelect }) => (
    <TouchCard
      onTouch={onSelect}
      style={styles.itemCard}
    >
      <View style={styles.courseInfoContainer}>
        <Text style={styles.courseTitle}>{courseTitle}</Text>
        <Text style={styles.courseCode}>{courseCode}</Text>
      </View>
    </TouchCard>
  );
  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <Item content={item} onSelect={() => { }} />
  );

  const content = (type) => {
    const contentArr = [];
    if (type === 'userCourses') {
      for (let s = 1; s <= 10; s++) {
        contentArr.push(
          {
            id: Math.random().toString(),
            courseTitle: `Robotics`,
            courseCode: `CSE${400 + s}`,
          }
        );
      }
    }
    return contentArr;
  }

  const resultOptions = [
    { id: Math.random().toString(), title: 'Results' },
    { id: Math.random().toString(), title: 'Assessments' },
    { id: Math.random().toString(), title: 'General Attendance' },
    { id: Math.random().toString(), title: 'CGPA Calculator' },

  ];


  const selectOptionHandler = (optionData) => {
    console.log(optionData.title);
  };
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={{ ...styles.imageRow, }}>
          <Text style={styles.rowLabel}>Account</Text>
          <View style={{ ...styles.profileImageContainer }}>
            <TouchableCmp onPress={() => { console.log('working') }} style={styles.touchCard}>
              {/* showCard ={false}  */}

              <Image style={styles.profileImage} source={require('../../assets/images/user.png')} />

            </TouchableCmp>
          </View>

        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>My Courses</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={content('userCourses')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>My Applications</Text>
          <View style={styles.courseActions}>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'ios-create' : 'ios-create'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Register</Text>
            </View>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'ios-hand' : 'ios-hand'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Pending</Text>
            </View>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Registered</Text>
            </View>

          </View>
          <View style={styles.courseActions}>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Approved</Text>
            </View>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Add/Drop</Text>
            </View>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => { }}
                style={styles.touchCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-attach' : 'ios-attach'}
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              </TouchCard>
              <Text style={styles.actionLabel}>Apply For Excess</Text>
            </View>

          </View>

        </View>

        <View style={{ ...styles.row, }}>
          <Text style={styles.rowLabel}>Reports</Text>
          <View style={styles.courseActions}>
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[0]}
              color={'#e5ffd5'} onSelect={selectOptionHandler} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[1]}
              color={'#e5ffd5'} onSelect={selectOptionHandler} />
          </View>

          <View style={styles.courseActions}>
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[2]}
              color={'#e5ffd5'} onSelect={selectOptionHandler} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[3]}
              color={'#e5ffd5'} onSelect={selectOptionHandler} />
          </View>
        </View>
      </ScrollView>
    </View >
  );
};


export const screenOptions = (navProps) => {
  const editIcon = Platform.OS == 'android' ? 'md-create' : 'ios-create';
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'My Profile',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>

          <Item
            tile='Edit Profile'
            iconName={editIcon}
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
    backgroundColor: '#ffffee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#e0e0ff',
  },
  imageRow: {
    flex: 1,
    height: 250,
    borderTopColor: '#fff',
    borderBottomColor: '#f0f0ff',
    // borderTopWidth: 3,
    // borderBottomWidth: 3,
    backgroundColor: '#f7f7ff',
    paddingVertical: 10,

  },
  row: {
    flex: 1,
    //maxHeight: 350,
    borderTopColor: '#fff',
    borderBottomColor: '#f0f0ff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f7f7ff',
    //backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    
  },
  rowLabel: {
    marginLeft: 25,
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    alignSelf: 'flex-start',
    color: "#555",
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 1000,
  },
  listContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemCard: {
    flex: 1,
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    marginLeft: 25,
    borderRadius: 15,

  },
  courseInfoContainer: {
    flex: 1,
    padding: 20,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTitle: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
    color: Colors.primary,
  },
  courseCode: {
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    color: '#777',
  },
  courseActions: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    //backgroundColor: 'red',
    maxWidth: 600,
    //alignItems: 'center',

  },
  courseActionContainer: {
    alignItems: 'center',
    //backgroundColor: 'blue',
    width: '25%',
    maxWidth: 200,
  },
  touchCard: {
    borderRadius: 30,
    width: '100%'
  },
  actionIconContainer: {
    padding: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'OpenSansBold',
    fontSize: 15,
    color: '#777',
  },
  selectOption: {
    //width: '%',
    maxWidth: 250,
  },

});



export default StudentProfileScreen;