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




const _Item = ({ content: { id, fullName, image, designation, office, level, capacity }, disableCard, onSelect, style, imageStyle }) => (
  <TouchCard
    disableCard={disableCard}
    useIos
    onTouch={onSelect}
    style={{ ...styles.itemCard, ...style }}>
    <View style={styles.itemContainer}>

      <View style={styles.imageContainer}>
        <Image style={{
          ...styles.listImage,
          width: styles.listImage.width + !!capacity * 100,
          borderRadius: !capacity * 20 + !!capacity * 10, ...imageStyle
        }} source={image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          {fullName && <Text style={styles.title} numberOfLines={2}>{
            fullName} </Text>}
        </View>

        <Btn
          style={styles.btn}
          bgColor={'transparent'}
          borderColor={Colors.primary}
          onPress={onSelect}
          textColor={Colors.primary}>View</Btn>
        {/* {designation && <Text style={styles.title}>{designation}</Text>}
          {office && <Text style={styles.title}>{office}</Text>}
          {level && <Text style={styles.title}>Level: {level}</Text>}
          {capacity && <Text style={styles.title}>Capacity: {capacity}</Text>} */}
      </View>

    </View>

  </TouchCard>
);

const DeptOverviewScreen = ({ navigation }) => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;
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
    const unsubscribe = navigation.addListener('focus', loadData);

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

  const deptStaff = useSelector(state => state.dataReducer.availableStaff)
    .filter(s => s.department === 'Computer Engineering');
  const hod = deptStaff.find(s => s.office === 'HOD');
  const deptCourseReps = useSelector(state => state.dataReducer.availableStudents)
    .filter(s => s.department === 'Computer Engineering' && !!s.post)
  const deptHalls = useSelector(state => state.dataReducer.availableHalls)
    .filter(s => s.department === 'Computer Engineering');



  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <_Item content={item} onSelect={() => {
      //console.log(item.constructor.name);
      navigation.navigate('DeptDetails', { item: item, itemId: item.id, title: item.constructor.name })
    }} />
  );


  return (

    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}

      >
{hod &&
          <View style={{
            ...styles.row, alignItems: 'center', backgroundColor: '#fff',

          }}>
            <Text
              style={{
                ...styles.rowLabel,
                marginLeft: 0,
                textAlign: 'center',
                color: Colors.primary,
                fontSize: 18,
              }}>
              Head of Department</Text>
            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                alignItems: 'center',
              }}
            >
              <_Item
              disableCard={true}
                imageStyle={{ width: 180, height: 180 }}
                style={{ marginRight: 0 }}
                content={hod}
                onSelect={() => {
                  navigation.navigate('DeptDetails', { item: hod, itemId: hod.id, title: hod.constructor.name })
                }} />
            </View>


          </View>
        }

        <View style={styles.welcomeItemContainer}>
          <Card style={styles.welcomeMsgCard}>

            <Text style={styles.welcomeMsgHeader}>
              WELCOME MESSAGE
                </Text>
            <Text style={styles.welcomeMsg}>

              I welcome you to the department of Computer Engineering in the College of Engineering and
              Engineering Technology, Michael Okpara University of Agriculture, Umudike.

              The Department is known for its outstanding academic excellence. We offer undergraduate
              and postgraduate courses which are carefully planned to suit our academic need, and to
              meet the man power requirements for Computer Engineering and Information Communication
              Technology revolution in the country as a whole. The department trained and educates students
              that will be in the fore front of indigenous technological development of the nation,
              predicated on sound theoretical framework and inter-woven with sufficient practical contents
              of exposure. The practical contents of our training are adequate to make our students self-reliant
              and job creators. The philosophy of this department is in line with the overall mandate and
              mission of the University meeting all necessary criteria and peculiarities of the dynamic
              nature of the programme.
                </Text>


          </Card>

        </View>
        
        {deptStaff.length !== 0 &&
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Department Staff</Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              //initialNumToRender, refreshing
              keyExtractor={(item, index) => item.id}
              data={deptStaff}
              renderItem={renderItem}
              horizontal={true}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        }

        {deptCourseReps.length !== 0 &&
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Course Reps</Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              //initialNumToRender, refreshing
              keyExtractor={(item, index) => item.id}
              data={deptCourseReps}
              renderItem={renderItem}
              horizontal={true}
              contentContainerStyle={styles.listContainer}
            />
          </View>}
        {deptHalls.length !== 0 &&
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Halls and Labs</Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              //initialNumToRender, refreshing 
              keyExtractor={(item, index) => item.id}
              data={deptHalls}
              renderItem={renderItem}
              horizontal={true}
              contentContainerStyle={styles.listContainer}
            />
          </View>}
      </ScrollView>

    </View>
  );
};

export const screenOptions = ({ navigation, route }) => {
  const msgIcon = Platform.OS == 'android' ? 'md-mail' : 'ios-mail';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';

  return (
    {
      headerTitle: 'My Department',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={msgIcon}
            onPress={() => {
              // navigation.navigate(
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
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {
              //console.log(navProps);
              // console.log(props);
              navigation.toggleDrawer();
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#fff',
  },

  welcomeItemContainer: {
    //maxHeight: 350,
    // marginBottom: 20,
    backgroundColor: '#f3f6f7',//'#f5f5f5',
    borderBottomColor: '#cacccf',//'#ddd',//
    borderBottomWidth: 1,
    padding: 20,

  },

  row: {
    //flex: 1,
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
  welcomeMsgCard: {
    borderRadius: 15,
  },

  welcomeMsgHeader: {
    fontFamily: 'OpenSansBold',
    fontSize: 17,
    marginBottom: 10,
    color: "#222",
  },

  welcomeMsg: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    textAlign: 'justify',
    color: '#333',
  },
  itemCard: {
    padding: 0,
    flex: 1,
    // maxWidth: 250,
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
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 150,
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

export default DeptOverviewScreen;










{/* <SectionList
  sections={DATA}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Item title={item} />}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={styles.header}>{title}</Text>
  )}
/> */}


{/* <FlatList
  // {(item, index) => item + index}
  keyExtractor={(item, index) => item.id}
  data={content('halls')}
  renderItem={renderItem}
  horizontal={true}
  style={{ backgroundColor: 'red', height: 400, }}
  contentContainerStyle={styles.listContainer}
/> */}
