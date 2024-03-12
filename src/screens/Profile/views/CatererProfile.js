import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Image
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {Center, Divider, Flex} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {gs} from '../../../../GlobalStyles';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {ScaledSheet} from 'react-native-size-matters';
import ProfileBanners from './ProfileModules/ProfileBanners';
import {ScrollView} from 'react-native-virtualized-view';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome6';
import {
  catererBanners,
  caterersgallery,
  reviews,
  searchitems,
} from '../../../constants/Constants';
import GallerySlice from './ProfileModules/GallerySlice';
import PopularCat from './ProfileModules/PopularCatSlice';
import ReviewSlice from './ProfileModules/ReviewSlice';
import {Card} from 'react-native-paper';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CatererProfile({navigation}) {
  const {width, height} = Dimensions.get('screen');
  const [cmtfocus, setCmtfocus] = useState(false);
  const handleFocus = () => {
    setCmtfocus(true);
  };
  return (
    <ScreenWrapper>
      <View
        style={[
          gs.ph15,
          styles.headercontainer
        ]}>
        <SafeAreaView>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={[Platform.OS=='ios'?gs.mt10:gs.mt5]}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack();
                }}>
                <AntIcon
                  name="arrowleft"
                  style={[gs.fs22, {color: '#fff'}]}
                />
              </TouchableOpacity>
            <Flex direction="row" alignItems='center'>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <IonIcons
                  name="location-sharp"
                  style={[gs.fs22, {color: '#fff'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph15]}>
                <EntypoIcons name="share" style={[gs.fs22, {color: '#fff'}]} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <AntIcon name="hearto" style={[gs.fs22, {color: '#fff'}]} />
              </TouchableOpacity>
            </Flex>
          </Flex>
        </SafeAreaView>
      </View>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        nestedScrollEnabled={true}
        >
        <View style={[gs.ph5, gs.pv10]}>
          <Flex direction="row" align="center" justify="space-between">
            <Text style={[gs.fs19, styles.heading]}>
              Saravana Catering Service
            </Text>
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  ...styles.labelcontainer,
                  backgroundColor: ts.branded,
                }}>
                <Text
                  style={[
                    gs.fs13,
                    {color: '#fff', fontFamily: ts.secondaryregular},
                  ]}>
                  Branded
                </Text>
              </View>
            </TouchableOpacity>
          </Flex>
          <Text style={[gs.fs11, styles.area]}>
            No.65, Nehru Road, 8th Cross Street, Near Kalyan Nagar Post,
            Bangalore - 560084
          </Text>
        </View>
        {/* =======BANNER SLIDERS======= */}
        <View>
          <ProfileBanners catererBanners={catererBanners} />
          <Flex direction="row" align="center" style={[gs.ph5, gs.pv15]}>
            <Text style={[styles.subtxt, gs.fs12]}>Food Type : </Text>
            <Text style={[{...styles.subtxt, color: ts.accent3}, gs.fs12]}>
              Veg{' '}
            </Text>
            <Text style={[styles.subtxt, gs.fs12]}>& </Text>
            <Text style={[{...styles.subtxt, color: ts.accent4}, gs.fs12]}>
              Non-Veg
            </Text>
          </Flex>
          <View style={[gs.ph5]}>
            <Text style={[styles.subtxt, gs.fs12, gs.pb7]}>
              Cuisines We Cater
            </Text>
            <Text
              style={[
                gs.fs14,
                {fontFamily: ts.secondarymedium, color: ts.secondary},
              ]}>
              South Indian, North Indian & Chinese
            </Text>
          </View>
        </View>
        {/* =======SERVICES=========== */}
        <View style={{paddingHorizontal: 15}}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{paddingVertical: 15}}>
            <View
              style={[
                {width: width / 2 - 22.5},
                styles.servicecontainer,
                gs.pv15,
                gs.ph3,
              ]}>
              <MaterialIcons name="room-service" style={styles.serviceicon} />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>Service Type</Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                Table & Buffet Service
              </Text>
            </View>
            <View
              style={[
                {width: width / 2 - 22.5, marginLeft: 15},
                styles.servicecontainer,
                gs.p15,
              ]}>
              <Material name="edit-note" style={styles.serviceicon} />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>Service Type</Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                100 - 7000 Plates
              </Text>
            </View>
          </Flex>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <View
              style={[{width: width - 30}, styles.servicecontainer, gs.p15]}>
              <FontistoIcons name="clock" style={styles.serviceicon} />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]} numberOfLines={1}>
                Working Hours
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                Monday - Saturday 8am - 10pm
              </Text>
            </View>
          </Flex>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{paddingVertical: 15}}>
            <View
              style={[
                {width: width / 2 - 22.5},
                styles.servicecontainer,
                gs.pv15,
                gs.ph3,
              ]}>
              {/* <FontAweSomeIcon name="user-group" style={styles.usericon} /> */}
              <Image source={require('../../../assets/Common/totalnoofStaffs.png')}
              alt='staff'
              style={styles.staffimg}
              tintColor={ts.secondary}
              />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>
                Total No. of Staffs
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                50
              </Text>
            </View>
            <View
              style={[
                {width: width / 2 - 22.5, marginLeft: 15},
                styles.servicecontainer,
                gs.p15,
              ]}>
              <Material name="timeline" style={styles.serviceicon} />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>
                Working Since
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                1987
              </Text>
            </View>
          </Flex>
        </View>
        {/* =====ABOUT US / BRANCHES========== */}
        <View style={[gs.ph5]}>
          <Text
            style={[
              gs.fs14,
              gs.pv5,
              {fontFamily: ts.secondaryregular, color: ts.secondary},
            ]}>
            About Us
          </Text>
          <Text style={[styles.subtxt, gs.fs12]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in...{' '}
            <Text style={{color: ts.teritary}}>Read all</Text>
          </Text>
        </View>
        <View style={[gs.ph5]}>
          <Text
            style={[
              gs.fs14,
              gs.pv5,
              {fontFamily: ts.secondaryregular, color: ts.secondary},
            ]}>
            Our Branches
          </Text>
          <Text style={[styles.subtxt, gs.fs12]}>
            Chennai, Madurai, Dindigul, Kerala...{' '}
            <Text style={[{color: ts.secondary}]}>View all</Text>
          </Text>
        </View>
        {/* ==========GALLERY========= */}
        <Center>
          <View style={[gs.pt20, gs.pb15]}>
            <Text
              style={[
                {fontFamily: ts.secondarymedium, color: ts.primarytext},
                gs.fs15,
              ]}>
              Our Gallery
            </Text>
          </View>
        </Center>
        <View style={{paddingHorizontal: 15}}>
          <GallerySlice data={caterersgallery.slice(0, 4)} />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('PageStack', {
              screen: 'GalleryView',
            });
          }}>
          <Center style={[gs.pv15]}>
            <Text
              style={[
                styles.subtxt,
                gs.fs12,
                {color: ts.secondary},
              ]}>
              View all
            </Text>
          </Center>
        </TouchableWithoutFeedback>
        <View style={[gs.ph5, gs.pb15]}>
          <Divider />
        </View>
        {/*======SIMILAR/POPULAR CATERERS====== */}
        <View style={[gs.ph5]}>
          <Text
            style={[
              {fontFamily: ts.secondarymedium, color: ts.primarytext},
              gs.fs15,
            ]}>
            Similar / Popular Caterers in your area
          </Text>
          <PopularCat data={searchitems} />
        </View>
        <Center style={[gs.pv15]}>
          <Text
            style={[
              styles.subtxt,
              gs.fs12,
              {color: ts.secondary},
            ]}>
            See all
          </Text>
        </Center>
        <View style={[gs.ph5, gs.pb15]}>
          <Divider />
        </View>
        {/* =======REVIEWS========== */}
        <View style={[gs.ph5]}>
          <Text
            style={[
              {fontFamily: ts.secondarymedium, color: ts.primarytext},
              gs.fs15,
              gs.pb15,
            ]}>
            Reviews : See what customers loved the most
          </Text>
          <ReviewSlice data={reviews} />
          <Center>
            <Text
              style={[
                styles.subtxt,
                gs.fs12,
                { color: ts.secondary},
                gs.mt5
              ]}>
              See all 238 reviews
            </Text>
          </Center>
        </View>
        <View style={[gs.ph5, gs.pv15]}>
          <Divider />
        </View>
        {/* =====WRITE REVIEW======== */}
        <View style={[gs.ph5]}>
          <Center>
            <Text
              style={[
                {fontFamily: ts.secondarymedium, color: ts.primarytext},
                gs.fs15,
                gs.pb15,
              ]}>
              Write a Review
            </Text>
          </Center>
            <TextInput
              placeholder="Add Comments"
              style={[
                {
                  ...styles.issuecontainer,
                  borderColor: cmtfocus ? ts.secondary : '#ccc',
                },
                gs.mh12,
                gs.br10
              ]}
              placeholderTextColor="#777"
              multiline
              onFocus={()=>setCmtfocus(true)}
              onBlur={() => setCmtfocus(false)}
            />
            <TouchableOpacity style={[gs.mh14, gs.mv10]}>
              <ThemeSepBtn btntxt="Submit" themecolor={ts.secondary} />
            </TouchableOpacity>
{/*         
        </View>
        <View style={{bottom: cmtfocus && 500}}> */}
       </View>
      </KeyboardAwareScrollView>
      <Card
        style={[{borderRadius: 0, backgroundColor: '#fff'}, gs.ph8, gs.pb10,gs.pt5]}>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={[gs.pb10,gs.pt5]}>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            ]}>
            Starting Price / Plate -{' '}
            <Text style={[{color: ts.secondary}, gs.fs16]}>₹ 250</Text>
          </Text>
          <ThemeSepBtn btntxt="Contact Now" themecolor={ts.secondary} />
        </Flex>
      </Card>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  heading: {fontFamily: ts.primarymedium, color: ts.teritary, width: '75%'},
  labelcontainer: {
    height: '25@ms',
    width: '80@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15@ms',
  },
  area: {
    fontFamily: ts.secondaryregular,
    color: ts.teritary,
    marginVertical: '10@ms',
  },
  subtxt: {
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    lineHeight:'17@ms'
  },
  servicecontainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '110@ms',
  },
  serviceicon: {
    fontSize: '35@ms',
    color: ts.secondary,
  },
  usericon: {
    fontSize: '25@ms',
    color: ts.secondary,
  },
  staffimg:{
    height:'30@ms',
    width:'30@ms'
  },
  servicedesc: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
  issuecontainer: {
    height: '200@ms',
    paddingHorizontal: '10@ms',
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: ts.secondarymedium,
    color: ts.primarytext,
    marginVertical: '5@ms',
    textAlignVertical: 'top',
    fontSize:'13@ms'
  },
  headercontainer: {
    height: Platform.OS == 'ios' ? '100@ms' : '100@ms',
    paddingTop:Platform.OS=='android'?StatusBar.currentHeight: '20@ms',
    backgroundColor: ts.secondary,
  },
});
