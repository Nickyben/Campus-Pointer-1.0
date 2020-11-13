import React, { useState,useCallback, useEffect, useReducer, } from 'react';
import { TextInput, Text, View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Input from './Input';
import TouchIcon from './TouchIcon';



const ChatInput = ({ chatId, onSubmit, elevated}) => {
  const [submitted, setSubmitted] = useState(false);
  const [clear, setClear] = useState(false);
  const [chatInputState, setChatInputState] = useState({});


  const dispatch = useDispatch();


  const msgInputHandler = useCallback((inputNameOrId, text, validity, hasFocus, lostFocus) => {// 
    setChatInputState(p => (
      { inputNameOrId, text, validity, hasFocus, lostFocus, }
    ))
    setSubmitted(p => false)

  }, [setChatInputState])//, [dispatchFormAction]);



  const msgPushHandler = () => {
    chatInputState.text && onSubmit(chatId, 'studentUserId', chatId, chatInputState.text);
    chatInputState.text && setSubmitted(p => true)
  }

  const elevateStyle = elevated ? {
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 10,
  } : {}

  return (
    <SafeAreaView style={{...styles.typingContainer, ...elevateStyle}} >
      <View style={styles.typingActions}>
      </View>

      <Input
        id={'chatScreenInput'}
        onInputChange={msgInputHandler}
        newValue={submitted ? '' : chatInputState.text}
        hideLabel hideFloatingLabel showErrorMsg={false} singleInput rectInput
        placeholder='Start typing message'
        icon={{ iconName: 'images', }}
        style={{ width: '89%' }}
        inputStyle={{ height: '100%' }}
        multiline={true}
        inputContainerStyle={styles.inputContainerStyle}
        submitted={submitted}
      />
      <View style={styles.submitMsgAction}>
        <TouchIcon
          onTouch={msgPushHandler}
          bgColor={Colors.primary+'22'}
          borderColor={Colors.primary}
          bigBg
          name={'send'}
          size={22}
          color={Colors.primary}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  typingContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    height: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    //borderTopWidth: 1,
    borderTopColor: '#ddd',//Colors.primary + '77',
  },

  typingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',

  },
  inputContainerStyle: {
    //backgroundColor: 'blue',
    borderRadius: 20,
    borderBottomWidth: 0,
    height: '100%',
  },
  submitMsgAction: {
    width: '10%',
    height: '100%',
    borderRadius: 1000,
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;