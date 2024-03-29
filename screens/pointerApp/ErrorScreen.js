import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { authenticate, tryAutoLogin } from '../../store/actions/authActions';

import Colors from '../../constants/Colors';
import Btn from '../../components/UI/Btn';
import { useNavigation } from '@react-navigation/native';

const ErrorScreen = ({ route, errorObj, msgObj, nextFunc, nextFuncTitle, retryFunc }) => {
	const navigation = useNavigation();
	const { params } = route ? route : {};
	const { messageHead, messageBody, image } = params ? params : errorObj ? errorObj : msgObj;
	//console.warn(params)
	return (
		<View style={styles.screen}>
			{image && <Image style={styles.image} source={image} />}
			{messageHead && <Text style={styles.errMsgHead}>{messageHead}</Text>}
			{messageBody && <Text style={styles.errMsgBody}>{messageBody}</Text>}
			<Btn
				fontSize={15}
				style={{
					marginVertical: 10,
				}}
				onPress={() => {
					retryFunc ? retryFunc() : nextFunc ? nextFunc() : navigation.goBack();
				}}>
				{nextFuncTitle ? nextFuncTitle : 'Retry'}
			</Btn>
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
		padding: 40,
	},
	image: {},
	errMsgHead: {
		fontFamily: 'OpenSansBold',
		fontSize: 16,
		textAlign: 'center',
		color: '#222',
		marginBottom: 5,
	},
	errMsgBody: {
		fontFamily: 'OpenSansBold',
		fontSize: 15,
		textAlign: 'center',
		color: '#555',
		marginBottom: 20,
	},
});

export default ErrorScreen;
