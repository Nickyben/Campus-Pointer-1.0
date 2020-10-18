import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
import { fetchDeptData } from '../../store/actions/dataActions';

//this should be courses for the present level and courses failed in past (check Student MODEL) ie Student.present
//and this should be collected at the register/courseApp screen(s)


let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}

const _Item = ({ content: { courseTitle, courseCode }, onSelect }) => (
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

const StudentProfileScreen = ({ navigation }) => {
  const studentUser = useSelector(state => state.dataReducer.availableStudents
  ).find(s => s.id === 'studentUserId');
  const presentCourses = useSelector(state => state.dataReducer.availableCourses)
    .filter(c => c.courseLevel === +studentUser.level)

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchDeptData());

    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadData]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadData().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadData]);

  const {id, regNumber, department, level, faculty, image} = studentUser ? studentUser : {};//presentCourses
  const details = [
    ['Reg. No.', regNumber], ['Level', level], ['Faculty', faculty], ['Department', department],
    ['Session', '2020/2021'],
  ];

  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <_Item
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
    { id: Math.random().toString(), title: 'CGPA Tracker' },

  ];


  const selectOptionHandler = (screen, params) => {
    navigation.navigate(
      screen, params
    )
  }


  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={{ ...styles.imageRow, }}>
          <Text style={styles.rowLabel}>Student Account</Text>
          <View style={{ ...styles.profileImageContainer }}>
            <TouchableCmp onPress={() => { }} style={styles.touchCard}>

              <Image style={styles.profileImage} source={image} />

            </TouchableCmp>
          </View>
          <View style={styles.profileDetails}>
            {details.map((d, i) => {
              return (
                <View key={i} style={styles.detailContainer}>
                  <Text style={styles.titleText}>{d[0]}: </Text>
                  <Text style={styles.detailsText}>{d[1]}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>My Courses</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={presentCourses}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={{...styles.row, ...styles.courseActionsRow}}>
          <Text style={styles.rowLabel}>Course Applications</Text>
          <View style={styles.courseActions}>
            <View style={styles.courseActionContainer}>
              <TouchCard
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Register', studentId: id
                  })
                }

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
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Registered', studentId: id
                  })
                }
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

            <View style={styles.courseActionContainer}>
              <TouchCard
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Add/Drop', studentId: id
                  })
                }
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

          </View>





          <View style={styles.courseActions}>

            <View style={styles.courseActionContainer}>
              <TouchCard
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Apply For Excess', studentId: id
                  })
                }
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

            <View style={styles.courseActionContainer}>
              <TouchCard
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Pending', studentId: id
                  })
                }
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
                disableCard
                onTouch={
                  selectOptionHandler.bind(this, 'CourseApplications', {
                    title: 'Approved', studentId: id
                  })
                }
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


          </View>

        </View>

        <View style={{ ...styles.row, ...styles.courseActionsRow, borderBottomWidth:0, }}>
          <Text style={styles.rowLabel}>Reports</Text>
          <View style={{
            ...styles.courseActions, paddingHorizontal: '3%', marginTop: 10,
          }}>
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[0]} icon='analytics'
              color={'#ffdd15'} onSelect={selectOptionHandler.bind(this, 'StudentReports', {
                title: 'Results', studentId: id
              })} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[1]} icon='stats'
              color={'#44ffb0'} onSelect={selectOptionHandler.bind(this, 'StudentReports', {
                title: 'Assessments', studentId: id
              })} />
          </View>

          <View style={{
            ...styles.courseActions, paddingHorizontal: '3%', marginTop: 10,
          }}>
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[2]} icon='pie'
              color={'#ff55dd'} onSelect={selectOptionHandler.bind(this, 'StudentReports', {
                title: 'General Attendance', studentId: id
              })} />
            <SelectOption
              style={styles.selectOption}
              data={resultOptions[3]} icon='calculator'
              color={'#55a5ff'} onSelect={selectOptionHandler.bind(this, 'StudentReports', {
                title: 'CGPA Tracker', studentId: id
              })} />
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
    //height: 250,
    // borderTopColor: '#fff',
    borderBottomColor: '#cacccf',
    // borderTopWidth: 3,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 10,

  },
  row: {
    flex: 1,
    //maxHeight: 350,
    borderTopColor: '#fdffff',
    //borderBottomColor: '#eaecef',
    borderBottomColor: '#cacccf',
    borderTopWidth: 2,
    borderBottomWidth: 1,
    backgroundColor: '#f3f6f7',//'#f5f5f5',
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
    paddingVertical: 20,
    borderBottomColor: '#fdffff',
    borderBottomWidth: 1,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  profileDetails: {
    width: '100%',
    padding: 20,
    paddingVertical: 15,
    paddingTop: 30,
    borderTopRightRadius: 70,//please set this wrt screen dimensions
    borderTopLeftRadius: 70,//please set this wrt screen dimensions
    backgroundColor: '#f3f6f7',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 7,
    borderRadius: 10,
  },
  titleText: {
    flex: 1,
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: Colors.primary,
  },
  detailsText: {
    flex: 1,
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#333'
  },
  listContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemCard: {
    flex: 1,
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    marginRight: 10,
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
  courseActionsRow:{
    paddingBottom: 20,
  },
  courseActions: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    //backgroundColor: 'red',
    maxWidth: 600,
    //alignItems: 'center',
  },
  courseActionContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '30%',
    maxWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCard: {
    borderRadius: 20,
    width: '100%'
  },
  actionIconContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    marginTop: 0,
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