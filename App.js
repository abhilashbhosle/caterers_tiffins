import {View, Text, Platform} from 'react-native';
import React, { useEffect } from 'react';
import {gs} from './GlobalStyles';
import RootStack from './src/stacks/RootStack';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(()=>{
    if(Platform.OS=="android"){
      SplashScreen.hide();
    }
  },[])
  return (
    <Provider store={store}>
    <PaperProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </PaperProvider>
    </Provider>
  );
}
