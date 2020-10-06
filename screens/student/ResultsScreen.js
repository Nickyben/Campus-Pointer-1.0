import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, Platform,
  View, Text, ScrollView,
  SectionList

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fetchReportsData } from '../../store/actions/reportsActions';
import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';



const MyItem = ({ content, content: { course, gradeData, color }, style, index, onNavigate, showingTitle, hideOthers }) => {
  const [showCourseTitle, setShowCourseTitle] = useState(false);
  const studentResultData = gradeData.find(student => student.regNumber === 'studentUserRegNumber');
  const { grade, score, points } = studentResultData ? studentResultData : { grade: { value: 'RA', color: '#333' }, score: 'RA' }//for now!!
  const itemColor = color//Colors.accent;
  const courseTitleHandler = (courseCode) => {
    showCourseTitle === true ?
      hideOthers('') :
      hideOthers(courseCode);
  }

  useEffect(() => {
    setShowCourseTitle(p => showingTitle === course.courseCode);
  }, [showingTitle]);



  return (
    <>
      <View style={{ flexDirection: 'row', paddingHorizontal: 15, backgroundColor: '#f3f6f7' }}>
        <View style={{ ...styles.leftColorBar, backgroundColor: itemColor, }}></View>

        <View style={{
          ...styles.courseContainer, ...style
          //backgroundColor: isPresentPeriod ?itemColor+ '22' : '#fff',
          // borderColor: isPresentPeriod ? itemColor + '22' : '#e3e6e7',
        }} >

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text
              onPress={onNavigate.bind(this, course.id)}
              style={{ ...styles.courseText, marginRight: 5, color: '#00a7e7' }}>{course.courseCode}
            </Text>

            <TouchIcon
              //name='arrow-dropdown'
              touched={() => showCourseTitle && showingTitle === course.courseCode}
              toggleIcons={['arrow-dropright', 'arrow-dropdown']}
              size={23}
              color={itemColor}
              onTouch={courseTitleHandler.bind(this, course.courseCode)}
            />
          </View>


          <Text style={{ ...styles.courseText2, color: '#444' }}>{score}</Text>


          <Text onPress={() => { }}
            style={{ ...styles.courseText2, color: grade ? grade.color : '#222' }}>{grade.value}</Text>


          <Text style={{ ...styles.courseText2, color: '#555' }}>{course.creditUnits}</Text>

          <Text style={{ ...styles.courseText2, color: '#555' }}>{course.creditUnits * points}</Text>


        </View>

      </View>

      {
        showingTitle === course.courseCode && showCourseTitle &&
        <View style={{ backgroundColor: itemColor, marginRight: 15 }}>
          <Text
            onPress={onNavigate.bind(this, course.id)}
            style={{
              ...styles.courseText,
              width: '100%',
              backgroundColor: itemColor, padding: 15, paddingLeft: 40,
              marginRight: 5,
              color: '#f3f6f7'
            }}>Course Title: {course.courseTitle}
          </Text>
        </View>

      }
    </>
  );
};



const SectionHeaderItem = ({ onCollapse, courses, title, showingSection }) => {
  const [isClicked, setIsClicked] = useState(false);

  const _dispatch = useDispatch();


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

          <Text style={styles.sectionHeaderLabel}>{title}</Text>
          <TouchIcon
            onTouch={showSectionHandler.bind(this, title)}//setIsCollapsed(p => !p); setIsTapped(p => true) }}
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
        &&
        <View style={{
          backgroundColor: '#fff', width: '100%',
          borderBottomColor: '#f3f6f7', borderBottomWidth: 15,
        }}>
          {
            showSection && courses.length !== 0 &&
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, }}>
              <View style={{ ...styles.leftColorBar, }}></View>

              <View style={styles.sectionBar}>

                <Text style={{ ...styles.sectionBarText, marginRight: 35 }}>Courses</Text>
                <Text style={styles.sectionBarText}>S</Text>
                <Text style={styles.sectionBarText}>G</Text>
                <Text style={styles.sectionBarText}>CU</Text>
                <Text style={styles.sectionBarText}>GP</Text>


              </View>
            </View>
          }
        </View>
      }


      {
        showSection && courses.length === 0
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
            It appears you have no result for: {title}.
            </Text>
        </View>
      }
    </View >

  )
};


const SectionFooterItem = ({ onCollapse, courses, title, showingSection }) => {
  return(
    <Text>This is the footer</Text>
  );
};


const ResultsScreen = ({ navig }) => {
  const studentResults = useSelector(state => state.reportsReducer.availableResults
    .filter(r => r.department === 'Computer Engineering' && !!r.students.find(s => s.regNumber === 'studentUserRegNumber')) // <===very Important
  )
  console.log(studentResults.length + 'rew')
  const dispatch = useDispatch();



  const loadResultCourses = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchReportsData());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navig.addListener('focus', loadResultCourses);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadResultCourses]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadResultCourses().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadResultCourses]);



  let dataArr = [];
  const deptLevels = [
    'First Semester - First Year', 'Second Semester - First Year', 'First Semester - Second Year',
    'Second Semester - Second Year', 'First Semester - Third Year', 'Second Semester - Third Year',
    'First Semester - Fourth Year', 'Second Semester - Fourth Year', 'First Semester - Fifth Year',
    'Second Semester - Fifth Year'
  ];
  const levels = [100, 100, 200, 200, 300, 300, 400, 400, 500, 500];
  const semesters = ['First', 'Second', 'First', 'Second', 'First', 'Second', 'First', 'Second', 'First', 'Second'];

  for (let i = 0; i < deptLevels.length; i++) {
    const semResult = studentResults.find(r =>
      r.level === levels[i] && r.semester === semesters[i]
    );
    const semResultData = semResult ? semResult.resultData : []
    //console.log(semResultData)
    dataArr.push(
      {
        title: deptLevels[i],
        data: semResultData
      }
    );
  }

  const COURSES = dataArr;
  const [showingSection, setShowingSection] = COURSES.length > 0 ? useState(COURSES[0].title) : useState(''); //initial shown should be the current level of user
  const [showTitle, setShowTitle] = useState('');

  //console.log(userResults.length)
  //console.log(COURSES[0].title.length)

  const displayCourseHandler = (id) => {
    navig.navigate('CourseDetails', { courseId: id })
  };

  const titleHandler = (title) => {
    setShowingSection(p => title);
  }

  const titlesHandler = (courseCode) => {
    setShowTitle(p => courseCode);
  }

  const renderItem = ({ item, index, section: { title, data } }) => { //auto gets data in obj form , I deStructured it in params



    const courseItem = {
      even: {
        backgroundColor: '#fff'
      },
      odd: {
        backgroundColor: '#f3f6f7',//Colors.primary + '11',
      }
    }

    const styler = index % 2 === 0 ? courseItem.even : courseItem.odd;

    return (
      showingSection !== title ?// hiddenSections.includes(title) ?
        <></> :
        <MyItem
          content={item}
          style={styler}
          onNavigate={displayCourseHandler}
          showingTitle={showTitle}
          hideOthers={titlesHandler}


        />
    )
  };


  const renderSectionHeader = ({ section: { title, data } }) => {
    return (
      <SectionHeaderItem
        courses={data}
        title={title}
        onCollapse={titleHandler}
        showingSection={showingSection}

      />
    )
  };

  const renderSectionFooter = ({ section: { title, data } }) => {
    return (
      <SectionFooterItem
        courses={data}
        title={title}
      //onCollapse={titleHandler}
      //showingSection={showingSection}

      />
    )
  };

  return (
    <View style={styles.screen}>
      <SectionList
        //initialNumToRender={25}
        sections={COURSES}
        keyExtractor={(item, index) => item + index}
        renderItem={(renderItem)}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        extraData={{ showingSection }}
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
    paddingHorizontal: 20,

    // borderBottomWidth: 0.1,

  },
  sectionHeaderWrap: {
    width: '100%',
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
  sectionBar: {
    width: '98%',
    padding: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  sectionBarText: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: Colors.primary,
  },

  courseContainer: {
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#fff',//'#f3f6f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    // borderLeftWidth: 10,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
  leftColorBar: {
    width: '2%',
    height: '100%',
    marginLeft: -15,
    marginRight: 15
  },
  courseText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    //color: '#222',
  },
  courseText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#222',
  },


});

export default ResultsScreen;
