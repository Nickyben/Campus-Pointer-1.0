import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../../components/UI/HeaderBtn';
import FacultyOverviewScreen from '../../screens/pointerApp/FacultyOverviewScreen';
import { fetchDeptData, fetchTimeTables } from '../../store/actions/dataActions';
import Colors from '../../constants/Colors';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import TouchIcon from '../../components/UI/TouchIcon';
import ErrorScreen from '../pointerApp/ErrorScreen';
import LoadingScreen from '../pointerApp/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { RefreshControl } from 'react-native';
import Btn from '../../components/UI/Btn';
import listEmptyComponent from '../../components/pointerComponents/listEmptyComponent';

const TimeTableTabNav = createMaterialTopTabNavigator();

const defaultNavOptions = (props) => {
	//console.log(props);
	return {
		headerTitle: 'Pointer',
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

const PeriodComponent = ({ day, period, index, onNavigate, showingTitle, hideOthers }) => {
	//const [showCourseTitle, setShowCourseTitle] = useState(showingTitle === index);
	const showCourseTitle = showingTitle === index;
	const courseTitleHandler = (index) => {
		showCourseTitle === true ? hideOthers('') : hideOthers(index);
	};

	// useEffect(() => {
	// 	setShowCourseTitle((p) => showingTitle === index);
	// }, [showingTitle, index]);

	const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	const to_date = new Date().toDateString();
	const todayTimeStamp = +new Date().getTime();
	const today = to_date.split(' ')[0];
	const diff = weekdays.indexOf(day) - weekdays.indexOf(today);
	const thatDayTimeStamp = todayTimeStamp + diff * 24 * 60 * 60 * 1000;
	const thatDay = new Date(thatDayTimeStamp).toDateString();
	const isToday = thatDay === to_date;

	const hourNow = new Date().getHours();
	const meridian = hourNow >= 12 ? 'pm' : 'am';
	const currentHour = hourNow > 12 ? hourNow - 12 + meridian : hourNow + meridian;
	const periodHour = period.time.split(' - ')[0];

	const isPresentPeriod = currentHour === periodHour && isToday;

	return (
		<>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ width: '2%', backgroundColor: period.color, height: '100%' }}></View>
				<View
					style={{
						...styles.periodContainer,
						backgroundColor: isPresentPeriod ? period.color + '22' : '#fff',
						borderColor: isPresentPeriod ? period.color + '22' : '#e3e6e7',
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<Text
							onPress={onNavigate.bind(this, period.course.id, 'course', period.course)}
							style={{ ...styles.periodText, marginRight: 5, color: '#00a7e7' }}>
							{period.course.courseCode}
						</Text>

						<TouchIcon
							//name='arrow-dropdown'
							touched={() => showCourseTitle && showingTitle === index}
							toggleIcons={['arrow-dropright', 'arrow-dropdown']}
							size={23}
							color={period.color}
							onTouch={courseTitleHandler.bind(this, index)}
						/>
					</View>

					<Text style={{ ...styles.periodText2, color: '#777' }}>{period.time}</Text>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<Text
							onPress={onNavigate.bind(this, period.venue.id, 'hall', period.venue)}
							style={{ ...styles.periodText2, marginRight: 5 }}>
							{period.venue.fullName}
						</Text>
						<TouchIcon
							name="arrow-dropright"
							size={23}
							color={period.color}
							onTouch={onNavigate.bind(this, period.venue.id, 'hall', period.venue)}
						/>
					</View>
				</View>
			</View>

			{showCourseTitle && showingTitle === index && (
				<View style={{ backgroundColor: period.color }}>
					<Text
						onPress={onNavigate.bind(this, period.course.id, 'course', period.course)}
						style={{
							...styles.periodText,
							width: '100%',
							backgroundColor: period.color,
							padding: 15,
							paddingLeft: 40,
							marginRight: 5,
							color: '#f3f6f7',
						}}>
						Course Title: {period.course.courseTitle}
					</Text>
				</View>
			)}
		</>
	);
};

//day, periods, navig
const TableComponent = ({ route: { name } }) => {
	const lecturesTimetable = useSelector((s) =>
		s.dataReducer.availableTimetables.find(
			(t) => t.timetableType === 'Lectures' && t.department === 'Computer Engineering'
		)
	);
	const [showTitle, setShowTitle] = useState(-1);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const dispatch = useDispatch();
	const daysRowsArr = lecturesTimetable ? lecturesTimetable.dayRows : []; //an obj
	const navig = useNavigation();
	const to_date = new Date().toDateString();
	const today = to_date.split(' ')[0];

	const schoolWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	const dayIndex = schoolWeekDays.indexOf(name);
	const day = daysRowsArr[dayIndex].day;
	const periods = daysRowsArr[dayIndex].periods;

	const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const todayTimeStamp = +new Date().getTime();
	const isWeekend = weekdays.indexOf(today) > 4;
	const diff = !isWeekend
		? weekdays.indexOf(day) - weekdays.indexOf(today)
		: weekdays.indexOf(day) - weekdays.indexOf(today) + 7;
	const thatDayTimeStamp = todayTimeStamp + diff * 24 * 60 * 60 * 1000;
	const thatDay = new Date(thatDayTimeStamp).toDateString();
	const isToday = thatDay === to_date;
	const hourNow = new Date().getHours();
	const meridian = hourNow >= 12 ? 'pm' : 'am';
	const currentHour = hourNow > 12 ? hourNow - 12 + meridian : hourNow + meridian;

	const titlesHandler = (index) => {
		//console.log(index+ 'da')
		setShowTitle((p) => index);
	};
	const presentPeriod = periods.find((p) => {
		const periodHour = p.time.split(' - ')[0];
		return currentHour === periodHour && isToday;
	});

	const presentPeriodColor = presentPeriod && presentPeriod.color;
	const navigateHandler = (itemId, type, item) => {
		if (type === 'course') {
			navig.navigate('CourseDetails', { courseId: itemId });
		} else {
			navig.navigate('DeptDetails', { itemId: itemId, title: item.constructor.name });
		}
	};

	const loadData = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchTimeTables());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch]); //setIsLoading is handled already by react,

	// useEffect(() => {
	//   const unsubscribe = navig.addListener('focus', loadData);
	//   //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
	//   return (() => {
	//     unsubscribe();
	//   });
	// }, [loadData]);

	useEffect(
		//will run only when the component loads and not again unless dependencies change
		//don't use async keyword here, instead, use .then() after the dispatch()
		() => {
			setIsLoading(true);
			loadData().then(() => {
				setIsLoading(false);
			});
		},
		[loadData]
	);

	if (error) {
		return (
			<ErrorScreen
				errorObj={{
					messageHead: error.toLowerCase().includes('network') ? 'Network Error' : 'Error Occurred',
					messageBody: error,
					image: null,
				}}
				retryFunc={loadData}
			/>
		);
	}

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (periods.length === 0) {
		return listEmptyComponent({ onRetry: loadData, isRefreshing, itemName: 'timetable' });
	}
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.bar}>
				<View style={{ padding: 15, backgroundColor: Colors.primary }}>
					<Text style={{ ...styles.barText, color: '#fff' }}>
						{isToday ? 'Today - ' : ''}
						{thatDay}
					</Text>
				</View>
				<View style={styles.iconsBar}>
					{[
						['Courses', 'list'],
						['Schedule Time', 'time'],
						['Venue', 'business'],
					].map((item, i) => (
						<View key={i} style={styles.iconContainer}>
							<Ionicons
								name={Platform.OS === 'android' ? `md-${item[1]}` : `ios-${item[1]}`}
								size={23}
								color={presentPeriodColor && item[1] === 'time' ? presentPeriodColor : Colors.primary}
							/>
							<Text
								style={{
									...styles.barText2,
									marginTop: 5,
									color:
										presentPeriodColor && item[1] === 'time'
											? presentPeriodColor
											: styles.barText2.color,
								}}>
								{item[0]}
							</Text>
						</View>
					))}
				</View>
			</View>

			<ScrollView
				refreshControl={
					<RefreshControl
						colors={periods.map((p) => p.color)}
						refreshing={isRefreshing}
						onRefresh={loadData}
					/>
				}
				style={{
					backgroundColor: '#fafcfd',
					paddingTop: 20,
					paddingBottom: 20,
				}}>
				{periods.map((p, i) => (
					<PeriodComponent
						key={i}
						index={i}
						day={day}
						period={p}
						onNavigate={navigateHandler}
						showingTitle={showTitle}
						hideOthers={titlesHandler}
					/>
				))}
			</ScrollView>
		</View>
	);
};

const TimetableScreen = ({}) => {
	const schoolWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	const to_date = new Date().toDateString();
	const today = to_date.split(' ')[0];

	return (
		<TimeTableTabNav.Navigator
			initialLayout={{ width: Dimensions.get('window').width }}
			initialRouteName={today} //screenOptions={defaultTabStacksOpts}
			tabBarOptions={{
				activeTintColor: Colors.primary,
				inactiveTintColor: '#246',
				indicatorStyle: {
					backgroundColor: Colors.primary,
				},
				// activeBackgroundColor: 'white',
				// inactiveBackgroundColor: '#effdff',
				showIcon: false,
				showLabel: true,
				// tabStyle:{

				// },
				labelStyle: {
					fontFamily: 'OpenSansBold',
					fontSize: 12,
				},
			}}>
			<TimeTableTabNav.Screen name={schoolWeekDays[0]} component={TableComponent} />

			<TimeTableTabNav.Screen name={schoolWeekDays[1]} component={TableComponent} />

			<TimeTableTabNav.Screen name={schoolWeekDays[2]} component={TableComponent} />

			<TimeTableTabNav.Screen name={schoolWeekDays[3]} component={TableComponent} />

			<TimeTableTabNav.Screen name={schoolWeekDays[4]} component={TableComponent} />
		</TimeTableTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
	},
	barText: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#555',
	},
	barText2: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: Colors.primary, //'#444',//
	},
	iconsBar: {
		flexDirection: 'row',
		paddingHorizontal: 40,
		paddingVertical: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: '#f3f6f7',
		borderBottomWidth: 1,
	},
	iconContainer: {
		// paddingVertical:20,
		// width:'33%',
		// backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	periodContainer: {
		width: '98%',
		flexDirection: 'row',
		backgroundColor: '#fff', //'#f3f6f7',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 20,
		// borderLeftWidth: 10,
		borderBottomWidth: 1,
		// borderTopWidth: 1,
	},
	periodText: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		//color: '#333',
	},
	periodText2: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#333',
	},
});

export default TimetableScreen;
