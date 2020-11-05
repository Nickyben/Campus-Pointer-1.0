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
import Card from '../../components/UI/Card';
import MyPieChart from '../../components/pointerComponents/MyPieChart';



const MyItem = ({ content, reportTitle, studentData, content: { course, gradeData, CA_Sheet, ATD_Sheet, color },
  style, index, onNavigate, showingTitle, hideOthers }) => {
  const [showCourseTitle, setShowCourseTitle] = useState(false);

  useEffect(() => {
    setShowCourseTitle(p => showingTitle === course.courseCode);
  }, [showingTitle]);

  const courseTitleHandler = (courseCode) => {
    showCourseTitle === true ?
      hideOthers('') :
      hideOthers(courseCode);
  }
  const isResult = reportTitle === 'Results';
  const isAssessment = reportTitle === 'Assessments';
  const isAttendance = !(isResult || isAssessment);
  const { regNumber } = studentData;

  let studentResultData, student_CA_Sheet, student_ATD_Sheet;
  if (isResult) {
    studentResultData = gradeData.find(student => student.regNumber === regNumber);//'studentUserRegNumber');
  } else if (reportTitle === 'Assessments') {
    student_CA_Sheet = CA_Sheet.find(student => student.regNumber === regNumber);//'studentUserRegNumber');
  } else {
    student_ATD_Sheet = ATD_Sheet.find(student => student.regNumber === regNumber);//'studentUserRegNumber');
  }

  const { grade, score, points } = studentResultData ? studentResultData : {};
  const { quiz1, quiz2, test, CA } = student_CA_Sheet ? student_CA_Sheet : {};
  const { attendance, barColor } = student_ATD_Sheet ? student_ATD_Sheet : {};

  const itemColor = color;



  return (
    <>
      <View style={{ flexDirection: 'row', paddingHorizontal: 15, backgroundColor: '#f3f6f7' }}>
        <View style={{ ...styles.leftColorBar, backgroundColor: itemColor, }}></View>

        <View style={{
          ...styles.courseContainer, ...style,
          //backgroundColor: isPresentPeriod ?itemColor+ '22' : '#fff',
          // borderColor: isPresentPeriod ? itemColor + '22' : '#e3e6e7',
        }} >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center', flex: 1.5,
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
          {(isResult || isAssessment) &&
            <View style={{ flex: 4, flexDirection: 'row' }}>
              {isResult ?
                <Text style={{
                  ...styles.courseText2, color: '#444',
                }}>{score}</Text>
                :
                <Text style={{
                  ...styles.courseText2, color: '#444',
                }}>{quiz1}</Text>
              }


              {isResult ? <Text onPress={() => { }}
                style={{
                  ...styles.courseText2, color: grade ? grade.color : '#222',
                }}>{grade.value}</Text>
                :
                <Text style={{
                  ...styles.courseText2, color: '#444',
                }}>{quiz2}</Text>
              }


              {isResult ? <Text style={{
                ...styles.courseText2, color: '#555',
              }}>{course.creditUnits}</Text>
                :
                <Text style={{
                  ...styles.courseText2, color: '#444',
                }}>{test}</Text>
              }

              {isResult ? <Text style={{
                ...styles.courseText2, color: '#555',
              }}>{points}</Text>
                :
                <Text style={{
                  ...styles.courseText2, color: CA >= 25 ? '#11dd11' : CA <= 14 ? '#ff3333' : '#444',
                }}>{CA}%</Text>
              }
            </View>
          }

          {
            isAttendance &&
            <View style={{
              flex: 4,
              backgroundColor: '#d3d6d7',
              borderRadius: 20,
              //borderColor: '#e3e6e7',
              //borderWidth:1
            }}>
              <View style={{
                backgroundColor: barColor,
                width: attendance.toString() + '%',
                borderRadius: 20
              }
              }>
                <Text
                  style={{
                    ...styles.courseText2, color: '#fff', fontSize: 12
                  }}>{attendance}%</Text>
              </View>
            </View>

          }

        </View>

      </View>

      {
        showingTitle === course.courseCode && showCourseTitle &&
        <View style={{ backgroundColor: itemColor, marginRight: 15 }}>
          <Text
            onPress={onNavigate.bind(this, course.id)}
            style={{
              ...styles.courseText,
              textAlign: 'center',
              width: '100%',
              backgroundColor: itemColor, padding: 10, paddingLeft: 40,
              marginRight: 5,
              color: '#f3f6f7'
            }}>Course Title: {course.courseTitle}
          </Text>
        </View>

      }
    </>
  );
};



const SectionHeaderItem = ({ onCollapse, reportTitle, courses, title, showingSection }) => {

  const [showSection, setShowSection] = useState(false);

  const showSectionHandler = (title) => {
    showSection === true ? onCollapse('empty') : onCollapse(title);
  }
  const isResult = reportTitle === 'Results';
  const isAssessment = reportTitle === 'Assessments';
  const isAttendance = !(isResult || isAssessment);
const resultType= isResult? 'result': isAssessment? 'assessment': 'record'

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

          <Text
            style={styles.sectionHeaderLabel}
            onPress={showSectionHandler.bind(this, title)}
          >{title}</Text>
          <TouchIcon
            onTouch={showSectionHandler.bind(this, title)}
            touched={() => !showSection}
            name={Ionicons}
            size={23}

            bgColor={Colors.switchWhite + '33'}
            color={Colors.switchWhite}
            toggleIcons={['arrow-dropdown', 'arrow-dropright']}
            // color={Colors.switchWhite}
            // toggleIcons={['arrow-dropdown-circle', 'arrow-dropright-circle']}
          />
        </View>

      </View>
      {showSection
        &&
        <View style={styles.sectionBarContainer}>
          {
            showSection && courses.length !== 0 &&
            <View style={{
              flexDirection: 'row', paddingHorizontal: 15,
            }}>
              <View style={{ ...styles.leftColorBar, }}></View>

              <View style={styles.sectionBar}>

                <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ ...styles.sectionBarText, }}>Courses</Text>
                  <View style={{ width: 30 }}></View>
                </View>

                {(isResult || isAssessment) &&
                  <View style={{ flex: 4, flexDirection: 'row' }}>
                    {reportTitle === 'Results' ? <>
                      <Text style={styles.sectionBarText}>S</Text>
                      <Text style={styles.sectionBarText}>G</Text>
                      <Text style={styles.sectionBarText}>CU</Text>
                      <Text style={styles.sectionBarText}>WS</Text>
                    </>
                      :
                      <>
                        <Text style={styles.sectionBarText}>Q1</Text>
                        <Text style={styles.sectionBarText}>Q2</Text>
                        <Text style={styles.sectionBarText}>TS</Text>
                        <Text style={styles.sectionBarText}>CA</Text>
                      </>
                    }
                  </View>
                }
                {
                  isAttendance &&
                  <Text style={{ ...styles.sectionBarText, flex: 4 }}>Attendance</Text>
                }

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
            It appears you have no {resultType} for: {title}.
          </Text>
        </View>
      }
    </View>
  )
};


const SectionFooterItem = ({ onCollapse, reportTitle, studentData, courses, title, showingSection, COURSES }) => {
  const [showSection, setShowSection] = useState(false);
  const { regNumber } = studentData;
  const isResult = reportTitle === 'Results';
  const isAssessment = reportTitle === 'Assessments';
  const isAttendance = !(isResult || isAssessment);

  const recordData =isAttendance &&  courses.map((c, i) => {
    const { course: { courseCode }, ATD_Sheet, color } = isAttendance && c;
    const { attendance, barColor } = ATD_Sheet.find(student => student.regNumber === regNumber);

    return ({
      courseCode,
      attendance,
      barColor,
      courseColor: color,
    });
  });


  const totalATDPie = isAttendance && recordData.reduce((a, b) => {
    return (a + b.attendance)
  }, 0)

  const pieData = isAttendance &&
    recordData.map(rd => ({
      label: rd.courseCode,
      value: +((rd.attendance / totalATDPie) * 100).toFixed(0),
      labelColor: rd.courseColor
    }));


  const showSectionHandler = (title) => {
    // showSection === true ?
    //   onCollapse('empty') :
    //   onCollapse(title);
  }

  const getGP = (courses) => {
    return (
      courses.length != 0 && courses.reduce((a, b) => {
        const gradeData = b.gradeData;
        const studentResultData = gradeData.find(student => student.regNumber === regNumber);
        const { points } = studentResultData;
        return (a + points);
      }, 0)
    )
  };

  const getTCL = (courses) => {
    return (
      courses.length != 0 && courses.reduce((a, b) => {
        const { course: { creditUnits }, gradeData } = b;
        const studentResultData = gradeData.find(student => student.regNumber === regNumber);
        const { grade } = studentResultData;
        let CU = creditUnits;
        if (grade.value === 'RA') {
          CU = 0;
        }
        return (a + CU);
      }, 0)
    );
  };

  const getGPA = (gp, tcl) => {

    return (tcl !== 0 && (gp / tcl).toFixed(2));
  };

  let GP, TCL, GPA;
  if (isResult) {
    GP = getGP(courses);
    TCL = getTCL(courses);
    GPA = getGPA(GP, TCL);
  }


  const titles = isResult && COURSES.map(section => section.title);
  const presentIndex = isResult && titles.indexOf(title);

  const _2dCoursesArr = isResult && COURSES.filter((section, index) =>
    index <= presentIndex && section.data.length !== 0
  ).map(section => {
    return (section.data);
  });


  const C_GP = isResult && _2dCoursesArr.reduce((initialGP, courses) => {
    const gp = getGP(courses);
    return (initialGP + gp);
  }, 0);

  const C_TCL = isResult && _2dCoursesArr.reduce((initialTCL, courses) => {
    const tcl = getTCL(courses);
    return (initialTCL + tcl);
  }, 0);


  const CGPA = isResult && getGPA(C_GP, C_TCL);

  const carryOverCourses = isResult && courses.filter(
    (c, i) => {
      const { gradeData } = c;
      const studentResultData = gradeData.find(student => student.regNumber === regNumber);
      const { grade } = studentResultData;
      return (grade.value === 'F')
    }//this should include the previous semester or level carry over course which has not been cleared
  ).map(c => c.course.courseCode)

  const awaitingResults = isResult && courses.filter(
    (c, i) => {
      const { gradeData } = c;
      const studentResultData = gradeData.find(student => student.regNumber === regNumber);
      const { grade } = studentResultData;
      return (grade.value === 'RA')
    }//this should include the previous semester or level carry over course which has not been cleared
  ).map(c => c.course.courseCode)




  useEffect(() => {
    setShowSection(p => showingSection === title);
  }, [showingSection]);



  const summary = [
    // {
    //   type: 'Previous',
    //   details: [['TCL', 23], ['GP', 345], ['GPA', 4.33]]
    // },
    {
      type: 'Current',
      details: [['TCL', TCL], ['GP', GP], ['GPA', GPA]]
    },
    {
      type: 'Cumulative',
      details: [['TCL', C_TCL], ['GP', C_GP], ['CGPA', CGPA]]
    }
  ];

  const abbrevs = isResult ? [
    ['S   ', 'Score'], ['G   ', 'Grade'], ['CU ', 'Credit Unit'], ['WS ', 'Weighted Score'],
    ['RA  ', 'Result Awaiting'],
    ['TCL', 'Total Credit Load'], ['GP  ', 'Grade Points'], ['GPA', 'Grade Points Average']

  ] :
    [
      ['Q1   ', '1st Quiz', '15 Marks'], ['Q2  ', '2nd Quiz', '15 Marks'],
      ['TS ', 'Test Score', '30 Marks'], ['CA ', 'Total Score', '30%'],
    ];

  const scales = isResult && [
    ['A    ', '5 points'], ['B    ', '4 points'], ['C    ', '3 points'],
    ['D    ', '2 points'], ['E    ', '1 point  '], ['F    ', '0 points'],
    ['RA   ', '- Empty ']
  ];
  const barColors = [
    ['#22eeaa', 'Excellent Attendance'],
    ['#6688ff', 'Very Good Attendance'],
    ['#ff8833', 'Good Attendance'],
    ['#ff33aa', 'Fair Attendance'],
    ['#ff3333', 'Poor Attendance']
  ];


  return (
    <View>
      {showSection && courses.length !== 0
        &&
        <View style={{
          ...styles.sectionFooterContainer,
          //backgroundColor: isResult? '#f3f6f7': '#fff'
        }}>
          {
            isAttendance &&
            <View style={{ flexDirection: 'column', }}>
              <Card style={{
                padding: 10,
                marginBottom: 10,
                //alignItems:'center'
                //width:'75%'
              }}>
                <MyPieChart
                  chartData={pieData}
                  chartTitle={'Total Attended'}
                />
              </Card>

              <Card style={{
                paddingHorizontal: 15,
                paddingBottom: 10,
                width: '45%'
              }}>
                {
                  barColors.map((c, i) => {
                    return (
                      <View key={i} style={{
                        flexDirection: 'row',
                        marginBottom: 10
                      }}>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              width: 30, height: 20, borderRadius: 15,
                              backgroundColor: c[0], marginRight: 10,
                            }}></View>
                        </View>

                        <Text style={{ ...styles.abbrevDetail, color: '#333', flex: 2 }}>{c[1]}</Text>
                      </View>
                    );
                  })
                }

              </Card>



            </View>
          }

          {(isResult || isAssessment) &&
            <View>
              {isResult &&
                <View style={styles.CGPA_description}>
                  {
                    summary.map((result, i) => (
                      <Card key={i} style={{
                        padding: 10, paddingVertical: 15, width: '48%', alignItems: 'center',
                        backgroundColor: '#fff', borderRadius: 7
                      }}>
                        <Text style={{
                          ...styles.abbrevTitle, fontSize: 15, textAlign: 'center', borderBottomColor: '#ddd', color: Colors.primary,
                          borderBottomWidth: 1, width: '100%', padding: 5,
                        }}>
                          {result.type}
                        </Text>
                        <View style={{
                          flexDirection: 'row', justifyContent: 'space-between',

                        }}>
                          {
                            result.details.map((detail, i) => (
                              <View key={i} style={{
                                justifyContent: 'center', width: '32%',
                                alignItems: 'center',
                                padding: 1, paddingVertical: 10, backgroundColor: Colors.primary, //'#f3f6f7',
                                marginLeft: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
                              }}>
                                <Text style={{
                                  width: '100%', ...styles.abbrevDetail, fontSize: 13,
                                  textAlign: 'center', color: '#fff'
                                }}>{detail[0]}</Text>
                                <Text style={{
                                  width: '100%', ...styles.abbrevDetail, fontSize: 14,
                                  textAlign: 'center', color: '#fff'
                                }}>{detail[1]}</Text>
                              </View>
                            ))
                          }
                        </View>
                      </Card>


                    ))
                  }
                </View>
              }

              <View style={{
                ...styles.abbrevsAndScales,
                //justifyContent:!isResult? 'center':'space-between' 
              }}>

                {isResult &&
                  <Card style={styles.scaleDescription}>
                    {scales.map((scale, i) =>
                      (
                        <View key={i} style={{ flexDirection: 'row', }}>
                          <Text style={styles.abbrevTitle}>{scale[0]}</Text>
                          <Text style={styles.abbrevDetail}>{scale[1]}</Text>
                        </View>
                      ))
                    }
                  </Card>
                }

                <Card style={{
                  ...styles.abbrevDescription,
                  padding: isResult ? 15 : 20,
                  // width: isResult ? '45%' : 'auto',
                }}>
                  <View style={{}}>
                    {abbrevs.map((abv, i) =>
                      (
                        <Text key={i} style={styles.abbrevTitle}>{abv[0]}</Text>
                      ))
                    }
                  </View>
                  <View style={{ paddingHorizontal: 10, }}>
                    {abbrevs.map((abv, i) =>
                      (
                        <Text key={i} style={{ ...styles.abbrevDetail, }} numberOfLines={2} lineBreakMode='tail'>{abv[1]}</Text>
                      ))
                    }
                  </View>
                  {
                    isAssessment &&
                    <View style={{ paddingHorizontal: 10, }}>
                      {abbrevs.map((abv, i) =>
                        (
                          <Text key={i} style={{ ...styles.abbrevDetail, color: Colors.accent }} numberOfLines={2} lineBreakMode='tail'>{abv[2]}</Text>
                        ))
                      }
                    </View>
                  }
                </Card>

                {isAssessment &&
                  <View style={styles.assessStats}>

                  </View>

                }

                {isResult &&
                  <Card style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...styles.abbrevTitle, fontSize: 24, color: Colors.primary }}>CGPA</Text>
                    <Text style={{ ...styles.abbrevDetail, fontSize: 24 }}>{CGPA}</Text>
                  </Card>
                }

              </View>

              {isResult &&
                <View style={styles.resultRemarks}>
                  <Card>

                    <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                      <Text style={{
                        ...styles.abbrevTitle, fontSize: 15, color: Colors.primary,

                      }}>Carryover Courses: </Text>
                      <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', }}>
                        {carryOverCourses.length > 0 ?
                          carryOverCourses.map((c, i) =>
                            <Text key={i} style={{ ...styles.abbrevDetail, color: '#ff3333' }}>{c}, </Text>
                          ) :
                          <Text style={{ ...styles.abbrevDetail, color: '#11dd11' }}>NONE</Text>
                        }
                      </View>
                    </View>


                    <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                      <Text style={{
                        ...styles.abbrevTitle, fontSize: 15, color: Colors.primary,

                      }}>Awaiting Results: </Text>
                      <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', }}>
                        {awaitingResults.length > 0 ?
                          awaitingResults.map((c, i) =>
                            <Text key={i} style={{ ...styles.abbrevDetail, color: '#ff8833' }}>{c}, </Text>
                          ) :
                          <Text style={{ ...styles.abbrevDetail, color: '#11dd11' }}>NONE</Text>
                        }
                      </View>
                    </View>

                  </Card>

                </View>
              }
            </View>
          }

        </View>


      }
    </View>
  );
};


const ResultsScreen = ({ navig, source: { title, studentId } }) => {
  const reportTitle = title;
  const studentData = useSelector(state => state.dataReducer.availableStudents)
    .find(s => s.id === studentId);
  const { regNumber, id, department } = studentData;
  let studentResults, studentAssessments, studentAttendances;


  if (reportTitle === 'Assessments') {
    studentAssessments = useSelector(state => state.reportsReducer.availableAssessments
      .filter(a => a.department === department &&
        !!a.students.find(s => s.regNumber === regNumber))
    )
  } else if (reportTitle === 'Results') {
    studentResults = useSelector(state => state.reportsReducer.availableResults
      .filter(r => r.department === department &&
        !!r.students.find(s => s.regNumber === regNumber))
    )
  } else {
    studentAttendances = useSelector(state => state.reportsReducer.availableAttendances
      .filter(r => r.department === department &&
        !!r.students.find(s => s.regNumber === regNumber))
    )
  }


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
    let semResult, semResultData, semAssessment, semAssessmentData, semAttendance, semAttendanceData;

    if (reportTitle === 'Results') {
      semResult = studentResults.find(r =>
        r.level === levels[i] && r.semester === semesters[i] // && r.level <= 
      );
      semResultData = semResult ? semResult.resultData : []
    } else if (reportTitle === 'Assessments') {
      semAssessment = studentAssessments.find(a =>
        a.level === levels[i] && a.semester === semesters[i] // && r.level <= 
      );
      semAssessmentData = semAssessment ? semAssessment.assessmentData : []
    } else {
      semAttendance = studentAttendances.find(atd =>
        atd.level === levels[i] && atd.semester === semesters[i] // && r.level <= 
      );
      semAttendanceData = semAttendance ? semAttendance.attendanceData : []
    }

    dataArr.push(
      {
        title: deptLevels[i],
        data: reportTitle === 'Results' ? semResultData :
          reportTitle === 'Assessments' ? semAssessmentData :
            semAttendanceData
      }
    );
  }

  const COURSES = dataArr;
  const lastResult = COURSES.filter(section => section.data.length > 0).reverse()[0]
  const [showingSection, setShowingSection] = lastResult ? useState(lastResult.title) : useState('');
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
          studentData={studentData}
          reportTitle={reportTitle}
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
        reportTitle={reportTitle}

      />
    )
  };

  const renderSectionFooter = ({ section: { title, data } }) => {
    // if (reportTitle === 'Assessments') {
    //   return (<></>)
    // }
    return (
      <SectionFooterItem
        courses={data}
        title={title}
        onCollapse={titleHandler}
        showingSection={showingSection}
        COURSES={COURSES}
        studentData={studentData}
        reportTitle={reportTitle}
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
  sectionBarContainer: {
    backgroundColor: '#fff',
     width: '100%',
    borderBottomColor: '#f3f6f7', 
    borderBottomWidth: 15,
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
    flex: 1,
    textAlign: 'center',
  },

  courseContainer: {
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#fff',//'#f3f6f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
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
    flex: 1,
    textAlign: 'center',
  },
  sectionFooterContainer: {
    backgroundColor: '#f3f6f7',
    width: '100%',
    borderTopColor: '#f3f6f7',
    borderTopWidth: 15,
    padding: 10,
    paddingHorizontal: 15,
  },

  CGPA_description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    //padding: 10,
    //paddingHorizontal: 20,
    width: '100%',
    //backgroundColor: '#ffccee',

  },

  abbrevsAndScales: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    marginBottom: 10,

  },
  abbrevDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    width: '45%'
  },
  scaleDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    //flex: 1
    width: '25%'
  },
  resultRemarks: {

  },
  abbrevTitle: {
    fontFamily: 'OpenSansBold',
    color: Colors.primary,
    fontSize: 12,
  },
  abbrevDetail: {
    fontFamily: 'OpenSansBold',
    color: '#555',
    fontSize: 12,
  }

});

export default ResultsScreen;
