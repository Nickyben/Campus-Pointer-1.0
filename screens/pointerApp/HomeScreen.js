import React, { useState, useCallback, useEffect } from 'react';
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
	ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import {
	fetchHomeData,
	likePost,
	sharePost,
	commentPost,
	fetchHomeReactions,
	deletePost,
} from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import { RefreshControl } from 'react-native';
import listEmptyComponent from '../../components/pointerComponents/listEmptyComponent';
import { useNavigation } from '@react-navigation/native';
import MyModal from '../../components/pointerComponents/MyModal';

const getCount = (postReactionCount) =>
	postReactionCount >= 1000 ? parseInt(postReactionCount / 1000).toString() + 'K' : postReactionCount;

const _Item = ({
	content: { id, title, date, type, responses, author, text, image },
	onOptionsClick,
	replyingPostId,
	hideOtherRepliesFunc,
}) => {
	const navig = useNavigation();
	const _dispatch = useDispatch();
	const { fullName, office, post } = author ? author : {};
	const authorImage = author && author.image;
	const isStudent = true; //for now
	const commentAuthorType = isStudent ? 'student' : rand(['staff', 'admin', 'postAuthor']);
	const user = useSelector((state) => state.authReducer.userAppData);
	const isUserPost = author.id === user.id;
	const isLiked = useSelector((state) => state.homeReducer.availableLikes).includes(id);
	const postLikes = useSelector((state) => state.homeReducer.availableGeneralLikes.filter((l) => l.postId === id));
	const numOfLikes = getCount(postLikes.length);
	const postComments = useSelector((state) => state.homeReducer.availableComments.filter((c) => c.ownPostId === id));
	const numOfPostComments = getCount(postComments.length);
	const isCommented = !!postComments.find((c) => c.author.id === user.id && c.ownPostId === id);
	//const [isReplyingPost, setIsReplyingPost] = useState(false);
	const isReplyingPost = replyingPostId === id;
	const [suggestedComments, setSuggestedComments] = useState(shuffle(responses));

	// useEffect(() => {
	// 	setSuggestedComments(shuffle(responses));
	// }, []);

	// useEffect(() => {
	// 	setIsReplyingPost((p) => replyingPostId === id);
	// }, [replyingPostId]);

	const [showOptionsModal, setShowOptionsModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState({ show: false, selectedOption: '' });

	const postOptions = [
		{
			title: 'Delete post',
			confirm: {
				header: 'Delete',
				text: 'Do you really want to delete this post?',
				cancel: 'No',
				okay: 'Yes',
				onOkay: () => {
					_dispatch(deletePost({ postId: id }));
					setShowConfirmModal({show:false,selectedOption: ''});
				},
				onCancel: () => {
					setShowConfirmModal({show:false,selectedOption: ''});
				},
			},
			onClick: () => {
				setShowOptionsModal(false);
				setShowConfirmModal({ show: true, selectedOption: 'Delete post' });
			},
		},
		{
			title: 'Archive post',
			onClick: () => {
				console.warn('Working');
			},
		},
		{
			title: 'Pin post',
			onClick: () => {
				console.warn('Working');
			},
		},
		{
			title: 'Share post',
			onClick: () => {
				console.warn('Working');
			},
		},
		{
			title: 'Report author',
			onClick: () => {
				console.warn('Working');
			},
		},
	];

	const clickedAlertOption =
		!!showConfirmModal.show && postOptions.find((op) => op.title === showConfirmModal.selectedOption);

	const displayPostOptions = ({ id, isUserPost }) => {
		setShowOptionsModal(true);
	};

	const showResponsesHandler = (id) => {
		setSuggestedComments(shuffle(responses));
		isReplyingPost === true ? hideOtherRepliesFunc('') : hideOtherRepliesFunc(id);
	};

	const commentHandler = (postId, commentPerson, commentPersonType, commentText) => {
		const didExactlyThisBefore = postComments.find(
			(comment) =>
				comment.ownPostId === postId &&
				comment.author === commentPerson &&
				comment.authorType === commentPersonType &&
				comment.text === commentText
		);

		!!didExactlyThisBefore || _dispatch(commentPost(postId, commentPerson, commentPersonType, commentText));
	};

	const likeHandler = (postId, likePerson) => {
		_dispatch(likePost(postId, likePerson));
	};

	const viewReactionsHandler = (type, postId) => {
		navig.navigate('HomeReactions', { reactionType: type, postId });
	};

	return (
		<View style={styles.row}>
			<View style={styles.postContainer}>
				<View style={styles.authorContent}>
					<View style={styles.authorImageContainer}>
						<Touch
							onTouch={() => {
								console.warn("touched author's image");
							}}
							style={{}}>
							<Image source={authorImage} style={styles.authorImage} />
						</Touch>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							flex: 1,
						}}>
						{/* <View style={{  flex:1}}> */}
						<View style={{ ...styles.authorDetails, flex: 7 }}>
							<View style={{ flexDirection: 'row', overflow: 'hidden' }}>
								{fullName && (
									<Text
										numberOfLines={1}
										style={{ ...styles.authorDetailsText, color: '#00a7e7', flex: 1 }}>
										{fullName}
									</Text>
								)}
								<Text
									numberOfLines={1}
									style={{ ...styles.authorDetailsText2, marginLeft: 10, flex: 1 }}>
									~{getSince(date)[2]}
									{' ago'}
								</Text>
							</View>
							<View>
								{office && <Text style={styles.authorDetailsText2}>{office}</Text>}
								{post && <Text style={styles.authorDetailsText2}>{post}</Text>}
							</View>
						</View>

						{/* </View> */}

						<View style={{ ...styles.actionContainer, flex: 1, justifyContent: 'center' }}>
							<TouchIcon
								name={'more'}
								size={22}
								color={'#789'}
								onTouch={displayPostOptions.bind(this, { id, isUserPost })}
							/>
						</View>
					</View>
				</View>

				<View style={styles.infoContent}>
					<View style={styles.infoTextContainer}>
						<View
							style={{
								marginRight: 10,
								paddingRight: 2,
								flex: 1,
								borderRightColor: '#f3f3f3',
								borderRightWidth: 1,
							}}>
							<Text style={{ ...styles.infoText, fontSize: 14 }}>{title}: </Text>
							<Text style={{ ...styles.infoText, color: '#789', marginBottom: 0 }}>[{type}]</Text>
						</View>

						<Text
							numberOfLines={10}
							style={{
								...styles.infoText,
								fontFamily: 'OpenSansRegular',
								fontSize: 15,
								color: '#111',
								flex: 3,
							}}>
							{text}
						</Text>
					</View>

					{image && (
						<View style={styles.postImageContainer}>
							<Image
								style={styles.postImage}
								source={image}
								//defaultSource={}
							/>
						</View>
					)}

					<View style={styles.infoActions}>
						<View style={{ ...styles.actionContainer }}>
							<View style={{ paddingHorizontal: 2 }}>
								<TouchIcon
									onTouch={likeHandler.bind(this, id, user)}
									name={'heart'}
									size={22}
									color={isLiked ? '#ee4444' : '#bcd'}
								/>
							</View>
						</View>

						<View style={styles.actionContainer}>
							<TouchIcon
								onTouch={showResponsesHandler.bind(this, id)}
								name={'chatboxes'}
								size={22}
								color={isCommented ? Colors.primary : isReplyingPost ? Colors.accent : '#bcd'}
							/>
						</View>

						<View style={styles.actionContainer}>
							<TouchIcon name={'share'} size={22} color={'#bcd'} />
						</View>
					</View>

					<View
						style={{
							...styles.actionActivities,
							justifyContent: numOfLikes === 0 && postComments.length > 0 ? 'flex-end' : 'space-between',
						}}>
						{numOfLikes !== 0 && (
							<Text
								style={{ flexDirection: 'row', padding: 5 }}
								onPress={viewReactionsHandler.bind(this, 'likes', id)}>
								<Text style={{ ...styles.actionText, color: isLiked ? '#ee4444' : '#456' }}>
									{numOfLikes}
								</Text>
								<Text style={{ ...styles.actionText, color: isLiked ? '#ee4444' : '#678' }}>
									{' '}
									Like{numOfLikes === 1 ? '' : 's'}
								</Text>
							</Text>
						)}

						{numOfPostComments !== 0 && (
							<Text
								style={{ flexDirection: 'row', padding: 5 }}
								onPress={viewReactionsHandler.bind(this, 'comments', id)}>
								<Text style={{ ...styles.actionText, color: isCommented ? Colors.primary : '#456' }}>
									{numOfPostComments}
								</Text>
								<Text style={{ ...styles.actionText, color: isCommented ? Colors.primary : '#678' }}>
									{' '}
									Comment{numOfPostComments === 1 ? '' : 's'}
								</Text>
							</Text>
						)}
					</View>

					{isReplyingPost && (
						<View style={styles.msgsListContainer}>
							<View style={styles.commentRow}>
								{suggestedComments
									.filter((r, i) => i < 3)
									.map((r, i) => {
										return (
											<Btn
												bgColor={'#fff'}
												textColor={Colors.accent}
												borderColor={Colors.accent}
												key={i}
												onPress={commentHandler.bind(this, id, user, commentAuthorType, r)}
												style={{
													width: '32%',
													borderRadius: 8,
												}}>
												<Text>{r}</Text>
											</Btn>
										);
									})}
							</View>
							<View style={styles.commentRow}>
								{suggestedComments
									.filter((r, i) => i > 2)
									.map((r, i) => {
										return (
											<Btn
												bgColor={'#fff'}
												textColor={Colors.accent}
												borderColor={Colors.accent}
												key={i}
												onPress={commentHandler.bind(this, id, user, commentAuthorType, r)}
												style={{
													width: '32%',
													borderRadius: 8,
												}}>
												<Text>{r}</Text>
											</Btn>
										);
									})}
							</View>
						</View>
					)}
				</View>
			</View>
			<MyModal
				headerText={showConfirmModal.show && clickedAlertOption && clickedAlertOption.confirm.header}
				bottomAlertBox={showOptionsModal}
				showModal={showOptionsModal || showConfirmModal.show}
				handleRequestClose={() => {
					setShowOptionsModal(false);
					setShowConfirmModal({ show: false, selectedOption: '' });
				}}>
				{showOptionsModal &&
					postOptions
						.filter((op) => !(!isUserPost && op.title === 'Delete post'))
						.map(({ title, onClick }, index) => {
							return (
								<Touch key={index} onTouch={onClick} style={{ alignItems: 'baseline' }}>
									<Text style={styles.alertBoxText}>{title}</Text>
								</Touch>
							);
						})}
				{!!clickedAlertOption && (
					<View style={{}}>
						<Text style={{...styles.alertBoxText,textAlign: 'center', paddingHorizontal:20, }} onPress={clickedAlertOption.confirm.onOkay}>
							{clickedAlertOption.confirm.text}
						</Text>

						<View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal:20, marginTop: 10}}>
							<Text onPress={clickedAlertOption.confirm.onCancel} style={styles.confirmBtn}>{clickedAlertOption.confirm.cancel}</Text>
							<Text onPress={clickedAlertOption.confirm.onOkay} style={styles.confirmBtn}>{clickedAlertOption.confirm.okay}</Text>
						</View>
					</View>
				)}
			</MyModal>
		</View>
	);
};

const HomeScreen = ({ navigation }) => {
	const user = useSelector((state) => state.authReducer.userAppData);

	const homePosts = useSelector((state) => state.homeReducer.availablePosts);
	// const [showHeader, setShowHeader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const [replyingPost, setReplyingPost] = useState('');

	const hideOtherRepliesHandler = (post) => {
		setReplyingPost((p) => post);
	};

	// 	setShowOptionsModal({ id, show: true, isUserPost });
	// }; 
	const dispatch = useDispatch();

	const loadData = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchHomeData());
			await dispatch(fetchHomeReactions('likes'));
			await dispatch(fetchHomeReactions('comments'));
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch]); //setIsLoading is handled already by react,

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('focus', loadData);

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

	// useLayoutEffect(()=>{
	//   navigation.setOptions({
	//     //headerShown: ()=> showHeader,
	//    // header:({})=>null
	//    // headerTransparent: ()=>true
	//    headerStyle:{
	//      backgroundColor: 'transparent'
	//    }
	//   });
	// }, []);

	const shareHandler = (postId) => {
		//dispatch(sharePost(postId));
	};

	const renderItem = ({ item }) => (
		<_Item
			content={item}
			onSelect={() => {}}
			hideOtherRepliesFunc={hideOtherRepliesHandler}
			replyingPostId={replyingPost}
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
	// console.warn(showOptionsModal.isUserPost)
	return (
		<View style={styles.screen}>
			<FlatList
				refreshControl={
					<RefreshControl colors={[Colors.primary]} refreshing={isRefreshing} onRefresh={loadData} />
				}
				showsHorizontalScrollIndicator={false}
				//initialNumToRender, refreshing
				keyExtractor={(item, index) => item.id}
				data={homePosts}
				renderItem={renderItem}
				contentContainerStyle={{ ...styles.listContainer, flex: homePosts.length === 0 ? 1 : 0 }}
				ListEmptyComponent={listEmptyComponent.bind(this, { onRetry: loadData, isRefreshing })}
			/>
			{
				//if user is authorized to post
				<TouchIcon
					style={styles.createPostBtn}
					onTouch={() => {
						navigation.navigate('MessageStack', {
							screen: 'CreateHomePost',
							params: { source: 'Home' },
						});
					}}
					bgColor={Colors.primary}
					borderColor={Colors.primary}
					largeBg
					elevated
					name={'create'}
					size={26}
					color={'#fff'}
				/>
			}
		</View>
	);
};

export const screenOptions = (navProps) => {
	const { navigation } = navProps;
	const searchIcon = Platform.OS == 'android' ? 'md-search' : 'ios-search';
	const msgIcon = Platform.OS == 'android' ? 'md-mail' : 'ios-mail';
	const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
	const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
	const homeIcon = Platform.OS == 'android' ? 'md-home' : 'ios-home';

	return {
		headerTitle: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item
					tile="Menu"
					iconName={homeIcon} //this should rather be the app's logo!!
					onPress={() => {}}
				/>
			</HeaderButtons>
		),
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item tile="Search" iconName={searchIcon} onPress={() => {}} />

				<Item
					tile="Messages"
					iconName={msgIcon}
					onPress={() => {
						navigation.navigate('MessageStack', {
							screen: 'MessagesOverview',
							params: { source: 'Home' },
						});
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
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
	},
	screen: {
		flex: 1,
		backgroundColor: '#f3f6f7',
	},
	listContainer: {
		paddingBottom: 10,
	},
	createPostBtn: { bottom: 20, right: 20, position: 'absolute', zIndex: 1500 },
	row: {
		//borderTopColor: '#fbfeff',
		//borderBottomColor: '#e3e6e7',
		//borderTopWidth: 1,
		//borderBottomWidth: 1,
		backgroundColor: '#f3f6f7', //'#f5f5f5',
		//backgroundColor: 'blue',
		paddingVertical: 4,
		paddingHorizontal: 10,
	},
	postContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
		//paddingHorizontal:
		paddingBottom: 5,
		overflow: 'hidden',
	},
	authorContent: {
		backgroundColor: '#fafafa',
		borderRadius: 5,
		flexDirection: 'row',
		padding: 5,
		paddingHorizontal: 10,
		//marginBottom: 2,
		alignItems: 'center',
	},

	authorImageContainer: {
		backgroundColor: '#efefef',
		width: 50,
		height: 50,
		borderRadius: 25,
		overflow: 'hidden',
	},
	authorImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderColor: '#fff',
		borderWidth: 3,
	},
	authorDetails: {
		//alignItems: 'flex-end',
		padding: 5,
		paddingHorizontal: 5,
		//backgroundColor: 'blue',
	},
	authorDetailsText: {
		fontFamily: 'OpenSansBold',
		fontSize: 13,
		color: '#333',
	},
	authorDetailsText2: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#678',
	},
	infoContent: {
		padding: 2,
	},
	infoTextContainer: {
		flexDirection: 'row',
		marginBottom: 2,
		borderColor: '#f7f7f7',
		borderBottomWidth: 2,
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
	infoText: {
		fontFamily: 'OpenSansBold',
		fontSize: 13,
		color: '#222',
		//textAlign: 'justify',
	},
	postImage: {
		width: '100%',
		height: 250,
		borderRadius: 7,
	},
	infoActions: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingHorizontal: 5,
		justifyContent: 'space-evenly',
	},

	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	actionText: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#678',
	},
	msgsListContainer: {
		padding: 5,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: '#f7f7f7',
	},
	commentRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	actionActivities: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//alignItems: 'flex-end',
		padding: 5,
		paddingHorizontal: 10,
	},
	alertBoxText: {
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		color: '#333',
		//backgroundColor: '#ffc',
		//	textAlign: 'center',
		padding: 15,
		paddingHorizontal: 40,
		//width: '100%',
	},
	confirmBtn: {
		fontFamily: 'OpenSansBold',
		fontSize: 15,
		color: '#333',
		// backgroundColor: '#ff5',
		//	textAlign: 'center',
		padding: 15,
	},

	
});

export default HomeScreen;
