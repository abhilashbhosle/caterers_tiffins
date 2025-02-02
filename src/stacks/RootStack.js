import {View, Text, Platform, StatusBar, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardStack from './OnboardStack';
import BottomBarStack from './BottomBarStack';
import PageStack from './PageStack';
import FlashMessage from 'react-native-flash-message';
import {gs} from '../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startLoader} from '../redux/CommonSlicer';

const Stack = createNativeStackNavigator();
export default function RootStack() {
  const loading = useSelector(state => state.common.loading);
  const {width, height} = Dimensions.get('screen');
  const [tk, setTk] = useState(null);
  const [navdetails, setNavDetails] = useState(false);
  let logout = useSelector(state => state.common.logout);
  const dispatch = useDispatch();
  useEffect(() => {
    // const unsubscribe = addEventListener(state => {
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    //   setCheckConnection(state.isConnected);
    // });
    (async () => {
      let token = await AsyncStorage.getItem('token');
      setTk(token);
      setNavDetails(true);
    })();
    // return unsubscribe();
  }, []);
  useEffect(() => {
    if (logout) {
      console.log('entered into logout');
      setTk(null);
      setTimeout(() => {
        dispatch(startLoader(false));
      }, 3000);
    }
  }, [logout]);

  if (!navdetails) {
    return;
  }
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!tk && <Stack.Screen name="OnboardStack" component={OnboardStack} />}
        <Stack.Screen name="BottomBarStack" component={BottomBarStack} />
        <Stack.Screen name="PageStack" component={PageStack} />
      </Stack.Navigator>
      {loading && (
        <View style={{...styles.lottifieContainer, width, height}}>
          <LottieView
            source={require('../assets/Loader/spinner.json')}
            autoPlay
            loop
            style={styles.lottiIcon}
          />
        </View>
      )}
      <FlashMessage
        position="top"
        textStyle={[gs.fs15]}
        titleStyle={[gs.fs18]}
        style={{
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        }}
      />
    </>
  );
}
const styles = ScaledSheet.create({
  lottifieContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottiIcon: {height: 210, width: 150, bottom: 10},
});
