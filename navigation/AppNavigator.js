import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from 'react-native';

//React navigation version 5
import { NavigationContainer } from '@react-navigation/native';

import { DeptTabNavigator, PointerDrawerNavigator,AuthStackNavigator } from './PointerNavigator';
import StartupScreen from '../screens/pointerApp/StartupScreen';
import WelcomeScreen from '../screens/pointerApp/WelcomeScreen';

const AppNavigator = (props) => {
	// const isAuth = useSelector(state => !!state.authRed.idToken);
	// const didTryAutoLogin = useSelector(state => !!state.authRed.didTryAutoLogin);

	const isSignedIn = true;

	return (
		<NavigationContainer 
		>
			{isSignedIn ? <PointerDrawerNavigator /> : <AuthStackNavigator />}


			{/* {isAuth && <ShopDrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
			{/* <WelcomeScreen/> */}
			{/* <DeptTabNavigator /> */}
		</NavigationContainer>
	);
};

export default AppNavigator;
