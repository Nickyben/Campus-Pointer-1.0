import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { CheckBox } from 'react-native-elements'

import {
	StyleSheet,
	ScrollView,
	Text,
	Switch,
	View,
	StatusBar,
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
	Image,
	useWindowDimensions,
	Button,
} from 'react-native';
import Form from '../../components/UI/Form';
import TouchIcon from '../../components/UI/TouchIcon';
import Colors from '../../constants/Colors';
import MyModal from '../../components/pointerComponents/MyModal';
import CheckBox from '../../components/UI/CheckBox';
import { setVisibility, setNotifications, enableNotifications } from '../../store/actions/settingsActions';
import { arrToObj } from '../../constants/MyFunctions';
import {
	changeVisibilityItems as visibilityItems,
	setNotificationItems as notificationItems,
} from '../../data/generalData';
import Btn from '../../components/UI/Btn';

const changeVisibilityItems = visibilityItems;

const setNotificationsItems = notificationItems;

const changePWInputItems = [
	{
		id: 'oldPassword',
		label: 'Old Password',
		placeholder: 'old password',
		icon: { iconName: 'lock' },
		password: true,
		showErrorMsg: false,
	},
	{
		id: 'newPassword',
		label: 'New Password',
		placeholder: 'new password',
		icon: { iconName: 'lock' },
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
	{
		id: 'confirmPassword',
		label: 'Confirm Password',
		placeholder: 'confirm password',
		icon: { iconName: 'lock' },
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
];

const changeEmailInputItems = [
	{
		id: 'currentEmail',
		label: 'Current Email',
		editable: false,
		initialValidity: true,

		placeholder: 'theCurrentEmail',
		icon: { iconName: 'at' },
		showErrorMsg: false,
	},
	{
		id: 'newEmail',
		label: 'New Email',
		email: true,
		errorMsg: 'Please, enter a valid email address.',
		successMsg: 'Email with a valid format entered.',
		placeholder: 'new email address',
		icon: { iconName: 'at' },
	},
];

const changePhoneInputItems = [
	{
		id: 'currentPhoneNumber',
		label: 'Current Phone Number',
		editable: false,
		initialValidity: true,

		placeholder: 'theCurrentNumber',
		icon: { iconName: 'call' },
		showErrorMsg: false,
	},
	{
		id: 'newPhoneNumber',
		label: 'New Phone Number',
		phoneNumber: true,
		required: true,
		placeholder: 'new Number',
		icon: { iconName: 'call' },
		errorMsg: 'Please enter a 10 digit phone number e.g 8134******',
		successMsg: 'Phone number with valid format entered.',
	},
];

const ChangeDetailsScreen = ({ navig, changeDetail,  }) => {
	const dispatch = useDispatch();
	const [showVisibilityOptions, setShowVisibilityOptions] = useState([false, '', '', []]);
	const [formState, setFormState] = useState({});
	const { inputValues, inputValidities, formValidity } = formState;
	const isChangePassword = changeDetail === 'Change Password';
	const isChangeEmail = changeDetail === 'Change Email';
	const isChangePhone = changeDetail === 'Change Phone Number';
	const isChangeVisibility = changeDetail === 'Visibility';
	const isSetNotifications = changeDetail === 'Notifications';

	const inputItems = isChangePassword
		? changePWInputItems
		: isChangeEmail
		? changeEmailInputItems
		: isChangePhone
		? changePhoneInputItems
		: [];
	const currentVisibilitySettings = useSelector((s) => s.settingsReducer.currentVisibilitySettings);
	const currentNotification_On_Off = useSelector((s) => s.settingsReducer.enableNotificationSettings);
	const currentNotificationsSettings = useSelector((s) => s.settingsReducer.currentNotificationsSettings);
	const [switchOnNotify, setSwitchOnNotify] = useState(currentNotification_On_Off);
	const [notificationSettingsDispatch, setNotificationSettingsDispatch] = useState([]);
	const [screenNotificationsSettings, setScreenNotificationSettings] = useState(currentNotificationsSettings);

	const getFormState = (state) => {
		setFormState((p) => state);
	};

	const checkValidity = useCallback(() => {
		if (isChangePassword) {
			return (
				inputValues &&
				formValidity &&
				true && // oldPasswordIdToken &&
				inputValues['newPassword'] === inputValues['confirmPassword']
			);
		}

		if (isChangeEmail) {
			return formValidity;
		}

		if (isChangePhone) {
			return (
				//do the phone number validation here
				formValidity
			);
		}
	}, [isChangePassword,isChangeEmail,inputValues,isChangePhone,formValidity]);
	//inputValidities && console.warn(inputValidities['oldPassword'] + 'see')//.inputValues['oldPassword'])

	const visibilityChoiceHandler = (id, label, options) => {
		setShowVisibilityOptions((p) => [true, id, label, options]);
	};

	const setVisibilityHandler = (visibilityData) => {
		dispatch(setVisibility(visibilityData));
		setShowVisibilityOptions(() => [false, '', '', []]);
	};

	const setNotificationsHandler = (notificationsData) => {
		setNotificationSettingsDispatch((p) => {
			const alreadyChanged = p.find((setting) => setting.sectionId === notificationsData.sectionId);
			return alreadyChanged
				? p.filter((setting) => setting.sectionId !== notificationsData.sectionId)
				: p.concat(notificationsData);
		});

		setScreenNotificationSettings((p) => {
			const prevState = p;
			const theSection = prevState.find((sec) => sec.id === notificationsData.sectionId);
			const theSettingPrevChoice =
				theSection && theSection.settings.find((sett) => sett.label === notificationsData.label).choice;
			const updatedSettings =
				theSection &&
				theSection.settings
					.filter((sett) => sett.label !== notificationsData.label)
					.concat({
						label: notificationsData.label,
						choice: !theSettingPrevChoice,
					});
			const updatedNotificationSettings = prevState
				.filter((sec) => sec.id !== notificationsData.sectionId)
				.concat({
					id: notificationsData.sectionId,
					settings: updatedSettings,
				});
			return updatedNotificationSettings;
    });

		//dispatch(setNotifications(notificationsData));
	};

	const enableNotificationsHandler = (newValue) => {
		setSwitchOnNotify((p) => newValue);
		//dispatch(enableNotifications('notificationsSwitch', newValue))
	};

	const dispatchSettingsHandler = () => {
		if (isSetNotifications) {
			notificationSettingsDispatch.forEach((notificationsData) => {
				dispatch(setNotifications(notificationsData));
      });
      navig.goBack();
		}
	}

	useLayoutEffect(() => {
		isSetNotifications &&
			navig.setOptions({
				headerRight: () => (
					<View style={{ paddingRight: 10 }}>
						<Btn onPress={dispatchSettingsHandler}>Save</Btn>
					</View>
				),
			});
	}, [isSetNotifications, dispatchSettingsHandler]);

	useEffect(() => {
		isSetNotifications && dispatch(enableNotifications('notificationsSwitch', switchOnNotify));
	}, [switchOnNotify, isSetNotifications, dispatch]);

//	console.log(isSetNotifications, notificationSettingsDispatch);

	return (
		<View style={styles.screen}>
			{!isChangeVisibility && !isSetNotifications && (
				<ScrollView>
					<View
						style={{ 
							backgroundColor: '#fdfeff',
							flexDirection: 'row',
							alignItems: 'center',
							padding: 15,
							paddingHorizontal: 20,
						}}></View>
					<Form
						navig={navig}
						id={
							isChangePassword
								? 'changePasswordForm'
								: isChangeEmail
								? 'changeEmailAddressForm'
								: 'changePhoneNumberForm'
						}
						formStateGetter={getFormState}
						submitTitle={'Save Change'}
						items={inputItems}
						formErrorMsg={
							isChangePassword
								? 'Hmm, you must have entered short, wrong or unmatched password(s)'
								: isChangeEmail
								? 'Please ensure that the email field(s) are filled correctly.'
								: 'Please ensure that the  phone number field(s) are filled correctly'
						}
						onSubmit={checkValidity}></Form>
				</ScrollView>
			)}
			{isChangeVisibility && (
				<ScrollView style={styles.visibilitySection}>
					{changeVisibilityItems.map((item, index) => {
						const { id, label, choiceLabels, rightBtn } = item;
						const currentSetting = currentVisibilitySettings.find((s) => s.id === id);
						return (
							<View
								key={index}
								style={{
									...styles.sectionItem,
									borderBottomWidth: index !== changeVisibilityItems.length - 1 ? 1 : 0,
								}}>
								<View style={{ flex: 1 }}>
									<Text style={styles.sectionItemText}>{label}</Text>
									{currentSetting && <Text style={styles.choiceText}>{currentSetting.choice}</Text>}
								</View>
								<TouchIcon
									onTouch={visibilityChoiceHandler.bind(this, id, label, choiceLabels)}
									size={23}
									bgColor={Colors.primary + '22'}
									name={rightBtn}
									color={Colors.primary}
								/>
							</View>
						);
					})}
				</ScrollView>
			)}

			{isSetNotifications && (
				<ScrollView>
					<View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.enableText}>Enable Notifications</Text>
						<Switch
							value={switchOnNotify} // currentNotification_On_Off}
							onValueChange={enableNotificationsHandler}
							trackColor={{
								true: Colors.switchWhite + '88',
								false: '#ccc', //Colors.switchWhite + '33',
							}}
							thumbColor={switchOnNotify ? Colors.switchWhite : '#fff'}
						/>
					</View>
					{setNotificationsItems.map((section, index) => {
						const { id, header, settings } = section;

						return (
							<View key={index}>
								<Text style={styles.settingsHeader}>{header}</Text>
								<View style={{ paddingHorizontal: 10 }}>
									{settings.map((setting, index) => {
										const thisSection = screenNotificationsSettings.find((sec) => sec.id === id);
										const thisSetting =
											thisSection && thisSection.settings.find((s) => s.label === setting);
										const isChecked = thisSetting && thisSetting.choice;
										return (
											<CheckBox
												key={index}
												disabled={!switchOnNotify} //!currentNotification_On_Off}
												useIos
												type={'right'}
												title={setting}
												checked={isChecked}
												checkedColor={Colors.primary}
												onCheck={setNotificationsHandler.bind(this, {
													sectionId: id,
													label: setting,
												})}
												textStyle={styles.settingText}
												itemStyle={{
													borderBottomWidth: index !== settings.length - 1 ? 1 : 0,
													borderColor: '#e7e7e7',
												}}
											/>
										);
									})}
								</View>
							</View>
						);
					})}

					{/* <Btn
						//onPress={dispatchSettingsHandler}
						disabled={!switchOnNotify}
						style={{ width: '80%', alignSelf: 'center' }}>
						Save Settings
					</Btn> */}
				</ScrollView>
			)}

			<MyModal
				showModal={showVisibilityOptions[0]}
				handleRequestClose={() => {
					setShowVisibilityOptions(() => [false, '', '', []]);
				}}
				headerText={showVisibilityOptions[2]}>
				{currentVisibilitySettings &&
					showVisibilityOptions[3].map((option, index) => {
						//const allFalse = arrToObj(showVisibilityOptions[3].map((option, index) => ([option, false])), '_2D_Arr')
						const settingId = showVisibilityOptions[1];
						const currentSetting = currentVisibilitySettings.find((s) => s.id === settingId);
						const isChecked = currentSetting && currentSetting.choice === option;
						return (
							<CheckBox
								key={index}
								shape="circle"
								title={option}
								checked={isChecked}
								checkedColor={Colors.primary}
								onCheck={setVisibilityHandler.bind(this, {
									settingId,
									choice: option,
									// ...allFalse,
									// [option]: true,
								})}
							/>
						);
					})}
			</MyModal>
		</View>
	);
};



const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#fff', paddingBottom: 50 },
	navigText: {
		fontFamily: 'OpenSansBold',
		fontSize: 16,
		color: Colors.accent,
	},
	visibilitySection: {
		padding: 20,
	},
	sectionItem: {
		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 0,
		borderBottomWidth: 1,
		borderColor: '#e7e7e7',
		alignItems: 'center',
	},
	sectionItemText: {
		padding: 5,
		fontFamily: 'OpenSansBold',
		fontSize: 15,
		color: '#111',
	},
	choiceText: {
		padding: 5,
		fontFamily: 'OpenSansRegular',
		fontSize: 15,
		color: '#111',
	},
	enableText: {
		fontFamily: 'OpenSansBold',
		fontSize: 18,
		color: '#333', //Colors.primary,
	},
	settingsHeader: {
		width: '100%',
		backgroundColor: '#f3f6f7', //Colors.primary + '06',//
		padding: 20,
		//paddingLeft: 25,
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		color: Colors.primary,
	},
	settingText: {
		paddingVertical: 20,
		fontFamily: 'OpenSansRegular',
		fontSize: 16,
		borderColor: '#e7e7e7',
	},
});

export default ChangeDetailsScreen;
