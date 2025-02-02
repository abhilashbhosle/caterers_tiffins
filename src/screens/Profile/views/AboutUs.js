import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
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


const data = [
  {name: 'About', img: require('../../../assets/Profile/heart.png')},
  {
    name: 'Privacy Policy',
    img: require('../../../assets/Profile/myinquiries.png'),
  },
  {
    name: 'Security Policy',
    img: require('../../../assets/Profile/security.png'),
  },
  {
    name: 'Terms & Conditions',
    img: require('../../../assets/Profile/terms.png'),
  },
  {name: 'Disclaimer', img: require('../../../assets/Profile/disclaimer.png')},
];

export default function AboutUs({navigation}) {
  const openLink = async (url) => {
    
  };
  
  return (
    <ScreenWrapper>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <LinearGradient
          colors={['#fff0f0', '#FFFDF5', '#fff']}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.5, y: 1.2}}
          // locations={[0.8,0.5,0.5]}
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
                    {/* <IonIcons
                              name="chevron-back"
                              style={[gs.fs20, gs.pr15, {color: '#fff'}]}
                            /> */}
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
                    About Us
                  </Text>
                </Flex>
              </Flex>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View style={[styles.topcontainer, gs.ph15]}>
          <View
            style={[
              {backgroundColor: '#fff'},
              styles.cardcontainer,
              gs.p15,
              gs.br12,
            ]}>
            {data.map((e, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardlayout}
                  key={i}
                  onPress={() => {
                    if (e.name == 'About') {
                      navigation.navigate('WebView', {url:'https://www.cateringsandtiffins.com/about'}
                      );
                    } else if (e.name == 'Privacy Policy') {
                      navigation.navigate('WebView', {url:'https://www.cateringsandtiffins.com/privacy-policy'});
                   
                    } else if (e.name == 'Security Policy') {
                      navigation.navigate('WebView', {url:'https://www.cateringsandtiffins.com/security-policy'});
                    } else if (e.name == 'Terms & Conditions') {
                      navigation.navigate('WebView', {url:'https://www.cateringsandtiffins.com/terms-and-conditions'});
                     
                    } else if (e.name == 'Disclaimer') {
                      navigation.navigate('WebView', {url:'https://www.cateringsandtiffins.com/disclaimer'});
                    }
                  }}>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Flex direction="row" alignItems="center">
                      <Image
                        source={e.img}
                        style={
                          e.name == 'Terms & Conditions'
                            ? styles.iconterms
                            : styles.icon1
                        }
                      />
                      <Text
                        style={[
                          styles.cardtxt,
                          e.name == 'Terms & Conditions' && gs.ml14,
                        ]}>
                        {e.name}
                      </Text>
                    </Flex>
                    <EntypoIcons
                      name="chevron-small-right"
                      style={[gs.fs26, {color: ts.secondarytext}]}
                    />
                  </Flex>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cardlayout: {
    justifyContent: 'center',
    marginVertical: '10@ms',
  },
  cardtxt: {
    fontSize: '14@ms',
    marginLeft: '10@ms',
    fontFamily: ts.jakartamedium,
    color: ts.primarytext,
    marginBottom: '3@ms',
  },
  container: {
    height: '300@ms',
  },
  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  topcontainer: {
    top: Platform.OS == 'ios' ? '-180@ms' : '-195@ms',
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
  icon1: {
    width: '24@ms',
    height: '24@ms',
  },
  iconterms: {
    height: '20@ms',
    width: '18@ms',
    marginLeft: '2@ms',
  },
});
