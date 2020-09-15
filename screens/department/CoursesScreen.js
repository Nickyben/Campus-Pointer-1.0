import React, { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function
import {
  StyleSheet, ScrollView, SectionList, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';
import courses from '../../data/courses';
import { markCourse, markAllCourses } from '../../store/actions/courseAppActions';

//LOOK FOR A BETTER WAY TO OPTIMIZE(make faster) THE SECTION COLLAPSE ACTION
const Data = () => {
  let dataArr = [];
  const deptLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'];
  const levels = ['100', '200', '300', '400', '500'];
  for (let i = 1; i <= deptLevels.length; i++) {

    dataArr.push(
      {
        title: deptLevels[i - 1],
        data: courses.filter(c => { return (c.courseLevel === parseInt(levels[i - 1])) }),
      }
    );
  }

  return dataArr;
};
const DATA = Data();

const CoursesScreen = ({ navig, source, submitCourses }) => {
  const registeredCourses = useSelector(state => state.courseAppReducer.registeredCourses);
  const dispatch = useDispatch();
  const title = source ? source.title : null;
  const studentId = source ? source.studentId : null;


  let Register = false;
  let COURSES = DATA;
  if (title === 'Register') {
    Register = true;
    //this should be the presentCourses,here we just excluded 500 level which is a higher level
    COURSES = DATA.filter(section => section.data.find(course => course.courseLevel <= 400));
  }
  const [hiddenSections, setHiddenSections] = useState([]);
  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);
  const hideSectionHandler = (title) => {
    setHiddenSections(prevTitles =>
      prevTitles.includes(title) ?
        [...hiddenSections].filter(elem => elem !== title) :
        hiddenSections.concat(title)
    );
  };

  const displayCourseHandler = (id) => {
    navig.navigate('CourseDetails', { courseId: id })
  };


  const MyItem = ({ content, content: { id, courseTitle, courseCode, creditUnits }, onSelect, style }) => {
    return (

      <View style={{ ...styles.courseRowContainer, }}>
        <Touch style={{ ...styles.courseRow, ...style }} onTouch={() => { onSelect(id) }}>
          {Register &&
            <View style={{ flex: styles.listText.flex / 1.5, marginLeft: 0, alignItems: 'flex-start' }}>
              <TouchIcon
                onTouch={() => { dispatch(markCourse(content)) }}
                touched={() => markedCourses.includes(content)}
                name={Ionicons}
                size={22}
                color={Colors.accent2}
                toggleIcons={['square-outline', 'checkbox-outline']}
              >
              </TouchIcon>
            </View>}
          <Text style={{ ...styles.listText, textAlign: 'left', color: Colors.primary, fontSize: 15, }}>{courseCode}</Text>
          <Text numberOfLines={2} style={{ ...styles.listText, flex: 3, textAlign: 'left', }}>{courseTitle}</Text>
          <Text style={{ ...styles.listText, color: Colors.accent2, textAlign: 'center', fontSize: 15, }}>{creditUnits} Units</Text>

        </Touch>
      </View>

    )
  };

  const renderItem = ({ item, index, section: { title, data } }) => { //auto gets data in obj form , I deStructured it in params
    const courseItem = {
      even: {
        backgroundColor: '#fff'
      },
      odd: {
        backgroundColor: Colors.primary + '04'
      }
    }

    const styler = index % 2 === 0 ? courseItem.even : courseItem.odd;

    return (
      hiddenSections.includes(title) ?
        <></> :
        <MyItem content={item} onSelect={displayCourseHandler} style={styler} />
    )
  };

  const renderSectionHeader = ({ section: { title, data } }) => {
    const courses = data//.map(course => course)//.courseCode);
    return (
      <View style={{ backgroundColor: Colors.switchPrimary }}>
        <View style={styles.sectionHeader}>
          {Register &&
            <View style={{ marginLeft: 10, alignItems: 'flex-start' }}>
              <TouchIcon
                onTouch={() => { dispatch(markAllCourses(courses)); }}
                touched={() => courses.every(course => markedCourses.includes(course))}
                name={Ionicons}
                size={24}
                color={Colors.primary}
                toggleIcons={['square-outline', 'checkbox-outline']}
              >
              </TouchIcon>
            </View>}
          <Text style={styles.sectionHeaderLabel}>{title}</Text>
          <TouchIcon
            onTouch={() => { hideSectionHandler(title) }}
            touched={() => hiddenSections.includes(title)}
            name={Ionicons}
            size={23}
            color={Colors.switchWhite}
            toggleIcons={['arrow-dropdown-circle', 'arrow-dropright-circle']}
          >
          </TouchIcon>
        </View>
        {(!hiddenSections.includes(title) && data.length !== 0) && <View style={{ backgroundColor: '#f7f7f7', borderTopLeftRadius: 50, height: 50, width: '100%' }}></View>}
        {data.length === 0 &&
          <View style={{
            backgroundColor: '#f7f7f7',
            width: '100%',
            padding: 20,
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: 'OpenSansBold',
              fontSize: 16,
              color: '#555',
              textAlign: 'center',
            }}>
              No courses are available for this section.
            </Text>
          </View>
        }
      </View>

    )
  };

  if (title === 'Registered') {
    const deptLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'];
    const levels = ['100', '200', '300', '400', '500'];
    let dataArr = [];
    for (let i = 1; i <= deptLevels.length; i++) {
      dataArr.push(
        {
          title: deptLevels[i - 1],
          data: registeredCourses.filter(course => course.courseLevel === parseInt(levels[i - 1]))
        }
      );
    }

    COURSES = dataArr;

  }


  return (
    <View style={styles.screen}>
      <SectionList
        sections={COURSES}
        keyExtractor={(item, index) => item + index}
        renderItem={(renderItem)}
        renderSectionHeader={renderSectionHeader}
        extraData={{ markedCourses, hiddenSections }}
      />

    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  sectionHeader: {
    backgroundColor: Colors.switchPrimary,
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#d7d7d7',
    // borderBottomWidth: 0.1,

  },
  sectionHeaderLabel: {
    fontFamily: 'OpenSansBold',
    fontSize: 24,
    color: Colors.switchWhite,
    marginRight: 10,

  },
  courseRowContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',

  },
  courseRow: {
    //backgroundColor: 'green',
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
  },
  listText: {
    marginLeft: 10,
    //: 'green',
    flex: 1,
    fontFamily: 'OpenSansBold',
    fontSize: 15,
    color: '#333',
  }

});

export default CoursesScreen;