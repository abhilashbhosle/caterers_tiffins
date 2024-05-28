import {View, Text} from 'react-native';
import React from 'react';
import {gs} from './GlobalStyles';
import RootStack from './src/stacks/RootStack';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
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
