import React, { useState, useCallback, useEffect, useLayoutEffect, useRef, useReducer } from 'react';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	FlatList,
	Image,
	Platform,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince, getWhen } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import ChatInput from '../../components/UI/ChatInput';

import { sendChatMessage, fetchChatMessages } from '../../store/actions/messageActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Message from '../../models/message';
import { useNavigation } from '@react-navigation/native';
import listEmptyComponent from '../../components/pointerComponents/listEmptyComponent';
import { RefreshControl } from 'react-native';
import { fetchStaff, fetchStudents } from '../../store/actions/dataActions';

const _Item = ({
	content: { id, text, date, image, senderId, receiverId, type },
	onSelect,
	index,
	chatId,
	messages,
}) => {
	const user = useSelector((state) => state.authReducer.userAppData);

	const [longPressed, setLongPressed] = useState(false);

	const next = index > 0 ? index - 1 : 0;
	const prev = index + 1 >= messages.length ? messages.length - 1 : index + 1;
	const senderIsPrevious = messages && senderId === messages[prev].senderId && index !== prev;
	const senderIsNext = messages && senderId === messages[next].senderId && index !== next;
	const isLast = index === messages.length - 1;

	const isUser = senderId === user.id;

	const when = getWhen(date);

	return (
		<Touch
			onLongTouch={() => {
				setLongPressed((p) => !p);
			}}
			onTouch={() => {
				setLongPressed((p) => false);
			}}
			style={{
				...styles.chatLine,
				alignItems: isUser ? 'flex-end' : 'flex-start',
				backgroundColor: longPressed ? Colors.primary + '22' : 'transparent',
			}}>
			<View
				style={{
					alignItems: isUser ? 'flex-end' : 'flex-start',
					width: '80%',
				}}>
				<View
					style={{
						...styles.chatBoxContainer,

						borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
						borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
						borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
						borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
						backgroundColor: isUser ? Colors.primary : Colors.primary + '33', // '#e3e6e7',
					}}>
					<View
						style={{
							...styles.chatBox,
							flexDirection: 'row',
							borderBottomLeftRadius: !isUser ? 0 : styles.chatBox.borderRadius,
							borderBottomRightRadius: isUser ? 0 : styles.chatBox.borderRadius,
							borderTopLeftRadius: !isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
							borderTopRightRadius: isUser && senderIsPrevious ? 0 : styles.chatBox.borderRadius,
							backgroundColor: isUser ? Colors.primary : Colors.primary + '33', // '#e3e6e7',
						}}>
						<Text
							style={{
								...styles.chatText,
								color: isUser ? '#fff' : '#111',
							}}>
							{text}
						</Text>
					</View>
				</View>
			</View>
			{!senderIsNext && (
				<Text
					style={{
						...styles.chatText2,
						flex: 1,
						padding: 5,
						paddingHorizontal: 0,
						color: isUser ? '#666' : '#666',
						textAlign: isUser ? 'right' : 'left',
					}}>
					{when[2]}
					{when[1] ? ', ' + when[1] : ''}
				</Text>
			)}
		</Touch>
	);
};

const Messages = ({ chatId, newMessages }) => {
	const dispatch = useDispatch();
	const scrollViewRef = useRef();

	const navigation = useNavigation();

	const chat = useSelector((s) => s.messageReducer.availableChatMsgs.find((c) => c.id === chatId));
	const msgs = chat ? chat.messages : [];
	const mergedMsgs = msgs.filter((m) => !newMessages.some((newMsg) => newMsg.id === m.id)).concat(...newMessages);
	let messages = mergedMsgs.sort((m1, m2) => m2.date.getTime() - m1.date.getTime());

	// const { receiver, sender, senderId, receiverId } = (!!messages && messages.find((m) => !!m)) || {};
	// const chatPerson =
	// 	[receiver, sender, senderId, receiverId].every((elem) => !!elem) && (senderId === chatId ? sender : receiver);

	useEffect(() => {
		messages.forEach((message) => {
			if (!msgs.some((msg) => msg.id === message.id)) {
				//	console.warn('done')
				//	dispatch(sendChatMessage({ newMessage: message }));
			}
		});
	}, [messages, msgs]);

	const renderItem = ({ item, index }) => {
		return <_Item content={item} index={index} onSelect={() => {}} chatId={chatId} messages={messages} />;
	};

	const scrollToBottom = useCallback(() => {
		//(contentWidth, contentHeight)
		//setScrollViewContentDim(p => ({ contentWidth, contentHeight }))
		scrollViewRef.current.scrollToIndex({ animated: true, duration: 0, index: 0 });
	}, []);

	return (
		<>
			{/* {messages.length === 0 && <EmptyList />} */}
			{
				<FlatList
					ref={scrollViewRef}
					style={styles.flatList}
					//onLayout={scrollToBottom}
					onContentSizeChange={messages.length !== 0 ? scrollToBottom : () => {}}
					initialNumToRender={5}
					//refreshing
					//remember to render num according to screen dimensions
					//initialNumToRender={5}
					keyExtractor={(item, index) => item.id + index}
					data={messages}
					renderItem={renderItem}
					ListEmptyComponent={listEmptyComponent.bind(this, {
						notFoundText: 'No messages yet...Start Chatting',
					})}
					contentContainerStyle={{ ...styles.listContainer, flex: messages.length === 0 ? 1 : 0 }}
					extraData={[chat, scrollToBottom, newMessages]}
					inverted={messages.length !== 0 ? true : false}
					//initialScrollIndex={messages.length-1}
				/>
			}
		</>
	);
};

const ChatScreen = ({ navigation, route: { params } }) => {
	const { chatId, image, fullName, isNewChat, isStudent, isStaff } = params;

	const dispatch = useDispatch();
	const scrollViewRef = useRef();

	const [newMsgs, setNewMsgs] = useState([]);
	const chat = useSelector((s) => s.messageReducer.availableChatMsgs.find((c) => c.id === chatId));
	const user = useSelector((state) => state.authReducer.userAppData);

	const newChatPerson =
		useSelector((s) => s.dataReducer.availableStudents.find((s) => s.id === chatId)) ||
		useSelector((s) => s.dataReducer.availableStaff.find((s) => s.id === chatId));
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const msgs = (chat && chat.messages) || [];
	const { receiver, sender, senderId, receiverId } = (!!msgs && msgs.find((m) => !!m)) || {};
	let chatPerson =
		[receiver, sender, senderId, receiverId].every((elem) => !!elem) && (senderId === chatId ? sender : receiver);
	chatPerson = chatPerson || newChatPerson || {};

	const mergedMsgs = msgs.filter((m) => !newMsgs.some((newMsg) => newMsg.id === m.id)).concat(...newMsgs);
	let messages = mergedMsgs.sort((m1, m2) => m2.date.getTime() - m1.date.getTime());

	//check if to replace with the dispatching the addChatMessage
	const sendMsgHandler = useCallback(
		(msg, callback) => {
			//console.warn(msg)
			if (msg.length > 0) {
				//dispatch(sendChatMessage(chatId, chatPerson, msg));
				setNewMsgs((p) => [
					...p,
					new Message({
						id: 'studentUserId' + chatId + new Date().toLocaleDateString() + Math.random(),
						type: 'individual',
						date: new Date(),
						senderId: user && user.id,
						sender: user,
						receiver: chatPerson,
						receiverId: chatId,
						text: msg,
						image: null,
						groupId: null,
					}),
				]);
				callback();
			}
		},
		[chatId, chatPerson]
	);

	const viewChatPerson = useCallback(() => {
		//	console.warn(chatId);
		navigation.navigate('DeptDetails', { itemId: chatId, title: chatPerson.constructor.name });
	},[chatPerson])

//	console.warn('rendered');
	const loadChatMessages = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchChatMessages());
			isNewChat && isStudent && (await dispatch(fetchStaff()));
			isNewChat && isStaff && (await dispatch(fetchStudents()));
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, isNewChat, isStaff, isStudent]); //setIsLoading is handled already by react,

useEffect(() => {
	messages.forEach((message) => {
		if (!msgs.some((msg) => msg.id === message.id)) {
			//	console.warn('done')
			dispatch(sendChatMessage({ newMessage: message }));
		}
	});
}, [messages, msgs]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', loadChatMessages);

		return () => {
			unsubscribe();
		};
	}, [loadChatMessages]);

	useEffect(() => {
		setIsLoading(true);
		loadChatMessages().then(() => {
			setIsLoading(false);
		});
	}, [loadChatMessages]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: ({ tintColor, style }) => (
				<HeaderTitle tintColor={tintColor} style={style} onPress={viewChatPerson}>
					{fullName}
				</HeaderTitle>
			),

			headerLeft: ({ tintColor }) => (
				<View style={{ flexDirection: 'row' }}>
					<HeaderBackButton
						tintColor={tintColor}
						style={{ marginRight: 5 }}
						onPress={() => {
							navigation.goBack();
						}}
					/>
					<View style={styles.chatPersonImageContainer}>
						<Touch onTouch={viewChatPerson} style={{}}>
							<Image source={image} style={styles.chatPersonImage} />
						</Touch>
					</View>
				</View>
			),
		});
	}, [chatPerson, chatId, fullName, viewChatPerson]);

	

	const renderItem = ({ item, index }) => {
		return <_Item content={item} index={index} onSelect={() => {}} chatId={chatId} messages={messages} />;
	};

	const scrollToBottom = useCallback(() => {
			scrollViewRef.current.scrollToIndex({ animated: true, duration: 0, index: 0 });
	}, []);

	return (
		<View style={styles.screen}>
			{(isLoading || isRefreshing || error) && (
				<Text
					style={{
						...styles.loadingText,
						backgroundColor: error ? '#ff4444aa' : styles.loadingText.backgroundColor,
					}}>
					{error ? ` Error loading messages` : `Loading messages...`}
				</Text>
			)}

			{/* <Messages chatId={chatId} newMessages={newMsgs} /> */}
			<FlatList
				ref={scrollViewRef}
				style={styles.flatList}
				//onLayout={scrollToBottom}
				onContentSizeChange={messages.length !== 0 ? scrollToBottom : () => {}}
				initialNumToRender={5}
				//refreshing
				//remember to render num according to screen dimensions
				//initialNumToRender={5}
				keyExtractor={(item, index) => item.id + index}
				data={messages}
				renderItem={renderItem}
				ListEmptyComponent={listEmptyComponent.bind(this, {
					notFoundText: 'No messages yet...Start Chatting',
				})}
				contentContainerStyle={{ ...styles.listContainer, flex: messages.length === 0 ? 1 : 0 }}
				extraData={[chat, scrollToBottom, newMsgs]}
				inverted={messages.length !== 0 ? true : false}
				//initialScrollIndex={messages.length-1}
			/>
			<ChatInput
				//onSubmit={pushMsgHandler}
				expandable
				expandHeight={100}
				elevated
				multiline={true}
				onSubmit={sendMsgHandler}
			/>
		</View>
	);
};

export const screenOptions = ({ navigation, route, route: { params } }) => {
	const optionsIcon = Platform.OS == 'android' ? 'md-more' : 'ios - more';

	return {
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item tile="Options" iconName={optionsIcon} onPress={() => {}} />
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#f3f6f7',

		//flexDirection: 'column-reverse'
	},
	chatPersonImageContainer: {
		backgroundColor: '#efefef',
		width: 40,
		height: 40,
		borderRadius: 25,
		overflow: 'hidden',
	},
	chatPersonImage: {
		width: 40,
		height: 40,
		borderRadius: 25,
		borderColor: '#fff',
		borderWidth: 3,
	},

	loadingText: {
		width: '100%',
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#fff',
		backgroundColor: Colors.primary + '77',
		textAlign: 'center',
		paddingVertical: 2,
		position: 'absolute',
		zIndex: 600,
	},

	flatList: {
		marginBottom: 60,
		flex: 1,
	},
	listContainer: {
		//flex:1,
		paddingVertical: 20,
		paddingBottom: 60,
		backgroundColor: '#f3f6f7',
		//justifyContent: 'flex-end'
		//flexDirection: 'column-reverse'
	},

	chatLine: {
		paddingHorizontal: 15,
		marginBottom: 2,
	},
	chatBoxContainer: {
		borderRadius: 15,
	},
	chatBox: {
		paddingHorizontal: 10,
		paddingVertical: 9,
		borderRadius: 15,
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	chatText: {
		color: '#fff',
		fontFamily: 'OpenSansBold',
		fontSize: 13,
	},
	chatText2: {
		color: '#ccc',
		fontFamily: 'OpenSansBold',
		fontSize: 10,
	},
});

export default ChatScreen;
