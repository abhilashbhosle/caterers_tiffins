import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {gs} from './GlobalStyles';
import RootStack from './src/stacks/RootStack';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {ts} from './ThemeStyles';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1800);
  }, []);
  const {height, width} = Dimensions.get('screen');
  return showSplash ? (
    <View style={[styles.splashContainer, {backgroundColor: ts.secondary}]}>
      <StatusBar backgroundColor={ts.secondary} barStyle="light-content" />
      <Image
        source={require('./src/assets/splash/2.gif')}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  ) : (
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
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
