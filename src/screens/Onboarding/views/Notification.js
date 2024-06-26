import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeWrapper from '../../../components/ThemeWrapper';
import {gs} from '../../../../GlobalStyles';
import {Center, Image} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import { useFocusEffect } from '@react-navigation/native';

export default function Notification({navigation}) {
  const scale = useRef(new Animated.Value(0)).current;
  const statusbarHeight=StatusBar.currentHeight
  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);
  useFocusEffect(() => {
    // ========TINT COLORS=========//
    if(Platform.OS=='android')
      StatusBar.setBarStyle('light-content', true,{backgroundColor:'transparent',
       translucent: true,});
  });

  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <View style={[gs.ph20, gs.pt20, {...styles.container}]}>
            <Center>
              <Text style={styles.heading}>Turn on Notification </Text>
              <Text style={[gs.fs15, styles.subhead]}>
                Allow push notification to get updates from vendors{' '}
              </Text>
            </Center>
            <Center>
              <Animated.Image
                source={require('../../../assets/Onboarding/notification.png')}
                alt="notification"
                style={{...styles.notifyicon, transform: [{scale: scale}]}}
              />
            </Center>
            <View style={[gs.mb15]}>
              <TouchableOpacity activeOpacity={0.7}>
                <WhiteCoverBtn btntxt="Turn on Notification" />
              </TouchableOpacity>
              <Center>
              <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
              <Text style={[gs.btnPlaneWhite]}>Not Now</Text>
              </TouchableOpacity>
              </Center>
            </View>
          </View>
        </SafeAreaView>
      </ThemeWrapper>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: '30@ms',
    fontFamily: 'Outfit-SemiBold',
    fontWeight: '600',
    color: '#fff',
    marginTop:Platform.OS=='android'?StatusBar.currentHeight:0
  },
  subhead: {
    color: '#fff',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: '20@ms',
    marginVertical: '20@ms',
  },
  notifyicon: {
    height: '300@ms',
    width: '300@ms',
  },
});
