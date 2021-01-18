import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	FlatList,
	Image,
	Platform,
	SafeAreaView,
	Keyboard,
	Switch,
	KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince, getWhen } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import Card from '../../components/UI/Card';
import { fetchChatMessages } from '../../store/actions/messageActions';
import ChatInput from '../../components/UI/ChatInput';
import Form from '../../components/UI/Form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownPicker from '../../components/UI/DropdownPicker';

const homePostOfficialFormItems = [
	{
		id: 'homePostTitle',
		label: 'Post title',
		placeholder: 'Title',
		autoFocus: true,
		// hideIcon: true,
		required: true,
		minLength: 5,
		errorMsg: 'Title must be at least 5 characters',
	},
	{
		id: 'homePostType',
		label: 'Post type',
		placeholder: 'type',
		required: true,
		errorMsg: 'Please Choose a type',
		inputType: 'dropdown',
		pickerLabel: 'Post type',
		placeholder: 'Type of post',
		items: [
			{ label: 'Global' },
			{ label: 'International' },
			{ label: 'National' },
			{ label: 'University' },
			{ label: 'Faculty' },
			{ label: 'Departmental' },
			{ label: 'General' },
		],
	},
	{
		id: 'homePostSource',
		label: 'Post source',
		placeholder: 'Source of post',
		// hideIcon: true,
		required: true,
		minLength: 5,
		errorMsg: 'Source must be at least 5 characters',
	},
	{
		id: 'homePostText',
		label: 'Post text',
		placeholder: 'Let us know about...',
		// hideIcon: true,
		//required: true,
		//minLength: 5,
		//errorMsg: 'Source must be at least 5 characters',
	},
];

const CreateHomePostScreen = ({
	navigation,
	route: {
		params: {},
	},
}) => {
	const user = useSelector((s) => s.dataReducer.availableStudents.find((s) => s.id === 'studentUserId'));
	//	const [postObj, setPostObj] = useState({ title, type, date, source, author, featuredAuthor, body, responses });
	const [isOfficial, setIsOfficial] = useState(false);
	const [postText, setPostText] = useState('')
	const { image } = user && user;
	const dispatch = useDispatch();
	const sendPostHandler = () => {
		console.warn(postText);
		navigation.goBack();
	};

	const sendOfficialHomePostHandler = (inputValues) => {
		console.warn(inputValues);
		navigation.goBack();
	};
	const getPostTextHandler = (text) => {
		setPostText(text)
	};

	const enableOfficialPostHandler = (newValue) => {
		//console.warn(newValue)
		setIsOfficial((p) => newValue);
		//dispatch(enableNotifications('notificationsSwitch', newValue))
	};

	useLayoutEffect(() => {
		const noPostText =  postText.length=== 0;
		navigation.setOptions({
			headerRight: () => (
				<View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ ...styles.headerText, marginRight: 10 }}>Drafts</Text>
					{!isOfficial && <Btn disabled={noPostText} onPress={sendPostHandler}>Post</Btn>}
				</View>
			),
		});
	}, [sendPostHandler]);

	

	return (
		<View style={styles.screen}>
			<View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={styles.postTypeText}>Official Post</Text>
				<Switch
					value={isOfficial}
					onValueChange={enableOfficialPostHandler}
					trackColor={{
						true: Colors.switchWhite + '88',
						false: '#ccc',
					}}
					thumbColor={isOfficial ? Colors.switchWhite : '#fff'}
				/>
			</View>
			<KeyboardAwareScrollView style={styles.formContainer} enableOnAndroid>
				{!isOfficial && (
					<View style={styles.createPostRow}>
						<View style={styles.imageContainer}>
							<Touch
								onTouch={() => {
									navigation.navigate('StackOfTabNav', {
										screen: 'DepartmentTabNav',
										params: {
											screen: 'Profile',
											param: {},
										},
									});
								}}
								style={{
									width: styles.image.width,
									height: styles.image.height,
									borderRadius: styles.image.borderRadius,
								}}>
								<Image source={image} style={styles.image} />
							</Touch>
						</View>
						<ChatInput
							style={styles.typingContainer}
							hideRightIcon={true}
							hideIcon
							iconLeftName="create"
							leftIconBgColor="transparent"
							leftIconBgBorderRadius={50}
							defaultPosition
							placeholder={'Let us know about...'}
							onInputChange={getPostTextHandler}
							maxLength={200}
							multiline={true}
							expandable
							autoFocus
						/>
					</View>
				)}
				{isOfficial && (
					<>
						<Form
							id={'homePostOfficialForm'}
							items={homePostOfficialFormItems}
							hideInputIcons
							submitTitle={'POST'}
							formErrorMsg={'Please provide valid credentials!'}
							formAction={sendOfficialHomePostHandler}
							style={{
								borderColor: '#ccc',
								borderWidth: 2,
							}}
							//rectInputs
						/>
					</>
				)}
			</KeyboardAwareScrollView>

			<View style={styles.galleryContainer}></View>
		</View>
	);
};

export const screenOptions = ({ navigation }) => {
	//	const settingsIcon = Platform.OS == 'android' ? 'md-settings' : 'ios - settings';

	return {
		headerTitle: 'Create',
		// headerRight: (props) => (
		// 	<HeaderButtons HeaderButtonComponent={HeaderBtn}>
		// 		<Item
		// 			tile="New Message"
		// 			iconName={settingsIcon}
		// 			onPress={() => {
		// 				navigation.navigate('MessageSettings', {});
		// 			}}
		// 		/>
		// 	</HeaderButtons>
		// ),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#f3f6f7',

		//flexDirection: 'column-reverse'
	},
	postTypeText: {
		fontFamily: 'OpenSansBold',
		fontSize: 18,
		color: '#333', //Colors.primary,
	},
	createPostRow: {
		backgroundColor: '#eee',
		//backgroundColor: 'purple',
		flexDirection: 'row',
		alignItems: 'baseline',
	},

	typingContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		//	alignSelf: 'flex-start',
		//top: 0,
		//bottom: 'auto',
	},

	imageContainer: {
		marginLeft: 7,
		marginRight: 2,
		marginVertical: 7,
		// backgroundColor: '#efefef',
		//	backgroundColor: 'purple',
		alignItems: 'center',
		justifyContent: 'center',
		//	width: 45,
		//height: 45,

		// margin: 'auto'
		borderRadius: 35,
		overflow: 'hidden',
	},
	image: {
		width: 45,
		height: 45,
		borderRadius: 35,
		borderColor: '#fff',
		borderWidth: 3,
	},
	headerText: {
		color: Colors.switchWhite,
		fontFamily: 'OpenSansBold',
		fontSize: 15,
	},
	galleryContainer: {
		backgroundColor: '#e3e6e7',
		width: '100%',
		height: 90,
	},
});

export default CreateHomePostScreen;
