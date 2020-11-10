import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform, ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince, getWhen } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';


const _Item = ({ content: { id, text, date, image, senderId, receiverId, type },
  onSelect, navig, index, senderIsPrevious, senderIsNext}) => {
  const isUser = senderId === 'studentUserId';
  return (
    <View style={{
      ...styles.chatLine,
    }}>
      <View style={{
        alignItems: isUser ? 'flex-end' : 'flex-start'
      }}>
        <View style={{
          ...styles.chatBoxContainer,
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

            }}>{text} </Text>


          </View>
        </View>
      </View>
      {!senderIsNext &&

        <Text style={{
          ...styles.chatText2,
          flex: 1,
          padding:5,
          paddingHorizontal:0,
          color: isUser ? '#666' : '#666',
          textAlign: isUser ? 'right' : 'left'

      }}>{getWhen(date)[2]}{getWhen(date)[1] ? ', '+getWhen(date)[1]: ''}</Text>
      }
    </View>
  );
};


const ChatScreen = ({ navigation, route: { params } }) => {
  const { chatId, } = params;
  const messages = useSelector(s => s.messageReducer.availableChatMsgs.
    find(c => c.id === chatId).messages);

  const renderItem = ({ item, index }) => {
    const prev = index > 0 ? index - 1 : 0;
    const next = index+1 >= messages.length? messages.length-1 : index+1
    const senderIsPrev = messages && (messages[index].senderId === messages[prev].senderId) && (index !== prev);
    const senderIsNext = messages && (messages[index].senderId === messages[next].senderId) && (index !== next);
    return (
      <_Item content={item}
        index={index}
        onSelect={() => { }}
        navig={navigation}
        senderIsPrevious={senderIsPrev}
        senderIsNext = {senderIsNext}
      />
    )
  };


  //console.log(messages.filter((m, i) => i < 20))
  return (
    <View style={styles.screen}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        initialNumToRender={30}
        keyExtractor={(item, index) => item.id}
        data={messages}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};


export const screenOptions = ({ navigation, route: { params } }) => {
  const createIcon = Platform.OS == 'android' ? 'md-more' : 'ios - more';

  const { fullName } = params;
  return ({
    headerTitle: fullName,
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
  screen: {},
  listContainer: {
    paddingBottom: 10,
    backgroundColor: '#fafdfe'
  },
  chatLine: {
    paddingHorizontal: 15,
    marginBottom: 2,
  },
  chatBoxContainer: {
    borderRadius: 10,

  },
  chatBox: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 10,
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
