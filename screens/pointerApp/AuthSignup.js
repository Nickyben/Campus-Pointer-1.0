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
import { signup } from '../../store/actions/authActions';
import AuthLoadingScreen from './AuthLoadingScreen';
//import * as authActions from '../../store/actions/authAction';

const signUpInputItems = [
	{
		id: 'signupRegNumber',
		label: 'Registration number',
		placeholder: 'ex: MOUAU/CME/000000',
		icon: {
			iconName: 'person',
		},
		required: true,
		minLength: 9,
		errorMsg: 'Please provide a valid reg. Number',
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
		check: 'confirmPasswordMatch',
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
		check: 'confirmPasswordMatch',
		label: 'Confirm password',
		placeholder: 'confirm password',
		icon: {
			iconName: 'lock',
		},
		password: true,
		errorMsg: 'Password must be at least 7 characters.',
	},
];

const AuthSignup = ({ navigation, route: { params } }) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	
	const authHandler = async (inputValues) => {
		const { signupEmailAddress, signupPassword } = inputValues;

		let action = signup(signupEmailAddress, signupPassword);

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
			navigation.navigate('ErrorStack', {
				screen: 'ErrorOverview',
				params: {
					messageHead: error.toLowerCase().includes('network') ? 'Network Connection Failed' : 'Error Occurred',
					messageBody: error,
					image: null,
				},
			});

		
		}
	}, [error]);

	if (isLoading) {
		return <AuthLoadingScreen />;
	}

	return (
		<>
			<View
				style={{
					...styles.container,
				}}>
				<View
					style={{
						marginTop: 50,
						alignItems: 'center',
						flexDirection: 'row',
						padding: 30,
					}}>
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
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
					<View style={styles.welcomeContainer}>
						<Text style={styles.welcomeText1}>Create a Pointer account</Text>
						<Text style={styles.welcomeText2}> Make your campus life easy and fun! </Text>
					</View>

					<Form
						id={'signupForm'}
						title={'Signup'}
						items={signUpInputItems}
						navig={navigation}
						//formStateGetter={getSignUpFormState}
						submitTitle={'CONTINUE'}
						formErrorMsg={'Please provide valid credentials!'}
						//onSubmit={checkSignupValidity}
						formAction={authHandler}
						doNotClearInputs
						specificCheck="confirmPasswordMatch"
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
								navigation.navigate('Authenticate', {});
							}}
							borderColor={Colors.primary}
							bgColor={'#fff'}>
							Login instead
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

			{/* {<ErrorScreen />} */}
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

		flex: 1,
		width: '100%',

		backgroundColor: '#fff',

		//justifyContent: 'flex-end',
	},
	formContainer: {
		paddingTop: 10,
		padding: 20,
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
		padding: 10,
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

export default AuthSignup;