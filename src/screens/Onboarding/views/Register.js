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
import {Center, Flex, useDisclose} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {registrationScheme} from '../../../constants/Validations';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getOtp } from '../controllers/AuthController';

export default function Register({navigation}) {
  const {height, width} = Dimensions.get('screen');
  const dispatch=useDispatch()

  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={{...styles.container, height}}>
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
                <Formik
                  initialValues={{name: '', phoneNumber: ''}}
                  onSubmit={values => {
                    dispatch(
                      getOtp({
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                        navigation,
                      }),
                    );
                  }}
                  validationSchema={registrationScheme}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched,
                  }) => (
                    <>
                      <View>
                        <Text
                          style={[
                            {...gs.btnPlaneWhite, marginVertical: 25},
                            gs.fs17,
                          ]}>
                          Enter your Name *
                        </Text>
                        <TextField
                          placeholder="Full Name"
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                        />
                        {errors.name && touched.name && (
                          <Text
                            style={[{color: '#fff'}, gs.fs12, gs.mv5, gs.ml10]}>
                            {errors.name}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text
                          style={[
                            {...gs.btnPlaneWhite, marginVertical: 25},
                            gs.fs17,
                          ]}>
                          Enter your mobile number to get OTP *
                        </Text>
                        <TextField
                          placeholder="Enter 10 Digits Mobile Number"
                          value={values.phoneNumber}
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={handleBlur('phoneNumber')}
                          maxLength={10}
                          keyboardType='numeric'
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <Text
                            style={[{color: '#fff'}, gs.fs12, gs.mv5, gs.ml10]}>
                            {errors.phoneNumber}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={{marginTop: 35}}
                        activeOpacity={0.7}
                        onPress={
                          handleSubmit
                          // navigation.navigate('VerifyOtp');
                        }>
                        <WhiteCoverBtn btntxt="Get OTP" />
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
                <Text
                  style={[
                    {fontFamily: 'ReadexPro-Medium', color: '#fff'},
                    gs.fs12,
                    gs.mt20,
                  ]}>
                  By Clicking I accept the{' '}
                  <Text style={{textDecorationLine: 'underline'}} onPress={()=>{
                     navigation.navigate('WebviewExternal', {url:'https://www.cateringsandtiffins.com/terms-and-conditions'});
                  }}>
                    terms of service
                  </Text>{' '}
                  and{' '}
                  <Text style={{textDecorationLine: 'underline'}} onPress={()=>{
                    navigation.navigate('WebviewExternal', {url:'https://www.cateringsandtiffins.com/privacy-policy'});
                  }}>
                    privacy policy
                  </Text>
                </Text>
              </View>
              <Center style={{...styles.logincontainer, width}}>
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
  logincontainer: {
    position: 'absolute',
    bottom: '150@ms',
  },
});
