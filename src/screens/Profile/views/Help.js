import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Center} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Themebtn from '../../../components/Themebtn';

export default function Help({navigation}) {
  const [issuefocus, setIssuefocus] = useState(false);
  const [cmtfocus, setCmtfocus] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ThemeHeaderWrapper
          lefttxt="HelpDesk & Support"
          goBack={() => navigation.goBack()}
        />
        <View style={[gs.ph10]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {fontFamily: ts.primarymedium, color: ts.primarytext},
                gs.pv10,
              ]}>
              Raise a Ticket
            </Text>
          </Center>
          <TextInput
            placeholder="Issue"
            style={[{
              ...styles.issuecontainer,
              borderColor: issuefocus ? ts.secondary : '#ccc',
            },gs.fs14]}
            placeholderTextColor="#777"
            onFocus={() => setIssuefocus(true)}
            onBlur={() => setIssuefocus(false)}
          />
          <TextInput
            placeholder="Comments"
            style={[{
              ...styles.issuecontainer,
              borderColor: cmtfocus ? ts.secondary : '#ccc',
            },styles.comtcontainer,gs.fs14]}
            placeholderTextColor="#777"
            multiline
            onFocus={() => setCmtfocus(true)}
            onBlur={() => setCmtfocus(false)}
          />
        </View>
        <Center>
          <TouchableOpacity style={[gs.mt10]}>
            <Themebtn btntxt="Submit" />
          </TouchableOpacity>
        </Center>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = ScaledSheet.create({
  issuecontainer: {
    height: '45@ms',
    paddingHorizontal: '10@ms',
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: ts.secondarymedium,
    color: ts.primarytext,
    marginVertical: '5@ms',
    textAlignVertical: 'top',
  },
  comtcontainer:{
    height:'200@ms'
  }
});
