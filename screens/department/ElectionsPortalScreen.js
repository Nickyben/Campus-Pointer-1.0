import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, Modal, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions, Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Ionicons } from '@expo/vector-icons';
import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';
import Btn from '../../components/UI/Btn';
import { fetchElectionData } from '../../store/actions/electionPortalActions';

import VotingScreen from '../../components/pointerComponents/VotingScreen';
import ApplicantScreen from '../../components/pointerComponents/ApplicantScreen';



const ElectionsPortalScreen = ({ navig }) => {
  const dispatch = useDispatch();
  const voteSummary = useSelector(s => s.electionPortalReducer.userOfficesVoted);
  const availableOffices = useSelector(s => s.electionPortalReducer.availableOffices);

  const [portalScreen, setPortalScreen] = useState('overview');
  const [showModal, setShowModal] = useState('overview');


  const summaryHandler = () => {
    setShowModal(p => true)
    //console.log(voteSummary)
  };

  const loadElectionData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchElectionData());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navig.addListener('focus', loadElectionData);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadElectionData]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadElectionData().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadElectionData]);


  useEffect(() => {
    const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';

    navig.setOptions({
      headerRight: () => portalScreen === 'voting' ?
        <View style={{ paddingRight: 10 }}>
          <Btn
            onPress={summaryHandler}//function to upload the selected(register) courses array...get this from main component
            bgColor={Colors.switchPrimary}
            borderColor={Colors.switchWhite}
          >Summary</Btn>
        </View> :
        (
          <HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item
              tile='Notifications'
              iconName={notificationIcon}
              onPress={() => {
              }}
            />
          </HeaderButtons>
        ),

      // formSubmit: formSubmitHandler
    });
  });


  const portalScreenHandler = (screen) => {
    setPortalScreen(screen)
  };

  const instructions = [
    'Make sure you are logged in with your own account.',
    'Use the button below (if active) to access the screen where candidates are shown.',
    'In the Candidates\' screen, search for the office you want to vote on.',
    'For each electoral office, select --Vote-- for a candidate you want.',
  ];

  const instructions2 = [
    'Make sure you are logged in with your own account.',
    'Use the button below (if active) to access the screen for application.',
    'In the Contestant screen, fill in the form with the required details.',
    'Make sure the required payments are made.',
    'Finally, select --Submit Form--'
  ];



  switch (portalScreen) {
    case 'overview':
      return (
        <View style={styles.screen}>
          <ScrollView style={styles.scroll}>
            <View style={styles.overview}>
              <View style={styles.description}>
                <Text style={styles.titleText}>Description: </Text>

                <Text style={styles.detailText}>
                  This Election Portal should be used by students who
                  have satisfied the requirements for the Departmental or
                  Association Elections. It is basically  a system with which
                  voting is made incredibly easy and thus facilitates free and fair
                  electoral process.{'\n'}{'\n'}

                  Students (electors) are encouraged to follow the
                  given instructions and vote wisely with all sureness.{'\n'}{'\n'}


                  Student Contestants (to be elected) are also encouraged to follow the
                  corresponding instructions and register with the requested details.
                  {'\n'}{'\n'}

                  The voting activity should take about 2-5 minutes

                </Text>

              </View>
              <View style={styles.instructions}>
                <Text style={styles.titleText}>How To Vote: </Text>
                {
                  instructions.map((instruction, i) => (
                    <View key={i} style={styles.instruction}>
                      <Text style={{ ...styles.detailText, textAlign: 'center' }}>
                        {instruction}
                      </Text>
                    </View>))
                }
              </View>

              <View style={styles.instructions}>
                <Text style={styles.titleText}>How To Contest: </Text>
                {
                  instructions2.map((instruction, i) => (
                    <View key={i} style={styles.instruction}>
                      <Text style={{ ...styles.detailText, textAlign: 'center' }}>
                        {instruction}
                      </Text>
                    </View>))
                }
              </View>

              <View style={styles.actions}>
                <Btn
                  icon={{ iconName: 'checkmark-circle' }}
                  style={styles.btn}
                  onPress={portalScreenHandler.bind(this, 'voting')}
                >
                  Vote Positions
                  </Btn>

                <Btn icon={{ iconName: 'create' }} bgColor={Colors.accent}
                  onPress={portalScreenHandler.bind(this, 'contesting')}
                  style={styles.btn}>Contest </Btn>

              </View>
            </View>
          </ScrollView>
        </View>
      );

    case 'voting':
      return (
        <>
          <VotingScreen navig={navig} changeScreen={portalScreenHandler} />
          <Modal
            animationType={'fade'}
            visible={showModal}
            transparent
            onRequestClose={() => {
              setShowModal(() => false)
            }}
          >
            <View style={styles.summaryModal}>
              {voteSummary &&
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryBoxHeader}>VOTES SUMMARY</Text>
                  <View style={{ padding: 20 }}>
                    {voteSummary.map((v, i) => {
                      for (let office in v) {
                        return (
                          <View
                            key={i}
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ ...styles.summaryTextTitle, color: '#00a7e7' ,flex:1}}>
                              {office}:{'  '}
                            </Text>
                            <Text style={{ ...styles.summaryText, color: '#555' ,flex:1.2}}>
                              {v[office]}
                            </Text>


                          </View>

                        )
                      }
                    })}

                    <View style={{ padding: 15, borderRadius: 10, marginTop:15,
                    backgroundColor: (availableOffices.length/(voteSummary.length-1)<=2? Colors.success: Colors.error)}}>
                      <Text style={{ ...styles.summaryText, color: '#555' }}>
                        You have voted for {voteSummary.length} office{voteSummary.length!==1?'s':''} out of {availableOffices.length}
                      </Text>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                      <Btn
                        style={styles.okayBtn}
                        bgColor={Colors.primary}
                        onPress={() => { setShowModal(p => false) }}>Okay</Btn>
                    </View>
                  </View>

                </View>
              }
            </View>

          </Modal>

        </>

      );
    case 'contesting':
      return (
        <ApplicantScreen changeScreen={portalScreenHandler} />
      )
  }



};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6f7',
  },
  scroll: {
    flex: 1,
  },
  overview: {
    padding: 20,
  },
  description: {
    padding: 20,
    backgroundColor: '#fff',//'#f7fafb',
    marginBottom: 20,
    borderRadius: 15,
  },
  instructions: {
    backgroundColor: '#f3f6f7', //'#fbfeff',
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 0,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  instruction: {
    borderRadius: 15,
    backgroundColor: '#fff', //'#f5f8f9',
    width: '100%',
    padding: 20,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  btn: {
    marginBottom: 10,
    width: '35%'
  },
  titleText: {
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'justify',
    color: Colors.primary,
  },
  detailText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#345',
    textAlign: 'justify',

  },
  okayBtn: {
    width: '49%',
    maxWidth: 100,
    marginTop: 30,
  },
  summaryModal: {
    flex: 1,
    backgroundColor: '#000b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryBox: {

    backgroundColor: '#fff',
    width: '70%',
    minHeight: 150,
    borderRadius: 10,
    paddingTop: 0,
  },
  summaryBoxHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    padding: 15,
    width: '100%',
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  summaryTextTitle: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    marginTop: 5,
    //textAlign: 'center'
  },
  summaryText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'justify'
  },
});

export default ElectionsPortalScreen;
