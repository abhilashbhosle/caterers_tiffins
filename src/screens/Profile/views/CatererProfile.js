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
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {Center, Divider, Flex, Spinner} from 'native-base';
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
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearProfile,
  getVendorProfile,
} from '../../Home/controllers/VendorProfileController';
import ReadMore from '@fawazahmed/react-native-read-more';
import {createReview} from '../../Home/controllers/ReviewController';
import { updateWishList, wishDetails } from '../../Home/controllers/WishListController';

export default function CatererProfile({navigation, route}) {
  const {branch_id, vendor_id} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [cmtfocus, setCmtfocus] = useState(false);
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state.vendor);
  const [stretch, setStretch] = useState(false);
  const [branchStretch, setBranchStretch] = useState(false);
  const [review, setReview] = useState(null);
  const {createLoading} = useSelector(state => state.review);
  const [profile,setProfile]=useState(null)

  useEffect(() => {
    if (branch_id && vendor_id) {
      dispatch(getVendorProfile({branch_id, vendor_id}));
    }
  }, [branch_id, vendor_id]);
  useEffect(()=>{
    if(data){
      setProfile(data)
    }
  },[data])

  return (
    <ScreenWrapper>
      <View style={[gs.ph15, styles.headercontainer]}>
        <SafeAreaView>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={[Platform.OS == 'ios' ? gs.mt10 : gs.mt5]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                dispatch(clearProfile());
                navigation.goBack();
              }}>
              <AntIcon name="arrowleft" style={[gs.fs22, {color: '#fff'}]} />
            </TouchableOpacity>
            <Flex direction="row" alignItems="center">
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}>
                <IonIcons
                  name="location-sharp"
                  style={[gs.fs22, {color: '#fff'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph15]}>
                <EntypoIcons name="share" style={[gs.fs22, {color: '#fff'}]} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[gs.ph10]}onPress={()=>{
                dispatch(wishDetails(vendor_id));
                 dispatch(
                  updateWishList({
                    branch_id: branch_id,
                    vendor_type: 'Caterer',
                    status: profile?.is_wishlisted == true ? 0 : 1,
                  }),
                );
                let temp={...profile}
                let updated={...temp,is_wishlisted:!temp.is_wishlisted}
                setProfile(updated)
              }}>
                <AntIcon name={profile?.is_wishlisted?"heart":"hearto"} style={[gs.fs22, {color: '#fff'}]} />
              </TouchableOpacity>
            </Flex>
          </Flex>
        </SafeAreaView>
      </View>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        nestedScrollEnabled={true}>
        <View style={[gs.ph5, gs.pv10]}>
          <Flex direction="row" align="center" justify="space-between">
            <Text style={[gs.fs19, styles.heading]}>
              {profile?.vendor_service_name}
            </Text>
            {profile?.subscription_type_display && (
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
                    {profile?.subscription_type_display}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </Flex>
          {profile?.formatted_address && (
            <ReadMore
              style={[gs.fs11, styles.area]}
              numberOfLines={2}
              seeMoreText="read more"
              seeLessText="read less"
              seeLessStyle={{
                color: ts.secondary,
                fontFamily: ts.secondaryregular,
              }}
              seeMoreStyle={{
                color: ts.secondary,
                fontFamily: ts.secondaryregular,
              }}>
              {profile.formatted_address}
            </ReadMore>
          )}
        </View>
        {/* =======BANNER SLIDERS======= */}
        <View>
          <ProfileBanners catererBanners={profile?.bennerMenuMixGalleryImages} />
          <Flex direction="row" align="center" style={[gs.ph5]}>
            <Text style={[styles.subtxt, gs.fs12]}>Food Type : </Text>
            <Flex direction="row" align="center" style={[gs.ph5, gs.pv15]}>
              {profile?.foodTypes?.length &&
                profile.foodTypes.map((e, i) => (
                  <Text
                    style={[
                      {
                        ...styles.subtxt,
                        color:
                          e.food_type_name == 'All'
                            ? ts.primarytext
                            : e.food_type_name == 'Non Veg'
                            ? ts.accent4
                            : ts.accent3,
                      },
                      gs.fs12,
                    ]}
                    key={i}>
                    {e?.food_type_name}{' '}
                    <Text style={{color: ts.secondarytext}}>|</Text>{' '}
                  </Text>
                ))}
            </Flex>
          </Flex>
          {profile?.cuisines?.length && (
            <View style={[gs.ph5]}>
              <Text style={[styles.subtxt, gs.fs12, gs.pb7]}>
                Cuisines We Cater
              </Text>
              <Flex direction="row" align="center" flexWrap="wrap">
                {profile?.cuisines
                  ?.slice(0, stretch ? profile.cuisines.length : 4)
                  ?.map((e, i) => (
                    <Text
                      style={[
                        gs.fs14,
                        {
                          fontFamily: ts.secondarymedium,
                          color: ts.secondary,
                        },
                      ]}
                      key={i}
                      numberOfLines={2}>
                      {e.cuisine_name}
                      {i !== profile?.cuisines?.length - 1 && ','}{' '}
                    </Text>
                  ))}
                {profile?.cuisines.length > 4 && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setStretch(prev => !prev);
                    }}>
                    <Text
                      style={[
                        gs.fs12,
                        {
                          fontFamily: ts.secondaryregular,
                          color: ts.secondary,
                        },
                      ]}>
                      {stretch ? 'read less' : 'read more'}
                    </Text>
                  </TouchableOpacity>
                )}
              </Flex>
            </View>
          )}
        </View>
        {/* =======SERVICES=========== */}
        <View style={{paddingHorizontal: 15}}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{paddingVertical: 15}}>
            {profile?.serviceTypes?.length && (
              <View
                style={[
                  {width: width / 2 - 22.5},
                  styles.servicecontainer,
                  gs.pv15,
                  gs.ph3,
                ]}>
                <MaterialIcons name="room-service" style={styles.serviceicon} />
                <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>
                  Service Type
                </Text>
                <Flex direction="row">
                  {profile?.serviceTypes?.slice(0, 2)?.map((e, i) => (
                    <Text
                      style={[styles.servicedesc, gs.fs13, gs.mt5]}
                      numberOfLines={1}
                      key={i}>
                      {e.service_type_name}
                      {i != 1 && ','}{' '}
                    </Text>
                  ))}
                </Flex>
              </View>
            )}

            <View
              style={[
                {width: width / 2 - 22.5, marginLeft: 15},
                styles.servicecontainer,
                gs.p15,
              ]}>
              <Material name="edit-note" style={styles.serviceicon} />
              <Text style={[styles.subtxt, gs.fs10, gs.pv7]}>
                Min & Max Order Capacity
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                {profile?.minimum_capacity ? profile.minimum_capacity : '0'} -{' '}
                {profile?.maximum_capacity ? profile.maximum_capacity : 'N/A'} Plates
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
                {profile?.start_day} - {profile?.end_day} {profile?.start_time} -{' '}
                {profile?.end_time}
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
              <Image
                source={require('../../../assets/Common/totalnoofStaffs.png')}
                alt="staff"
                style={styles.staffimg}
                tintColor={ts.secondary}
              />
              <Text style={[styles.subtxt, gs.fs12, gs.pv7]}>
                Total No. of Staffs
              </Text>
              <Text
                style={[styles.servicedesc, gs.fs13, gs.mt5]}
                numberOfLines={1}>
                {profile?.total_staffs_approx ? profile.total_staffs_approx : '-'}
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
                {profile?.working_since ? profile.working_since : '-'}
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
          <ReadMore
            style={[styles.subtxt, gs.fs12]}
            seeLessText="read less"
            seeMoreText="read more"
            seeLessStyle={{color: ts.teritary}}
            seeMoreStyle={{color: ts.teritary}}
            numberOfLines={5}>
            {profile?.about_description}{' '}
          </ReadMore>
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
          <Flex direction="row" align="center" flexWrap="wrap">
            {profile?.branches?.length ? (
              profile?.branches
                ?.slice(0, branchStretch ? profile.branches.length : 5)
                .map((e, i) => (
                  <Text style={[styles.subtxt, gs.fs12]}>
                    {e?.city}
                    {i !== profile?.branches?.length - 1 ? ',' : '.'}{' '}
                  </Text>
                ))
            ) : (
              <Text style={[styles.subtxt, gs.fs12]}>-</Text>
            )}
            {profile?.branches?.length > 5 && (
              <TouchableOpacity
                onPress={() => {
                  setBranchStretch(!branchStretch);
                }}>
                <Text style={[styles.subtxt, gs.fs10, {color: ts.secondary}]}>
                  {!branchStretch ? 'View all' : 'View less'}
                </Text>
              </TouchableOpacity>
            )}
          </Flex>
        </View>
        {/* ==========GALLERY========= */}
        {profile?.galleryImages?.length > 0 && (
          <>
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
              <GallerySlice />
            </View>
          </>
        )}

        {profile?.galleryImages?.length ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'GalleryView',
                  params: {
                    selectedImageIndex: 0,
                  },
                });
              }}>
              <Center style={[gs.pv15]}>
                <Text style={[styles.subtxt, gs.fs12, {color: ts.secondary}]}>
                  View all
                </Text>
              </Center>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={gs.pb10}></View>
        )}

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
          <Text style={[styles.subtxt, gs.fs12, {color: ts.secondary}]}>
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
          <ReviewSlice vendor_id={vendor_id} from={'Caterers'} />
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
                fontFamily:ts.secondaryregular
              },
              gs.mh12,
              gs.br10,
            ]}
            placeholderTextColor="#777"
            multiline
            onFocus={() => setCmtfocus(true)}
            onBlur={() => setCmtfocus(false)}
            value={review}
            onChangeText={text => setReview(text)}
          />
          {!createLoading ? (
            <TouchableOpacity
              style={[gs.mh14, gs.mv10]}
              onPress={() => {
                review &&
                  dispatch(createReview({vendor_id, review_text: review}));
                setReview(null);
              }}
              activeOpacity={0.7}>
              <ThemeSepBtn
                btntxt="Submit"
                themecolor={review ? ts.secondary : '#D3D3D3'}
              />
            </TouchableOpacity>
          ) : (
            <Center>
              <Spinner color={ts.secondary} />
            </Center>
          )}
          {/*         
        </View>
        <View style={{bottom: cmtfocus && 500}}> */}
        </View>
      </KeyboardAwareScrollView>
      <Card
        style={[
          {borderRadius: 0, backgroundColor: '#fff'},
          gs.ph8,
          gs.pb10,
          gs.pt5,
        ]}>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={[gs.pb10, gs.pt5]}>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            ]}>
            Starting Price / Plate -{' '}
            <Text style={[{color: ts.secondary}, gs.fs16]}>₹ {profile?.start_price?profile.start_price:"N/A"}</Text>
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
    lineHeight: '17@ms',
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
  staffimg: {
    height: '30@ms',
    width: '30@ms',
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
    fontSize: '13@ms',
  },
  headercontainer: {
    height: Platform.OS == 'ios' ? '100@ms' : '100@ms',
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : '20@ms',
    backgroundColor: ts.secondary,
  },
});
