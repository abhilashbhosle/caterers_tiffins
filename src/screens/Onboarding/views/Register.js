import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeWrapper from '../../../components/ThemeWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {gs} from '../../../../GlobalStyles';
import TextField from '../../../components/TextField';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import {ts} from '../../../../ThemeStyles';
import {Center, Flex} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Register({navigation}) {
  const [name, setName] = useState(null);
  const {height, width} = Dimensions.get('screen');
  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={{...styles.container,height}}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.goBack();
                  }} style={{marginTop:Platform.OS=='android'&&StatusBar.currentHeight}}>
                  <AntIcon
                    name="arrowleft"
                    style={[gs.fs22, {color: '#fff'}, gs.p5]}
                  />
                </TouchableOpacity>
                <Center>
                  <View>
                    <Text
                      style={[
                        {...gs.btnPlaneWhite, marginVertical: 5},
                        gs.fs20,
                      ]}>
                      SignUp
                    </Text>
                  </View>
                </Center>
                <View>
                  <Text
                    style={[
                      {...gs.btnPlaneWhite, marginVertical: 25},
                      gs.fs17,
                    ]}>
                    Enter your Name *
                  </Text>
                  <TextField placeholder="Full Name" />
                </View>
                <View>
                  <Text
                    style={[
                      {...gs.btnPlaneWhite, marginVertical: 25},
                      gs.fs17,
                    ]}>
                    Enter your mobile number to get OTP *
                  </Text>
                  <TextField placeholder="+91 | Mobile Number" />
                </View>
                <TouchableOpacity
                  style={{marginTop: 35}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('VerifyOtp');
                  }}>
                  <WhiteCoverBtn btntxt="Get OTP" />
                </TouchableOpacity>
                <Text
                  style={[
                    {fontFamily: 'ReadexPro-Medium', color: '#fff'},
                    gs.fs12,
                    gs.mt20,
                  ]}>
                  By Clicking I accept the{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    terms of service
                  </Text>{' '}
                  and{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    privacy policy
                  </Text>
                </Text>
              </View>
              <Center style={{...styles.logincontainer,width}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text
                    style={[
                      gs.fs14,
                      {fontFamily: ts.secondarymedium, color: '#fff'},
                    ]}>
                    Already have an account?{' '}
                    <Text style={[{textDecorationLine: 'underline'}, gs.fs16]}>
                      Login
                    </Text>
                  </Text>
                </TouchableWithoutFeedback>
              </Center>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeWrapper>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '20@ms',
    paddingTop: '30@ms',
  },
  logincontainer:{
    position:'absolute',
    bottom:'150@ms',
  }
});
