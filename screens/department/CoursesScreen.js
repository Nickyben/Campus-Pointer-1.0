import React, { useState, useEffect, useCallback } from 'react';
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
import { fetchDeptData } from '../../store/actions/dataActions';
import { markCourse, markAllCourses } from '../../store/actions/courseAppActions';


const MyItem = ({ Register, content, content: { id, courseTitle, courseCode, creditUnits }, onSelect, style }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const _dispatch = useDispatch();
  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);

  useEffect(() => {
    if (markedCourses.includes(content)) {
      setIsMarked(prev => true);
      setIsClicked(p => false);
    } else {
      setIsMarked(prev => false);
      setIsClicked(p => false);
    }
  }, [markedCourses])

  useEffect(() => {
    if (isMarked && isClicked) {
      _dispatch(markCourse(content, true));
    }
    if (!isMarked && isClicked) {
      _dispatch(markCourse(content, false))
    }
  }, [isMarked, isClicked]);


  return (

    <View style={{ ...styles.courseRowContainer, }}>
      <Touch style={{ ...styles.courseRow, ...style }} onTouch={() => { onSelect(id) }}>
        {Register &&
          <View style={{ flex: styles.listText.flex / 1.5, marginLeft: 0, alignItems: 'flex-start' }}>
            <TouchIcon
              onTouch={() => { setIsMarked(prev => !prev); setIsClicked(p => true) }}
              touched={() => isMarked}// || markedCourses.includes(content)}
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

const SectionItem = ({ onCollapse, courses, title, Register, showingSection }) => {//hiddenSections
  const [isMarked, setIsMarked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  // const [isCollapsed, setIsCollapsed] = useState(hiddenSections.includes(title));
  // const [isTapped, setIsTapped] = useState(false);


  const _dispatch = useDispatch();
  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);

  useEffect(() => {
    if (courses.every(course => markedCourses.includes(course))) {
      setIsMarked(prev => true);
      setIsClicked(p => false);
    } else {
      setIsMarked(prev => false);
      setIsClicked(p => false);
    }
  }, [markedCourses])

  useEffect(() => {
    if (isMarked && isClicked) {
      _dispatch(markAllCourses(courses, true));
    }
    if (!isMarked && isClicked) {
      _dispatch(markAllCourses(courses, false));
    }
  }, [isMarked, isClicked]);


  // useEffect(() => {
  //   if (isCollapsed && isTapped) {
  //     onCollapse(title);
  //   }
  //   if (!isCollapsed && isTapped) {
  //     onCollapse(title);
  //   }
  // }, [isCollapsed, isTapped]);




  const [showSection, setShowSection] = useState(false);

  const showSectionHandler = (title) => {
    showSection === true ?
      onCollapse('empty') :
      onCollapse(title);
  }

  useEffect(() => {
    setShowSection(p => showingSection === title);
  }, [showingSection]);

  return (
    <View style={{ backgroundColor: Colors.switchPrimary }}>
      <View style={{
        ...styles.sectionHeader,
        borderBottomColor: !showSection ? '#e3e6e7' : Colors.switchPrimary,
        borderBottomWidth: !showSection ? .8 : 0,
      }}>
        <View style={{
          ...styles.sectionHeaderWrap,
        }}>
        {Register &&
          <View style={{ marginLeft: 10, alignItems: 'flex-start' }}>
            <TouchIcon
              onTouch={() => { setIsMarked(p => !p); setIsClicked(p => true) }}
              touched={() => isMarked} //|| courses.every(course => markedCourses.includes(course))}
              name={Ionicons}
              size={24}
              color={Colors.switchWhite}
              toggleIcons={['square-outline', 'checkbox-outline']}
            >
            </TouchIcon>
          </View>}
        <Text style={styles.sectionHeaderLabel}>{title}</Text>
        <TouchIcon
          onTouch={showSectionHandler.bind(this,title)}//setIsCollapsed(p => !p); setIsTapped(p => true) }}
          touched={() => !showSection} //hiddenSections.includes(title)}
          name={Ionicons}
          size={23}
          color={Colors.switchWhite}
          toggleIcons={['arrow-dropdown-circle', 'arrow-dropright-circle']}
        >
        </TouchIcon>
      </View>
        
      </View>
      {showSection //(!hiddenSections.includes(title) && courses.length !== 0)
        && <View style={{ backgroundColor: '#f7f7f7', borderTopLeftRadius: 50, height: 50, width: '100%' }}></View>}
      {showSection && courses.length === 0// && !hiddenSections.includes(title)
        &&
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











const CoursesScreen = ({ navig, source, submitCourses }) => {
  const dispatch = useDispatch();
  const loadCourses = useCallback(async () => {
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
    const unsubscribe = navig.addListener('focus', loadCourses);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadCourses]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadCourses().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadCourses]);
  const title = source ? source.title : null;
  const studentId = source ? source.studentId : null;
  const registeredCourses = useSelector(state => state.courseAppReducer.registeredCourses);
  const courses = useSelector(state => state.dataReducer.availableCourses);

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

  const DATA = dataArr;

  let Register = false;
  let COURSES = DATA;
  if (title === 'Register') {
    Register = true;
    //these should be the presentCourses(ie failed and current level),here we just excluded  eg 500 level which is a higher level
    COURSES = DATA.filter(section => section.data.find(course => course.courseLevel <= 400));
  }
  // const [hiddenSections, setHiddenSections] = useState(COURSES.map(
  //   section => section.title !== COURSES[0].title &&  //COURSES[O] Should be replaced with the student's(user's) current level section
  //     section.title
  // ));
  // const hideSectionHandler = (title) => {
  //   setHiddenSections(prevTitles =>
  //     prevTitles.includes(title) ?
  //       [...hiddenSections].filter(section => section !== title) :
  //       hiddenSections.concat(title)
  //   );
  // };

  const displayCourseHandler = (id) => {
    navig.navigate('CourseDetails', { courseId: id })
  };


  const markedCourses = useSelector(state => state.courseAppReducer.markedCourses);

  const [showingSection, setShowingSection] = useState(COURSES[0].title);
  console.log(showingSection)

  const titleHandler = (title) => {
    setShowingSection(p => title);
  }



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
      showingSection !== title ?// hiddenSections.includes(title) ?
        <></> :
        <MyItem Register={Register} content={item} onSelect={displayCourseHandler} style={styler} />
    )
  };

  const renderSectionHeader = ({ section: { title, data } }) => {
    return (
      <SectionItem
        Register={Register}
        courses={data}
        title={title}

        onCollapse={titleHandler}
        showingSection={showingSection}
      //hiddenSections={hiddenSections}
      //onCollapse={() => { hideSectionHandler(title) }}
      />
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
        //initialNumToRender={25}
        sections={COURSES}
        keyExtractor={(item, index) => item + index}
        renderItem={(renderItem)}
        renderSectionHeader={renderSectionHeader}
        extraData={{ markedCourses, showingSection }}
      //ListEmptyComponent={listEmptyComponent}
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
   paddingHorizontal:20,
    
    // borderBottomWidth: 0.1,

  },
  sectionHeaderWrap:{ 
    width:'100%',
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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