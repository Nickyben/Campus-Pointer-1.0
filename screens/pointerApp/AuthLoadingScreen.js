import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { authenticate, tryAutoLogin } from '../../store/actions/authActions';

import Colors from '../../constants/Colors';

const AuthLoadingScreen = ({}) => {
	
	return (
		<View style={styles.screen}>
			<ActivityIndicator size={50} color={Colors.primary} />
		</View>
	);
};

export const screenOptions = (navData) => {
	return {};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AuthLoadingScreen;
