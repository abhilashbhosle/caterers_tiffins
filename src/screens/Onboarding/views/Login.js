import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
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
import {Formik} from 'formik';
import {loginSchema} from '../../../constants/Validations';
import { getLoginOtp } from '../controllers/AuthController';
import { useDispatch } from 'react-redux';

export default function Login({navigation}) {
  const dispatch=useDispatch()
  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={styles.container}>
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
                    style={[{...gs.btnPlaneWhite, marginVertical: 5}, gs.fs20]}>
                    Login
                  </Text>
                </View>
              </Center>
              <Formik
                initialValues={{phoneNumber: ''}}
                onSubmit={values => {
                      dispatch(
                        getLoginOtp({
                          phoneNumber: values.phoneNumber,
                          navigation,
                        }),
                      );
                }}
                validationSchema={loginSchema}>
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
                        Enter your mobile number to get OTP *
                      </Text>

                      <TextField
                        placeholder="Enter 10 Digits Mobile Number"
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        maxLength={10}
                        keyboardType="numeric"
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
                        //   navigation.navigate('VerifyOtp');
                      }>
                      <WhiteCoverBtn btntxt="Get OTP" />
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
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
    paddingTop: 30,
  },
});
