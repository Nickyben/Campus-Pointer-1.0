import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import Touch from '../../components/UI/Touch';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesData } from '../../store/actions/dataActions';
import LoadingScreen from '../pointerApp/LoadingScreen';
import { RefreshControl } from 'react-native';
import ErrorScreen from '../pointerApp/ErrorScreen';

const CourseDetailsScreen = ({ navigation, route: { params } }) => {
	const courses = useSelector((state) => state.dataReducer.availableCourses);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const selectedCourseId = params.courseId; //or id of the course (from db or local mem)

	const course = courses.find((c) => c.id === selectedCourseId);
	//console.log(course.semester)

	const viewPersonHandler = (item) => {
		//console.log('I\'m here')
		navigation.navigate('DeptDetails', { item: item, itemId: item.id, title: item.constructor.name });
	};

	const dispatch = useDispatch();

	const loadCourses = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchCoursesData());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch]); //setIsLoading is handled already by react,

	useLayoutEffect(() => {
		const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';

		navigation.setOptions({
			//console.log(course.semester)
			headerTitle: course && course.courseCode,
			headerRight: (props) => (
				<HeaderButtons HeaderButtonComponent={HeaderBtn}>
					<Item tile="Notifications" iconName={notificationIcon} onPress={() => {}} />
				</HeaderButtons>
			),
		});
	}, [course]);

	useEffect(
		//will run only when the component loads and not again unless dependencies change
		//don't use async keyword here, instead, use .then() after the dispatch()
		() => {
			setIsLoading(true);
			loadCourses().then(() => {
				setIsLoading(false);
			});
		},
		[loadCourses]
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
			<ScrollView
				style={styles.scroll}
				refreshControl={
					<RefreshControl colors={[Colors.primary]} refreshing={isRefreshing} onRefresh={loadCourses} />
				}>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={styles.headerRow}>
							<Text style={styles.headerTitle}>Course Title: </Text>
							<Text style={{ ...styles.headerText }}>{course.courseTitle}</Text>
						</View>

						<View style={styles.headerRow}>
							<Text style={styles.headerTitle}>Course Code: </Text>
							<Text style={styles.headerText}>{course.courseCode}</Text>
						</View>

						<View style={styles.headerRow}>
							<Text style={styles.headerTitle}>Credit Units: </Text>
							<Text style={styles.headerText}>{course.creditUnits}</Text>
						</View>

						<View style={styles.headerRow}>
							<Text style={styles.headerTitle}>Semester: </Text>
							<Text style={styles.headerText}>{course.semester}</Text>
						</View>
					</View>

					<View style={styles.row}>
						<View style={styles.content}>
							<Text style={styles.headerTitle2}>Course Outline: </Text>
							<Text style={styles.contentText}>{course.courseOutline}</Text>
						</View>

						<View style={styles.content2}>
							<View style={styles.contentData}>
								<Text style={styles.headerTitle2}>Course Coordinator: </Text>
								<Touch
									onTouch={viewPersonHandler.bind(this, course.courseCoordinator)}
									useIos
									style={{ alignItems: 'flex-start' }}>
									<Text numberOfLines={2} style={{ ...styles.contentDataText }}>
										{course.courseCoordinator.fullName}
									</Text>
								</Touch>
							</View>

							<View style={styles.contentData}>
								<Text style={styles.headerTitle2}>Lecturers: </Text>
								{course.memberLecturers.map((lecturer, index) => (
									<Touch
										onTouch={viewPersonHandler.bind(this, lecturer)}
										useIos
										key={index}
										style={{ alignItems: 'flex-start' }}>
										<Text numberOfLines={2} style={{ ...styles.contentDataText }}>
											{lecturer.fullName}
										</Text>
									</Touch>
								))}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export const screenOptions = ({ route: { params } }) => {};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scroll: {
		backgroundColor: '#f5f5f5',
	},
	container: {
		//flex:2,
		height: '100%',
		backgroundColor: Colors.switchPrimary,
		// paddingHorizontal: 20,
	},
	header: {
		backgroundColor: Colors.switchPrimary,
		padding: 20,
	},
	headerRow: {
		//backgroundColor: 'blue',
		marginBottom: 5,
		flexDirection: 'row',
		//padding:
	},
	headerTitle: {
		fontFamily: 'OpenSansBold',
		fontSize: 22,
		color: '#000',
		flex: 2,
	},
	headerText: {
		flex: 3,
		fontFamily: 'OpenSansBold',
		fontSize: 20,
		color: Colors.switchWhite,
		//backgroundColor: 'red',
		//textAlign: 'left'
	},
	row: {
		flex: 1,
		//paddingTop: 0,
		padding: 20,
		borderTopRightRadius: 70,
		backgroundColor: '#f3f6f7', //'#f5f5f5',
		//overflow
	},
	content: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		marginBottom: 20,
	},
	content2: {
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerTitle2: {
		fontFamily: 'OpenSansBold',
		fontSize: 20,
		color: '#000',
		marginBottom: 10,
	},
	contentText: {
		flex: 3,
		fontFamily: 'OpenSansRegular',
		fontSize: 16,
		color: '#000',
		textAlign: 'justify',
		marginTop: 5,
	},
	contentData: {
		width: '48%',
		//backgroundColor: 'blue',
	},

	contentDataText: {
		marginBottom: 5,
		fontFamily: 'OpenSansRegular',
		fontSize: 16,
		color: '#00a7e7',
		textAlign: 'left',
	},
});

export default CourseDetailsScreen;
