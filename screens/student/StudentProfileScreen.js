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
import courses from '../../data/courses';

//this should be courses for the present level and courses failed in past (check Student MODEL) ie Student.present
//and this should be collected at the register/courseApp screen(s)
const userCourses = courses.filter(c => c.courseLevel === 400);


const StudentProfileScreen = ({ navigation }) => {
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
    <Item
      content={item}
      onSelect={() => {
        navigation.navigate(
           'CourseDetails',
           {
              courseId: item.id
            }
        )
      }} />
  );



  const resultOptions = [
    { id: Math.random().toString(), title: 'Results' },
    { id: Math.random().toString(), title: 'Assessments' },
    { id: Math.random().toString(), title: 'General Attendance' },
    { id: Math.random().toString(), title: 'CGPA Calculator' },

  ];


  const selectOptionHandler = (optionData) => {
    //console.log(optionData.title);
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
            data={userCourses}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Course Applications</Text>
          <View style={styles.courseActions}>
            <View style={styles.courseActionContainer}>
              <TouchCard
                onTouch={() => {
                  navigation.navigate(
                    'CourseApplications',
                    {
                      title: 'Register', studentId: '...'
                    }
                  )
                }}
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
                onTouch={() => {
                  navigation.navigate(
                    'CourseApplications',
                    {
                      title: 'Registered', studentId: '...'
                    }
                  )
                }}
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
              data={resultOptions[0]} icon='analytics'
              color={'#ffdd15'} onSelect={selectOptionHandler} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[1]} icon='stats'
              color={'#44ffb0'} onSelect={selectOptionHandler} />
          </View>

          <View style={styles.courseActions}>
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[2]} icon='pie'
              color={'#ff55dd'} onSelect={selectOptionHandler} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[3]} icon='calculator'
              color={'#55a5ff'} onSelect={selectOptionHandler} />
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
    backgroundColor: '#fff',
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
    // borderTopColor: '#fff',
    borderBottomColor: '#e7e7e7',
    // borderTopWidth: 3,
    // borderBottomWidth: 3,
    backgroundColor: '#efefef',
    paddingVertical: 10,

  },
  row: {
    flex: 1,
    //maxHeight: 350,
    borderTopColor: '#fdfdfd',
    borderBottomColor: '#ededed',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f5f5f5',
    //backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,

  },
  rowLabel: {
    marginLeft: 25,
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    alignSelf: 'flex-start',
    color: "#222",
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
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
    //paddingVertical: 5,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    justifyContent: 'space-between',

    alignItems: 'center',
    // backgroundColor: 'red',
  },
  courseTitle: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
    //marginBottom: 10,
    //backgroundColor: 'blue',
  },
  courseCode: {
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    color: '#444',
    textAlign: 'center',
    //backgroundColor: 'blue',
  },
  courseActions: {
    flex: 1,
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
    //alignItems: 'center',
    //backgroundColor: 'blue',
    width: '25%',
    maxWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#444',
  },
  selectOption: {
    //width: '%',
    maxWidth: 250,
  },

});



export default StudentProfileScreen;