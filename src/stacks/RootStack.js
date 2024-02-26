import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardStack from './OnboardStack';
import BottomBarStack from './BottomBarStack';
import PageStack from './PageStack';

const Stack = createNativeStackNavigator();
export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="OnboardStack" component={OnboardStack} />
      <Stack.Screen name="BottomBarStack" component={BottomBarStack} />
      <Stack.Screen name='PageStack' component={PageStack}/>
    </Stack.Navigator>
  );
}
