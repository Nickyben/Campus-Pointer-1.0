import React, { useState, useCallback, useEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
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

import { sendChatMessage } from '../../store/actions/messageActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Message from '../../models/message';


const _Item = ({ content: { id, text, date, image, senderId, receiverId, type },
  onSelect, navig, index, senderIsPrevious, senderIsNext }) => {
  const isUser = senderId === 'studentUserId';
  return (
    <Touch
      //onLayout={()=>{console.log('touch layout')}}
      style={{
        ...styles.chatLine,
        alignItems: isUser ? 'flex-end' : 'flex-start'

      }}>
      <View style={{
        alignItems: isUser ? 'flex-end' : 'flex-start',
        width: '80%'
      }}>
        <View style={{
          ...styles.chatBoxContainer,
          borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
          borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
          borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
          borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
          backgroundColor: '#fff',
        }}>
          <View style={{
            ...styles.chatBox,
            flexDirection: 'row',
            borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
            borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
            borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
            borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
            backgroundColor: isUser ? Colors.primary : Colors.primary + '33',// '#e3e6e7',
          }}>
            <Text style={{
              ...styles.chatText,
              color: isUser ? '#fff' : '#333',
            }}>{text}
            </Text>
          </View>
        </View>
      </View>
      {!senderIsNext &&
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

  const { chatId, } = params;
  const msgs = useSelector(s => s.messageReducer.availableChatMsgs.
    find(c => c.id === chatId).messages);
  const [messages, setMessages] = useState(msgs || []);


  const pushMsgHandler = (chatId, senderId, receiverId, msg) => {
    setMessages(p => [
      new Message(
        senderId + receiverId + new Date().toLocaleDateString() + Math.random(),
        'individual',
        new Date(),
        senderId,
        receiverId,
        {
          text: msg,
          image: null,
        },
        null
      )
    ].concat(
      [...p]
    ))
  }
  useEffect(() => {
    if (msgs.length !== messages.length) {
      // dispatch(sendChatMessage(chatId, 'studentUserId', chatId, chatInputState.text))
      dispatch(sendChatMessage(messages[0]))

    }
  }, [messages, msgs])

  const renderItem = ({ item, index }) => {
    const next = index > 0 ? index - 1 : 0;
    const prev = index + 1 >= messages.length ? messages.length - 1 : index + 1
    const senderIsPrev = messages && (messages[index].senderId === messages[prev].senderId) && (index !== prev);
    const senderIsNext = messages && (messages[index].senderId === messages[next].senderId) && (index !== next);
    return (
      <_Item content={item}
        index={index}
        onSelect={() => { }}
        navig={navigation}
        senderIsPrevious={senderIsPrev}
        senderIsNext={senderIsNext}
      />
    )
  };


  //console.log(chatInputState.submitted)
  return (
    <View style={styles.screen}>


      <FlatList
        style={styles.flatList}
        //initialNumToRender, refreshing
        //remember to render num according to screen dimensions
        initialNumToRender={30}
        keyExtractor={(item, index) => item.id}
        data={messages}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        inverted
      />
      <ChatInput chatId={chatId} onSubmit={pushMsgHandler} elevated />
    </View>
  );
};


export const screenOptions = ({ navigation, route, route: { params } }) => {
  const { image } = params;
  const createIcon = Platform.OS == 'android' ? 'md-more' : 'ios - more';

  const { fullName } = params;
  return ({
    headerTitle: fullName,
    headerLeft: ({tintColor}) =>
      (<View style={{ flexDirection: 'row' }}>
        <HeaderBackButton
          tintColor={tintColor}
          style={{ marginRight: 5 ,}}
        //onPress={()=>{navigation.goBack()}}
        />
        <View style={styles.chatPersonImageContainer}>
          <Touch
            onTouch={() => { console.log('touched author\'s image') }} style={{
            }}>
            <Image
              source={image}
              style={styles.chatPersonImage} />
          </Touch>
        </View>
      </View>
      ),
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          tile='New Message'
          iconName={createIcon}
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
    justifyContent: 'space-between'
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
    marginBottom: 70,
    flex: 1,
  },
  listContainer: {
    paddingVertical: 10,
    backgroundColor: '#f3f6f7',
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
