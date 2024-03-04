import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
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
import ReviewSlice from './ProfileModules/ReviewSlice';
import {Card} from 'react-native-paper';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import PopularCatSlice from './ProfileModules/PopularCatSlice';
import PopularTiffinsSlice from './ProfileModules/PopularTiffinsSlice';
import {ScreenWrapper} from '../../../components/ScreenWrapper';

export default function TiffinProfile({navigation}) {
  const {width, height} = Dimensions.get('screen');
  const [cmtfocus, setCmtfocus] = useState(false);
  const handleFocus = () => {
    setCmtfocus(true);
  };
  return (
    <ScreenWrapper>
      <View style={[gs.ph15, styles.headercontainer]}>
        <SafeAreaView>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Flex direction="row" align="center">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack();
                }}>
                <AntIcon
                  name="arrowleft"
                  style={[gs.fs22, {color: '#fff'}, gs.mt10]}
                />
              </TouchableOpacity>
            </Flex>
            <Flex direction="row">
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <IonIcons
                  name="location-sharp"
                  style={[gs.fs20, {color: '#fff'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <EntypoIcons name="share" style={[gs.fs20, {color: '#fff'}]} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <AntIcon name="hearto" style={[gs.fs20, {color: '#fff'}]} />
              </TouchableOpacity>
            </Flex>
          </Flex>
        </SafeAreaView>
      </View>
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}>
        <View style={[gs.ph5, gs.pv10]}>
          <Flex direction="row" align="center" justify="space-between">
            <Text style={[gs.fs19, styles.heading]}>
              Saravana Catering Service
            </Text>
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  ...styles.labelcontainer,
                  backgroundColor: ts.accent3,
                }}>
                <Text
                  style={[
                    gs.fs13,
                    {color: '#fff', fontFamily: ts.secondaryregular},
                  ]}>
                  Popular
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
                {fontFamily: ts.secondarymedium, color: ts.primary},
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
                style={[styles.servicedesc, gs.fs11, gs.mt5]}
                numberOfLines={1}>
                Delivery, Takeaway & Dine In
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
        <View style={{paddingHorizontal: 15}}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <View
              style={[{width: width - 30}, styles.servicecontainer, gs.p15]}>
              <MaterialIcons
                name="white-balance-sunny"
                style={styles.serviceicon}
              />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]} numberOfLines={1}>
                Meal Times
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                Breakfast | Lunch | Dinner | Snacks
              </Text>
            </View>
          </Flex>
        </View>
        <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
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

        {/* =====ABOUT US / BRANCHES========== */}
        <View style={[gs.ph5]}>
          <Text
            style={[
              gs.fs14,
              gs.pv5,
              {fontFamily: ts.secondaryregular, color: ts.primary},
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
              {fontFamily: ts.secondaryregular, color: ts.primary},
            ]}>
            Our Branches
          </Text>
          <Text style={[styles.subtxt, gs.fs12]}>
            Chennai, Madurai, Dindigul, Kerala...{' '}
            <Text style={[{color: ts.primary}]}>View all</Text>
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
        <TouchableOpacity
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
                {color: ts.primary},
              ]}>
              View all
            </Text>
          </Center>
        </TouchableOpacity>
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
            Similar / Popular Tiffins in your area
          </Text>
          <PopularTiffinsSlice data={searchitems} />
        </View>
        <Center style={[gs.pv15]}>
          <Text
            style={[
              styles.subtxt,
              gs.fs12,
              {color: ts.primary},
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
                {color: ts.primary},
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
          <View style={{marginBottom: cmtfocus ? 500 : 0}}>
            <TextInput
              placeholder="Add Comments"
              style={[
                {
                  ...styles.issuecontainer,
                  borderColor: cmtfocus ? ts.primary : '#ccc',
                },
                gs.mh12,
              ]}
              placeholderTextColor="#777"
              multiline
              onFocus={handleFocus}
              onBlur={() => setCmtfocus(false)}
            />
            <TouchableOpacity style={[gs.mh14, gs.mv10]}>
              <ThemeSepBtn btntxt="Submit" themecolor={ts.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Card
        style={[{borderRadius: 0, backgroundColor: '#fff'}, gs.ph8, gs.pv10]}>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={[gs.pv10]}>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            ]}>
            Monthly plan price -{' '}
            <Text style={[{color: ts.primary}, gs.fs16]}>₹ 2500</Text>
          </Text>
          <ThemeSepBtn btntxt="Contact Now" themecolor={ts.primary} />
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
    color: ts.primary,
  },
  usericon: {
    fontSize: '25@ms',
    color: ts.secondary,
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
    height: Platform.OS == 'ios' ? '100@ms' : '70@ms',
    paddingTop: '20@ms',
    backgroundColor: ts.primary,
  },
});
