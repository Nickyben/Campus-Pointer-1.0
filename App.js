


import React, { useState } from 'react';
import { StyleSheet, Text, View, YellowBox, SafeAreaView, } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import {ignoreActions, filterActions} from 'redux-ignore';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//import {composeWithDevTools}from 'redux-dev...(close the ...)tools-extension';//use when you want to monitor your redux state,actions,reducers etc on the RN debugger
//to use it, run: npm install --save-dev redux-dev...(close the ...)tools-extension, pass composeWithDevTools as 2nd arg to createStore
import AppNavigator from './navigation/AppNavigator';
import courseAppReducer from './store/reducers/courseAppReducer';
import dataReducer from './store/reducers/dataReducer';
import homeReducer from './store/reducers/homeReducer';
import electionPortalReducer from './store/reducers/electionPortalReducer';
import reportsReducer from './store/reducers/reportsReducer';
import settingsReducer from './store/reducers/settingsReducer';
import messageReducer from './store/reducers/messageReducer';
import authReducer from './store/reducers/authReducer';
import formReducer from './store/reducers/formReducer';
import { authActionTypes } from './store/actions/authActions';
import { courseAppActionTypes } from './store/actions/courseAppActions';
import { dataActionTypes } from './store/actions/dataActions';
import { homeActionTypes } from './store/actions/homeActions';
import { electionPortalActionTypes } from './store/actions/electionPortalActions';
import { settingsActionTypes } from './store/actions/settingsActions';
import { messageActionTypes } from './store/actions/messageActions';
import { formActionTypes } from './store/actions/formActions';
import { reportsActionTypes } from './store/actions/reportsActions';

enableScreens(); //useScreens(); is for lower versions of expo and react-native

//used to combine multiple reducers 
const rootReducer = combineReducers({
  authReducer: filterActions(authReducer, authActionTypes),
  courseAppReducer: filterActions(courseAppReducer,courseAppActionTypes),
  dataReducer: filterActions(dataReducer,dataActionTypes),
  homeReducer: filterActions(homeReducer,homeActionTypes),
  electionPortalReducer: filterActions(electionPortalReducer,electionPortalActionTypes),
  reportsReducer: filterActions(reportsReducer,reportsActionTypes ),
  settingsReducer: filterActions(settingsReducer,settingsActionTypes),
  messageReducer: filterActions(messageReducer,messageActionTypes),
  formReducer: filterActions(formReducer,formActionTypes),
});

//creates the store with the rootReducer as arg
const reduxStore = createStore(rootReducer, applyMiddleware(ReduxThunk));



const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSansRegular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']); //check out the better solution than this
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const onAppLayout = () => {

  }

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
      />
    );
  }

  return (
    <Provider store={reduxStore} >
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
