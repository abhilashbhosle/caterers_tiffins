import {View, Text} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchMain from '../screens/Search/views/SearchMain';
import ProfileMain from '../screens/Profile/views/ProfileMain';
import WishList from '../screens/Profile/views/WishList';
import MyInquiries from '../screens/Profile/views/MyInquiries';
import AboutUs from '../screens/Profile/views/AboutUs';
import Faq from '../screens/Profile/views/Faq';
import Help from '../screens/Profile/views/Help';
import Notification from '../screens/Home/views/Notifications';
import FiilterMain from '../screens/Search/views/FiilterMain';
import FilterTiffins from '../screens/Search/views/FilterTiffins';
import CatererProfile from '../screens/Profile/views/CatererProfile';
import TiffinProfile from '../screens/Profile/views/TiffinProfile';
import GalleryView from '../screens/Profile/views/ProfileModules/GalleryView';
import Reviews from '../screens/Home/views/Reviews';
import MapSingle from '../screens/Maps/MapSingle';
import  MapMultiple  from '../screens/Maps/MapMultiple';
import { Webview } from '../components/WebView';
// import Notifications from '../screens/Home/views/Notifications';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useFocusEffect } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
export default function PageStack() {
  //  useFocusEffect(
  //    useCallback(() => {
  //      changeNavigationBarColor('#ffffff', true);
  //      return () => {
  //        changeNavigationBarColor('#ffffff', false);
  //      };
  //    }, []),
  //  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen name="ProfileMain" component={ProfileMain} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="MyInquiries" component={MyInquiries} />
      <Stack.Screen name="AboutUs" component={AboutUs}/>
      <Stack.Screen name="WebView" component={Webview}/>
      <Stack.Screen name="Faq" component={Faq}/>
      <Stack.Screen name="Help" component={Help}/>
      <Stack.Screen name="Notifications" component={Notification}/>
      <Stack.Screen name='FilterMain' component={FiilterMain}/>
      <Stack.Screen name='FilterTiffins' component={FilterTiffins}/>
      <Stack.Screen name='CatererProfile' component={CatererProfile}/>
      <Stack.Screen name='TiffinProfile' component={TiffinProfile}/>
      <Stack.Screen name='GalleryView' component={GalleryView}/>
      <Stack.Screen name="Reviews" component={Reviews}/>
      <Stack.Screen name="MapSingle" component={MapSingle}/>
      <Stack.Screen name="MapMultiple" component={MapMultiple}/>
    </Stack.Navigator>
  );
}
