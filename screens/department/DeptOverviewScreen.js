import React, { useState } from 'react';
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

const content = (type) => {
  const contentArr = [];
  if (type === 'staff') {
    for (let s = 1; s <= 10; s++) {
      contentArr.push(
        {
          id: Math.random().toString(),
          image: require('../../assets/images/staff.png'),
          name: 'Nicholas Ikechukwu',
          designation: 'Software Engineer',
          office: 'HOD'
        }
      );
    }
  }
  else if (type === 'courseReps') {
    for (let s = 1; s <= 5; s++) {
      contentArr.push(
        {
          id: Math.random().toString(),
          image: require('../../assets/images/user.png'),
          name: 'Nicholas Ikechukwu',
          level: (s * 100).toString(),
        }
      );
    }
  }
  else if (type === 'halls') {
    for (let s = 1; s <= 5; s++) {
      contentArr.push(
        {
          id: Math.random().toString(),
          image: require('../../assets/images/hall2.jpg'),
          name: 'Hall ' + (s).toString(),
          capacity: (s * 75),
        }
      );
    }
  }


  return contentArr;
};

const DeptOverviewScreen = ({ navigation }) => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const welcomeMessage = ''
  //remember that this function is recreated(becomes a different one) at each re-render(eg state change, id also changes) 
  //anyways, this is just a temporary use


  const Item = ({ content: { id, name, image, designation, office, level, capacity }, onSelect }) => (
    <TouchCard
      onTouch={onSelect}
      style={{ ...styles.itemCard, maxWidth: styles.itemCard.maxWidth + !!capacity * 100 }}>
      <View style={styles.itemContainer}>

        <View style={styles.imageContainer}>
          <Image style={{
            ...styles.listImage,
            width: styles.listImage.width + !!capacity * 100,
            borderRadius: !capacity * 20 + !!capacity * 10,
          }} source={image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            {name && <Text style={styles.title}>{name}</Text>}
          </View>

          <View style={styles.btn}>
            <Button title='View' color={Colors.primary} />
          </View>
          {/* {designation && <Text style={styles.title}>{designation}</Text>}
          {office && <Text style={styles.title}>{office}</Text>}
          {level && <Text style={styles.title}>Level: {level}</Text>}
          {capacity && <Text style={styles.title}>Capacity: {capacity}</Text>} */}
        </View>

      </View>

    </TouchCard>
  );
  const renderItem = ({ item }) => (//auto gets data in obj form , I deStructured it in params
    <Item content={item} onSelect={() => {
      navigation.navigate('DeptDetail', { item: item })
    }} />
  );

  // const DATA = [
  //   { id: Math.random().toString(), title: 'Department Staff', data: content('staff') },
  //   { id: Math.random().toString(), title: 'Class Reps', data: content('courseReps') },
  //   { id: Math.random().toString(), title: 'Halls and Labs', data: content('halls') }
  // ];
  // console.log(content('staff'));
  return (

    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}

      >

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
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Staff</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={content('staff')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Course Reps</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing
            keyExtractor={(item, index) => item.id}
            data={content('courseReps')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Halls and Labs</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //initialNumToRender, refreshing 
            keyExtractor={(item, index) => item.id}
            data={content('halls')}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>

    </View>
  );
};

export const screenOptions = ({ navigation, route }) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';

  return (
    {
      headerTitle: 'My Department',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
            iconName={notificationIcon}
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
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#ededed',
    borderBottomWidth: 2,
    padding: 20,

  },

  row: {
    //flex: 1,
    borderTopColor: '#fdfdfd',
    borderBottomColor: '#ededed',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f5f5f5',
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
    maxWidth: 250,
    backgroundColor: '#fff',
    marginLeft: 25,
    borderRadius: 20,

  },
  itemContainer: {

  },
  imageContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,

  },
  listImage: {
    width: 150, //please please, set these with respect to window size
    height: 150,
    //borderRadius: 75,
    borderWidth: 2,

  },
  infoContainer: {
    flex: 1,
    //backgroundColor: 'red', //'#fdaf0a22',//'#0aafdf11',
    //paddingHorizontal: 10,
    paddingBottom: 10,
    //justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '40%',
    marginTop: 10,
  },
  listContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.primary+'11',
    padding: 15 
  },

  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 12,
    color: '#222',
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
