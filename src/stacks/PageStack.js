import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchMain from '../screens/Search/views/SearchMain';
import ProfileMain from '../screens/Profile/views/ProfileMain';
import WishList from '../screens/Profile/views/WishList';
import MyInquiries from '../screens/Profile/views/MyInquiries';
import AboutUs from '../screens/Profile/views/AboutUs';
import Faq from '../screens/Profile/views/Faq';
import Help from '../screens/Profile/views/Help';
import Notification from '../screens/Home/views/Notification';
import FiilterMain from '../screens/Search/views/FiilterMain';
import FilterTiffins from '../screens/Search/views/FilterTiffins';
import CatererProfile from '../screens/Profile/views/CatererProfile';
import TiffinProfile from '../screens/Profile/views/TiffinProfile';
import GalleryView from '../screens/Profile/views/ProfileModules/GalleryView';

const Stack = createNativeStackNavigator();
export default function PageStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen name="ProfileMain" component={ProfileMain} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="MyInquiries" component={MyInquiries} />
      <Stack.Screen name="AboutUs" component={AboutUs}/>
      <Stack.Screen name="Faq" component={Faq}/>
      <Stack.Screen name="Help" component={Help}/>
      <Stack.Screen name="Notification" component={Notification}/>
      <Stack.Screen name='FilterMain' component={FiilterMain}/>
      <Stack.Screen name='FilterTiffins' component={FilterTiffins}/>
      <Stack.Screen name='CatererProfile' component={CatererProfile}/>
      <Stack.Screen name='TiffinProfile' component={TiffinProfile}/>
      <Stack.Screen name='GalleryView' component={GalleryView}/>
    </Stack.Navigator>
  );
}
