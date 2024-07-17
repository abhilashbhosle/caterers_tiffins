import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
  Easing,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useRef} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeWrapper from '../../../components/ThemeWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {gs} from '../../../../GlobalStyles';
import {Center} from 'native-base';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import { useDispatch } from 'react-redux';
import { getLocation } from '../controllers/AuthController';

export default function Location({navigation}) {
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch=useDispatch()

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <View style={styles.container}>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  marginTop:
                    Platform.OS == 'android' && StatusBar.currentHeight,
                }}>
                <AntIcon
                  name="arrowleft"
                  style={[gs.fs22, {color: '#fff'}, gs.p5]}
                />
              </TouchableOpacity>
              <Text style={styles.heading}>What's your location?</Text>
              <Text style={styles.title}>
                Could you please share your location to show available Caterers
                and Tiffin providers
              </Text>
            </View>
            <View>
              <Center>
                <Animated.Image
                  source={require('../../../assets/Onboarding/location.png')}
                  alt="notification"
                  style={{...styles.notifyicon, transform: [{scale: scale}]}}
                />
              </Center>
            </View>
            <View style={[gs.mb15]}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('BottomBarStack');
                  dispatch(getLocation({navigation}))
                }}>
                <WhiteCoverBtn btntxt="Allow location access" />
              </TouchableOpacity>
              <Center>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('BottomBarStack');}}>
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
    paddingHorizontal: '20@ms',
    paddingTop: Platform.OS == 'ios' && 30,
    height: '100%',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: '22@ms',
    fontFamily: 'Outfit-Medium',
    fontWeight: '600',
    color: '#fff',
    marginVertical: 20,
  },
  title: {
    fontSize: '17@ms',
    color: '#fff',
    fontFamily: 'ReadexPro-Medium',
  },
  notifyicon: {
    height: '300@ms',
    width: '300@ms',
  },
});
