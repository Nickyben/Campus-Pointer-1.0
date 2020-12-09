import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	ActivityIndicator,
	Button,
	Alert,
	ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form from '../../components/UI/Form';
import Btn from '../../components/UI/Btn';
import TouchIcon from '../../components/UI/TouchIcon';
import { StatusBar } from 'expo-status-bar';
//import * as authActions from '../../store/actions/authAction';

const forgotPWInputItems = [
	{
		id: 'emailAddressForPWReset',
		label: 'Email address',
		placeholder: 'ex: example@example.com',
		icon: {
			iconName: 'at',
		},
		email: true,
		errorMsg: 'Please provide a valid email or reg. Number',
	},
];

const codeVerificationItems = [
	{
		id: 'codeForPWReset',
		label: 'Password reset code',
		placeholder: 'code sent to your email',
		icon: {
			iconName: 'link',
		},
		errorMsg: 'Please provide a valid reset code',
	},
];

const ForgotPasswordScreen = ({ navigation }) => {
	const [isVerifyCode, setIsVerifyCode] = useState(false);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	
	const authHandler = async () => {
		let action;
		if (isVerifyCode) {
			//action = authActions.signup(formState.inputValues.authEmail, formState.inputValues.authPassword);
		} else {
			//	action = authActions.login(formState.inputValues.authEmail, formState.inputValues.authPassword);
		}
		setError(null);
		setIsLoading(true);
		try {
			//	await dispatch(action);
			//show modal to indicate sent
			navigation.goBack();
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			navigation.navigate('ErrorStack', {
				screen: 'ErrorOverview',
				params: {
					messageHead: error.toLowerCase().includes('network')
						? 'Network Connection Failed'
						: 'Error Occurred',
					messageBody: error,
					image: null,
				},
			});
		}
	}, [error]);

	return (
		<>
			{/* <StatusBar /> */}
			<View
				style={{
					...styles.container,
				}}>
				<View style={{ marginVertical: 50, alignItems: 'center', flexDirection: 'row', padding: 30 }}>
					<TouchIcon
						name={'arrow-back'}
						size={25}
						color={Colors.primary}
						onTouch={() => {
							navigation.goBack();
						}}
					/>
					<Text
						onPress={() => {
							navigation.goBack();
						}}
						style={styles.backText}>
						Back
					</Text>
				</View>

				<KeyboardAwareScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ ...styles.formContainerScroll }}>
					<View style={styles.welcomeContainer}>
						<Text style={styles.welcomeText1}>
							{isVerifyCode ? 'Code Verification' : 'Forgot Password?'}
						</Text>
						<Text style={styles.welcomeText2}>An Email will be sent to your registered email address.</Text>
					</View>

					{!isVerifyCode && (
						<Form
							id={'forgotPasswordForm'}
							title={'Send password reset email'}
							items={forgotPWInputItems}
							//formStateGetter={getForgotPwFormState}
							submitTitle={'Send Email'}
							formErrorMsg={'Please provide valid credentials!'}
							formAction={authHandler}
							//onSubmit={checkFPWValidity}
							style={{
								borderColor: '#ccc',
								borderWidth: 2,
							}}
							rectInputs
						/>
					)}
				</KeyboardAwareScrollView>
			</View>
		</>
	);
};

{
	/* <Input
		id="authEmail"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorMsg="Please enter a valid email address."
							onInputChange={inputChangeHandler}
							initialValue=""
						/>

						<Input
							id="authPassword"
							label="Password"
							keyboardType="default"
							required
							secureTextEntry
							minLength={7}
							autoCapitalize="none"
							errorMsg="Password must be at least 7 characters."
							onInputChange={inputChangeHandler}
							initialValue=""
						/> */
}

export const screenOptions = (navProps) => {
	return {
		headerTitle: 'Authenticate',
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},

	imageBackground: {
		flex: 1,
	},
	container: {
		flex: 1,
		width: '100%',
		//paddingTop: 40,
		//	bottom: 0,
		//	position: 'absolute',
		backgroundColor: '#fff',

		//backgroundColor: 'blue',
		justifyContent: 'space-between',
	},
	formContainerScroll: {
		flex: 1,
		paddingTop: 40,
		padding: 20,
		//	backgroundColor: 'blue',
		//justifyContent: 'center',

		//	width: '100%',
		//height: '100%',
		//justifyContent: 'space-between'
		//alignSelf: 'stretch',
		//bottom: 0,
		//position: 'absolute',
	},

	welcomeContainer: {
		width: '100%',
		//	height: '50%',
		padding: 20,
		paddingBottom: 0,
		//backgroundColor: 'yellow',
	},
	backText: {
		fontSize: 22,
		fontFamily: 'OpenSansBold',
		color: Colors.primary,
		marginLeft: 10,
	},
	welcomeText1: {
		width: '75%',
		marginBottom: 20,
		fontSize: 30,
		fontFamily: 'OpenSansBold',
		color: Colors.primary,
	},
	welcomeText2: {
		width: '75%',
		paddingBottom: 20,
		fontSize: 22,
		fontFamily: 'OpenSansBold',
		color: '#333',
		borderBottomColor: Colors.primary,
		borderBottomWidth: 2,
		//backgroundColor: 'yellow'
	},

	versionText: {
		fontFamily: 'OpenSansBold',
		fontSize: 15,
		color: '#444',
		marginTop: 25,
		width: '100%',
		textAlignVertical: 'bottom',
		textAlign: 'center',
	},
	// actions: {
	// 	marginTop: 20,
	// },
	// btn: {
	// 	marginTop: 10,
	// 	borderRadius: 8,
	// 	overflow: 'hidden',
	// },
});

export default ForgotPasswordScreen;