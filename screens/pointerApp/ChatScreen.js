import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform, ScrollView, SafeAreaView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince, getWhen } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import ChatInput from '../../components/UI/ChatInput';

import { sendChatMessage, fetchChatMessages } from '../../store/actions/messageActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Message from '../../models/message';


const _Item = ({ content: { id, text, date, image, senderId, receiverId, type },
  onSelect, navig, index, senderIsPrevious, senderIsNext, isLast }) => {
  const isUser = senderId === 'studentUserId';
  const shouldHaveCurve = ((isUser && !senderIsNext ? isUser && senderIsNext ? 0 : -10 : 0) !== 0) ||
    ((isUser && !senderIsNext ? isUser && senderIsNext ? 0 : 10 : 0) !== 0) ||
    ((isUser && !senderIsNext ? 0 : !isUser && senderIsNext ? 0 : isUser && senderIsNext ? 0 : 10) !== 0)
  return (
    <Touch
      //onLayout={()=>{console.log('touch layout')}}
      style={{
        ...styles.chatLine,
        alignItems: isUser ? 'flex-end' : 'flex-start'

      }}>
      <View style={{
        alignItems: isUser ? 'flex-end' : 'flex-start',
        width: '80%',
      }}>
        <View style={{
          ...styles.chatBoxContainer,
          // marginRight: isUser && !senderIsNext ? isUser && senderIsNext ? 0 : -10 : 0,
          // marginLeft: isUser && !senderIsNext ? 0 : !isUser && senderIsNext ? 0 : -10,
          // paddingRight: isUser && !senderIsNext ? isUser && senderIsNext ? 0 : 10 : 0,
          // paddingLeft: isUser && !senderIsNext ? 0 : !isUser && senderIsNext ? 0 : isUser && senderIsNext ? 0 : 10,

          borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
          borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
          borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
          borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,

         // borderTopLeftRadius: shouldHaveCurve && !isUser ? 100 : !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
         // borderTopRightRadius: shouldHaveCurve && isUser ? 100 : isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
          backgroundColor: isUser ? Colors.primary : Colors.primary + '33',// '#e3e6e7',
        }}>
          <View style={{
            ...styles.chatBox,
            flexDirection: 'row',
            borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
            borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
            borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
            borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
            backgroundColor: isUser ? Colors.primary : Colors.primary + '33', // '#e3e6e7',
            //backgroundColor: isUser ? Colors.primary : 'transparent'// '#e3e6e7',

          }}>
            <Text style={{
              ...styles.chatText,
              color: isUser ? '#fff' : '#111',
            }}>{text}
            </Text>
          </View>
        </View>
      </View>
      {!senderIsNext && !isLast &&
        <Text style={{
          ...styles.chatText2,
          flex: 1,
          padding: 5,
          paddingHorizontal: 0,
          color: isUser ? '#666' : '#666',
          textAlign: isUser ? 'right' : 'left'
        }}>{getWhen(date)[2]}{getWhen(date)[1] ? ', ' + getWhen(date)[1] : ''}</Text>
      }
    </Touch>
  );
};



const ChatScreen = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();


  const { chatId, fullName } = params;
  const chat = useSelector(s => (s.messageReducer.availableChatMsgs.find(c => c.id === chatId)));
  const msgs = chat ? chat.messages : []
  const [messages, setMessages] = useState(msgs);
  // const [scrollViewContentDim, setScrollViewContentDim] = useState({});
  const chatPerson = useSelector(s => s.dataReducer.availableStudents.find(s => s.id === chatId));
  const { image, firstName } = chatPerson && chatPerson;

  //check if to replace with the dispatching the addChatMessage 
  const pushMsgHandler = (msg) => {
    setMessages(p => p.concat(
      new Message(
        'studentUserId' + chatId + new Date().toLocaleDateString() + Math.random(),
        'individual',
        new Date(),
        'studentUserId',
        chatId,
        {
          text: msg,
          image: null,
        },
        null
      )
    ))
    //scrollToBottom();
  }
  useEffect(() => {
    if (msgs.length !== messages.length) {
      // dispatch(sendChatMessage(chatId, 'studentUserId', chatId, chatInputState.text))
      dispatch(sendChatMessage(messages[messages.length - 1]))

    }
  }, [messages, msgs])

  const viewChatPerson = () => {
    navigation.navigate('DeptDetails', { item: chatPerson, itemId: chatId, title: chatPerson.constructor.name })
  }

  const scrollToBottom = () => {//(contentWidth, contentHeight) 
    //setScrollViewContentDim(p => ({ contentWidth, contentHeight }))
    scrollViewRef.current.scrollToEnd({ animated: false, duration: 0 })

  }

  useLayoutEffect(() => {

    navigation.setOptions({
      headerTitle: ({ tintColor, style }) => (
        <HeaderTitle
          tintColor={tintColor}
          style={style}
          onPress={viewChatPerson}>{fullName}</HeaderTitle>),

      headerLeft: ({ tintColor }) =>
        (<View style={{ flexDirection: 'row' }}>
          <HeaderBackButton
            tintColor={tintColor}
            style={{ marginRight: 5, }}
            onPress={() => { navigation.goBack() }}
          />
          <View style={styles.chatPersonImageContainer}>
            <Touch
              onTouch={viewChatPerson}
              style={{
              }}>
              <Image
                source={image}
                style={styles.chatPersonImage} />
            </Touch>
          </View>
        </View>
        ),
    })
  }, [chatPerson, chatId,]);

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


  const RenderItem = ({ item, index }) => {
    const prev = index > 0 ? index - 1 : 0;
    const next = index + 1 >= messages.length ? messages.length - 1 : index + 1
    const senderIsPrev = messages && (messages[index].senderId === messages[prev].senderId) && (index !== prev);
    const senderIsNext = messages && (messages[index].senderId === messages[next].senderId) && (index !== next);
    return (
      <_Item content={item}
        index={index}
        onSelect={() => { }}
        navig={navigation}
        senderIsPrevious={senderIsPrev}
        senderIsNext={senderIsNext}
        isLast={index === messages.length - 1}
      />
    )
  };



  const EmptyList = ({ }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
        <Text
          style={{ fontFamily: 'OpenSansBold', fontSize: 17 }}
        >{firstName} has sent no messages yet...</Text>
      </View>
    );
  };



  //console.warn(messages.length)
  return (
    <View style={styles.screen}>
      {(messages.length > 0) &&
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          onLayout={scrollToBottom}
          onContentSizeChange={scrollToBottom}
          //onKeyboardDidShow={scrollToBottom}
          //enableOnAndroid={true}

          style={styles.flatList}
          contentContainerStyle={styles.listContainer}
        >
          {messages.map((msg, index) => {
            return (
              <RenderItem index={index} item={msg} key={msg.id + index} />
            )
          })}



        </KeyboardAwareScrollView>
      }

      {(messages.length === 0) &&
        <EmptyList />

      }


      {/* <FlatList
        style={styles.flatList}
        //initialNumToRender, refreshing
        //remember to render num according to screen dimensions
        initialNumToRender={25}
        keyExtractor={(item, index) => item.id}
        data={messages}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.listContainer}
      //inverted={-1}
      //initialScrollIndex={messages.length-1}
      /> */}
      <ChatInput chatId={chatId} onSubmit={pushMsgHandler} elevated multiline={true} />
    </View>
  );
};


export const screenOptions = ({ navigation, route, route: { params } }) => {
  const optionsIcon = Platform.OS == 'android' ? 'md-more' : 'ios - more';

  return ({

    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          tile='Options'
          iconName={optionsIcon}
          onPress={() => {
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
  chatPersonImageContainer: {
    backgroundColor: '#efefef',
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',

  },
  chatPersonImage: {
    width: 40, height: 40,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 3,
  },
  flatList: {
    marginBottom: 60,
    flex: 1,
  },
  listContainer: {
    //flex:1,
    paddingVertical: 20,
    paddingBottom: 60,
    backgroundColor: '#f3f6f7',
    //justifyContent: 'flex-end'
    //flexDirection: 'column-reverse'
  },

  chatLine: {
    paddingHorizontal: 15,
    marginBottom: 2,
  },
  chatBoxContainer: {
    borderRadius: 15,

  },
  chatBox: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  chatText: {
    color: '#fff',
    fontFamily: 'OpenSansBold',
    fontSize: 13,
  },
  chatText2: {
    color: '#ccc',
    fontFamily: 'OpenSansBold',
    fontSize: 10,
  },
});

export default ChatScreen;
