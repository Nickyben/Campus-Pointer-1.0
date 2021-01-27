import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet, ScrollView, Text,
  View, StatusBar, Platform, TouchableOpacity, TouchableNativeFeedback, Image, useWindowDimensions, Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Card from '../../components/UI/Card';
import { FlatList } from 'react-native-gesture-handler';
import TouchCard from '../../components/UI/TouchCard';
import Colors from '../../constants/Colors';
import Btn from '../../components/UI/Btn';
import { fetchDeptData } from '../../store/actions/dataActions';




const _Item = ({ content: { fullName, image, honours }, category, onSelect }) => {
  const award = !!honours && honours.find(aw => aw.category === category);
  return (
    <TouchCard
      useIos
      onTouch={onSelect}
      style={{ ...styles.itemCard, }}>
      <View style={styles.itemContainer}>

        <View style={styles.imageContainer}>
          <Image style={{
            ...styles.listImage,
            width: styles.listImage.width,
            borderRadius: 10,
          }} source={image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            {fullName && <Text style={{ ...styles.title, color: '#00a7e7' }} numberOfLines={2}>{fullName}</Text>}
            {award && <Text style={styles.title} numberOfLines={2}>{award.title} </Text>}
            {award && <Text style={{ ...styles.title, color: '#777' }} numberOfLines={2}>{award.year} </Text>}

          </View>

          <Btn
            style={styles.btn}
            bgColor={'transparent'}
            borderColor={Colors.primary}
            onPress={onSelect}
            textColor={Colors.primary}
          >
            View
        </Btn>

        </View>

      </View>

    </TouchCard>
  );
}

const HallOfHonoursScreen = ({ navig }) => {
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    //   setError(null);
    //   setIsRefreshing(true)
    //try {
    await dispatch(fetchDeptData());

    //catch (err) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
  }, [dispatch]);//setIsLoading is handled already by react,

  useEffect(() => {
    const unsubscribe = navig.addListener('focus', loadData);

    //clean up function to run when effect is about to rerun or when component is destroyed or unmounted
    return (() => {
      unsubscribe();
    });
  }, [loadData]);


  useEffect(//will run only when the component loads and not again unless dependencies change
    //don't use async keyword here, instead, use .then() after the dispatch()
    () => {
      //     setIsLoading(true);
      loadData().then(() => {
        //       setIsLoading(false);
      });
    }
    , [dispatch, loadData]);



  const [staffHonours, categoryStaff] = [useSelector(state => state.dataReducer.availableStaff)
    .filter(s => (s.department === 'Computer Engineering') && !!s.honours), 'Staff Awards'];

  const [academicHonours, categoryAcademics] = [useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.honours && s.honours
      .find(h => h.category === 'Academic Awards')), 'Academic Awards'];

  const [socialHonours, categorySocials] = [useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.honours && s.honours
      .find(h => h.category === 'Social Awards')), 'Social Awards'];

  const [sportsHonours, categorySports] = [useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.honours && s.honours
      .find(h => h.category === 'Sports Awards')), 'Sports Awards'];

  const [projectHonours, categoryProjects] = [useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.honours && s.honours
      .find(h => h.category === 'Project Awards')), 'Project Awards'];

  const [generalHonours, categoryGeneral] = [useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.honours && s.honours
      .find(h => h.category === 'General Awards')), 'General Awards'];



  const renderItem = (category, { item, }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item} category={category} onSelect={() => {
      //console.log(item.constructor.name);
      navig.navigate('DeptDetails', { itemId: item.id, title: item.constructor.name })
    }} />
  );


  return (

    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}

      >


        <View style={styles.row}>
          <Text style={styles.rowLabel}>Staff Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={staffHonours}
            renderItem={renderItem.bind(this, categoryStaff)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Academic Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={academicHonours}
            renderItem={renderItem.bind(this, categoryAcademics)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Social Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={socialHonours}
            renderItem={renderItem.bind(this, categorySocials)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Sports Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={sportsHonours}
            renderItem={renderItem.bind(this, categorySports)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Project Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={projectHonours}
            renderItem={renderItem.bind(this, categoryProjects)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>General Honours</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={generalHonours}
            renderItem={renderItem.bind(this, categoryGeneral)}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>

    </View>
  );
};


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#fff',
  },


  row: {
    //flex: 1,
    borderTopColor: '#fdffff',
    //borderBottomColor: '#eaecef',
    borderBottomColor: '#cacccf',
    borderTopWidth: 2,
    borderBottomWidth: 1,
    backgroundColor: '#f3f6f7',//'#f5f5f5',
    paddingVertical: 10,

  },
  rowLabel: {
    marginLeft: 25,
    fontFamily: 'OpenSansBold',
    fontSize: 16,
    color: '#222',

  },

  itemCard: {
    padding: 0,
    flex: 1,
    //maxWidth: 300,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 15,

  },
  itemContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10, 
  },
  imageContainer: {
    padding: 15,
    paddingBottom: 0,
    
  },
  listImage: {
    width: 150, //please please, set these with respect to window size
    height: 150,
    //borderRadius: 75,
    borderWidth: 2,

  },
  infoContainer: {
    //flex: 1,
    width: '100%',
    marginTop: 10,
    //paddingBottom: 10,
    alignItems: 'center',

  },
  btn: {
    width: '50%',
    marginVertical: 10,
  },
  listContainer: {
    paddingVertical: 15,
    paddingLeft:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    maxWidth: 150,
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 0,
  },

  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 13,
    textAlign: 'center',
     color: '#444',
  }
});

export default HallOfHonoursScreen;

