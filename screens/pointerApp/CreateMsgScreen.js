import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform, SafeAreaView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince, getWhen } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import Card from '../../components/UI/Card';
import { fetchChatMessages } from '../../store/actions/messageActions';
import ChatInput from '../../components/UI/ChatInput';






const _Item = ({ content: { id, messages }, onSelect, navig, index, searchWord }) => {
  const chatPerson = useSelector(s => s.dataReducer.availableStudents.
    find(s => s.id === id));
  const { image, fullName, level, office, post, department } = chatPerson && chatPerson;
  const [fullNameSearched, setFullNameSearched] = useState(
    (<Text key={Math.random()} style={{ ...styles.detailsText, }}>{fullName}</Text>))


  const viewChatHandler = () => {

    //console.log('from here')
    navig.navigate('MsgChatDetail', { chatId: id, fullName })
  };


  useEffect(() => {
    if (searchWord) {

      setFullNameSearched(p => fullName.split(searchWord).map((subString, i, arr) => {
        if (i === arr.length - 1) {
          return (
            <Text key={i} style={{ ...styles.detailsText, }}>{subString}</Text>
          )
        }
        return (
          <Text key={i}>
            <Text key={Math.random()} style={{ ...styles.detailsText, }}>{subString}</Text>
            <Text
              key={Math.random()}
              style={{ ...styles.detailsText, color: Colors.primary }}>
              {searchWord}</Text>
          </Text>
        );
      }))
      //new RegExp(searchWord, 'i')

    } else {
      setFullNameSearched(p => (<Text key={Math.random()} style={{ ...styles.detailsText, }}>{fullName}</Text>))
    }
  },[searchWord, fullName, styles, ]);



  return (
    <Touch
      useIos
      onTouch={viewChatHandler}
      //onTouch={viewReactPersonHandler.bind(this, reactPerson, reactPerson.id, reactPerson.constructor.name)}
      style={{
        backgroundColor: '#fff',

      }}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Touch
            onTouch={() => { console.log('touched image') }} style={{
              width: styles.image.width,
              height: styles.image.height,
              borderRadius: styles.image.borderRadius
            }}>
            <Image
              source={image}
              style={styles.image} />
          </Touch>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}>
          <View style={{}}>
            <View style={{ ...styles.details, }}>
              <View style={{ flexDirection: 'row' }}>
                {fullName && fullNameSearched}
              </View>
              {office && <Text style={styles.detailsText2}>{office}</Text>}
              {post && <Text style={styles.detailsText2}>{post}</Text>}
              {level && <Text style={styles.detailsText2}>{level}</Text>}
            </View>
            <View style={{ padding: 5 }}>
              {department &&
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.detailsText2, color: '#567'
                  }}>{department}
                </Text>
              }
            </View>
          </View>
          {/* <View style={styles.timeContainer}>
            {date &&
              <Text style={{ ...styles.detailsText2, }}>
                {getWhen(date)[2]}
              </Text>
            }
            {(unreadMsgs > 0) &&
              <View style={styles.unreadBadgeContainer}>
                <Text style={styles.unreadBadgeCount}>{unreadMsgs}</Text>
              </View>
            }
          </View> */}
        </View>
      </View>

    </Touch>

  );
};





const CreateMsgScreen = ({ navigation, route: { params: { } } }) => {
  //const userMsgs = useSelector(s => s.messageReducer.availableMessages);
  //const chatPersonIds = useSelector(s => s.messageReducer.availableChatPersonsId);
  const chatMessages = useSelector(s => s.messageReducer.availableChatMsgs);
  const searchStudents = useSelector(s => s.dataReducer.availableStudents)
  const [chatMsgs, setChatMsgs] = useState(chatMessages);
  const [searchWord, setSearchWord] = useState('')
  const dispatch = useDispatch();

  const renderItem = ({ item, index }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item}
      onSelect={() => { }}
      navig={navigation}
      index={index}
      searchWord={searchWord}
    />
  );



  const loadSearchesHandler = (text) => {
    if (text) {
      setChatMsgs(p => {
        return (
          searchStudents.filter(s => s.fullName.toLowerCase().includes(text.toLowerCase()) &&
            s.id !== 'studentUserId').
            map(s => {
              const chatMsg = chatMsgs.find(c => c.id === s.id)
              const msgs = chatMsg ? chatMsg.messages : []
              return ({ id: s.id, messages: msgs })
            })
        )
      })

    } else {
      setChatMsgs(p => chatMessages)
    }
    setSearchWord(p => text);
  }

  const loadChatMessages = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchChatMessages());
    //   } 
    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadChatMessages);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadChatMessages]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadChatMessages().then(() => {
        //       setIsLoading(false);
      });
    }
    , [loadChatMessages]);



  //console.log(messages.filter((m, i) => i < 20))

  return (
    <View style={styles.screen}>
      <ChatInput
        style={styles.typingContainer}
        hideRightIcon={true}
        iconLeftName='search'
        leftIconBgColor='transparent'
        leftIconBgBorderRadius={50}
        onInputChange={loadSearchesHandler}
        onLeftIconPress={loadSearchesHandler}
        multiline={false}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        //remember to render num according to screen dimensions
        initialNumToRender={20}
        keyExtractor={(item, index) => item.id}
        data={chatMsgs}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        extraData={searchWord}
      />


    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  const settingsIcon = Platform.OS == 'android' ? 'md-settings' : 'ios - settings';

  return ({
    headerTitle: 'New Message',
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          tile='New Message'
          iconName={settingsIcon}
          onPress={() => {
            navigation.navigate('MessageSettings', {})
          }}
        />
      </HeaderButtons>
    ),
  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f3f6f7',

    //flexDirection: 'column-reverse'
  },
  typingContainer: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    top: 0,
    bottom: 'auto',
  },
  flatList: {
    marginTop: 60,
    flex: 1,
  },
  listContainer: {
    //paddingVertical: 10,
    backgroundColor: '#f3f6f7',
    paddingBottom: 10,
  },

  itemContainer: {
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },


  imageContainer: {
    backgroundColor: '#efefef',
    width: 45,
    height: 45,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image: {
    width: 45, height: 45,
    borderRadius: 35,
    borderColor: '#fff',
    borderWidth: 3,
  },
  details: {
    //alignItems: 'flex-end',
    padding: 5,
    paddingHorizontal: 5,
    //backgroundColor: 'blue',
  },
  detailsText: {
    fontFamily: 'OpenSansBold',
    fontSize: 14,
    color: '#333',
  },
  detailsText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 12,
    color: '#678',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    //backgroundColor:'red',
  },
  unreadBadgeContainer: {
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  unreadBadgeCount: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.primary + 'dd',//'#22ff99',
    width: 25,
    height: 25,
    borderRadius: 15,

  }
});

export default CreateMsgScreen;
