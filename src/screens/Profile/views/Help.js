import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Center, Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Themebtn from '../../../components/Themebtn';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {Card} from 'react-native-paper';

export default function Help({navigation}) {
  const [issuefocus, setIssuefocus] = useState(false);
  const [cmtfocus, setCmtfocus] = useState(false);
  const [comment, setComment] = useState(null);
  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <LinearGradient
            colors={['#fff0f0', '#FFFDF5', '#fff']}
            start={{x: 0.2, y: 0.5}}
            end={{x: 0.5, y: 1.2}}
            // locations={[0.3,0.9,0.0]}
            style={[{...styles.container}]}>
            <SafeAreaView>
              <View
                style={[
                  {
                    paddingTop:
                      Platform.OS == 'android'
                        ? StatusBar.currentHeight + 10
                        : 20,
                  },
                  gs.pb10,
                ]}>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  style={[gs.ph15]}>
                  <Flex direction="row" alignItems="center">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.goBack()}>
                      <Image
                        source={require('../../../assets/Common/back.png')}
                        style={styles.backicon}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        gs.fs18,
                        {color: '#000', fontFamily: ts.jakartabold},
                        gs.mb5,
                      ]}>
                      Helpdesk & Support
                    </Text>
                  </Flex>
                </Flex>
              </View>
            </SafeAreaView>
          </LinearGradient>
          <View style={styles.topcontainer}>
            <View style={[gs.ph15]}>
              <Text
                style={[
                  gs.fs16,
                  {fontFamily: ts.jakartasemibold, color: ts.primarytext},
                  gs.pv10,
                ]}>
                Raise a ticket
              </Text>
              <TextInput
                placeholder="What is the issue?"
                style={[
                  {
                    ...styles.issuecontainer,
                    // borderColor: issuefocus ? ts.secondary : '#ccc',
                  },
                  gs.fs14,
                  gs.br10,
                ]}
                placeholderTextColor="#A7B2C2"
                onFocus={() => setIssuefocus(true)}
                onBlur={() => setIssuefocus(false)}
              />
              <TextInput
                placeholder="Add comments"
                style={[
                  {
                    ...styles.issuecontainer,
                  },
                  styles.comtcontainer,
                  gs.fs14,
                  gs.br10,
                ]}
                placeholderTextColor="#A7B2C2"
                multiline
                onFocus={() => setCmtfocus(true)}
                onBlur={() => setCmtfocus(false)}
                value={comment}
                onChangeText={text => setComment(text)}
              />
              <Center>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    {
                      ...styles.btn,
                      backgroundColor: !comment ? '#eee' : ts.secondary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.subtxt,
                      gs.fs15,
                      {
                        color: !comment ? '#ccc' : '#fff',
                        fontFamily: ts.jakartabold,
                      },
                    ]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </Center>
              <Text
                style={[
                  gs.fs16,
                  {fontFamily: ts.jakartasemibold, color: ts.primarytext},
                  gs.pv10,
                ]}>
                My Tickets
              </Text>
              <Card style={{backgroundColor: '#fff'}}>
                <Card.Content>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text
                      style={[
                        gs.fs15,
                        {fontFamily: ts.jakartamedium, color: '#000'},
                      ]}>
                      Issue Heading
                    </Text>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[
                        {backgroundColor: 'rgba(62, 187, 233, 0.4)'},
                        gs.ph5,
                        gs.pv4,
                        gs.br4,
                      ]}>
                      <Image
                        source={require('../../../assets/Profile/open.png')}
                        style={styles.issueicon}
                      />
                      <Text
                        style={[
                          gs.fs14,
                          {fontFamily: ts.jakartamedium, color: '#00658A'},
                          gs.mb2,
                        ]}>
                        {' '}
                        Open
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt10,
                    ]}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500.
                  </Text>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt5,
                    ]}>
                   Nov 15, 2:34PM
                  </Text>
                </Card.Content>
              </Card>
              <Card style={[{backgroundColor: '#fff'},gs.mt15]}>
                <Card.Content>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text
                      style={[
                        gs.fs15,
                        {fontFamily: ts.jakartamedium, color: '#000'},
                      ]}>
                      Issue Heading
                    </Text>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[
                        {backgroundColor: 'rgba(49, 189, 119, 0.2)'},
                        gs.ph5,
                        gs.pv4,
                        gs.br4,
                      ]}>
                      <Image
                        source={require('../../../assets/Profile/resolved.png')}
                        style={styles.issueicon}
                      />
                      <Text
                        style={[
                          gs.fs14,
                          {fontFamily: ts.jakartamedium, color: '#009254'},
                          gs.mb2,
                        ]}>
                        {' '}
                        Resolved
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt10,
                    ]}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500.
                  </Text>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt5,
                    ]}>
                   Nov 15, 2:34PM
                  </Text>
                </Card.Content>
              </Card>
              <Card style={[{backgroundColor: '#fff'},gs.mt15]}>
                <Card.Content>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text
                      style={[
                        gs.fs15,
                        {fontFamily: ts.jakartamedium, color: '#000'},
                      ]}>
                      Issue Heading
                    </Text>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[
                        {backgroundColor: 'rgba(49, 189, 119, 0.2)'},
                        gs.ph5,
                        gs.pv4,
                        gs.br4,
                      ]}>
                      <Image
                        source={require('../../../assets/Profile/resolved.png')}
                        style={styles.issueicon}
                      />
                      <Text
                        style={[
                          gs.fs14,
                          {fontFamily: ts.jakartamedium, color: '#009254'},
                          gs.mb2,
                        ]}>
                        {' '}
                        Resolved
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt10,
                    ]}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500.
                  </Text>
                  <Text
                    style={[
                      gs.fs13,
                      {fontFamily: ts.jakartamedium, color: '#70747B'},
                      gs.mt5,
                    ]}>
                   Nov 15, 2:34PM
                  </Text>
                </Card.Content>
              </Card>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  issuecontainer: {
    height: '45@ms',
    paddingHorizontal: '10@ms',
    fontFamily: ts.jakartamedium,
    color: ts.primarytext,
    marginVertical: '5@ms',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderWidth: '0.5@ms',
    borderColor: '#f5f3f2',
  },
  comtcontainer: {
    height: '97@ms',
  },
  container: {
    height: '350@ms',
  },
  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  cardcontainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: Platform?.OS == 'ios' ? 10.86 : 10.86,
    elevation: 1, // For Android shadow
  },
  topcontainer: {
    top:Platform.OS=='ios'?'-240@ms':'-260@ms',
  },
  btn: {
    backgroundColor: '#fbe3e1',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10@ms',
    borderRadius: '20@ms',
    marginVertical: '10@ms',
  },
  subtxt: {
    fontFamily: ts.jakartamedium,
    // color: ts.secondarytext,
    // lineHeight: '17@ms',
  },
  issueicon: {
    height: '15@ms',
    width: '15@ms',
  },
});
