import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


import Colors from '../../constants/Colors';

const LoadingScreen = ({}) => {
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
		backgroundColor: '#fff7'
	},
});

export default LoadingScreen;
