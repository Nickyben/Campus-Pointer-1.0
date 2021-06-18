import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const AlertBox = ({ show, text, onFinishShow }) => {
	const [showBox, setShowBox] = useState(false);

	useEffect(() => {
		let waitToHide;
		if (show) {
			setShowBox(true);
			waitToHide = setTimeout(() => {
				setShowBox(false);
				onFinishShow();
			}, 3000);
		}
		return () => {
			clearTimeout(waitToHide);
			setShowBox(false);
		};
	}, [show, onFinishShow]);
	return (
		<View>
			{showBox && (
				<View style={styles.screen}>
					<Card style={styles.alertBox}>
						<Text style={[styles.loadingText]}>{text}</Text>
					</Card>
				</View>
			)}
		</View>
	);
};

export const screenOptions = () => {
	return {};
};

const styles = StyleSheet.create({
	screen: {
		height: 150,
		position: 'absolute',
		zIndex: 600,
		padding: 10,
		width: '100%',
		//justifyContent: 'center',
		//backgroundColor: 'red'
		//alignItems: 'center',
	},
	alertBox: {
		width: '100%',
		height: '100%',
		borderRadius: 15,
		backgroundColor: '#fff', //Colors.primary + '77',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#333',

		paddingVertical: 2,
	},
});

export default AlertBox;
