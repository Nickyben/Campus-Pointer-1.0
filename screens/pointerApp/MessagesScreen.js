import React, { useState, useCallback, useEffect } from 'react';
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






const _Item = ({ content: { id, messages }, onSelect, navig, index }) => {


  const { type, date, senderId, receiverId, text, groupId } = messages[0];

  const sender = useSelector(s => s.dataReducer.availableStudents.
    find(s => s.id === senderId));
  const receiver = useSelector(s => s.dataReducer.availableStudents.
    find(s => s.id === receiverId))
  const unreadMsgs = rand([0, 0, 0, 1, 2, 3, 4, 5, 6]);// for now

  const { image, fullName, level, office, post } = (sender && receiver) &&
    senderId === 'studentUserId' ? receiver : sender;

  const viewChatHandler = () => {
    navig.navigate('MsgChatDetail', { chatId: id, fullName, image})
  };
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
                {fullName && <Text style={{ ...styles.detailsText, }}>{fullName}</Text>}
              </View>
              {office && <Text style={styles.detailsText2}>{office}</Text>}
              {post && <Text style={styles.detailsText2}>{post}</Text>}
              {level && <Text style={styles.detailsText2}>{level}</Text>}
            </View>
            <View style={{ padding: 5 }}>
              {text &&
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.detailsText2, color: '#567'
                  }}>{text}
                </Text>
              }
            </View>
          </View>
          <View style={styles.timeContainer}>
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
          </View>
        </View>
      </View>

    </Touch>

  );
};





const MessagesScreen = ({ navigation, route: { params: { } } }) => {
  const userMsgs = useSelector(s => s.messageReducer.availableMessages);
  const chatPersonIds = useSelector(s => s.messageReducer.availableChatPersonsId);
  const chatMsgs = useSelector(s => s.messageReducer.availableChatMsgs);
  //FETCH MESSAGES, REFRESH ETC

  const renderItem = ({ item, index }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item}
      onSelect={() => { }}
      navig={navigation}
      index={index}
    />
  );


  //console.log(messages.filter((m, i) => i < 20))
  return (
    <View style={styles.screen}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        //remember to render num according to screen dimensions
        initialNumToRender={30}
        keyExtractor={(item, index) => item.id}
        data={chatMsgs}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchIcon
        style={{ bottom: 20, right: 20, position: 'absolute' }}
        onTouch={() => {navigation.navigate('CreateMessage', {})}}
        bgColor={Colors.primary}
        borderColor={Colors.primary}
        largeBg
        elevated
        name={'chatbubbles'}
        size={26}
        color={'#fff'}
      />


    </View>
  );
};

export const screenOptions = ({navigation}) => {
  const settingsIcon = Platform.OS == 'android' ? 'md-settings' : 'ios - settings';

  return ({
    headerTitle: 'Messages',
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          tile='New Message'
          iconName={settingsIcon}
          onPress={() => {
            navigation.navigate('MessageSettings',{})
          }}
        />



      </HeaderButtons>
    ),
  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6f7',
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    padding: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },


  imageContainer: {
    backgroundColor: '#efefef',
    width: 60,
    height: 60,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image: {
    width: 60, height: 60,
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

export default MessagesScreen;
