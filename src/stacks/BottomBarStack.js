import {
  View,
  Text,
  Image,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Caterers from '../screens/Home/views/Caterers';
import Tiffins from '../screens/Home/views/Tiffins';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ts} from '../../ThemeStyles';
import {gs} from '../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import ProfileMain from '../screens/Profile/views/ProfileMain';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigationState} from '@react-navigation/native';
import {clearSearch} from '../screens/Home/controllers/SearchController';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('screen');

export default function BottomBarStack() {
const dispatch=useDispatch()
useFocusEffect(
  useCallback(() => {
    changeNavigationBarColor('#ffffff', true);
    return () => {
      changeNavigationBarColor('#ffffff', false);
    };
  }, []),
);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({

        tabBarStyle:
          route.name == 'Profile' ? {display: 'none'} : styles.tabbar,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Caterings') {
            iconName = focused ? 'caterersf' : 'catererso';
          } else if (route.name === 'Tiffins') {
            iconName = focused ? 'tiffinsf' : 'tiffinso';
          } else if (route.name == 'Profile') {
            iconName = 'profileo';
          }
          if (iconName == 'caterersf') {
            return (
              <View style={{position: 'relative'}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={[
                    'rgba(248, 180, 179, 0.5)',
                    'rgba(251, 227, 225, 0.25)',
                    '#fff',
                  ]}
                  style={styles.cateringF}>
                  <Image
                    source={require('../assets/Bottombar/cateringf.png')}
                    tintColor={ts.secondary}
                    style={styles.icons}
                  />
                </LinearGradient>
              </View>
            );
          } else if (iconName == 'catererso') {
            return (
              <Image
                source={require('../assets/Bottombar/cateringo.png')}
                style={styles.icons}
              />
            );
          } else if (iconName == 'tiffinsf') {
            return (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[
                  'rgba(246, 214, 178, 0.5)',
                  'rgba(251, 235, 219, 0.25)',
                  '#FFF',
                ]} // Lighter and softer shades
                style={styles.tiffinsF}>
                <Image
                  source={require('../assets/Bottombar/tiffinsf.png')}
                  tintColor={ts.primary}
                  style={styles.icons}
                />
              </LinearGradient>
            );
          } else if (iconName == 'tiffinso') {
            return (
              <Image
                source={require('../assets/Bottombar/tiffinso.png')}
                style={styles.icons}
              />
            );
          } else if (iconName == 'profileo') {
            return (
              <Image
                source={require('../assets/Bottombar/profileo.png')}
                style={styles.icons}
              />
            );
          }
        },
        tabBarActiveTintColor:
          route.name === 'Caterings' ? ts.secondary : ts.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: [
          gs.fs12,
          {bottom: Platform.OS == 'android' ? 10 : 0},
        ],
      })}>
      <Tab.Screen name="Caterings" component={Caterers} 
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault(); // Prevent immediate navigation
          dispatch(clearSearch()) // Call your function
          navigation.navigate('Caterings')// Navigate after a slight delay
        },
      })}
      />
      <Tab.Screen name="Tiffins" component={Tiffins} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent immediate navigation
            dispatch(clearSearch()) // Call your function
            navigation.navigate('Tiffins')// Navigate after a slight delay
          },
        })}
      />
      <Tab.Screen name="Profile" component={ProfileMain} />
    </Tab.Navigator>
  );
}
const styles = ScaledSheet.create({
  icons: {
    height: '22@ms',
    width: '22@ms',
  },
  tabbar: {
    height: Platform.OS == 'ios' ? '75@ms' : '65@ms',
  },
  cateringF: {
    height: Platform?.OS == 'android' ? '60@ms' : '40@ms',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    top: '3@ms',
    borderTopWidth: '2@ms',
    borderTopColor: ts.secondary,
  },
  tiffinsF: {
    height: Platform?.OS == 'android' ? '60@ms' : '40@ms',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    top: '3@ms',
    borderTopWidth: '2@ms',
    borderTopColor: ts.primary,
  },
});
