import {View, Text, Image, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Caterers from '../screens/Home/views/Caterers';
import Tiffins from '../screens/Home/views/Tiffins';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ts} from '../../ThemeStyles';
import {gs} from '../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

export default function BottomBarStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle:styles.tabbar,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Caterings') {
            iconName = focused ? 'caterersf' : 'catererso';
          } else if (route.name === 'Tiffins') {
            iconName = focused ? 'tiffinsf' : 'tiffinso';
          }
          if (iconName == 'caterersf') {
            return (
              <Image
                source={require('../assets/Bottombar/chefhatf.png')}
                tintColor={ts.secondary}
                style={styles.icons}
              />
            );
          } else if (iconName == 'catererso') {
            return (
              <Image
                source={require('../assets/Bottombar/chefhat.png')}
                style={styles.icons}
              />
            );
          } else if (iconName == 'tiffinsf') {
            return (
              <Image
                source={require('../assets/Bottombar/tiffinf.png')}
                tintColor={ts.primary}
                style={styles.icons}
              />
            );
          } else if (iconName == 'tiffinso') {
            return (
              <Image
                source={require('../assets/Bottombar/tiffin.png')}
                style={styles.icons}
              />
            );
          }
        },
        tabBarActiveTintColor:
          route.name === 'Caterings' ? ts.secondary : ts.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: [gs.fs12,{bottom:Platform.OS=='android'?10:0}],
      })}>
      <Tab.Screen name="Caterings" component={Caterers} />
      <Tab.Screen name="Tiffins" component={Tiffins} />
    </Tab.Navigator>
  );
}
const styles = ScaledSheet.create({
  icons: {
    height: '18@ms',
    width: '18@ms',
  },
  tabbar:{
    height:Platform.OS=='ios'?'75@ms':'60@ms'
  }
});
