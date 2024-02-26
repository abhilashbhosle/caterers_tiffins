import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeWrapper from '../../../components/ThemeWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {gs} from '../../../../GlobalStyles';
import TextField from '../../../components/TextField';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';

export default function Register({navigation}) {
  const [name, setName] = useState(null);
  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
              }}>
              <AntIcon
                name="arrowleft"
                style={[gs.fs22, {color: '#fff'}, gs.p5]}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={[{...gs.btnPlaneWhite, marginVertical: 25}, gs.fs17]}>
                Enter your Name *
              </Text>
              <TextField placeholder="Full Name" />
            </View>
            <View>
              <Text
                style={[{...gs.btnPlaneWhite, marginVertical: 25}, gs.fs17]}>
                Enter your mobile number to get OTP *
              </Text>
              <TextField placeholder="+91 | Mobile Number" />
            </View>
            <TouchableOpacity style={{marginTop:35}} activeOpacity={0.7} onPress={()=>{navigation.navigate('VerifyOtp')}}>
              <WhiteCoverBtn btntxt="Get OTP" />
            </TouchableOpacity>
            <Text style={[{fontFamily:'ReadexPro-Medium',color:'#fff'},gs.fs12,gs.mt20]}>
            By Clicking I accept the <Text style={{textDecorationLine:'underline'}}>terms of service</Text>  and <Text style={{textDecorationLine:'underline'}}>privacy policy</Text>
            </Text>
          </View>
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
