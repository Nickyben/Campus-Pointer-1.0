import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from 'react-native';

//React navigation version 5
import { NavigationContainer } from '@react-navigation/native';

import { DeptTabNavigator, PointerDrawerNavigator, AuthStackNavigator } from './PointerNavigator';
import WelcomeScreen from '../screens/pointerApp/WelcomeScreen';
import AutoLoginScreen from '../screens/pointerApp/AutoLoginScreen';

const AppNavigator = (props) => {
	const isAuthorized = useSelector((state) => !!state.authReducer.idToken);
	const userId = useSelector((state) => !!state.authReducer.userId);
	const triedAutoLogin = useSelector((state) => !!state.authReducer.triedAutoLogin);

	//const isAuthorized = false;

	return (
		<NavigationContainer>
			{
				isAuthorized && <PointerDrawerNavigator /> //successfully logged in
			}
			{
				!isAuthorized && triedAutoLogin && <AuthStackNavigator />
				//is not logged in and has tried auto login and failed to get idToken
			}
			{
				!isAuthorized && !triedAutoLogin && <AutoLoginScreen />
				//is not logged in and has not tried the auto login
			}
			{/* <WelcomeScreen/> */}
		</NavigationContainer>
	);
};

export default AppNavigator;
