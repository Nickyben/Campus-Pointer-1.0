import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useWindowDimensions } from 'react-native';

//React navigation version 5
import { NavigationContainer } from '@react-navigation/native';

import { DeptTabNavigator, PointerDrawerNavigator, AuthStackNavigator } from './PointerNavigator';
import WelcomeScreen from '../screens/pointerApp/WelcomeScreen';
import AutoLoginScreen from '../screens/pointerApp/AutoLoginScreen';
import { StyleSheet } from 'react-native';
import ErrorScreen from '../screens/pointerApp/ErrorScreen';
import AuthLoadingScreen from '../screens/pointerApp/AuthLoadingScreen';
import { logout } from '../store/actions/authActions';

const AppNavigator = (props) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const isAuthorized = true; //useSelector((state) => !!state.authReducer.idToken);
	const userId = useSelector((state) => state.authReducer.userId);
	const triedAutoLogin = useSelector((state) => !!state.authReducer.triedAutoLogin);

	const authHandler = async () => {
		let action = logout();

		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			setIsLoading(false);
		} catch (err) {
			//	alert(err.message)
			setError(err.message);
			setIsLoading(false);
		}
	};
	// useEffect(() => {
	// 	if (error) {
	// 		alert(error);
	// 		//Alert.alert('Error Occurred', error, [{ text: 'Okay' }]);
	// 	}
	// }, [error]); //check : i added an empty array dep

	if (isLoading) {
		return <AuthLoadingScreen />;
	}

	if (error) {
		return (
			<ErrorScreen
				errorObj={{
					messageHead: error.toLowerCase().includes('network')
						? 'Network Connection Failed'
						: 'Error Occurred',
					messageBody: error,
					image: null,
				}}
				retryFunc={() => setError(null)}
			/>
		);
	}

	return (
		<NavigationContainer>
			{
				isAuthorized && <PointerDrawerNavigator onLogout={authHandler} /> //successfully logged in
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

const styles = StyleSheet.create({
	spinner: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default AppNavigator;
