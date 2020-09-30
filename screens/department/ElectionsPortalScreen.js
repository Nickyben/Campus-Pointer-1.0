import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions, Button
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

  const [portalScreen, setPortalScreen] = useState('overview');

  const portalScreenHandler = (screen) => {
    setPortalScreen(screen)
  };

  const instructions = [
    'Use the button below (if active) to access the screen where candidates are shown.',
    'In the Candidates\' screen, search for the office you want to vote on.',
    'For each electoral office, select --Vote-- for a candidate you want.',
  ];

  const instructions2 = [
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
                  This Election Portal is usable for students who
                  have satisfied the requirements for the departmental or
                  association elections. It is basically  a system with which
                  voting is made incredibly easy and thus facilitates free and fair
              electoral process.{'\n'}{'\n'}

              Students (electors) are encouraged to follow the
              given instructions, vote wisely and with all sureness.
              A vote, when given, cannot be reversed.

              {'\n'}{'\n'}
              Student Contestants (to be elected) are also encouraged to follow the
              corresponding instructions and register with the requested details.
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
        <VotingScreen navig ={ navig} changeScreen={portalScreenHandler} />
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
    width: '48%'
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
});

export default ElectionsPortalScreen;
