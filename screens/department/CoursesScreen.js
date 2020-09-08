import React, { useState } from 'react';
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
import Course from '../../models/course';
import Touch from '../../components/UI/Touch';

const content = (level) => {
  const contentArr = [];

  for (let s = 1; s <= 9; s++) {
    contentArr.push(
      new Course(
        Math.random().toString(),
        s % 2 === 0 ?
          'Introduction to Artificial Intelligence - Course ' + +(s) :
          'Advanced Computer Programming  - Course ' + +(s),
        'CSE' + ((100 * level) + +(10) + +s),
        'Course Outline For ' + 'Course ' + s,
        s % 2 === 0 ? 2 : 3,
        (100 * level),
        'First',
        'Dr. Ikechukwu, Nicholas',
        [],
      )
    );
  }

  for (let s = 1; s <= 9; s++) {
    contentArr.push(
      new Course(
        Math.random().toString(),
        s % 3 === 0 ?
          'Introduction to Artificial Intelligence - Course ' + +(s + 10) :
          ' Digital System Networks  - Course ' + +(s + 10),
        'CSE' + ((100 * level) + +(20) + +s),
        'Course Outline For ' + 'Course ' + +(s + 10),
        s % 4 === 0 ? 2 : 3,
        (100 * level),
        'Second',
        'Dr. Ikechukwu, Nicholas',
        [],
      )
    );
  }
  return contentArr;
};



const DATA = () => {
  let dataArr = [];
  const deptLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'];
  for (let i = 1; i <= deptLevels.length; i++) {
    dataArr.push(
      {
        title: deptLevels[i - 1],
        data: content(i),
      }
    );
  }
  return dataArr;
};
const MyItem = ({ content: { courseTitle, courseCode, creditUnits }, onSelect, style }) => {
  return (
    <View style={styles.courseRowContainer}>
      <View style={{ ...styles.courseRow, ...style }}>
        <Text style={{ ...styles.listText, color: Colors.primary, fontSize: 15, }}>{courseCode}</Text>
        <Text style={{ ...styles.listText, }}>{courseTitle}</Text>
        <Text style={{ ...styles.listText, color: Colors.accent2, fontSize: 15, }}>{creditUnits} Units</Text>
      </View>
    </View>

  )
};



const CoursesScreen = (props) => {
  const [hideSection, setHideSection] = useState(false);
  const [hiddenSections, setHiddenSections] = useState([]);

  const hideSectionHandler = (title) => {

    setHiddenSections(prevTitles =>
      prevTitles.includes(title) ?
        [...hiddenSections].filter(elem => elem !== title) :
        hiddenSections.concat(title)
    );
    ;
  };

  const renderItem = ({ item, index, section: { title } }) => { //auto gets data in obj form , I deStructured it in params
    const courseItem = {
      even: {
        backgroundColor: '#fff'
      },
      odd: {
        backgroundColor: '#f2f8fb'
      }
    }

    const styler = index % 2 === 0 ? courseItem.even : courseItem.odd;

    return (
      hiddenSections.includes(title) ?
        <View></View> :
        <MyItem content={item} onSelect={() => { }} style={styler} />
    )
  };

  const renderSectionHeader = ({ section: { title } }) => (

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderLabel}>{title}</Text>
      <View style={{
        borderRadius: 20,
        overflow: 'hidden'
      }}>
        <Touch
          onTouch={() => { hideSectionHandler(title) }}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Ionicons
            name={
              hiddenSections.includes(title) ?
                Platform.OS === 'android' ? 'md-arrow-dropright-circle' : 'ios-arrow-dropright-circle' :
                Platform.OS === 'android' ? 'md-arrow-dropdown-circle' : 'ios-arrow-dropdown-circle'
            }
            size={23}
            color={'#fff'}
          />
        </Touch>

      </View>
    </View>

  );
  return (
    <View style={styles.screen}>
      <SectionList
        sections={DATA()}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        initialNumToRender={0}
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
    backgroundColor: Colors.primary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#d7d7d7',
    borderBottomWidth:1,

  },
  sectionHeaderLabel: {
    fontFamily: 'OpenSansBold',
    fontSize: 24,
    color: 'white',
    marginRight: 10,

  },
  courseRowContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  courseRow: {
    flexDirection: 'row',
    padding: 15,
    // paddingLeft: 20,
    justifyContent: 'space-between'
  },
  listText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#555',
  }

});

export default CoursesScreen;