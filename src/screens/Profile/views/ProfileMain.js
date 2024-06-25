import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Actionsheet, Flex, Center} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logout, startLoader} from '../../../redux/CommonSlicer';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {Formik} from 'formik';
import {registrationScheme} from '../../../constants/Validations';
import TextField from '../../../components/TextField';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import Themebtn from '../../../components/Themebtn';
import {updateProfile, updateUserProfile} from '../../Onboarding/services/AuthService';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function ProfileMain({navigation}) {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {height, width} = Dimensions.get('screen');
  const [editProfile, setEditProfile] = useState(false);
  const [enableOtp, setEnableOtp] = useState(false);
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (enableOtp) {
      let time;
      time = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(time);
    }
  }, [timer, enableOtp]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(startLoader(true));
    setTimeout(() => {
      dispatch(logout(true));
    }, 1000);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'OnboardStack'}],
      });
      dispatch(logout(false));
    }, 2000);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleSendOtp = async values => {
    let body = {
      name: values.name,
      phone_number: values.phoneNumber,
      phone_extension: '+91',
    };
    let res = await updateProfile(body, dispatch);
    if (res.status == 'success') {
      setEnableOtp(true);
      setTimer(30);
    }
  };

  return (
    <ScreenWrapper>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ThemeHeaderWrapper
          lefttxt="My Profile"
          goBack={() => navigation.goBack()}
        />
        <ScrollView
          style={[gs.ph20, {flex: 1}]}
          showsVerticalScrollIndicator={false}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={[gs.mv15]}>
            {userDetails?.length && (
              <Flex direction="row" align="center">
                <LinearGradient
                  colors={[ts.secondary, ts.primary]}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 1.0, y: 0.0}}
                  style={[{...styles.profile}]}>
                  <Text style={[gs.fs21, {...styles.name, color: '#fff'}]}>
                    {userDetails[0]?.username?.slice(0, 1)}
                  </Text>
                </LinearGradient>
                <View style={[gs.ml15]}>
                  <Text style={[gs.fs21, styles.name]}>
                    {userDetails[0]?.username}
                  </Text>
                  <Text style={[styles.mobile, gs.fs15]}>
                    +91 {userDetails[0]?.phone_number}
                  </Text>
                </View>
              </Flex>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setEditProfile(true);
              }}>
              <MaterialIcon name="edit" style={styles.icon} />
            </TouchableOpacity>
          </Flex>
          {/* =====MANAGE ACCOUNT========= */}
          <View style={[gs.mv10]}>
            <Text
              style={[
                gs.fs15,
                {fontFamily: ts.secondaryregular, color: '#555'},
                gs.fs13,
              ]}>
              Manage your account
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'WishList',
              });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <AntIcon
                  name="hearto"
                  style={[gs.fs22, {color: ts.secondarytext}]}
                />
                <Text style={styles.cardtxt}>My Wishlist</Text>
              </Flex>
              <EntypoIcons
                name="chevron-small-right"
                style={[gs.fs26, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'MyInquiries',
              });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <MaterialIcon
                  name="edit-note"
                  style={[gs.fs22, {color: ts.secondarytext}]}
                />
                <Text style={styles.cardtxt}>My Inquiries</Text>
              </Flex>
              <EntypoIcons
                name="chevron-small-right"
                style={[gs.fs26, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          {/* =====LINKS======= */}
          <View style={[gs.mt15, gs.mv5]}>
            <Text
              style={[
                gs.fs15,
                {fontFamily: ts.secondaryregular, color: '#555'},
                gs.fs13,
              ]}>
              Links
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'AboutUs',
              });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <AntIcon
                  name="hearto"
                  style={[gs.fs22, {color: ts.secondarytext}]}
                />
                <Text style={styles.cardtxt}>About Us</Text>
              </Flex>
              <EntypoIcons
                name="chevron-small-right"
                style={[gs.fs26, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'Faq',
              });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <AntIcon
                  name="question"
                  style={[gs.fs22, {color: ts.secondarytext}]}
                />
                <Text style={styles.cardtxt}>FAQ's</Text>
              </Flex>
              <EntypoIcons
                name="chevron-small-right"
                style={[gs.fs26, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          {/* ====GET IN TOUCH===== */}
          <View style={[gs.mt15, gs.mv5]}>
            <Text
              style={[
                gs.fs15,
                {fontFamily: ts.secondaryregular, color: '#555'},
                gs.fs13,
              ]}>
              Get in Touch
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'Help',
              });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <Text style={styles.cardtxt}>HelpDesk & Support</Text>
              </Flex>
              <EntypoIcons
                name="chevron-small-right"
                style={[gs.fs26, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardlayout}
            onPress={() => {
              Share.open({
                title: 'This is my report ',
                message: 'Message:',
                url: 'file:///storage/emulated/0/demo/test.pdf',
                subject: 'Report',
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                });
            }}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems="center">
                <Text style={styles.cardtxt}>Share Caterings & Tiffins</Text>
              </Flex>
              <EntypoIcons
                name="share"
                style={[gs.fs24, {color: ts.secondarytext}]}
              />
            </Flex>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
            <Flex direction="row" justifyContent="flex-end">
              <LinearGradient
                colors={[ts.secondary, ts.primary]}
                start={{x: 0.0, y: 0.0}}
                end={{x: 1.0, y: 0.0}}
                style={[gs.ph15, styles.logout, gs.mv20, gs.br10]}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <View style={[gs.pl10]}>
                    <MaterialIcon
                      name="logout"
                      style={[gs.fs24, {color: '#fff'}]}
                    />
                  </View>
                  <Text style={[gs.ph2, {...styles.cardtxt, color: '#fff'}]}>
                    Logout
                  </Text>
                </Flex>
              </LinearGradient>
            </Flex>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Actionsheet
        isOpen={editProfile}
        onClose={() => {
          setEditProfile(false);
          setEnableOtp(false);
          setTimer(30);
        }}>
        <Actionsheet.Content style={{height: height / 1.3}}>
      
            <Formik
              initialValues={{
                name: userDetails?.length > 0 && userDetails[0]?.username,
                phoneNumber:
                  userDetails?.length > 0 && userDetails[0]?.phone_number,
              }}
              onSubmit={values => {
                handleSendOtp(values);
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
              }) =>
                !enableOtp ? (
                  <>
                    <View style={{width: '100%'}}>
                      <TextField
                        placeholder="Full Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        color={ts.primarytext}
                        borderColor={ts.secondarytext}
                        placeholderTextColor={ts.secondarytext}
                      />
                      {errors.name && touched.name && (
                        <Text
                          style={[{color: '#f00'}, gs.fs12, gs.mv5, gs.ml10]}>
                          {errors.name}
                        </Text>
                      )}
                    </View>
                    <View style={[{width: '100%'}, gs.mv10]}>
                      <TextField
                        placeholder="Mobile Number"
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        maxLength={10}
                        keyboardType="numeric"
                        color={ts.primarytext}
                        borderColor={ts.secondarytext}
                        placeholderTextColor={ts.secondarytext}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text
                          style={[{color: '#f00'}, gs.fs12, gs.mv5, gs.ml10]}>
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
                      <Themebtn btntxt="Submit" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View>
                      <Text
                        style={[
                          {marginVertical: 25, color: ts.secondarytext},
                          gs.fs17,
                        ]}>
                        Verify with OTP sent to Mobile Number
                      </Text>
                    </View>
                    <Center style={{width: '100%'}}>
                      {/* =======OTP FIELDS======== */}
                      <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                          <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        )}
                      />
                    </Center>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{marginTop: 40}}
                      onPress={async () => {
                        let body = {
                          name: values.name,
                          phone_number: values.phoneNumber,
                          phone_extension: '+91',
                          otp:value
                        };
                        await updateUserProfile(body, dispatch,setEnableOtp);
                      }}>
                      <Themebtn btntxt="Verify" />
                    </TouchableOpacity>
                    <Center>
                      <Flex direction="row" alignItems="center">
                        <Text
                          style={[
                            {
                              fontFamily: 'ReadexPro-Medium',
                              color: ts.primarytext,
                            },
                            gs.fs12,
                            gs.mt20,
                          ]}>
                          Didn't receive it?{' '}
                        </Text>
                        {timer > 0 ? (
                          <Text
                            style={[
                              {
                                fontFamily: 'ReadexPro-Medium',
                                color: ts.primarytext,
                              },
                              gs.fs12,
                              gs.mt20,
                            ]}>
                            Retry in 00: {timer}
                          </Text>
                        ) : (
                          <TouchableOpacity onPress={handleSubmit}>
                            <Text
                              style={[
                                {
                                  fontFamily: 'ReadexPro-Medium',
                                  color: ts.primarytext,
                                },
                                gs.fs12,
                                gs.mt20,
                              ]}>
                              Resend Otp
                            </Text>
                          </TouchableOpacity>
                        )}
                      </Flex>
                    </Center>
                  </>
                )
              }
            </Formik>
        </Actionsheet.Content>
      </Actionsheet>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  profile: {
    height: '48@ms',
    width: '48@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  name: {
    color: ts.primarytext,
    fontFamily: ts.primarymedium,
  },
  mobile: {
    color: ts.teritary,
    lineHeight: '22@ms',
    fontFamily: ts.secondaryregular,
  },
  icon: {
    color: ts.secondarytext,
    fontSize: '24@ms',
  },
  cardlayout: {
    height: '55@ms',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: '12@ms',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    marginTop: '10@ms',
  },
  cardtxt: {
    fontSize: '15@ms',
    marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
  logout: {
    height: '40@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeFieldRoot: {
    marginVertical: '20@ms',
  },
  cell: {
    width: '40@ms',
    height: '40@ms',
    lineHeight: '38@ms',
    fontSize: '24@ms',
    borderWidth: 1,
    borderColor: ts.primarytext,
    textAlign: 'center',
    marginRight: '10@ms',
    color: ts.secondarytext,
    borderRadius: 10,
  },
  focusCell: {
    borderColor: ts.secondarytext,
    borderWidth: 2,
  },
});
