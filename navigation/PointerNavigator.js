import React from 'react';
import {
	Platform,
	SafeAreaView,
	Button,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
	Image,
	ImageBackground,
	ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//react navigation version 5
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import DeptOverviewScreen, { screenOptions as deptScreenOpts } from '../screens/department/DeptOverviewScreen';
import DeptDetailScreen, { screenOptions as deptDetailScreenOpts } from '../screens/department/DeptDetailScreen';

import FacultyOverviewScreen, { screenOptions as facultyScreenOpts } from '../screens/pointerApp/FacultyOverviewScreen';

//Academics
import SchoolOverviewScreen, { screenOptions as schScreenOpts } from '../screens/department/SchoolOverviewScreen';
import SchoolOptionsScreen, { screenOptions as schOptsScreenOpts } from '../screens/department/SchoolOptionsScreen';
import CourseDetailsScreen, {
	screenOptions as courseDetailsScreenOpts,
} from '../screens/department/CourseDetailsScreen';

import HomeScreen, { screenOptions as homeScreenOpts } from '../screens/pointerApp/HomeScreen';
import HomeReactionsScreen, {
	screenOptions as homeReactionsScreenOpts,
} from '../screens/pointerApp/HomeReactionsScreen';
import MessagesScreen, { screenOptions as msgsScreenOpts } from '../screens/pointerApp/MessagesScreen';
import ChatScreen, { screenOptions as chatScreenOpts } from '../screens/pointerApp/ChatScreen';
import CreateMsgScreen, { screenOptions as createMsgScreenOpts } from '../screens/pointerApp/CreateMsgScreen';
import MsgSettingsScreen, { screenOptions as msgSettingsScreenOpts } from '../screens/pointerApp/MsgSettingsScreen';

import AssocOverviewScreen, { screenOptions as assocScreenOpts } from '../screens/department/AssocOverviewScreen';
import AssocOptionsScreen, { screenOptions as assocOptionsScreenOpts } from '../screens/department/AssocOptionsScreen';

import StudentProfileScreen, { screenOptions as stdProfScreenOpts } from '../screens/student/StudentProfileScreen';
import CourseAppScreen, { screenOptions as courseAppScreenOpts } from '../screens/student/CourseAppScreen';
import ReportsScreen, { screenOptions as reportsScreenOpts } from '../screens/student/ReportsScreen';

import SettingsScreen, { screenOptions as settingsScreenOpts } from '../screens/pointerApp/SettingsScreen';
import SettingsDetailsScreen, {
	screenOptions as settingsDetailsScreenOpts,
} from '../screens/pointerApp/SettingsDetailsScreen';

import HelpOverviewScreen, { screenOptions as helpOverviewScreenOpts } from '../screens/pointerApp/HelpCenterScreen';

import Colors from '../constants/Colors';

import { FacultyTabNavigator, facultyTabNavScreenOptions } from './MaterialTopTabNav';

//AUTHENTICATION
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/pointerApp/AuthScreen';
import ForgotPasswordScreen, {
	screenOptions as forgotPWScreenOptions,
} from '../screens/pointerApp/ForgotPasswordScreen';
import AuthSignup, { screenOptions as authSignupScreenOptions } from '../screens/pointerApp/AuthSignup';

import ErrorScreen, { screenOptions as errorScreenOptions } from '../screens/pointerApp/ErrorScreen';

//home plus
import CreateHomePostScreen, {
	screenOptions as createHomePostScreenOpts,
} from '../screens/pointerApp/CreateHomePostScreen';
import { logout } from '../store/actions/authActions';

let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
	TouchableCmp = TouchableNativeFeedback;
}

const defaultNavOptions = (props) => {
	//console.log(props);
	return {
		// animationEnabled: false,
		cardStyleInterpolator: ({ current, layouts }) => {
			return {
				cardStyle: {
					transform: [
						{
							translateX: current.progress.interpolate({
								inputRange: [0, 1],
								outputRange: [layouts.screen.width, 0],
							}),
						},
					],
				},
			};
		},

		headerTitle: 'Pointer', //Should be the app logo instead
		headerTitleStyle: {
			fontFamily: 'OpenSansBold',
		},

		headerBackTitleStyle: {
			//for the back button text...seen in ios
			fontFamily: 'OpenSansRegular',
		},
		headerStyle: {
			backgroundColor: Colors.switchPrimary,
		},
		headerTintColor: Colors.switchWhite,
		headerTitleAlign: 'center',
	};
};

const defaultTabStacksOpts = ({ route }) => ({
	tabBarIcon: ({ focused, color, size }) => {
		let iconName;
		let iconSize;
		if (route.name === 'Department') {
			iconName = !focused ? 'ios-list' : 'md-list';
		} else if (route.name === 'Faculty') {
			iconName = !focused ? 'ios-list' : 'md-list';
		} else if (route.name === 'Academics') {
			iconName = !focused ? 'ios-school' : 'md-school';
		} else if (route.name === 'Home') {
			iconName = !focused ? 'ios-home' : 'md-home';
		} else if (route.name === 'Association' || route.name === 'FacultyAssociation') {
			iconName = !focused ? 'ios-people' : 'md-people';
		} else if (route.name === 'Profile') {
			iconName = !focused ? 'ios-person' : 'md-person';
		}
		//iconSize = focused ? 28: 24;
		// You can return any component that you like here!
		return <Ionicons name={iconName} size={26} color={color} />;
	},
});

//STACK NAVIGATORS *************************************************** screenOptions={{animationTypeForReplace}}

const DeptStackNav = createStackNavigator();

const DeptStackNavigator = () => {
	return (
		<DeptStackNav.Navigator screenOptions={defaultNavOptions}>
			<DeptStackNav.Screen name="DeptOverview" component={DeptOverviewScreen} options={deptScreenOpts} />
			<DeptStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />
			{/*<DeptStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
		</DeptStackNav.Navigator>
	);
};

const FacultyStackNav = createStackNavigator();

const FacultyStackNavigator = () => {
	return (
		<FacultyStackNav.Navigator screenOptions={defaultNavOptions}>
			<FacultyStackNav.Screen
				name="FacultyOverview"
				component={FacultyTabNavigator}
				options={facultyTabNavScreenOptions}
			/>
			{/* <FacultyStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <FacultyStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
		</FacultyStackNav.Navigator>
	);
};

const UniversityStackNav = createStackNavigator();

const UniversityStackNavigator = () => {
	return (
		<UniversityStackNav.Navigator screenOptions={defaultNavOptions}>
			<UniversityStackNav.Screen
				name="UniversityOverview"
				component={FacultyTabNavigator}
				options={facultyTabNavScreenOptions}
			/>
			{/* <FacultyStackNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={prodDetailScreenOptions}
      />
      <FacultyStackNav.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
		</UniversityStackNav.Navigator>
	);
};

const SchoolStackNav = createStackNavigator();

const SchoolStackNavigator = () => {
	return (
		<SchoolStackNav.Navigator screenOptions={defaultNavOptions}>
			<SchoolStackNav.Screen name="SchoolOverview" component={SchoolOverviewScreen} options={schScreenOpts} />
			<SchoolStackNav.Screen name="SchoolOptions" component={SchoolOptionsScreen} options={schOptsScreenOpts} />

			<SchoolStackNav.Screen
				name="CourseDetails"
				component={CourseDetailsScreen}
				options={courseDetailsScreenOpts}
			/>

			<SchoolStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />
		</SchoolStackNav.Navigator>
	);
};

const HomeStackNav = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<HomeStackNav.Navigator screenOptions={defaultNavOptions}>
			<HomeStackNav.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={
					homeScreenOpts
					//  headerShown: true
				}
			/>
			<HomeStackNav.Screen
				name="HomeReactions"
				component={HomeReactionsScreen}
				options={homeReactionsScreenOpts}
			/>

			<HomeStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />

		
			{/* 

			<HomeStackNav.Screen name="MessagesOverview" component={MessagesScreen} options={msgsScreenOpts} />

			<HomeStackNav.Screen name="MsgChatDetail" component={ChatScreen} options={chatScreenOpts} />

			<HomeStackNav.Screen name="CreateMessage" component={CreateMsgScreen} options={createMsgScreenOpts} /> */}
		</HomeStackNav.Navigator>
	);
};

const MsgStackNav = createStackNavigator();

const MsgStackNavigator = () => {
	return (
		<MsgStackNav.Navigator screenOptions={defaultNavOptions}>
			<MsgStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />

			<MsgStackNav.Screen name="MessagesOverview" component={MessagesScreen} options={msgsScreenOpts} />

			<MsgStackNav.Screen name="MsgChatDetail" component={ChatScreen} options={chatScreenOpts} />

			<MsgStackNav.Screen name="CreateMessage" component={CreateMsgScreen} options={createMsgScreenOpts} />

			<MsgStackNav.Screen name="MessageSettings" component={MsgSettingsScreen} options={msgSettingsScreenOpts} />

			<MsgStackNav.Screen
				name="CreateHomePost"
				component={CreateHomePostScreen}
				options={createHomePostScreenOpts}
			/>
		</MsgStackNav.Navigator>
	);
};

const AssocStackNav = createStackNavigator();

const AssocStackNavigator = () => {
	return (
		<AssocStackNav.Navigator screenOptions={defaultNavOptions}>
			<AssocStackNav.Screen name="AssocOverview" component={AssocOverviewScreen} options={assocScreenOpts} />
			<AssocStackNav.Screen name="AssocOptions" component={AssocOptionsScreen} options={assocOptionsScreenOpts} />
			<AssocStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />
		</AssocStackNav.Navigator>
	);
};

const StdProfStackNav = createStackNavigator();

const StdProfStackNavigator = () => {
	return (
		<StdProfStackNav.Navigator screenOptions={defaultNavOptions}>
			<StdProfStackNav.Screen
				name="StudentProfile"
				component={StudentProfileScreen}
				options={stdProfScreenOpts}
			/>
			<StdProfStackNav.Screen
				name="CourseDetails"
				component={CourseDetailsScreen}
				options={courseDetailsScreenOpts}
			/>

			<StdProfStackNav.Screen
				name="CourseApplications"
				component={CourseAppScreen}
				options={courseAppScreenOpts}
			/>

			<StdProfStackNav.Screen name="StudentReports" component={ReportsScreen} options={reportsScreenOpts} />

			<StdProfStackNav.Screen name="DeptDetails" component={DeptDetailScreen} options={deptDetailScreenOpts} />
		</StdProfStackNav.Navigator>
	);
};

const SettingsStackNav = createStackNavigator();

const SettingsStackNavigator = () => {
	return (
		<SettingsStackNav.Navigator screenOptions={defaultNavOptions}>
			<SettingsStackNav.Screen name="SettingsOverview" component={SettingsScreen} options={settingsScreenOpts} />

			<SettingsStackNav.Screen
				name="SettingsDetails"
				component={SettingsDetailsScreen}
				options={settingsDetailsScreenOpts}
			/>

			<SettingsStackNav.Screen
				name="Settings Error"
				component={ErrorStackNavigator}
				options={settingsDetailsScreenOpts}
			/>
		</SettingsStackNav.Navigator>
	);
};

const HelpCenterStackNav = createStackNavigator();

const HelpCenterStackNavigator = () => {
	return (
		<HelpCenterStackNav.Navigator screenOptions={defaultNavOptions}>
			<HelpCenterStackNav.Screen
				name="HelpOverview"
				component={HelpOverviewScreen}
				options={helpOverviewScreenOpts}
			/>

			{/* <HelpCenterStackNav.Screen
        name='SettingsDetails'
        component={SettingsDetailsScreen}
        options={settingsDetailsScreenOpts}
      /> */}
		</HelpCenterStackNav.Navigator>
	);
};

const AuthStackNav = createStackNavigator();

export const AuthStackNavigator = () => {
	return (
		<AuthStackNav.Navigator
			screenOptions={{
				cardStyleInterpolator: ({ current, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0],
									}),
								},
							],
						},
					};
				},
				headerShown: false,
			}}>
			<AuthStackNav.Screen name="Authenticate" component={AuthScreen} options={authScreenOptions} />
			<AuthStackNav.Screen name="AuthSignup" component={AuthSignup} options={authSignupScreenOptions} />

			<AuthStackNav.Screen
				name="ForgotPassword"
				component={ForgotPasswordScreen}
				options={forgotPWScreenOptions}
			/>
			<AuthStackNav.Screen
				name="ErrorStack"
				component={ErrorStackNavigator}
				//options={helpOverviewScreenOpts}
			/>
		</AuthStackNav.Navigator>
	);
};
 
const ErrorStackNav = createStackNavigator();

export const ErrorStackNavigator = () => {
	return (
		<ErrorStackNav.Navigator
			screenOptions={{
				cardStyleInterpolator: ({ current, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0],
									}),
								},
							],
						},
					};
				},
				headerShown: false,
			}}>
			<ErrorStackNav.Screen name="ErrorOverview" component={ErrorScreen} options={errorScreenOptions} />
		</ErrorStackNav.Navigator>
	);
};

//TABS NAVIGATION****************************************************

const DeptTabNav = createBottomTabNavigator();

export const DeptTabNavigator = () => {
	return (
		<DeptTabNav.Navigator
			initialRouteName="Home"
			screenOptions={defaultTabStacksOpts}
			tabBarOptions={{
				activeTintColor: Colors.primary,
				inactiveTintColor: '#778',
				activeBackgroundColor: 'white',
				//inactiveBackgroundColor: '#fafeff', //'#effdff',
				//labelPosition: true,

				showLabel: false, //Platform.OS !== 'android',
				keyboardHidesTabBar: true,
				style: {
					height: 56,
				},
				// tabStyle: {

				// },
				labelStyle: {
					fontFamily: 'OpenSansBold',
					fontSize: 12,
					textAlign: 'center',
					alignSelf: 'center',
					//backgroundColor: 'red',
					paddingBottom: 2,
				},
			}}>
			<DeptTabNav.Screen name="Department" component={DeptStackNavigator} />
			<DeptTabNav.Screen
				name="Academics"
				component={SchoolStackNavigator}
				//options={stdProfScreenOpts}
			/>
			<DeptTabNav.Screen
				name="Home"
				component={HomeStackNavigator}
				//options={stdProfScreenOpts}
				options={{
					tabBarBadge: '3',
					tabBarBadgeStyle: { backgroundColor: Colors.primary, textAlignVertical: 'center' ,},
				}}
			/>
			<DeptTabNav.Screen
				name="Association"
				component={AssocStackNavigator}
				//options={prodDetailScreenOptions}
			/>
			<DeptTabNav.Screen
				name="Profile"
				component={StdProfStackNavigator}
				// options={cartScreenOptions}
			/>
		</DeptTabNav.Navigator>
	);
};

//TAB IN STACK NAVIGATION++++++++++++++++++++++++++++++++++++++++++++++++++++++
const StackOfTabNav = createStackNavigator();

const StackOfTabNavigator = () => {
	return (
		<StackOfTabNav.Navigator
			screenOptions={{
				cardStyleInterpolator: ({ current, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0],
									}),
								},
							],
						},
					};
				},
				headerShown: false,
			}}>
			<StackOfTabNav.Screen
				name="DepartmentTabNav"
				component={DeptTabNavigator}
				//options={helpOverviewScreenOpts}
			/>

			<StackOfTabNav.Screen
				name="MessageStack"
				component={MsgStackNavigator}
				//options={helpOverviewScreenOpts}
			/>

			<StackOfTabNav.Screen
				name="ErrorStack"
				component={ErrorStackNavigator}
				//options={helpOverviewScreenOpts}
			/>
		</StackOfTabNav.Navigator>
	);
};

//DRAWER NAVIGATION++++++++++++++++++++++++++++++++++++++++++++++++++++++

const PointerDrawerNav = createDrawerNavigator();

export const PointerDrawerNavigator = ({onLogout}) => {
	const dispatch = useDispatch();
	const user = useSelector((s) => s.authReducer.userAppData);
	const { image } = user && user;

	return (
		<PointerDrawerNav.Navigator 
			drawerType={'slide'}
			drawerLabel="Menu"
			drawerContent={(props) => {
				const { navigation } = props;
				return (
					<DrawerContentScrollView
						{...props}
						style={{ flex: 1, height: '100%', backgroundColor: Colors.switchPrimary }}
						contentContainerStyle={{ height: '100%' }}>
						<ImageBackground style={{ flex: 1 }} source={require('../assets/images/me.jpg')}>
							<View
								style={{
									flex: 1,
									//height: '100%',
									justifyContent: 'space-between',
									backgroundColor: '#fffd',
								}}>
								<View style={{ flex: 1 }}>
									<View
										style={{
											padding: 20,
											width: '100%',
											height: 140,
											backgroundColor: Colors.switchPrimary,
											// flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										{/* <TouchableCmp > */}
										<TouchableCmp
											onPress={() => {
												navigation.navigate('StackOfTabNav', {
													screen: 'DepartmentTabNav',
													params: {
														screen: 'Profile',
														param: {},
													},
												});
											}}
											style={{
												width: 100,
												height: 100,
												borderRadius: 50,
												//borderRadius: 50,
												backgroundColor: Colors.primary,
											}}>
											<Image
												source={image}
												style={{
													width: 100,
													height: 100,
													borderRadius: 50,
													borderColor: '#f7f7f7',
													borderWidth: 2,
												}}
											/>
										</TouchableCmp>
										{/* <View style={{
                      //width: '70%', height: '100%',
                      borderRadius: 8,
                      backgroundColor: '#f8f8f8'
                    }}>
                    </View> */}
									</View>
									<ScrollView>
										<DrawerItemList
											{...props}
											itemStyle={
												{
													// marginHorizontal: 0,
													//borderRadius: 0
												}
											}
										/>
									</ScrollView>
								</View>
								<View
									style={{
										padding: 10,
										paddingBottom: 15,
										//backgroundColor: 'red',
										borderColor: '#f3f5f6',
										borderTopWidth: 2,
									}}>
									<DrawerItem
										{...props}
										style={{
											marginHorizontal: 0,
											marginVertical: 0,
											borderColor: Colors.primary,
											borderWidth: 1,
											borderRadius: 10,
											//marginTop: '95%',color: '#fff',
											backgroundColor: '#fff', //Colors.switchPrimary//'#ff2244',
										}}
										label="Logout"
										labelStyle={{
											color: Colors.primary, // Colors.switchWhite,
											fontSize: 17,
											fontFamily: 'OpenSansBold',
										}}
										icon={({ focused, color, size }) => (
											<Ionicons
												name="ios-log-out"
												size={size + 1}
												color={Colors.primary} //Colors.switchWhite}
												//color={color}
											/>
										)}
										onPress={onLogout}
									/>
								</View>
							</View>
						</ImageBackground>
					</DrawerContentScrollView>
				);
			}}
			drawerStyle={{
				width: '65%',
				paddingHorizontal: 0,
				backgroundColor: '#fff',
			}}
			drawerContentOptions={{
				activeBackgroundColor: Colors.primary, //'#f0f0f0',
				inactiveBackgroundColor: '#fcfcfc',
				activeTintColor: '#fff', //Colors.primary,//'#006f8f',
				inactiveTintColor: '#444',

				labelStyle: {
					fontFamily: 'OpenSansBold',
					fontSize: 16,
				},
			}}>
			<PointerDrawerNav.Screen
				// name='DepartmentTabNav'
				//component={DeptTabNavigator}

				name="StackOfTabNav"
				component={StackOfTabNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Department',
					drawerIcon: ({ color }) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-clipboard' : 'ios-clipboard'}
							size={23}
							color={color}
						/>
					),
				}}
			/>

			{/* CHECK WHY STACK NAVIGATOR ROTATES FASTER ON DEVICE ROTATE */}
			<PointerDrawerNav.Screen
				name="Faculty"
				component={FacultyStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Faculty',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-business' : 'ios-business'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>

			<PointerDrawerNav.Screen
				name="University"
				component={UniversityStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'University',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-podium' : 'ios-podium'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>

			<PointerDrawerNav.Screen
				name="Settings"
				component={SettingsStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func

					drawerLabel: 'Settings',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>

			<PointerDrawerNav.Screen
				name="HelpCenter"
				component={HelpCenterStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Help Center',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-help-circle' : 'ios-help-circle'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
		</PointerDrawerNav.Navigator>
	);
};
