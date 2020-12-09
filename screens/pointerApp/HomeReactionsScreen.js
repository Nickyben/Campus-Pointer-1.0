import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TouchableNativeFeedback, FlatList, Image, Platform, SafeAreaView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import { fetchHomeData, likePost, sharePost, commentPost } from '../../store/actions/homeActions';
import TouchIcon from '../../components/UI/TouchIcon';
import { rand, shuffle, getSince } from '../../constants/MyFunctions';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';






const _Item = ({ content: { postId, liker, id, date, ownPostId, author, authorType, text, type },
  onSelect, navig, reactionType }) => {
  const isComments = reactionType === 'comments'
  const isLikes = reactionType === 'likes';

  const viewReactPersonHandler = (item, personId, title)=>{
    navig.navigate('DeptDetails', { item: item, itemId: item.id, title: title })
  };
  const reactPerson = isLikes ? liker : author;
  const {image, fullName, level, office, post } = isLikes ? liker : author;
  return (
    <Touch
      useIos
      onTouch={viewReactPersonHandler.bind(this,reactPerson, reactPerson.id, reactPerson.constructor.name)}
      style={{
        backgroundColor: '#fff',

      }}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Touch
            onTouch={() => { console.log('touched image') }} style={{
              width: styles.image.width,
              height: styles.image.height,
              borderRadius: styles.image.borderRadius
            }}>
            <Image
              source={image}
              style={styles.image} />
          </Touch>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}>
          <View style={{}}>
            <View style={{ ...styles.details, }}>
              <View style={{ flexDirection: 'row' }}>
                {fullName && <Text style={{ ...styles.detailsText, color: '#00a7e7' }}>{fullName}</Text>}
                <Text style={{ ...styles.detailsText2, marginLeft: 10 }}>
                  ~{getSince(date)[2]}
                </Text>
              </View>
              {office && <Text style={styles.detailsText2}>{office}</Text>}
              {post && <Text style={styles.detailsText2}>{post}</Text>}
              {level && <Text style={styles.detailsText2}>{level}</Text>}

            </View>
            {isComments &&
              <View style={{ padding: 5 }}>
                {text && <Text style={{ ...styles.detailsText }}>{text}</Text>}
              </View>
            }
          </View>
          {isComments &&
            <View style={styles.actionContainer}>
              <TouchIcon
                name={'heart'}
                size={22}
                color={'#bcd'}
              />
            </View>
          }
        </View>
      </View>

    </Touch>

  );
};





const HomeReactionsScreen = ({ navigation, route: { params: { postId, reactionType } } }) => {
  const reactionItems = reactionType === 'likes' ?
    useSelector(state => state.homeReducer.availableGeneralLikes.
      filter(l => l.postId === postId)) :
    useSelector(state => state.homeReducer.availableComments.
      filter(c => c.ownPostId === postId))
  const headerTitle = reactionType === 'likes' ? 'Liked by' : 'Comments'

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    });
  }, [headerTitle]);

  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item}
      onSelect={() => { }}
      navig={navigation}
      reactionType={reactionType}
    />
  );



  return (
    <View style={styles.screen}>

      <FlatList
        showsHorizontalScrollIndicator={false}
        //initialNumToRender, refreshing
        keyExtractor={(item, index) => item.id}
        data={reactionItems}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

export const screenOptions = () => {
  return ({

  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6f7',
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    padding: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },


  imageContainer: {
    backgroundColor: '#efefef',
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image: {
    width: 65, height: 65,
    borderRadius: 35,
    borderColor: '#fff',
    borderWidth: 3,
  },
  details: {
    //alignItems: 'flex-end',
    padding: 5,
    paddingHorizontal: 5,
    //backgroundColor: 'blue',
  },
  detailsText: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    color: '#333',
  },
  detailsText2: {
    fontFamily: 'OpenSansBold',
    fontSize: 12,
    color: '#678',
  },
  actionContainer: {
    //alignItems: 'center',
    //backgroundColor:'blue',
  },
});

export default HomeReactionsScreen;