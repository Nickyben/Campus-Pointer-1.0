import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { authenticate, tryAutoLogin } from '../../store/actions/authActions';

import Colors from '../../constants/Colors';

const AutoLoginScreen = ({}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			let userData;

			try {
				userData = await AsyncStorage.getItem('userData');
			} catch (e) {
				// error reading value
			}
			if (!userData) {
				dispatch(tryAutoLogin());
				return;
			}
			const userDataObj = userData != null ? JSON.parse(userData) : null;
			const { idToken, userId, expiryDate, pushToken } = userDataObj; //added pushToken
			const expiryDateObj = new Date(expiryDate); //converting the ISOString back to an obj
			if (expiryDateObj <= new Date() || !idToken || !userId) {
				//checking if the expiry date is past or now or (token or userId cant be found)
				// props.navigation.navigate('Auth');
				dispatch(tryAutoLogin());
				return;
			}

			const expiryTime = expiryDateObj.getTime() - new Date().getTime();

			// props.navigation.navigate('Shop');
			dispatch(authenticate(idToken, userId, expiryTime));
		};

		tryLogin();
	}, [dispatch]);


	return (
		<View style={styles.screen}>
			<ActivityIndicator size={50} color={Colors.primary} />
		</View>
	);
};

export const screenOptions = (navData) => {
	return({})
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AutoLoginScreen;
