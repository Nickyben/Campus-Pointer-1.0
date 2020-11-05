import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import Colors from '../../constants/Colors';
import ItemIcon from '../../components/UI/ItemIcon';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';


const sections = [
  {
    title: 'Privacy and Security',
    items: [
      { title: 'Change Password', iconName: 'lock', rightBtn: 'arrow-dropright' },
      { title: 'Change Email', iconName: 'at', rightBtn: 'arrow-dropright' },
      { title: 'Change Phone Number', iconName: 'call', rightBtn: 'arrow-dropright' },
      { title: 'Visibility', iconName: 'person', rightBtn: 'arrow-dropright' },


    ],
  },
  {
    title: 'General',
    items: [
      { title: 'Notifications', iconName: 'notifications', rightBtn: 'arrow-dropright' },
      { title: 'Sound', iconName: 'musical-note', rightBtn: 'arrow-dropright' },
      { title: 'Languages', iconName: 'flag', rightBtn: 'arrow-dropright' },
      { title: 'Help center', iconName: 'help-circle', rightBtn: 'arrow-dropright' },


    ],
  },
  {
    title: 'Appearance',
    items: [
      {
        title: 'Theme Mode', iconName: 'contrast',
        modes: [
          ['Light', '#f3f6f7', Colors.primary],
          ['Dark', '#f0f3f4', Colors.primary],
        ]
      },


      {
        title: 'Theme Color', iconName: 'color-palette',
        colors: [
          '#00a7e7', '#e75224', '#ee2499', '#04df90',
        ]
      },
    ],
  },

]


const SettingsScreen = ({ navigation }) => {
  const [showThemeModes, setShowThemeModes] = useState()
  let image;

  const viewSettingHandler = (title) => {
    navigation.navigate('SettingsDetails', { settingTitle: title });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profileContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.profileText}>Image</Text>
          <View style={{
            ...styles.imageContainer,
            alignItems: 'center', justifyContent: 'center',
            width: image ? styles.image.width : 90,
            height: image ? styles.image.height : 90,
            borderRadius: image ? styles.image.borderRadius : 1000
          }}>
            <Touch
              onTouch={() => { console.log('touched image') }} style={{
                width: image ? styles.image.width : 90,
                height: image ? styles.image.height : 90,
                borderRadius: image ? styles.image.borderRadius : 1000
              }}>
              {image &&
                <Image
                  source={image}
                  style={styles.image} />
              }
              {!image &&
                <ItemIcon
                  bigBackground={true}
                  bgColor={'transparent'}
                  name={'camera'}
                  size={40}
                  color={'white'}
                />
              }
            </Touch>
          </View>
          <Text style={styles.profileText}>FirstName LastName</Text>
        </View>
      </View>

      <ScrollView>
        <View styles={styles.sectionsContainer}>
          {
            sections.map((s, i) => {
              return (
                <View key={i} style={styles.section}>
                  <Text style={styles.sectionTitle}>{s.title}</Text>
                  {s.items.map((item, index) => {
                    const { title, iconName, rightBtn, modes, colors } = item;
                    const activeMode = 'Light';
                    const activeColor = Colors.primary;
                    return (
                      <View key={index}
                        style={{
                          ...styles.sectionItem,
                          borderBottomWidth: index !== s.items.length - 1 ? 1 : 0
                        }}>
                        <ItemIcon
                          size={23}
                          name={iconName}
                          color={Colors.primary}
                          bigBackground={true}
                        />
                        <Text style={styles.sectionItemText}>{title}</Text>
                        {rightBtn &&
                          <TouchIcon
                            onTouch={viewSettingHandler.bind(this, title)}
                            size={23}
                            bgColor={Colors.primary + '22'}
                            name={rightBtn}
                            color={Colors.primary}
                          />
                        }

                        {
                          modes &&
                          <View style={{
                            flexDirection: 'row', flex: 1,
                            alignItems: 'center', justifyContent: 'space-between'
                          }}>
                            {
                              modes.map((mode, ind) => {
                                return (
                                  <Text key={ind}
                                    onPress={() => { }}
                                    style={{
                                      fontFamily: 'OpenSansBold',
                                      fontSize: 12,
                                      backgroundColor: activeMode === mode[0] ? Colors.primary : mode[1],
                                      color: activeMode === mode[0] ? '#fff' : mode[2],
                                      width: '45%',
                                      borderRadius: 8, textAlign: 'center',
                                      padding: 10, paddingHorizontal: 15,
                                    }}>{mode[0]}</Text>
                                );
                              })
                            }
                          </View>
                        }

                        {
                          colors &&
                          <View style={{
                            flexDirection: 'row', flex: 1,
                            alignItems: 'center', justifyContent: 'space-between'
                          }}>
                            {
                              colors.map((color, ind) => {
                                if (activeColor === color) {
                                  return (
                                    <TouchIcon
                                      onTouch={() => { }}
                                      key={ind}
                                      name={'checkmark'}
                                      size={25}
                                      bgColor={color}
                                      color={'#fff'}
                                    />
                                  );
                                }
                                return (
                                  <Text key={ind}
                                    onPres={() => { }}
                                    style={{
                                      backgroundColor: color,
                                      width: 35, height: 35,
                                      borderRadius: 20,
                                    }}></Text>
                                )
                              })
                            }
                          </View>
                        }
                      </View>
                    );
                  })}

                </View>
              );
            })
          }
        </View>

      </ScrollView>


    </View>
  );
};

export const screenOptions = (navProps) => {
  const notificationIcon = Platform.OS == 'android' ? 'md-notifications' : 'ios-notifications';
  const menuIcon = Platform.OS == 'android' ? 'md-menu' : 'ios-menu';
  return (
    {
      headerTitle: 'Settings',
      headerRight: (props) => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            tile='Notifications'
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
            tile='Menu'
            iconName={menuIcon}
            onPress={() => {
              //console.log(navProps);
              // console.log(props);
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
    backgroundColor: '#f3f6f7',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: '100%',
    height: 250,
  },
  profileText: {
    textAlign: 'center',
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  sectionsContainer: {
  },
  imageContainer: {
    backgroundColor: '#efefef',
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginVertical: 20
  },
  image: {
    width: 70, height: 70,
    borderRadius: 35,
    borderColor: '#fff',
    borderWidth: 3,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20
  },
  sectionTitle: {
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    color: Colors.primary,
  },
  sectionItem: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: '#e7e7e7',
    alignItems: 'center'
  },
  sectionItemText: {
    flex: 1,
    padding: 10,
    fontFamily: 'OpenSansRegular',
    fontSize: 18,
    color: '#111',
  },
});

export default SettingsScreen;