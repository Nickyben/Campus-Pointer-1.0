import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';


let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}

const _Item = ({ content: { id, title, type, author:
  { name, office, post }, text, image, likes, shares }, onSelect }) => {
  const initiallyLiked = useSelector(state=>state.homeReducer.availableLikes).includes(id);
  const [isLiked, setIsLiked] = useState(initiallyLiked);
  const [isClicked, setIsClicked] = useState(false);
  const _dispatch = useDispatch();

  // const likeHandler = (postId) => {
  //   _dispatch(likePost(postId));
  // };
  useEffect(() => {
    if (isLiked && isClicked) {
      _dispatch(likePost(id, isLiked));
    }

  }, [isLiked,isClicked]);

  useEffect(() => {
    if (!isLiked && isClicked) {
      _dispatch(likePost(id, isLiked));
    }

  }, [isLiked,isClicked]);



  return (
    <View style={styles.row}>
      <View style={styles.postContainer}>
        <View style={styles.authorContent}>
          <View style={styles.authorImageContainer}>
            <TouchableCmp
              onPress={() => { console.log('working') }} style={{
                width: 100, height: 100,
                borderRadius: 50,
                backgroundColor: Colors.primary
              }}>
              <Image
                source={image}
                style={styles.authorImage} />
            </TouchableCmp>
          </View>

          <View style={styles.authorDetails}>
            {name && <Text style={{ ...styles.authorDetailsText, color: '#00a7e7' }}>{name}</Text>}
            {office && <Text style={styles.authorDetailsText2}>{office}</Text>}
            {post && <Text style={styles.authorDetailsText2}>{post}</Text>}
          </View>

          <View style={styles.actionContainer}>
            <TouchIcon
              name={'more'}
              size={22}
              color={'#789'}
            />
            <Text style={styles.actionText}>{shares}</Text>
          </View>

        </View>

        <View style={styles.infoContent}>
          <View style={styles.infoTextContainer}>
            <View style={{ width: '100%', }}>
              {/* alignItems: 'center', */}
              <Text style={{ ...styles.infoText, fontSize: 14 }}>{title}</Text>
              <Text style={{ ...styles.infoText, color: '#678', marginBottom: 10 }}>[{type}]</Text>
            </View>

            <Text style={{ ...styles.infoText }}>{text}</Text>
          </View>

          {image &&
            <View style={styles.postImageContainer}>
              <Image style={styles.postImage} source={image} />
            </View>
          }

          <View style={styles.infoActions}>
            <View style={styles.actionContainer}>
              <TouchIcon
                
                onTouch={() => { setIsLiked(prev => !prev); setIsClicked(p=>true) }}
                name={'thumbs-up'}
                size={22}
                color={isLiked ? Colors.primary : '#bcd' } //'#ff3355' : '#bcd'}
              />
             {<Text style={styles.actionText}>{likes}</Text>}
            </View>

            <View style={styles.actionContainer}>
              <TouchIcon
                name={'chatboxes'}
                size={22}
                color={'#bcd'}
              />
              <Text style={styles.actionText}>{shares}</Text>
            </View>

            <View style={styles.actionContainer}>
              <TouchIcon
                name={'share'}
                size={22}
                color={'#bcd'}
              />
              <Text style={styles.actionText}>{shares}</Text>
            </View>
          </View>
        </View>


      </View>
    </View>

  )
};

const HomeScreen = ({ navigation }) => {
  const homePosts = useSelector(state => state.homeReducer.availablePosts);
  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchHomeData());

    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadData, homePosts]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadData().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadData]);




  const shareHandler = (postId) => {
    //dispatch(sharePost(postId));
  };

  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item} onSelect={() => { }} />
  );

  return (
    <View style={styles.screen}>

      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        initialNumToRender={5}
        keyExtractor={(item, index) => item.id}
        data={homePosts}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

export const screenOptions = (navProps) => {
  const searchIcon = Platform.OS == 'android' ? 'md-search' : 'ios-search';
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Home',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Search'
            iconName={searchIcon}
            onPress={() => {

            }}
          />

        </HeaderButtons>
      ),
      headerLeft: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {
              navProps.navigation.toggleDrawer();
            }}
          />

        </HeaderButtons>
      ),
    }
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
  },
  row: {
    //borderTopColor: '#fbfeff',
    //borderBottomColor: '#e3e6e7',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    backgroundColor: '#f3f6f7',//'#f5f5f5',
    //backgroundColor: 'blue',
    paddingVertical: 7,
    paddingHorizontal: 15,

  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 5,
    overflow: 'hidden',
  },
  authorContent: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
  },

  authorImageContainer: {
    backgroundColor: '#efefef',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorImage: {
    width: 50, height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 3,
  },
  authorDetails: {
    //alignItems: 'flex-end',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    //backgroundColor: 'blue',
    flex: 1,
  },
  authorDetailsText: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    color: '#333',
  },
  authorDetailsText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    color: '#678',
  },
  infoContent: {
  },
  infoTextContainer: {
    //backgroundColor: 'red',
    marginBottom: 10,
    borderColor: '#f7f7f7',
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  infoText: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    color: '#333',
    //textAlign: 'justify',
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 7
  },
  infoActions: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly'
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    color: '#678',
  }
});


export default HomeScreen;