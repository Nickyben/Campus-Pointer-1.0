import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyleSheet, Text, View, Platform, ScrollView, Image, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import ItemIcon from '../../components/UI/ItemIcon';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';
import ChangeDetailsScreen, {} from './ChangeDetailsScreen';
import HelpCenterScreen from './HelpCenterScreen';
import { enableNotifications, setNotifications } from '../../store/actions/settingsActions';
import Btn from '../../components/UI/Btn';

const Temp = () => (
	<View style={styles.screen2}>
		<Text style={styles.screenText}>Hmm... Looks like the</Text>
		<Text style={styles.highlight}>{settingTitle}</Text>
		<Text style={styles.screenText}>screen is unavailable!</Text>
		<Text style={styles.screenText2}>Please update the App to the latest version.</Text>
	</View>
);
const Temp2 = ({}) => (
	<View style={styles.screen2}>
		<Text style={styles.screenText}>temp</Text>
	</View>
);

const SettingsDetailsScreen = ({ navigation, route: { params } }) => {
	const { settingTitle } = params;

  const dispatch = useDispatch();

	const [dispatchSettingsFunc, setDispatchSettingsFunc] = useState();

	const setNotificationSetDispatch = (func) => {
		setNotificationSettingsDispatch((p) => func(p));
  };
  


	let Screen;

	switch (settingTitle) {
		case 'Change Password':
			Screen = ({}) => <ChangeDetailsScreen navig={navigation} changeDetail={settingTitle} />;
			break;
		case 'Change Email':
			Screen = ({}) => <ChangeDetailsScreen navig={navigation} changeDetail={settingTitle} />;
			break;
		case 'Change Phone Number':
			Screen = ({}) => <ChangeDetailsScreen navig={navigation} changeDetail={settingTitle} />;
			break;
		case 'Visibility':
			Screen = ({}) => <ChangeDetailsScreen navig={navigation} changeDetail={settingTitle} />;
			break;
		case 'Notifications':
			Screen = ({}) => (
				<ChangeDetailsScreen
					navig={navigation}
					changeDetail={settingTitle}
					setNotificationSettingsDispatch={setNotificationSetDispatch}
				/>
			);
			break;
		case 'Sound':
			Screen = Temp;
			break;
		case 'Languages':
			Screen = Temp;
			break;
		case 'Help center':
			Screen = ({}) => <HelpCenterScreen />;
			break;

		default:
			Screen = Temp;
	}



	

	return (
		<View style={styles.screen}>
			<Screen />
			{/* <Screen
        navig={navigation}
        source={{ option: settingTitle, }}
      /> */}
		</View>
	);
};

export const screenOptions = ({ route: { params } }) => {
	const { settingTitle } = params;
	return {
		headerTitle: settingTitle,
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	screen2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	screenText: {
		fontSize: 17,
		fontFamily: 'OpenSansBold',
		color: '#333',
		marginBottom: 5,
		textAlign: 'center',
	},
	screenText2: {
		fontSize: 15,
		fontFamily: 'OpenSansBold',
		color: '#777',
		textAlign: 'center',
	},
	highlight: {
		fontSize: 17,
		fontFamily: 'OpenSansBold',
		color: '#333',
		marginBottom: 5,
		textAlign: 'center',
		color: Colors.primary,
	},
});

export default SettingsDetailsScreen;
