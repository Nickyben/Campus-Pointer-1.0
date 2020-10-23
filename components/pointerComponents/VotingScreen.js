import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function
import {
  StyleSheet, Modal, ScrollView, SectionList, Text,
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
import Btn from '../UI/Btn';
import { markCourse, markAllCourses } from '../../store/actions/courseAppActions';
import OfficesScreen from '../../screens/department/OfficesScreen';
import { voteOffice } from '../../store/actions/electionPortalActions';






const MyItem = ({ content, content: { studentData: { id, fullName, image, }, applicantId, aspiringOffice, coverQuote },
  onClickVote, onSelect, style, office }) => {
  const _dispatch = useDispatch();

  const officeIsVoted = useSelector(s => s.electionPortalReducer.userOfficesVoted)
    .find(o => o.hasOwnProperty(office) && !!o[office]);

  const candidateVoted = officeIsVoted && officeIsVoted[office];
  const candidateIsVoted = candidateVoted === fullName;//officeIsVoted ;//&& voter.officesVoted[office].studentData.id === id;
  //console.log(officeIsVoted, candidateIsVoted)





  const [displayConfirm, setDisplayConfirm] = useState(false);
  const onPressItemHandler = () => {
    onSelect(content);
  };

  const clickedVoteHandler = () => {
    onClickVote(office, fullName, applicantId, content)
  };
  return (

    <View style={styles.listContainer}>
      <TouchCard

        onTouch={onPressItemHandler}
        style={{ ...styles.itemCard, }}>

        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image style={{
              ...styles.listImage,
            }} source={image} />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              {fullName && <Text style={styles.title} numberOfLines={2}>
                Name:
                <Text style={styles.detail}>   {fullName}</Text></Text>}
              {applicantId && <Text style={styles.title} numberOfLines={2}>
                Applicant Id:
                <Text style={styles.detail}>   {applicantId}</Text></Text>}
              {aspiringOffice && <Text style={styles.title} numberOfLines={2}>
                Aspiring Office:
                <Text style={styles.detail}>   {aspiringOffice[1]}</Text></Text>}
              {coverQuote && <Text style={styles.title} numberOfLines={2}>
                Cover Quote:
              <Text style={styles.detail}>   {coverQuote}</Text></Text>}
            </View>
            <View style={{
              justifyContent: candidateIsVoted ? 'space-between' : 'flex-end',
              flexDirection: 'row',
              width: '100%',
              padding: 10,
              paddingHorizontal: 20,
              alignItems: 'center'
            }}>
              {candidateIsVoted && <Ionicons
                name={
                  Platform.OS === 'android' ? `md-thumbs-up` : `ios-thumbs-up`
                }
                size={23}
                color={Colors.primary}
              />}
              <Btn
                disabled={officeIsVoted}
                style={styles.btn}
                icon={{ iconName: 'thumbs-up' }}
                onPress={clickedVoteHandler}
              >
                Vote
              </Btn>
            </View>


          </View>

        </View>


      </TouchCard>

    </View>

  )
};

const SectionItem = ({ onCollapse, title, showingOffice, candidates }) => {
  const [showCandidates, setShowCandidates] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const showCandidatesHandler = (title) => {
    showCandidates === true ?
      onCollapse('empty') :
      onCollapse(title);
  }

  const officeIsVoted = useSelector(s => s.electionPortalReducer.userOfficesVoted)
    .find(o => o.hasOwnProperty(title) && !!o[title]);

  useEffect(() => {
    setShowCandidates(p => showingOffice === title);
  }, [showingOffice]);

  //console.log(showCandidates, showingOffice)
  return (
    <View style={{ backgroundColor: Colors.switchPrimary }}>
      <View style={{
        ...styles.sectionHeader, borderBottomColor: !showCandidates ? '#e3e6e7' : Colors.switchPrimary,
        borderBottomWidth: !showCandidates ? .8 : 0,
      }}>
        <View style={{
          ...styles.sectionHeaderWrap,

        }}>
          <View style={{ marginLeft: 10, alignItems: 'flex-start' }}>
            <TouchIcon
              //onTouch={() => { setIsVoted(p => !p); setIsClicked(p => true) }}
              touched={() => officeIsVoted}
              disabled
              name={Ionicons}
              size={24}
              color={Colors.switchWhite}
              toggleIcons={['square-outline', 'checkbox']}
            >
            </TouchIcon>
          </View>
          <Text
            onPress={showCandidatesHandler.bind(this, title)}
            style={styles.sectionHeaderLabel}
          >{title}</Text>
          <TouchIcon
            onTouch={showCandidatesHandler.bind(this, title)}
            touched={() => !showCandidates}
            name={Ionicons}
            size={23}
            bgColor={Colors.switchWhite + '33'}
            color={Colors.switchWhite}
            toggleIcons={['arrow-dropdown', 'arrow-dropright']}
            // color={Colors.switchWhite}
            // toggleIcons={['arrow-dropdown-circle', 'arrow-dropright-circle']}
          >
          </TouchIcon>
        </View>

      </View>

      {showCandidates &&
        <View style={{ backgroundColor: '#f3f6f7', borderTopLeftRadius: 50, height: 50, width: '100%' }}></View>}
      {showCandidates && candidates.length === 0 &&
        <View style={{
          backgroundColor: '#f3f6f7',
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
            No candidates are available for this electoral position yet.
            </Text>
        </View>
      }
    </View>

  )
};











const VotingScreen = ({ navig, }) => {

  const dispatch = useDispatch();
  const electoralOffices = useSelector(state => state.electionPortalReducer.availableOffices);
  const contestants = useSelector(state => state.electionPortalReducer.validCandidates);
  const votedOffices = useSelector(state => state.electionPortalReducer.votedOffices);
  const voter = useSelector(s => s.electionPortalReducer.votedVoters).
    find(v => v.regNumber === 'MyRegNum' && v.id === 'myUserId');


  const OFFICE_SECTIONS = [];
  for (let i = 1; i <= electoralOffices.length; i++) {
    OFFICE_SECTIONS.push(
      {
        title: electoralOffices[i - 1][0],
        data: contestants.filter(c => { return (c.aspiringOffice === electoralOffices[i - 1]) }),
      }
    );
  }


  const [showingOffice, setShowingOffice] = useState(OFFICE_SECTIONS[0].title);
  const [showModal, setShowModal] = useState(false);
  const [voteData, setVoteData] = useState(null)
  const titleHandler = (title) => {
    setShowingOffice(p => title);
  }

  //console.log(voteData)
  const voteHandler = (office, candidate, applicantId, candidateData) => {
    setVoteData(p => ({ office, candidate, applicantId, candidateData }))
    setShowModal(p => true);
  };

  const clickedConfirmHandler = () => {
    const { office, candidateData } = voteData;
    //console.log({ office, candidate })
    dispatch(voteOffice(office, candidateData, {
      id: 'myUserId',
      regNumber: 'myRegNum',
      fullName: 'Nicholas Ikechukwu',
      //officesVoted: 
    }));
    setShowModal(p => false);
  };

  useEffect
  const renderItem = ({ item, index, section: { title, data } }) => { //auto gets data in obj form , I deStructured it in params
    return (
      showingOffice !== title ?
        <></> :
        <MyItem content={item} onClickVote={voteHandler} onSelect={() => {
          navig.navigate('DeptDetails', { item: {}, candidateId: item.applicantId, title: item.constructor.name })
        }} office={title} />
    )
  };

  const renderSectionHeader = ({ section: { title, data } }) => {
    return (
      <SectionItem
        candidates={data}
        title={title}
        onCollapse={titleHandler}
        showingOffice={showingOffice}
      />
    )
  };

  return (
    <View style={styles.screen}>
      <SectionList
        //initialNumToRender={25}
        sections={OFFICE_SECTIONS}
        keyExtractor={(item, index) => item + index}
        renderItem={(renderItem)}
        renderSectionHeader={renderSectionHeader}
        extraData={{ votedOffices, showingOffice }}

      //ListEmptyComponent={listEmptyComponent}
      />
      <Modal
        animationType={'fade'}
        visible={showModal}
        transparent
        onRequestClose={() => {
          setShowModal(() => false)
        }}
      >
        <View style={styles.confirmModal}>
          {voteData &&
            <View style={styles.confirmBox}>
              <Text style={styles.confirmBoxHeader}>CONFIRMATION</Text>
              <View style={{ padding: 20 }}>
                <Text style={styles.noteText}>
                  Vote
                  <Text style={{ color: '#00a7e7' }}> {voteData.candidate}</Text>
                  {} of Id:
                  <Text style={{ color: '#00a7e7' }}> {voteData.applicantId}</Text>
                  {} for the office of the
                  <Text style={{ color: '#00a7e7' }}> {voteData.office}</Text>?
                </Text>
                <Text style={styles.warningText}>Once you click --Confirm-- your vote will be casted
              {} and you can't change it.
              </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Btn
                    style={styles.confirmBtn}
                    bgColor={Colors.accent}
                    onPress={() => { setShowModal(p => false) }}>Change</Btn>

                  <Btn
                    style={styles.confirmBtn}
                    bgColor={Colors.primary}
                    onPress={clickedConfirmHandler}>Confirm</Btn>
                </View>

              </View>

            </View>
          }
        </View>

      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
  sectionHeader: {
    backgroundColor: Colors.switchPrimary,
    paddingHorizontal: 20,
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

  itemCard: {
    padding: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 180, //please please, set these with respect to window size
    height: 180,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderRadius: 90,
    borderWidth: 2,
    borderColor: Colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,

  },
  listImage: {
    width: 150, //please please, set these with respect to window size
    height: 150,

    borderRadius: 75,
  },
  infoContainer: {
    width: '100%',
    //marginTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  btn: {
    width: '25%',
    minWidth: 100,
    marginTop: 10,
  },
  confirmBtn: {
    width: '49%',
    maxWidth: 100,
    marginTop: 30,
  },
  listContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f3f6f7'
  },
  confirmModal: {
    flex: 1,
    backgroundColor: '#000b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {

    backgroundColor: '#fff',
    width: '70%',
    minHeight: 200,
    borderRadius: 10,

  },
  confirmBoxHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    padding: 15,
    width: '100%',
    backgroundColor: Colors.switchPrimary,
    color: Colors.switchWhite,
    borderBottomColor: '#e3e6e7',
    borderBottomWidth: 1,
  },
  noteText: {
    textAlign: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 15,
    color: '#333',
  },
  warningText: {
    marginTop: 20,
    fontFamily: 'OpenSansBold',
    fontSize: 15,
    color: '#777',
    backgroundColor: Colors.error,
    padding: 10,
    borderRadius: 5,
  },
  titleContainer: {
    width: '100%',
    //alignItems: 'center',
    //alignSelf: 'flex-end',
    //borderTopStartRadius: 25,
    backgroundColor: Colors.primary + '11',
    //backgroundColor: '#f5f5f5',
    padding: 10,
    paddingHorizontal: 20,
  },

  title: {
    marginBottom: 5,
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    //color: Colors.primary//,
    color: '#222',
  },
  detail: {
    marginBottom: 5,
    //fontFamily: 'OpenSansRegular',
    fontSize: 13,
    //color: Colors.primary//,
    color: '#567',
  }

});

export default VotingScreen;


