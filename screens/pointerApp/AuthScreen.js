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
import {login} from '../../store/actions/authActions';
import AuthLoadingScreen from './AutoLoginScreen';
import { StatusBar } from 'expo-status-bar';

const loginInputItems = [
	{
		id: 'loginRegNumberOrEmailAddress',
		label: 'Reg. number or Email address',
		placeholder: 'email address or reg. number',
		icon: {
			iconName: 'person',
		},
		email: true,
		errorMsg: 'Please provide a valid email or reg. Number',
	},
	{
		id: 'loginPassword',
		label: 'Password',
		placeholder: 'password',
		icon: {
			iconName: 'lock',
		},
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
];

const signUpInputItems = [
	{
		id: 'signupRegNumber',
		label: 'Registration number',
		placeholder: 'ex: MOUAU/CME/000000',
		icon: {
			iconName: 'person',
		},
		errorMsg: 'Please provide a valid email or reg. Number',
	},
	{
		id: 'signupEmailAddress',
		label: 'Registered email address',
		placeholder: 'ex: example@example.com',
		icon: {
			iconName: 'at',
		},
		email: true,
		errorMsg: 'Please provide a valid email or reg. Number',
	},
	{
		id: 'signupPassword',
		label: 'Password',
		placeholder: 'password',
		icon: {
			iconName: 'lock',
		},
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
	{
		id: 'signupPasswordConfirm',
		label: 'Confirm password',
		placeholder: 'confirm password',
		icon: {
			iconName: 'lock',
		},
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
];

const AuthScreen = ({ navigation, route: { params } }) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [loginFormState, setLoginFormState] = useState({});
	const {inputValues, formValidity} = loginFormState;


	const getLoginFormState = (state) => {
		setLoginFormState((p) => state);
	};

	const checkLoginValidity = useCallback(() => {
		if (true) {
			return (
				inputValues && formValidity
				//specific check
			);
		}
	}, [inputValues, formValidity]);

	const authHandler = async () => {
		let action = login(inputValues.loginRegNumberOrEmailAddress, inputValues.loginPassword);

		setError(null);
		setIsLoading(true);
		try {
				await dispatch(action);
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			Alert.alert('Error Occurred', error, [
				{
					text: 'Okay',
				},
			]);
		}
	},[error]); 

	if (isLoading) {
		return <AuthLoadingScreen />;
	}

	return (
		<>
			<StatusBar />
			<ImageBackground source={require('../../assets/images/news1.jpg')} style={styles.imageBackground}>
				<View
					style={{
						...styles.container,
						height: '85%',
					}}>
					<View style={styles.welcomeContainer}>
						<Text style={styles.welcomeText1}>Welcome to Pointer</Text>
						<Text style={styles.welcomeText2}> Make your campus life easy and fun! </Text>
					</View>
					<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
						<Form
							id={'loginForm'}
							title={'Login'}
							items={loginInputItems}
							navig={navigation}
							formStateGetter={getLoginFormState}
							submitTitle={'LOGIN'}
							formErrorMsg={'Please provide valid credentials!'}
							onSubmit={checkLoginValidity}
							formAction={authHandler}
							style={{
								borderColor: '#ccc',
								borderWidth: 2,
							}}
							rectInputs
						/>

						<View
							style={{
								paddingHorizontal: 20,
							}}>
							<Btn
								fontSize={15}
								style={{
									marginVertical: 10,
									borderRadius: 10,
								}}
								innerStyle={{
									paddingVertical: 10,
								}}
								onPress={() => {
									navigation.navigate('ForgotPassword', {});
								}}
								borderColor={Colors.primary}
								bgColor={'#fff'}>
								Forgot Password ?
							</Btn>

							<Btn
								fontSize={15}
								style={{
									marginVertical: 10,
									borderRadius: 10,
								}}
								innerStyle={{
									paddingVertical: 10,
								}}
								onPress={() => {
									navigation.navigate('AuthSignup', {});
								}}
								borderColor={Colors.primary}
								bgColor={'#fff'}>
								Don't have an account? -- Create account
							</Btn>
						</View>
						{/* <View style={styles.actions}>
									<View style={styles.btn}>
										{isLoading ? (
											<ActivityIndicator color={Colors.primary} size={22} />
										) : (
											<Button
												title={isSignup ? 'Signup' : 'Login'}
												color={Colors.primary}
												onPress={authHandler}
											/>
										)}
									</View>
									<View style={styles.btn}>
										<Button
											title={`Switch to ${isSignup ? 'Login' : 'Signup'}`}
											color={'#ee2277'}
											onPress={() => {
												setIsSignup((prevState) => {
													return !prevState;
												});
											}}
										/>
									</View>
								</View> */}
					</KeyboardAwareScrollView>
					<Text style={styles.versionText}> pointer v 1.0 .0 </Text>
				</View>
			</ImageBackground>
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
		backgroundColor: 'transparent',
		paddingTop: 40,
		padding: 20,
		paddingBottom: 0,
		flex: 1,
		width: '100%',
		bottom: 0,
		position: 'absolute',
		backgroundColor: '#fff',
		borderTopRightRadius: 50,
		borderTopLeftRadius: 50,
		overflow: 'hidden',
		//backgroundColor: 'blue',
		//justifyContent: 'flex-end',
	},
	formContainer: {
		flex: 1,
		//	width: '100%',
		//height: '100%',
		//justifyContent: 'space-between'
		//alignSelf: 'stretch',
		//bottom: 0,
		//position: 'absolute',
	},

	welcomeContainer: {
		padding: 20,
		paddingBottom: 0,
		//backgroundColor:'yellow',
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
		padding: 10,
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

export default AuthScreen;
