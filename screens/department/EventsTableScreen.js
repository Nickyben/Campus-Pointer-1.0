import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image, Platform, Modal,RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import TouchCard from '../../components/UI/TouchCard';
import Btn from '../../components/UI/Btn';
import TouchIcon from '../../components/UI/TouchIcon';
import { fetchDeptData, fetchEvents } from '../../store/actions/dataActions';
import LoadingScreen from '../pointerApp/LoadingScreen';
import ErrorScreen from '../pointerApp/ErrorScreen';
import { useNavigation } from '@react-navigation/native';
import MyModal from '../../components/pointerComponents/MyModal';
import listEmptyComponent from '../../components/pointerComponents/listEmptyComponent';


const _Item = ({ addCalendar, calenderHandler, content: { id, title, date, time, type }, onSelect }) => (
	<TouchCard onTouch={onSelect} style={{ ...styles.itemCard }}>
		<View style={styles.itemContainer}>
			<View style={styles.infoContainer}>
				<View style={styles.titleContainer}>
					<View>
						{title && (
							<Text style={styles.title} numberOfLines={2}>
								{title}{' '}
							</Text>
						)}
						{type && (
							<Text style={styles.title2} numberOfLines={2}>
								{' '}
								{type}{' '}
							</Text>
						)}
					</View>
					<View>
						{date && (
							<Text style={styles.detail} numberOfLines={2}>
								{' '}
								{date}{' '}
							</Text>
						)}
						{time && (
							<Text style={styles.detail2} numberOfLines={2}>
								{' '}
								{time}{' '}
							</Text>
						)}
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: addCalendar ? 'space-between' : 'flex-end',
						width: '100%',
					}}>
					{addCalendar && (
						<TouchIcon
							name={'calendar'}
							size={25}
							borderColor={Colors.accent}
							style={{ backgroundColor: '#f3f6f7' }}
							color={Colors.accent}
							onTouch={() => {
								calenderHandler(date);
							}}
						/>
					)}

					<Btn
						style={styles.btn}
						bgColor={'transparent'}
						borderColor={Colors.primary}
						onPress={onSelect}
						textColor={Colors.primary}>
						View
					</Btn>
				</View>
			</View>
		</View>
	</TouchCard>
);

const EventsTableScreen = ({ source: { option } }) => {
	const navig = useNavigation();
	const [showModal, setShowModal] = useState(false);
	const [eventDate, setEventDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(true);
	const [error, setError] = useState();
	let addCalendar = false;
	if (option === 'Calendar and Events') {
		addCalendar = true;
	}
	const eventsData = useSelector((state) =>
		state.dataReducer.availableEvents.filter((event) => event.department === 'Computer Engineering')
	);
	//	console.log(eventsData);
	const dispatch = useDispatch();

	const calenderHandler = (date) => {
		const year = new Date(date).getFullYear();
		const theDate = new Date(date).toLocaleDateString().split('/');
		theDate.pop();
		theDate.unshift(year);
		const dateDashForm = theDate.join('-');

		//console.log(dateDashForm)
		setEventDate(() => dateDashForm);
		setShowModal(() => true);
	};

	const loadData = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchEvents());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch]); //setIsLoading is handled already by react,

	// useEffect(() => {
	// 	const unsubscribe = navig.addListener('focus', loadData);
	// 	//clean up function to run when effect is about to rerun or when component is destroyed or unmounted
	// 	return () => {
	// 		unsubscribe();
	// 	};
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

	const renderItem = ({ item }) => (
		//auto gets data in obj form , I deStructured it in params
		<_Item
			content={item}
			calenderHandler={calenderHandler}
			addCalendar={addCalendar}
			onSelect={() => {
				navig.navigate('DeptDetails', {itemId: item.id, title: item.constructor.name });
			}}
		/>
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

	return (
		<View style={styles.screen}>
			<FlatList
				//initialNumToRender, refreshing
				keyExtractor={(item, index) => item.id}
				data={eventsData}
				renderItem={renderItem}
				contentContainerStyle={{ ...styles.listContainer, flex: eventsData.length === 0 ? 1 : 0 }}
				ListEmptyComponent={listEmptyComponent.bind(this, { onRetry: loadData, isRefreshing })}
				refreshControl={
					<RefreshControl colors={[Colors.primary]} refreshing={isRefreshing} onRefresh={loadData} />
				}
			/>

			{addCalendar && (
				<>
					<MyModal
						handleRequestClose={() => {
							setShowModal(() => false);
						}}
						showModal={showModal}>
						<View style={styles.calendarContainer}>
							<View style={styles.calendarHeader}>
								<Text
									style={{
										color: '#fff',
										fontSize: 17,
										textAlign: 'center',
										fontFamily: 'OpenSansBold',
									}}>
									Calendar
								</Text>
							</View>

							<Calendar
								//   {
								//Initially visible month. Default = Date()
								current={eventDate}
								markingType={'dot'}
								markedDates={{
									[eventDate]: {
										selected: true,
										selectedColor: Colors.accent,
										textColor: '#fff',
									},
								}}
								enableSwipeMonths={true}
								//markedDates={{[eventDate.string]: }}
								//markedDates={[date: string] : PeriodMarking}
								// // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
								// minDate={'2012-05-10'}
								//   // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
								//   maxDate={'2012-05-30'}
								//   // Handler which gets executed on day press. Default = undefined
								//   onDayPress={(day) => { console.log('selected day', day) }}
								//   // Handler which gets executed on day long press. Default = undefined
								//   onDayLongPress={(day) => { console.log('selected day', day) }}
								//   // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
								//   monthFormat={'yyyy MM'}
								//   // Handler which gets executed when visible month changes in calendar. Default = undefined
								//   onMonthChange={(month) => { console.log('month changed', month) }}
								//   // Hide month navigation arrows. Default = false
								//   hideArrows={true}
								//   // Replace default arrows with custom ones (direction can be 'left' or 'right')
								//   renderArrow={(direction) => (<Arrow />)}
								//   // Do not show days of other months in month page. Default = false
								//   hideExtraDays={true}
								//   // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
								//   // day from another month that is visible in calendar page. Default = false
								//   disableMonthChange={true}
								//   // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
								//   firstDay={1}
								//   // Hide day names. Default = false
								//   hideDayNames={true}
								//   // Show week numbers to the left. Default = false
								//   showWeekNumbers={true}
								//   // Handler which gets executed when press arrow icon left. It receive a callback can go back month
								//   onPressArrowLeft={subtractMonth => subtractMonth()}
								//   // Handler which gets executed when press arrow icon right. It receive a callback can go next month
								//   onPressArrowRight={addMonth => addMonth()}
								//   // Disable left arrow. Default = false
								//   disableArrowLeft={true}
								//   // Disable right arrow. Default = false
								//   disableArrowRight={true}
								//   // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
								//   disableAllTouchEventsForDisabledDays={true}
								//   // Replace default month and year title with custom one. the function receive a date as parameter.
								//   renderHeader={(date) => {/*Return JSX*/ }}
								//   // Enable the option to swipe between months. Default = false

								// }
							/>

							<Btn
								style={{ alignSelf: 'center', marginTop: 10 }}
								onPress={() => {
									setShowModal((prev) => !prev);
								}}
								bgColor={'transparent'}
								textColor={Colors.accent}
								borderColor={Colors.accent}>
								Close
							</Btn>
						</View>
					</MyModal>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f3f6f7', //'#e3e6e7',//
	},

	ImageBackground: {
		width: '100%',
		alignItems: 'center',
		padding: 0,
	},

	itemCard: {
		padding: 0,
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 10,
		overflow: 'hidden',
		marginBottom: 20,
	},
	itemContainer: {
		alignItems: 'center',
		overflow: 'hidden',
	},

	infoContainer: {
		width: '100%',
		paddingBottom: 10,
		paddingHorizontal: 20,
	},
	btn: {
		width: '25%',
		minWidth: 100,
		marginTop: 10,
	},
	listContainer: {
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		paddingVertical: 20,
		//alignItems: 'center',
	},
	titleContainer: {
		width: '100%',
		alignItems: 'center',
		borderColor: '#f5f5f5',
		borderBottomWidth: 2,
		paddingVertical: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		color: Colors.primary, //'#333',
		flex: 1.5,
	},
	title2: {
		fontFamily: 'OpenSansBold',
		fontSize: 16,
		color: Colors.accent, //'#111',
		flex: 1.5,
	},
	detail: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#333',
		textAlign: 'justify',
		//backgroundColor: 'red',
		flex: 1,
	},

	detail2: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#777',
		textAlign: 'right',
		flex: 1,
	},
	
	calendarContainer: {
		width: '100%',
		padding: 20,
		paddingTop: 0,
		paddingHorizontal: 25,
		backgroundColor: '#fff',
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 15,
		//overflow: 'hidden',
	},
	calendarHeader: {
		backgroundColor: Colors.accent,
		padding: 20,
		width: '100%',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
});
export default EventsTableScreen;





					// <Modal
					// 	animationType={'fade'}
					// 	visible={showModal}
					// 	transparent
					// 	onRequestClose={() => {
					// 		setShowModal(() => false);
					// 	}}>
					// 	<View style={styles.calendarModal}>
					// 		<View style={styles.calendarContainer}>
					// 			<View style={styles.calendarHeader}>
					// 				<Text
					// 					style={{
					// 						color: '#fff',
					// 						fontSize: 17,
					// 						textAlign: 'center',
					// 						fontFamily: 'OpenSansBold',
					// 					}}>
					// 					Calendar
					// 				</Text>
					// 			</View>

					// 			<Calendar
					// 				//   {
					// 				//Initially visible month. Default = Date()
					// 				current={eventDate}
					// 				markingType={'dot'}
					// 				markedDates={{
					// 					[eventDate]: {
					// 						selected: true,
					// 						selectedColor: Colors.accent,
					// 						textColor: '#fff',
					// 					},
					// 				}}
					// 				enableSwipeMonths={true}
					// 				//markedDates={{[eventDate.string]: }}
					// 				//markedDates={[date: string] : PeriodMarking}
					// 				// // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
					// 				// minDate={'2012-05-10'}
					// 				//   // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
					// 				//   maxDate={'2012-05-30'}
					// 				//   // Handler which gets executed on day press. Default = undefined
					// 				//   onDayPress={(day) => { console.log('selected day', day) }}
					// 				//   // Handler which gets executed on day long press. Default = undefined
					// 				//   onDayLongPress={(day) => { console.log('selected day', day) }}
					// 				//   // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
					// 				//   monthFormat={'yyyy MM'}
					// 				//   // Handler which gets executed when visible month changes in calendar. Default = undefined
					// 				//   onMonthChange={(month) => { console.log('month changed', month) }}
					// 				//   // Hide month navigation arrows. Default = false
					// 				//   hideArrows={true}
					// 				//   // Replace default arrows with custom ones (direction can be 'left' or 'right')
					// 				//   renderArrow={(direction) => (<Arrow />)}
					// 				//   // Do not show days of other months in month page. Default = false
					// 				//   hideExtraDays={true}
					// 				//   // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
					// 				//   // day from another month that is visible in calendar page. Default = false
					// 				//   disableMonthChange={true}
					// 				//   // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
					// 				//   firstDay={1}
					// 				//   // Hide day names. Default = false
					// 				//   hideDayNames={true}
					// 				//   // Show week numbers to the left. Default = false
					// 				//   showWeekNumbers={true}
					// 				//   // Handler which gets executed when press arrow icon left. It receive a callback can go back month
					// 				//   onPressArrowLeft={subtractMonth => subtractMonth()}
					// 				//   // Handler which gets executed when press arrow icon right. It receive a callback can go next month
					// 				//   onPressArrowRight={addMonth => addMonth()}
					// 				//   // Disable left arrow. Default = false
					// 				//   disableArrowLeft={true}
					// 				//   // Disable right arrow. Default = false
					// 				//   disableArrowRight={true}
					// 				//   // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
					// 				//   disableAllTouchEventsForDisabledDays={true}
					// 				//   // Replace default month and year title with custom one. the function receive a date as parameter.
					// 				//   renderHeader={(date) => {/*Return JSX*/ }}
					// 				//   // Enable the option to swipe between months. Default = false

					// 				// }
					// 			/>

					// 			<Btn
					// 				style={{ alignSelf: 'center', marginTop: 10 }}
					// 				onPress={() => {
					// 					setShowModal((prev) => !prev);
					// 				}}
					// 				bgColor={'transparent'}
					// 				textColor={Colors.accent}
					// 				borderColor={Colors.accent}>
					// 				Close
					// 			</Btn>
					// 		</View>
					// 	</View>
				
				
					// </Modal>
				