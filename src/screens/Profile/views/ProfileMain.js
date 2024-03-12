import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar
} from 'react-native';
import React from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/ScreenWrapper';

export default function ProfileMain({navigation}) {
  return (
    <ScreenWrapper>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ThemeHeaderWrapper
        lefttxt="My Profile"
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={[gs.ph20, {flex: 1}]} showsVerticalScrollIndicator={false}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={[gs.mv15]}>
          <Flex direction="row" align="center">
            <ImageBackground
              source={require('../../../assets/India/06.jpg')}
              imageStyle={[{resizeMode: 'cover'}, gs.br10]}
              style={[styles.profile]}
            />
            <View style={[gs.ml15]}>
              <Text style={[gs.fs21, styles.name]}>Full Name</Text>
              <Text style={[styles.mobile, gs.fs15]}>+91 9003451965</Text>
            </View>
          </Flex>
          <TouchableOpacity activeOpacity={0.7}>
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
              title: "This is my report ",
              message: "Message:",
              url: "file:///storage/emulated/0/demo/test.pdf",
              subject: "Report",
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
        <Flex direction="row" justifyContent="flex-end">
          <LinearGradient
            colors={[ts.secondary, ts.primary]}
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 0.0}}
            style={[
              gs.ph15,
             styles.logout,
              gs.mv20,
              gs.br10
            ]}>
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
      </ScrollView>
    </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  profile: {
    height: '48@ms',
    width: '48@ms',
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
  }
});
