import { View, Text, Platform,StatusBar } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notification from '../screens/Onboarding/views/Notification';
import Register from '../screens/Onboarding/views/Register';
import VerifyOtp from '../screens/Onboarding/views/VerifyOtp';
import Location from '../screens/Onboarding/views/Location';
import Login from '../screens/Onboarding/views/Login';

const Stack=createNativeStackNavigator()
export default function OnboardStack() {
  return (
	<>
	{/* {
		Platform.OS=='android' && 
		<StatusBar  barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"/>
	} */}
	
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen name='Notification' component={Notification}/>
		<Stack.Screen name='Register' component={Register}/>
		<Stack.Screen name='VerifyOtp' component={VerifyOtp}/>
		<Stack.Screen name='Location' component={Location}/>
		<Stack.Screen name='Login' component={Login}/>
	</Stack.Navigator>
	</>
  )
}