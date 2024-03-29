import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Platform,
	ScrollView,
	TouchableOpacity,
	TouchableNativeFeedback,
	FlatList,
	Dimensions,
	useWindowDimensions,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SliderBox } from 'react-native-image-slider-box';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import SelectOption from '../../components/pointerComponents/SelectOption';

const sliderImages = [
	require('../../assets/images/slide1.jpg'),
	require('../../assets/images/slide2.jpg'),
	require('../../assets/images/slide3.jpg'),
	require('../../assets/images/slide4.jpg'),
	require('../../assets/images/slide5.jpg'),
];

const academicOptions = [
	{ id: Math.random().toString(), title: 'Courses' },
	{ id: Math.random().toString(), title: 'Calendar and Events' },
	{ id: Math.random().toString(), title: 'Timetable' },
	{ id: Math.random().toString(), title: 'Fees' },
	{ id: Math.random().toString(), title: 'Library' },
	{ id: Math.random().toString(), title: 'Labs and Research' },
	{ id: Math.random().toString(), title: 'Reserve' },
];

const SchoolOverviewScreen = ({ navigation, route }) => {
	const WIDTH = Dimensions.get('window').width;

	const selectOptionHandler = ({ title }) => {
		navigation.navigate('SchoolOptions', { title: title });
	};

	const renderItem = (
		{ item } //auto gets data in obj form , I deStructured it in params
	) => <Item content={item} />;

	return (
		<View
			style={styles.screen}
			// onLayout={onLayoutImageSlide}
		>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.imageSlide}>
					<SliderBox
						images={sliderImages}
						dotColor={Colors.accent}
						inactiveDotColor={'white'}
						parentWidth={WIDTH}
						ImageComponentStyle={{ borderRadius: 5, width: '94%' }}
						sliderBoxHeight={250}
						onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
						paginationBoxVerticalPadding={20}
						paginationBoxHorizontalPadding={20}
						autoplay
						circleLoop
						resizeMethod={'resize'}
						resizeMode={'cover'}
						paginationBoxStyle={{
							position: 'absolute',
							bottom: 0,
							padding: 0,
							alignItems: 'center',
							alignSelf: 'center',
							justifyContent: 'center',
							paddingVertical: 10,
							width: WIDTH * 0.9,
						}}
					/>
				</View>
				<View style={styles.optionsContainer}>
					<View style={styles.row}>
						<SelectOption
							data={academicOptions[0]}
							icon="list-box"
							color={'#9eff46'}
							onSelect={selectOptionHandler}
						/>
						<SelectOption
							data={academicOptions[1]}
							icon="calendar"
							color={'#ef2464'}
							onSelect={selectOptionHandler}
						/>
					</View>
					<View style={styles.row}>
						<SelectOption
							data={academicOptions[2]}
							icon="today"
							color={'#55a5ff'}
							onSelect={selectOptionHandler}
						/>
						<SelectOption
							data={academicOptions[3]}
							icon="card"
							color={'#ffdd25'}
							onSelect={selectOptionHandler}
						/>
					</View>
					<View style={styles.row}>
						<SelectOption
							data={academicOptions[4]}
							icon="filing"
							color={'#f58915'}
							onSelect={selectOptionHandler}
						/>
						<SelectOption
							data={academicOptions[5]}
							icon="flask"
							color={'#44ffb0'}
							onSelect={selectOptionHandler}
						/>
					</View>
					<View style={styles.row}>
						<SelectOption
							data={academicOptions[6]}
							icon="analytics"
							color={'#ff55dd'}
							onSelect={selectOptionHandler}
						/>
						<SelectOption
							data={academicOptions[6]}
							icon="analytics"
							color={'#ee3e11'}
							onSelect={selectOptionHandler}
						/>
					</View>
				</View>

				{/* <Text>{WIDTH}</Text>
        <Text>{ HEIGHT}</Text> */}
			</ScrollView>
		</View>
	);
};

export const screenOptions = (navProps) => {
	const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
	const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
	return {
		headerTitle: 'Academics',
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item
					tile="Notifications"
					iconName={notificationIcon}
					onPress={() => {
						// navProps.navigation.navigate(
						//   {
						//     name: 'Cart',
						//     params: {
						//     }
						//   }
						// );
					}}
				/>
			</HeaderButtons>
		),
		headerLeft: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item
					tile="Menu"
					iconName={menuIcon}
					onPress={() => {
						navProps.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},

	scrollView: {
		//width: '100%',
		flex: 1,
		backgroundColor: '#fff', //'#e0e0ff',
	},

	imageSlide: {
		//padding: 25,
		backgroundColor: '#fff',
		height: 250,
		marginTop: 10,
	},

	optionsContainer: {
		marginTop: 20,
		paddingTop: 20,
		backgroundColor: '#f3f6f7', //'#f5f5f5',
		borderRadius: 50,
		overflow: 'hidden',
	},
	row: {
		flex: 1,
		paddingHorizontal: '2%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#f3f6f7', //'#f5f5f5',
		paddingVertical: 5,
	},
});

export default SchoolOverviewScreen;
