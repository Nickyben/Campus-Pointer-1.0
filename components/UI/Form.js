import React, { useEffect, useCallback, useReducer } from 'react';
import { dispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View, Text, Alert, ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from './Card';
import Input from './Input';
import Colors from '../../constants/Colors';
import Btn from './Btn';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'


const formReducer = (state, action) => {//the state is initially the initial state passed to 2nd arg of useReducer
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,//replacing the key(the input's name)  and value in inputValues Obj with the new text from action.value
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,//replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
    };
    let updatedFormValidity = true;
    for (const key in updatedInputValidities) {
      //GOOD PRACTICE! : once the updatedFormValidity is false for any,
      // it remains false even if any other inputValidity is true, because the false will override in the AND logic
      updatedFormValidity = updatedFormValidity && updatedInputValidities[key];
    }

    return {
      //...state, //unnecessary
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formValidity: updatedFormValidity,
    }
  }
  return state;
};




const Form = ({ id, title, navig, items, children, submitTitle }) => {
  const inputItems = items ? items : [];

  let initialInputValues = {};
  let initialInputValidities = {};
  for (let input of inputItems) {
    initialInputValues[input.id] = '';
    initialInputValidities[input.id] = false;
  }
  const [formState, dispatchFormAction] = useReducer(formReducer, {//recommended instead of mgt of all text states and validity individually with useState() hook
    //initial Values
    inputValues: initialInputValues,
    //initial validity
    inputValidities: initialInputValidities,
    //initial general form validity
    formValidity: false,
    formId: id ? id : 'form' + Math.random().toString(),
  });

  const formInputHandler = useCallback((inputNameOrId, text, validity) => {
    dispatchFormAction(//almost just like dispatching in redux
      //action
      {
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid: validity,
        input: inputNameOrId,
      }
    )
  }, [dispatchFormAction]);//inputName,text, validity



  const formSubmitHandler = useCallback(async () => {

    if (!formState.formValidity) {
      Alert.alert('Invalid Form for Submission', 'Please Ensure That  all Fields are Correctly Filled!', [{ text: 'Okay ' }])
      return;
    }


    console.warn(formState.inputValues)
    //setError(null);
    // setIsLoading(true);

    try {
      //dispatching happens here

      // props.navigation.goBack();
    } catch (err) {
      // setError(err.message)
    }
    // setIsLoading(false);
    //props.navigation.goBack();
  }, [dispatch, formState,]);



  return (
    <KeyboardAvoidingView
    // style={{ flex: 1 }}
    // behavior='padding' check why this is not working well
    // keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scroll}>
        {/* <Card style={styles.form}> */}
          <Text style={styles.formTitle}>
            {title && title}
          </Text>
          <View style={{ padding: 20 }}>


            {children}
            {inputItems &&
              inputItems.map((input, index) => {
                return (
                  <Input

                    key={input.id + index}
                    {...input}
                    onInputChange={formInputHandler}
                    autoCorrect={false}
                  />
                );
              })
            }

            <Btn
              style={{ marginVertical: 20, borderRadius: 10, }}
              innerStyle={{ paddingVertical: 10 }}
              onPress={formSubmitHandler}
              bgColor={Colors.primary}
            >
              {submitTitle ? submitTitle : 'Submit'}
            </Btn>
          </View>

          {/* 
          <Input
            id='title'
            label='Title'
            errorMsg='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect={true}
            returnKeyType='next'
            onInputChange={formInputHandler}//using()=>formInputHandler(, ,) causes the a problem because it rebuilds as its dependencies change since its a useCallback 
            initialValue={editProduct ? editProduct.title : ''}
            initialValidity={!!editProduct} //editProduct ? true : false
            required
          /> */}


        {/* </Card> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = () => {
  return ({});
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#fff',
  },
  // form: {
  //   overflow: 'hidden',
  //   padding: 0,
  //   margin: 20,
  // },
  formTitle: {
    width: '100%',
    paddingTop:30,
    paddingBottom:0,
    padding: 20,
    textAlign: 'center',
    //backgroundColor: Colors.switchPrimary,
    color:Colors.primary,//'#222', //// Colors.switchWhiteAccent,//
    fontSize: 20,
    fontFamily: 'OpenSansBold',
    //borderBottomColor: '#f3f6f7',
     //borderBottomWidth: 2,

  }
});

export default Form;
