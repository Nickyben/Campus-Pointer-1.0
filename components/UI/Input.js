//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Input as RNElemInput } from 'react-native-elements';
import React, { useEffect, useReducer, } from 'react';
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import ItemIcon from './ItemIcon';

const INPUT_FOCUS = 'INPUT_FOCUS';
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_FOCUS:
      return ({
        ...state,
        gainedFocus: true,
        //alignText: 'justify'
      });

    case INPUT_CHANGE:
      return (
        {
          ...state,
          value: action.value,
          validity: action.validity,
          hasFocus: true,//action.hasFocus,//isTouched: action.isTouched
          // alignText: 'justify',
        }
      );

    case INPUT_BLUR:
      return ({
        ...state,
        hasFocus: false,
        lostFocus: true,
        //alignText: state.value.length > 0 ? 'center' : 'justify',
      });

    default:
      return state;
  }
  return (state);
};


const Input = (props) => {
  const { id, initialValue, initialValidity, onInputChange = () => { }, required, email, password,
    min, max, textType, minLength, maxLength, style, label, errorMsg, successMsg, textInputProps, secureText, formState,
    icon, inputContainerStyle, floatingLabel, placeholder } = props;

  const [inputState, dispatchAction] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    validity: initialValidity ? initialValidity : true,
    hasFocus: false,
    lostFocus: false,
    gainedFocus: false,
    // alignText: 'justify'
  });



  useEffect(() => {
    if (inputState.hasFocus) {
      onInputChange(id, inputState.value, inputState.validity)
    }
  }, [inputState, onInputChange, id]);


  const textChangeHandler = text => {
    //console.log(text);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailText = text.toLowerCase();
    let isValid = true;

    //for requirements
    if (required && text.trim().length === 0) {
      isValid = false;
    }

    //for email
    if (email && !emailRegex.test(emailText)) {
      isValid = false;
    }

    //for passwords
    if (password && (text.length < 7 || (minLength != null && text.length < minLength))) {
      isValid = false;
    }

    //for numbers
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }

    //for strings
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    if (maxLength != null && text.length > maxLength) {
      isValid = false;
    }

    dispatchAction({ type: INPUT_CHANGE, value: text, validity: isValid, hasFocus: true })
  };

  const lostFocusHandler = () => {
    dispatchAction({ type: INPUT_BLUR })
  };

  const gainedFocusHandler = () => {
    dispatchAction({ type: INPUT_FOCUS })
  };

  return (//REMINDER: Edit inputs are not working properly when you submit with first input Empty
    <View style={{ ...styles.formControl, ...style, paddingTop: floatingLabel ? 5 : 0 }}>
      {true && !(inputState.value.length > 0 && inputState.hasFocus && true) &&
        <Text style={styles.label}>{label ? label : 'Input Label'}</Text>}
      {inputState.value.length > 0 && inputState.hasFocus && true &&
        <Text style={{ ...styles.floatingLabel, }}>
          {floatingLabel ? floatingLabel : placeholder ? placeholder : 'Placeholder'}</Text>
      }


      <View style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        {true &&
          <View style={{ marginLeft: 10, }}>
            <ItemIcon
              bgColor={Colors.primary + '22'}
              name={
                icon ? icon.iconName : 'clipboard'
              }
              size={23}
              color={icon && icon.iconColor ?
                iconColor : Colors.primary}
            />
          </View>
        }

        <TextInput
          {...props}
          placeholder={placeholder ? placeholder : 'placeholder'}
          style={{ ...styles.input, }} // textAlign: inputState.alignText }}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          onFocus={gainedFocusHandler}

        />
      </View>

      {!inputState.validity && inputState.hasFocus && inputState.value.length > 1 &&
        <View style={styles.errorMsgWrap}><Text style={styles.errorMsg}>
          {errorMsg ? errorMsg : 'Error message'}</Text></View>
      }
      {inputState.validity && inputState.hasFocus && inputState.value.length > 1 &&
        <View style={styles.errorMsgWrap}><Text style={styles.successMsg}>
          {successMsg ? successMsg : 'Valid input'}</Text></View>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 10,

  },
  label: {
    marginTop: 10,
    marginBottom: 7,
    paddingHorizontal: 10,
    fontSize: 17,
    fontFamily: 'OpenSansBold',
    color: '#555',

  },

  floatingLabel: {
    color: '#ccc',
    paddingHorizontal: 10,
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1.5,
    borderRadius: 10,
    paddingBottom: 8
  },
  input: {
    // alignSelf: 'center',
    //width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'OpenSansRegular',
    fontSize: 18,
  },

  errorMsgWrap: {
    marginTop: 5,
  },
  errorMsg: {
    textAlign: 'center',
    color: '#ff3333',
    padding: 5,
    //paddingBottom:0,
    fontFamily: 'OpenSansRegular',
  },
  successMsg: {
    textAlign: 'center',
    color: '#11ee22',
    padding: 5,
    fontFamily: 'OpenSansRegular',
  },

});

export default Input;