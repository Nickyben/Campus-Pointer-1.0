import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';
import { fetchDeptData } from '../../store/actions/dataActions';


const DeptDetailScreen = ({ navigation, route: { params: { title, itemId, item, candidateId } } }) => {
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

  const allItems = title === 'Staff' ?
    useSelector(state => state.dataReducer.availableStaff) :
    title === 'Student' ?
      useSelector(state => state.dataReducer.availableStudents) :
      title === 'Hall' ? useSelector(state => state.dataReducer.availableHalls) :
        title === 'Event' ? useSelector(state => state.dataReducer.availableEvents) :
          [];

  const applicant = allItems.length===0 && title === 'ElectoralApplicant' && useSelector(s => s.electionPortalReducer.validCandidates);
  const {
    studentData, coverQuote, manifesto, applicantId, aspiringOffice
  } = applicant && applicant.length !== 0 && applicant.find(c => {
    return ((c.applicantId === candidateId))
  }) 

  const itemObj = {
    id, image, fullName, designation,rank, department, post,
    staffNumber, regNumber, phoneNumber, office, gender, level, capacity,
    date, time, type, venue, honours, 
  } = allItems && allItems.length !== 0 ?
      allItems.find(item => {
        return( (item.id === itemId) )
      }) :
      item;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: fullName ? fullName : studentData? studentData.fullName: itemObj.title,
    });
  });

  return (
    <View style={styles.screen}>
      <ScrollView
        //contentContainerStyle={styles.scroll}
        style={styles.scroll}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={{ ...styles.detailImageContainer }}>
             { image? <Image
                style={{
                  ...styles.detailImage,
                  //borderWidth: !capacity ? 2 : 0,
                  //borderColor: !capacity ? 'white' : 'transparent',
                  width: !!capacity ? '100%' : 250,
                  borderRadius: !!capacity ? 15 : 15,//250 / 2,
                }}
                source={image}
              />:
              (studentData && studentData.image)?
                  <Image
                    style={{
                      ...styles.detailImage,
                      //borderWidth: !capacity ? 2 : 0,
                      //borderColor: !capacity ? 'white' : 'transparent',
                      width: !!capacity ? '100%' : 250,
                      borderRadius: !!capacity ? 15 : 15,//250 / 2,
                    }}
                    source={studentData.image}
                  />
                  :<View></View>
                  }
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <View style={{ padding: 20, paddingTop: 40, }}>
                <View>
                  {(studentData|| fullName || designation ||rank||(department && !venue) || staffNumber || regNumber|| coverQuote) && <View style={{ marginBottom: 20 }}>
                    {(fullName || studentData) && <View style={styles.detailContainer}><Text style={styles.title}>Name:</Text><Text style={styles.detail}>{fullName || studentData.fullName}</Text></View>}
                    {designation && <View style={styles.detailContainer}><Text style={styles.title}>Designation:</Text><Text style={styles.detail}>{designation}</Text></View>}
                    {rank && <View style={styles.detailContainer}><Text style={styles.title}>Rank:</Text><Text style={styles.detail}>{rank}</Text></View>}
                    {department && !venue && <View style={styles.detailContainer}><Text style={styles.title}>Department:</Text><Text style={styles.detail}>{department}</Text></View>}
                    {staffNumber && <View style={styles.detailContainer}><Text style={styles.title}>Staff Number:</Text><Text style={styles.detail}>{staffNumber}</Text></View>}
                    {(regNumber || studentData) && <View style={styles.detailContainer}><Text style={styles.title}>Reg Number:</Text><Text style={styles.detail}>{regNumber || studentData.regNumber}</Text></View>}
                    {applicantId && <View style={styles.detailContainer}><Text style={styles.title}>Applicant Id:</Text><Text style={styles.detail}>{applicantId}</Text></View>}

                  </View>}

                  {(studentData||level || post || office|| honours) && <View style={{ marginBottom: 20 }}>
                    {(level || studentData) && <View style={styles.detailContainer}><Text style={styles.title}>Level:</Text><Text style={styles.detail}>{level || studentData.level}</Text></View>}
                    {post && <View style={styles.detailContainer}><Text style={styles.title}>Post:</Text><Text style={styles.detail}>{post}</Text></View>}
                    {office && <View style={styles.detailContainer}><Text style={styles.title}>Office:</Text><Text style={styles.detail}>{office}</Text></View>}
                    {aspiringOffice && <View style={styles.detailContainer}><Text style={styles.title}>Aspiring Office:</Text><Text style={styles.detail}>{aspiringOffice[0]}</Text></View>}

                    {honours &&
                      <View style={styles.detailContainer}>
                        <Text style={styles.title}>Honours:</Text>
                        <View style={{ flex: styles.detail.flex, flexDirection: 'column', }}>
                          {
                            honours.map((h, i) =>
                              <View key={i} style={{
                                flex: styles.detail.flex,
                                flexDirection: 'column',
                                marginTop: i>0? 10: 0
                              }}>
                                <Text style={styles.detail}>{h.title}</Text>
                                <Text style={styles.detail}>{h.year}</Text>
                              </View>)
                          }
                        </View>

                      </View>

                    }
                  </View>}

                  <View style={{ marginBottom: 20 }}>
                    {phoneNumber && <View style={styles.detailContainer}><Text style={styles.title}>Phone Number:</Text><Text style={styles.detail}>{phoneNumber}</Text></View>}
                    {gender && <View style={styles.detailContainer}><Text style={styles.title}>Gender:</Text><Text style={styles.detail}>{gender}</Text></View>}
                    {capacity && <View style={styles.detailContainer}><Text style={styles.title}>Capacity:</Text><Text style={styles.detail}>{capacity}</Text></View>}
                    {itemObj.title && <View style={styles.detailContainer}><Text style={styles.title}>Event Title:</Text><Text style={styles.detail}>{itemObj.title}</Text></View>}
                    {type && <View style={styles.detailContainer}><Text style={styles.title}>Event Type:</Text><Text style={styles.detail}>{type}</Text></View>}
                    {date && <View style={styles.detailContainer}><Text style={styles.title}>Date:</Text><Text style={styles.detail}>{date}</Text></View>}
                    {time && <View style={styles.detailContainer}><Text style={styles.title}>Time:</Text><Text style={styles.detail}>{time}</Text></View>}
                    {venue && <View style={styles.detailContainer}><Text style={styles.title}>Venue:</Text><Text style={styles.detail}>{venue}</Text></View>}
                    {coverQuote && <View style={styles.detailContainer}><Text style={styles.title}>Cover Quote:</Text><Text style={styles.detail}>{coverQuote}</Text></View>}
                    {manifesto && <View style={{...styles.detailContainer,flexDirection: 'column'}}><Text style={{...styles.title, marginBottom: 15}}>Manifesto:</Text><Text style={{...styles.detail, flex: 1}}>{manifesto}</Text></View>}

                  </View>


                </View>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export const screenOptions = ({ navigation, route: { params } }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  return (
    {
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={notificationIcon}
            onPress={() => {

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
    backgroundColor: '#f3f6f7',    // alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',//,Colors.primary,
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
    borderTopStartRadius: 70,//please set this wrt screen dimensions
    overflow: 'hidden',
  },
  row: {
    backgroundColor: '#f3f6f7',

  },
  detailImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',//,Colors.primary,//
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,

  },
  detailImage: {
    backgroundColor: 'white',
    //width: 250,
    height: 250,
    //borderRadius: 250/2,
  },

  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    //marginBottom: 15,
    //borderTopLeftRadius: 15,
    //borderTopRightRadius: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  detail: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    //backgroundColor: 'red',
    flex: 1.2,
  },
  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: Colors.primary,//'#333',
    flex: 1,

  },

});

export default DeptDetailScreen;