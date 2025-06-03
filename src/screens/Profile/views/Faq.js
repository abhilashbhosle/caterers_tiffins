import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Flex} from 'native-base';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';

export default function Faq({navigation}) {
  const faq = [
    {
      que: 'How to book my Caterer?',
      ans: 'To book catering service, you can visit our website and navigate to the booking section. Follow the instructions provided there to select your preferred plan and complete the booking process.',
    },
    {
      que: 'How to book my Tiffins?',
      ans: 'To book tiffins service, you can visit our website and navigate to the booking section. Follow the instructions provided there to select your preferred plan and complete the booking process.',
    },
    {
      que: 'How to check cancellation policy?',
      ans: 'To choose meal plans, please visit our website and explore the available meal plan options. You can select the plan that best suits your preferences and dietary requirements.',
    },
    {
      que: 'How to get caterer contact details?',
      ans: 'You can get the contact details of our caterers by contacting our customer support team. They will provide you with the necessary information to get in touch with our catering partners.',
    },
  ];
  const [index, setIndex] = useState(-1);
  return (
    <ScreenWrapper>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={[{flex: 1}]}>
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
                      FAQ
                    </Text>
                  </Flex>
                </Flex>
              </View>
            </SafeAreaView>
          </LinearGradient>
          <View style={[styles.topcontainer, gs.ph15]}>
            {faq.map((e, i) => {
              return (
                <View
                  style={[
                    {backgroundColor: '#fff'},
                    styles.cardcontainer,
                    gs.p15,
                    gs.br12,
                    gs.mv10,
                  ]}
                  key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(i == index ? -1 : i);
                    }}
                    activeOpacity={0.7}>
                    <Flex
                      justifyContent="space-between"
                      direction="row"
                      alignItems="center">
                      <Text
                        style={[
                          gs.fs15,
                          {fontFamily: ts.jakartamedium, color: '#000'},
                        ]}>
                        {e?.que}
                      </Text>
                      <Image
                        source={
                          i == index
                            ? require('../../../assets/Profile/remove.png')
                            : require('../../../assets/Profile/add.png')
                        }
                        style={styles.removeicon}
                      />
                    </Flex>
                  </TouchableOpacity>

                  {index == i ? (
                    <Text
                      style={[
                        gs.fs13,
                        {fontFamily: ts.jakartamedium, color: '#70747B'},
                        gs.mt10,
                      ]}>
                      {e.ans}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cardlayout: {
    height: '55@ms',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
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
  container: {
    height: '400@ms',
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
    backgroundColor: '#fff',
  },
  topcontainer: {
    top: Platform.OS == 'ios' ? '-280@ms' : '-300@ms',
  },
  removeicon: {
    width: '24@ms',
    height: '24@ms',
  },
});
