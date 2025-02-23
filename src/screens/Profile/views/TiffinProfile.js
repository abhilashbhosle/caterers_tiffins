import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  StatusBar,
  Image,
  Pressable,
  Linking,
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
import ReviewSlice from './ProfileModules/ReviewSlice';
import {Card} from 'react-native-paper';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import PopularCatSlice from './ProfileModules/PopularCatSlice';
import PopularTiffinsSlice from './ProfileModules/PopularTiffinsSlice';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearProfile,
  getVendorProfile,
} from '../../Home/controllers/VendorProfileController';
import ReadMore from '@fawazahmed/react-native-read-more';
import {createReview} from '../../Home/controllers/ReviewController';
import {
  updateWishList,
  wishDetails,
} from '../../Home/controllers/WishListController';
import Ratings from '../../../components/Ratings';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {getSubscription} from '../../Home/controllers/FilterMainController';
import CuisinesExpanded from '../../../components/CuisinesExpanded';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

export default function TiffinProfile({navigation, route}) {
  const {branch_id, vendor_id, location} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [cmtfocus, setCmtfocus] = useState(false);
  const {loading, data, error} = useSelector(state => state.vendor);
  const [profile, setProfile] = useState(null);
  const {createLoading} = useSelector(state => state.review);
  const [stretch, setStretch] = useState(false);
  const [review, setReview] = useState(null);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [branchStretch, setBranchStretch] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const scrollViewRef = useRef(null);

  const handleFocus = () => {
    setCmtfocus(true);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 300);
  };
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);
  useEffect(() => {
    if (branch_id && vendor_id) {
      dispatch(getVendorProfile({branch_id, vendor_id}));
      dispatch(getUser());
      dispatch(getSubscription({from: 'Tiffins'}));
    }
  }, [branch_id, vendor_id]);

  console.log(profile)

  return (
    <ScreenWrapper>
      {profile?.vendor_service_name ? (
        <>
          <KeyboardAwareScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            // enableOnAndroid={true}
            nestedScrollEnabled={true}
            extraScrollHeight={Platform.OS == 'ios' ? 100 : 0}
            ref={scrollViewRef}>
            {/* =======BANNER SLIDERS======= */}
            <View>
              <View style={{position: 'relative'}}>
                <ProfileBanners
                  catererBanners={profile?.bennerMenuMixGalleryImages}
                />
                <View style={styles.topicons}>
                  <SafeAreaView>
                    {Platform == 'android' ? (
                      <View
                        style={{paddingTop: StatusBar.currentHeight}}></View>
                    ) : null}
                    <Flex
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width={'100%'}
                      style={{
                        paddingTop:
                          Platform.OS == 'android'
                            ? StatusBar.currentHeight
                            : null,
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(clearProfile());
                          navigation.goBack();
                        }}>
                        <Image
                          source={require('../../../assets/Common/backicon.png')}
                          style={styles.backicon}
                        />
                      </Pressable>
                      <Pressable>
                        <Image
                          source={require('../../../assets/Common/share.png')}
                          style={styles.backicon}
                        />
                      </Pressable>
                    </Flex>
                  </SafeAreaView>
                </View>
                {/* Top card */}
                <Card style={styles.details}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {profile?.subscription_type_name == 'popular' || profile?.subscription_type_name == 'Popular' ? (
                      <Image
                        source={require('../../../assets/Common/popularlabel.png')}
                        style={styles.label}
                      />
                    ) : profile?.subscription_type_name == 'branded' || profile?.subscription_type_name == 'Branded'  ? (
                      <Image
                        source={require('../../../assets/Common/brandedlabel.png')}
                        style={styles.label}
                      />
                    ) : null}
                  </View>
                  <View style={[gs.p15]}>
                    <Flex direction="row" align="center">
                      {profile?.bennerMenuMixGalleryImages?.length ? (
                        <Image
                          source={{
                            uri: profile?.bennerMenuMixGalleryImages[0]
                              ?.image_names[0]?.medium,
                          }}
                          style={styles.profile}
                        />
                      ) : null}
                      <View style={[gs.ml15, {width: '60%'}]}>
                        <Text style={{...styles.heading, width: width / 1.5}}>
                          {profile?.vendor_service_name}
                        </Text>
                        {profile?.formatted_address && (
                          <Text
                            style={[
                              gs.fs13,
                              {...styles.area, width: width / 1.5},
                            ]}>
                            {profile.formatted_address}
                          </Text>
                        )}
                      </View>
                    </Flex>
                    <Flex
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                      style={[gs.mt10]}>
                      <View style={styles.ratingiconcontainer}>
                        <Flex align="center">
                          <Image
                            source={require('../../../assets/Common/rating.png')}
                            style={[styles.starIcon]}
                          />
                          <Text style={[styles.startPrice, gs.fs14]}>
                            4.5 ({profile?.review_count})
                          </Text>
                        </Flex>
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.ratingiconcontainer}>
                        <Pressable
                          onPress={() => {
                            navigation.navigate('PageStack', {
                              screen: 'MapSingle',
                              params: {
                                initialRegion: location,
                                profile,
                                from: 'Tiffin',
                              },
                            });
                          }}>
                          <Flex align="center">
                            <Image
                              source={require('../../../assets/Profile/locationtiffin.png')}
                              style={styles.ratingicon}
                            />
                            <Text style={[styles.startPrice, gs.fs14]}>
                              Location
                            </Text>
                          </Flex>
                        </Pressable>
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.ratingiconcontainer}>
                        <Flex align="center">
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={[gs.ph10]}
                            onPress={() => {
                              dispatch(wishDetails(vendor_id));
                              dispatch(
                                updateWishList({
                                  branch_id: branch_id,
                                  vendor_type: 'Tiffin',
                                  status:
                                    profile?.is_wishlisted == true ? 0 : 1,
                                }),
                              );
                              let temp = {...profile};
                              let updated = {
                                ...temp,
                                is_wishlisted: !temp.is_wishlisted,
                              };
                              setProfile(updated);
                            }}>
                            <AntIcon
                              name={profile?.is_wishlisted ? 'heart' : 'hearto'}
                              style={[gs.fs20, {color: ts.primary}, gs.h25]}
                            />
                          </TouchableOpacity>
                          <Text style={[styles.startPrice, gs.fs14]}>
                            Wishlist
                          </Text>
                        </Flex>
                      </View>
                    </Flex>
                    {/* cuisines */}
                    <View
                      style={[
                        {backgroundColor: 'rgba(217, 130, 43, 0.2)'},
                        gs.mt10,
                        gs.pv10,
                        gs.ph10,
                        gs.br4,
                      ]}>
                      <Text style={[styles.startPrice, gs.fs16]}>Cuisines</Text>
                      {profile?.cuisines?.length ? (
                        <Flex
                          direction="row"
                          align="center"
                          flexWrap="wrap"
                          style={[gs.mt5]}>
                          {profile?.cuisines?.slice(0, 6)?.map((e, i) => (
                            <Text
                              style={[
                                gs.fs14,
                                {
                                  fontFamily: ts.jakartaregular,
                                  color: ts.primarytext,
                                },
                              ]}
                              key={i}
                              numberOfLines={2}>
                              {e.cuisine_name}
                              {i !== profile?.cuisines?.length - 1 && ','}{' '}
                            </Text>
                          ))}
                          {profile?.cuisines?.length > 6 && (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                setStretch(prev => !prev);
                              }}>
                              <Text
                                style={[
                                  gs.fs12,
                                  {
                                    fontFamily: ts.jakartamedium,
                                    color: ts.primary,
                                  },
                                ]}>
                                {stretch ? 'less' : 'more'}
                              </Text>
                            </TouchableOpacity>
                          )}
                          <CuisinesExpanded
                            cuisines={profile?.cuisines}
                            stretch={stretch}
                            setStretch={setStretch}
                            from={'Tiffins'}
                          />
                        </Flex>
                      ) : (
                        <Text
                          style={[
                            gs.fs14,
                            {
                              fontFamily: ts.jakartaregular,
                              color: ts.primarytext,
                            },
                          ]}>
                          N/A
                        </Text>
                      )}
                    </View>
                    <Flex
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between">
                      <Flex
                        direction="row"
                        align="center"
                        style={[gs.mt7, gs.mb5]}>
                        {profile?.serviceTypes?.map((e, i) => (
                          <View
                            key={i}
                            style={[
                              {
                                backgroundColor:
                                  e?.service_type_name == 'Takeaway'
                                    ? 'rgba(62, 187, 233, 0.3)'
                                    : e?.service_type_name == 'Dine In'
                                    ? 'rgba(232, 116, 8, 0.3)'
                                    : 'rgba(117, 55, 199, 0.3)',
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                              gs.br5,
                              gs.mr8,
                              gs.ph5,
                              gs.pv5,
                              gs.mt10,
                            ]}>
                            <Flex direction="row" align="center">
                              <Image
                                source={
                                  e?.service_type_name == 'Delivery'
                                    ? require('../../../assets/Search/deliverynew.png')
                                    : e?.service_type_name == 'Takeaway'
                                    ? require('../../../assets/Search/takeawaynew.png')
                                    : require('../../../assets/Search/dineinnew.png')
                                }
                                style={
                                  e?.service_type_name == 'Delivery'
                                    ? styles.deliveryIcon
                                    : styles.servicesIcon
                                }
                              />
                              <Text
                                style={[
                                  {
                                    color:
                                      e?.service_type_name == 'Takeaway'
                                        ? '#00658a'
                                        : e?.service_type_name == 'Dine In'
                                        ? '#c76407'
                                        : '#7537c7',
                                    fontFamily: ts.jakartamedium,
                                  },
                                  gs.fs13,
                                  gs.ml5,
                                ]}>
                                {e?.service_type_name}
                              </Text>
                            </Flex>
                          </View>
                        ))}
                      </Flex>
                      <Flex direction="row" align="center" style={[gs.mt10]}>
                        <Flex direction="row" align="center" style={[gs.pv15]}>
                          {profile?.foodTypes?.length
                            ? profile.foodTypes.map((e, i) => (
                                <Flex
                                  direction="row"
                                  alignItems="center"
                                  key={i}>
                                  {e?.food_type_name == 'Veg' ? (
                                    <Image
                                      source={require('../../../assets/Common/veg.png')}
                                      style={styles.foodTypeimg}
                                    />
                                  ) : e?.food_type_name == 'Non Veg' ? (
                                    <Image
                                      source={require('../../../assets/Common/nonveg.png')}
                                      style={styles.foodTypeimg}
                                    />
                                  ) : null}
                                </Flex>
                              ))
                            : null}
                        </Flex>
                      </Flex>
                    </Flex>
                  </View>
                </Card>
              </View>
            </View>
            {/* ==========GALLERY========= */}
            {profile?.galleryImages?.length > 0 ? (
              <>
                <View style={[gs.pt20, gs.pb10, gs.ph15]}>
                  <Text
                    style={[
                      {fontFamily: ts.jakartabold, color: '#000'},
                      gs.fs20,
                    ]}>
                    Gallery
                  </Text>
                </View>
                <View style={[gs.ph12]}>
                  <GallerySlice />
                </View>
              </>
            ) : null}
            {/* =======SERVICES=========== */}
            <View style={[gs.pt20, gs.pb10, gs.ph15]}>
              <Text
                style={[
                  {fontFamily: ts.jakartabold, color: '#000'},
                  gs.fs20,
                  gs.pb20,
                ]}>
                Highlights
              </Text>

              <>
                <Flex direction="row" align="center">
                  <View>
                    <Image
                      source={require('../../../assets/Profile/kitchentype.png')}
                      style={styles.serviceicon}
                    />
                  </View>
                  <View>
                    <Text style={[styles.subtxt, gs.fs14]}>Kitchen Type</Text>
                    <Flex direction="row">
                      {profile?.kitchenTypes?.length ? (
                        profile?.kitchenTypes?.slice(0, 2)?.map((e, i) => (
                          <Text
                            style={[styles.servicedesc, gs.fs16, gs.mt5]}
                            numberOfLines={1}
                            key={i}>
                            {e.kitchen_type_name}
                            {profile?.kitchenTypes?.length == 1
                              ? null
                              : i != 1 && ','}{' '}
                          </Text>
                        ))
                      ) : (
                        <Text style={[styles.servicedesc, gs.fs16, gs.mt5]}>
                          N/A
                        </Text>
                      )}
                    </Flex>
                  </View>
                </Flex>
                <Divider style={gs.mv15} />
              </>

              <View>
                <Flex direction="row">
                  <View>
                    <Image
                      source={require('../../../assets/Profile/workinghourstiffin.png')}
                      style={styles.serviceicon}
                    />
                  </View>
                  <View>
                    <Text style={[styles.subtxt, gs.fs14]} numberOfLines={1}>
                      Working Hours
                    </Text>
                    {profile?.start_day ||
                    profile?.end_day ||
                    profile?.start_time ||
                    profile?.end_time ? (
                      <Text
                        style={[styles.servicedesc, gs.fs16, gs.mt5]}
                        numberOfLines={1}>
                        {profile?.start_day.slice(0, 3)} -{' '}
                        {profile?.end_day?.slice(0, 3)} |{' '}
                        {profile?.start_time
                          ? moment(profile.start_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )
                          : null}{' '}
                        -{' '}
                        {profile?.end_time
                          ? moment(profile.end_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )
                          : null}
                      </Text>
                    ) : (
                      <Text style={[styles.servicedesc, gs.fs16, gs.mt5]}>
                        N/A
                      </Text>
                    )}
                  </View>
                </Flex>
                <Divider style={gs.mv15} />
              </View>

              <Flex direction="row">
                <View>
                  <Image
                    source={require('../../../assets/Profile/workingsincetiffin.png')}
                    style={styles.serviceicon}
                  />
                </View>
                <View>
                  <View>
                    <Text style={[styles.subtxt, gs.fs14]}>Working Since</Text>
                    {profile?.working_since ? (
                      <Text
                        style={[styles.servicedesc, gs.fs16, gs.mt5]}
                        numberOfLines={1}>
                        {profile?.working_since}
                      </Text>
                    ) : (
                      <Text style={[styles.servicedesc, gs.fs16, gs.mt5]}>
                        N/A
                      </Text>
                    )}
                  </View>
                </View>
              </Flex>
            </View>

            {/* =====ABOUT US / BRANCHES========== */}
            <View style={[gs.ph15, gs.mt20]}>
              <Text
                style={[
                  {fontFamily: ts.jakartabold, color: '#000'},
                  gs.fs20,
                  gs.pb10,
                ]}>
                About Us
              </Text>
              {profile?.about_description?.length ? (
                <ReadMore
                  style={[
                    {
                      ...styles.subtxt,
                      fontFamily: ts.jakartaregular,
                      color: ts.primarytext,
                    },
                    gs.fs16,
                  ]}
                  seeLessText="read less"
                  seeMoreText="read more"
                  seeLessStyle={{
                    color: ts.primary,
                    fontFamily: ts.jakartaregular,
                  }}
                  seeMoreStyle={{
                    color: ts.primary,
                    fontFamily: ts.jakartaregular,
                  }}
                  numberOfLines={5}>
                  {profile?.about_description}{' '}
                </ReadMore>
              ) : (
                <Text
                  style={[
                    {
                      ...styles.subtxt,
                      fontFamily: ts.jakartaregular,
                      color: ts.primarytext,
                    },
                    gs.fs16,
                  ]}>
                  N/A
                </Text>
              )}
            </View>

            {profile?.branches?.length ? (
              <View style={[gs.ph15, gs.mt20]}>
                <Text
                  style={[
                    {fontFamily: ts.jakartabold, color: '#000'},
                    gs.fs20,
                    gs.pb10,
                  ]}>
                  Our Branches
                </Text>
                <Flex direction="row" align="center" flexWrap="wrap">
                  {profile?.branches?.length ? (
                    profile?.branches
                      ?.slice(0, branchStretch ? profile.branches.length : 5)
                      .map((e, i) => (
                        <Text
                          style={[
                            styles.subtxt,
                            gs.fs16,
                            {
                              fontFamily: ts.primarylight,
                              color: ts.primarytext,
                            },
                          ]}>
                          {e?.city}
                          {i !== profile?.branches?.length - 1 ? ',' : '.'}{' '}
                        </Text>
                      ))
                  ) : (
                    <Text
                      style={[
                        styles.subtxt,
                        gs.fs16,
                        {fontFamily: ts.jakartaregular, color: ts.primarytext},
                      ]}>
                      -
                    </Text>
                  )}
                  {profile?.branches?.length > 5 && (
                    <TouchableOpacity
                      onPress={() => {
                        setBranchStretch(!branchStretch);
                      }}>
                      <Text
                        style={[styles.subtxt, gs.fs10, {color: ts.secondary}]}>
                        {!branchStretch ? 'View all' : 'View less'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Flex>
              </View>
            ) : null}

            {/* ======SIMILAR/POPULAR CATERERS======
        <View style={[gs.ph5]}>
          {showPopular ? (
            <Text
              style={[
                {fontFamily: ts.secondarymedium, color: ts.primarytext},
                gs.fs15,
              ]}>
              Similar / Popular Tiffins in your area
            </Text>
          ) : null}

          <PopularTiffinsSlice
            data={searchitems}
            location={location}
            setShowPopular={setShowPopular}
            vendorType="Tiffins"
          />
        </View>
        {showPopular ? (
          <View style={[gs.ph5, gs.pb15]}>
            <Divider />
          </View>
        ) : null} */}

            {/* =======REVIEWS========== */}
            <View style={[gs.ph15, gs.mt20]}>
              {showReviews ? (
                <Text
                  style={[
                    {fontFamily: ts.secondarymedium, color: '#000'},
                    gs.fs20,
                    gs.pb10,
                    gs.mb10,
                  ]}>
                  Reviews
                </Text>
              ) : null}

              <ReviewSlice
                vendor_id={vendor_id}
                from={'Tiffins'}
                setShowReviews={setShowReviews}
              />
            </View>

            {/* =====WRITE REVIEW======== */}
            <View style={[gs.ph5]}>
              <Center>
                <Text
                  style={[
                    {fontFamily: ts.jakartabold, color: '#000'},
                    gs.fs20,
                    gs.pt20,
                  ]}>
                  Write your Review
                </Text>
              </Center>
              <View style={[gs.mh12, gs.mv12]}>
                <Ratings
                  rating={rating}
                  setRating={setRating}
                  from="Tiffins"
                  vendorName={profile?.vendor_service_name}
                />
              </View>
              <Text
                style={[
                  gs.fs14,
                  gs.ph15,
                  {color: ts.primarytext, fontFamily: ts.jakartaregular},
                  gs.pb10,
                ]}>
                Share your experience
              </Text>
              <TextInput
                placeholder="Add Comments"
                style={[
                  {
                    ...styles.issuecontainer,
                    borderColor: cmtfocus ? ts.primary : '#ccc',
                    fontFamily: ts.secondaryregular,
                    backgroundColor: '#eee',
                  },
                  gs.mh12,
                  gs.br10,
                ]}
                placeholderTextColor="#777"
                multiline
                onFocus={() => {
                  setCmtfocus(true);
                  setTimeout(() => {
                    scrollViewRef.current.scrollToEnd({animated: true});
                  }, 300);
                }}
                onBlur={() => setCmtfocus(false)}
                value={review}
                onChangeText={text => setReview(text)}
              />
              {!createLoading ? (
                <Center style={[gs.mh10]}>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(review, rating);
                      if ((review && rating > 0) || rating > 0) {
                        dispatch(
                          createReview({
                            vendor_id,
                            review_text: review,
                            rating: rating,
                          }),
                        );
                        setReview(null);
                        setRating(0);
                      } else {
                        showMessage({
                          message: 'Request Failed!',
                          description: 'Please select Rating',
                          type: 'danger',
                        });
                      }
                    }}
                    activeOpacity={0.7}
                    style={[
                      {
                        ...styles.btn,
                        backgroundColor:!review && rating == 0
                          ? '#eee'
                          : 'rgba(217, 130, 43, 0.2)',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.subtxt,
                        gs.fs17,
                        {
                          color: !review && rating == 0 ? '#777' : ts.primary,
                          fontFamily: ts.jakartabold,
                        },
                      ]}>
                      Submit Review
                    </Text>
                  </TouchableOpacity>
                </Center>
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
          <View style={styles.leveler}></View>
          <Card
            style={[
              {borderRadius: 0, backgroundColor: '#fff'},
              gs.ph10,
              gs.pb10,
              gs.pt5,
            ]}>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              style={[gs.pb10, gs.pt5]}>
              <View>
                <Text
                  style={[
                    gs.fs15,
                    {color: ts.secondarytext, fontFamily: ts.secondarylight},
                  ]}>
                  Starting Price / Plate
                </Text>
                <Text
                  style={[
                    {color: '#000', fontFamily: ts.jakartabold},
                    gs.fs20,
                  ]}>
                  ₹ {profile?.start_price ? profile.start_price : 'N/A'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  profile?.business_phone_number
                    ? Linking.openURL(`tel:${profile?.business_phone_number}`)
                    : Alert.alert('No Phone Number Found.');
                }}>
                <ThemeSepBtn
                  btntxt="Call Now"
                  themecolor={ts.primary}
                  rounded={true}
                />
              </TouchableOpacity>
            </Flex>
          </Card>
        </>
      ) : null}
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    top: '-10@ms',
  },
  heading: {
    fontFamily: ts.jakartabold,
    color: '#000',
    fontSize: '18@ms',
  },
  labelcontainer: {
    height: '25@ms',
    width: '80@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15@ms',
  },
  area: {
    fontFamily: ts.jakartamedium,
    color: ts.secondarytext,
    marginVertical: '5@ms',
    width: '100%',
  },
  subtxt: {
    fontFamily: ts.jakartamedium,
    color: ts.secondarytext,
    // lineHeight: '17@ms',
  },

  servicecontainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '110@ms',
  },
  serviceicon: {
    height: '48@ms',
    width: '48@ms',
    marginRight: '15@ms',
  },
  usericon: {
    fontSize: '25@ms',
    color: ts.secondary,
  },
  servicedesc: {
    fontFamily: ts.jakartasemibold,
    color: ts.primarytext,
  },
  issuecontainer: {
    height: '100@ms',
    paddingHorizontal: '10@ms',
    paddingVertical: '10@ms',
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
    backgroundColor: ts.primary,
  },
  foodTypeimg: {
    height: '15@ms',
    width: '15@ms',
    marginRight: '5@ms',
  },
  backicon: {
    height: '40@ms',
    width: '40@ms',
  },
  topicons: {
    position: 'absolute',
    paddingHorizontal: '15@ms',
    marginTop: '10@ms',
  },
  details: {
    backgroundColor: '#fff',
    marginHorizontal: '10@ms',
    marginTop: '-130@ms',
  },
  profile: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: '50@ms',
    borderWidth: 2,
    borderColor: '#000',
  },
  ratingicon: {
    height: '23@ms',
    width: '23@ms',
    marginBottom: '5@ms',
  },
  starIcon: {
    height: '23@ms',
    width: '23@ms',
    marginBottom: '5@ms',
    marginRight: '1@ms',
  },
  divider: {
    borderRightWidth: 0.5,
    borderRightColor: '#ddd',
    height: '32@ms',
  },
  servicesIcon: {
    height: '16@ms',
    width: '16@ms',
    top: '2@ms',
  },
  deliveryIcon: {
    height: '16@ms',
    width: '19@ms',
    top: '2@ms',
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
  startPrice: {
    color: '#000',
    fontFamily: ts.jakartasemibold,
  },
  ratingiconcontainer: {
    // backgroundColor:'#ff0',
    width: '31%',
  },
  label: {
    height: '25@ms',
    maxWidth: '83@ms',
    top: -1,
  },
  leveler: {
    marginTop: '-10@ms',
  },
});
