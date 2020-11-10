import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, Platform,
  View, Text, ScrollView

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../../components/UI/HeaderBtn';
import FacultyOverviewScreen from '../../screens/pointerApp/FacultyOverviewScreen'
import { fetchDeptData } from '../../store/actions/dataActions';
import Colors from '../../constants/Colors';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import TouchIcon from '../../components/UI/TouchIcon';

const defaultNavOptions = (props) => {
  //console.log(props);
  return ({

    headerTitle: 'Pointer',
    headerTitleStyle: {
      fontFamily: 'OpenSansBold',
    },

    headerBackTitleStyle: {//for the back button text...seen in ios
      fontFamily: 'OpenSansRegular',
    },
    headerStyle: {
      backgroundColor: Colors.switchPrimary,
    },
    headerTintColor: Colors.switchWhite,
    headerTitleAlign: 'center',

  })
};


const PeriodComponent = ({ day, p, index, onNavigate, showingTitle, hideOthers }) => {
  const [showCourseTitle, setShowCourseTitle] = useState(false);

  const courseTitleHandler = (index) => {
    showCourseTitle === true ?
      hideOthers('') :
      hideOthers(index);
  }

  useEffect(() => {
    setShowCourseTitle(p => showingTitle === index);
  }, [showingTitle]);

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const to_date = new Date().toDateString();
  const todayTimeStamp = +(new Date().getTime());
  const today = to_date.split(' ')[0];
  const diff = weekdays.indexOf(day) - weekdays.indexOf(today);
  const thatDayTimeStamp = todayTimeStamp + (diff * 24 * 60 * 60 * 1000)
  const thatDay = new Date(thatDayTimeStamp).toDateString();
  const isToday = thatDay === to_date;

  const hourNow = new Date().getHours();
  const meridian = hourNow >= 12 ? 'pm' : 'am';
  const currentHour = hourNow > 12 ? (hourNow - 12) + meridian : hourNow + meridian;
  const periodHour = p.time.split(' - ')[0];

  const isPresentPeriod = (currentHour === periodHour) && isToday;

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '2%', backgroundColor: p.color, height: '100%' }}></View>
        <View style={{
          ...styles.periodContainer,
          backgroundColor: isPresentPeriod ? p.color + '22' : '#fff',
          borderColor: isPresentPeriod ? p.color + '22' : '#e3e6e7',
        }} >

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text
              onPress={onNavigate.bind(this, p.course.id, 'course', p.course)}
              style={{ ...styles.periodText, marginRight: 5, color: '#00a7e7' }}>{p.course.courseCode}
            </Text>

            <TouchIcon
              //name='arrow-dropdown'
              touched={() => showCourseTitle && showingTitle === index }
              toggleIcons={['arrow-dropright', 'arrow-dropdown']}
              size={23}
              color={p.color}
              onTouch={courseTitleHandler.bind(this, index)}
            />
          </View>

          <Text style={{ ...styles.periodText2, color: '#777' }}>{p.time}</Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text onPress={onNavigate.bind(this, p.venue.id, 'hall', p.venue)}
              style={{ ...styles.periodText2, marginRight: 5, }}>{p.venue.fullName}</Text>
            <TouchIcon
              name='arrow-dropright'
              size={23}
              color={p.color}
              onTouch={onNavigate.bind(this, p.venue.id, 'hall', p.venue)}
            />
          </View>

        </View>

      </View>

      {
        showCourseTitle && showingTitle === index &&
        <View style={{ backgroundColor: p.color }}>
          <Text
            onPress={onNavigate.bind(this, p.course.id, 'course', p.course)}
            style={{
              ...styles.periodText,
              width: '100%',
              backgroundColor: p.color, padding: 15, paddingLeft: 40,
              marginRight: 5,
              color: '#f3f6f7'
            }}>Course Title: {p.course.courseTitle}
          </Text>
        </View>

      }
    </>
  );
}

const TableComponent = ({ day, periods, navig }) => {
  const [showTitle, setShowTitle] = useState(-1);

  const titlesHandler = (index) => {
    //console.log(index+ 'da')
    setShowTitle(p => index);
  }

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const to_date = new Date().toDateString();
  const todayTimeStamp = +(new Date().getTime());
  const today = to_date.split(' ')[0];
  const isWeekend = weekdays.indexOf(today) > 4;
  const diff = !isWeekend ? weekdays.indexOf(day) - weekdays.indexOf(today) :
    weekdays.indexOf(day) - weekdays.indexOf(today) + 7;
  const thatDayTimeStamp = todayTimeStamp + (diff * 24 * 60 * 60 * 1000)
  const thatDay = new Date(thatDayTimeStamp).toDateString();
  const isToday = thatDay === to_date;
  const hourNow = new Date().getHours();
  const meridian = hourNow >= 12 ? 'pm' : 'am';
  const currentHour = hourNow > 12 ? (hourNow - 12) + meridian : hourNow + meridian;


  const presentPeriod = periods.find(p => {
    const periodHour = p.time.split(' - ')[0];
    return (currentHour === periodHour) && isToday;
  })

  const presentPeriodColor = presentPeriod && presentPeriod.color;
  const navigateHandler = (itemId, type, item) => {
    if (type === 'course') {
      navig.navigate('CourseDetails', { courseId: itemId })
    } else {
      navig.navigate('DeptDetails', { itemId: itemId, title: item.constructor.name })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.bar}>
        <View style={{ padding: 15, backgroundColor: Colors.primary }}>
          <Text style={{ ...styles.barText, color: '#fff' }}>{isToday ? 'Today - ' : ''}{thatDay}</Text>
        </View>
        <View style={styles.iconsBar}>
          {[['Courses', 'list'], ['Schedule Time', 'time'], ['Venue', 'business']]
            .map((item, i) =>
              <View key={i} style={styles.iconContainer}>
                <Ionicons
                  name={
                    Platform.OS === 'android' ? `md-${item[1]}` : `ios-${item[1]}`
                  }
                  size={23}
                  color={presentPeriodColor && item[1] === 'time' ? presentPeriodColor : Colors.primary}
                />
                <Text
                  style={{
                    ...styles.barText2, marginTop: 5, color: presentPeriodColor && item[1] === 'time' ? presentPeriodColor : styles.barText2.color
                  }}>{item[0]}</Text>
              </View>
            )
          }
        </View>
      </View>

      <ScrollView style={{
        backgroundColor: '#fafcfd',
        paddingTop: 20,
        paddingBottom: 20,
      }}>
        {periods.map((p, i) =>
          <PeriodComponent
            key={i}
            index={i}
            day={day}
            p={p}
            onNavigate={navigateHandler}
            showingTitle={showTitle}
            hideOthers={titlesHandler}
          />
        )}
      </ScrollView>

    </View>
  );
}


const TimetableScreen = ({ navig }) => {

  const lecturesTimetable = useSelector(s => s.dataReducer.availableTimetables
    .find(t => (t.timetableType === 'Lectures') && (t.department === 'Computer Engineering')));
    

  const daysRowsArr = lecturesTimetable?lecturesTimetable.dayRows :[]; //an obj

  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchDeptData());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navig.addListener('focus', loadData);
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
    , [loadData]);




  const TimeTableTabNav = createMaterialTopTabNavigator();

  const to_date = new Date().toDateString();
  const today = to_date.split(' ')[0];
  return (

    daysRowsArr.length !== 0 &&

    <TimeTableTabNav.Navigator initialRouteName={today} //screenOptions={defaultTabStacksOpts}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: '#246',
        indicatorStyle: {
          backgroundColor: Colors.primary,
        },
        // activeBackgroundColor: 'white',
        // inactiveBackgroundColor: '#effdff',
        showIcon: false,
        showLabel: true,
        // tabStyle:{

        // },
        labelStyle: {
          fontFamily: 'OpenSansBold',
          fontSize: 12,
        }
      }}>



      <TimeTableTabNav.Screen
        name={daysRowsArr[0].day}
      >
        {
          () => <TableComponent navig={navig} day={daysRowsArr[0].day} periods={daysRowsArr[0].periods} />
        }
      </TimeTableTabNav.Screen>

      <TimeTableTabNav.Screen
        name={daysRowsArr[1].day}
      >
        {
          () => <TableComponent navig={navig} day={daysRowsArr[1].day} periods={daysRowsArr[1].periods} />
        }
      </TimeTableTabNav.Screen>

      <TimeTableTabNav.Screen
        name={daysRowsArr[2].day}
      >
        {
          () => <TableComponent navig={navig} day={daysRowsArr[2].day} periods={daysRowsArr[2].periods} />
        }
      </TimeTableTabNav.Screen>

      <TimeTableTabNav.Screen
        name={daysRowsArr[3].day}
      >
        {
          () => <TableComponent navig={navig} day={daysRowsArr[3].day} periods={daysRowsArr[3].periods} />
        }
      </TimeTableTabNav.Screen>

      <TimeTableTabNav.Screen
        name={daysRowsArr[4].day}
      >
        {
          () => <TableComponent navig={navig} day={daysRowsArr[4].day} periods={daysRowsArr[4].periods} />
        }
      </TimeTableTabNav.Screen>

    </TimeTableTabNav.Navigator>

  )

};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  barText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#555',
  },
  barText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 12,
    color: Colors.primary,//'#444',//
  },
  iconsBar: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f3f6f7',
    borderBottomWidth: 1,
  },
  iconContainer: {
    // paddingVertical:20,
    // width:'33%',
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  periodContainer: {
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#fff',//'#f3f6f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    // borderLeftWidth: 10,
    borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
  periodText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    //color: '#333',
  },
  periodText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#333',
  },
});

export default TimetableScreen;
