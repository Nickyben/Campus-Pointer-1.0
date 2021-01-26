import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost, fetchHomeReactions } from '../../store/actions/homeActions';
import { rand, shuffle, getSince } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import LoadingScreen from '../../screens/pointerApp/LoadingScreen';

const listEmptyComponent = ({ itemName, notFoundText, isRefreshing, onRetry, image }) => {
	if (isRefreshing) {
		return <LoadingScreen />;
	}
	return (
		<View style={styles.centered}>
			<Text
				style={{
					fontFamily: 'OpenSansBold',
					fontSize: 17,
					color: '#333',
					//textAlign: 'justify',
				}}>
				{notFoundText ? notFoundText : `Oops! No ${itemName ? itemName : 'items'} Found!`}
			</Text>
			{onRetry && (
				<Btn
					fontSize={15}
					style={{
						marginVertical: 10,
					}}
					onPress={onRetry}>
					Retry
				</Btn>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		//backgroundColor: 'red'
	},
});

export default listEmptyComponent;
