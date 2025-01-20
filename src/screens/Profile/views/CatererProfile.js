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
  Linking,
  Alert,
  Pressable,
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
import {
  updateWishList,
  wishDetails,
} from '../../Home/controllers/WishListController';
import Ratings from '../../../components/Ratings';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {getSubscription} from '../../Home/controllers/FilterMainController';
import {ProfileSkeleton} from '../../../components/skeletons/ProfileSkeleton';
import CuisinesExpanded from '../../../components/CuisinesExpanded';
import moment from 'moment';

export default function CatererProfile({navigation, route}) {
  const {branch_id, vendor_id, location} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [cmtfocus, setCmtfocus] = useState(false);
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state.vendor);
  const [stretch, setStretch] = useState(false);
  const [branchStretch, setBranchStretch] = useState(false);
  const [review, setReview] = useState(null);
  const {createLoading} = useSelector(state => state.review);
  const [profile, setProfile] = useState(null);
  const [rating, setRating] = useState(0);
  const [showPopular, setShowPopular] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (branch_id && vendor_id) {
      dispatch(getVendorProfile({branch_id, vendor_id}));
      dispatch(getUser());
      dispatch(getSubscription({from: 'Caterers'}));
    }
  }, [branch_id, vendor_id]);
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);
  return (
    <ScreenWrapper>
      {loading ? null : profile?.vendor_service_name ? ( // <ProfileSkeleton />
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
              <View>
                {profile?.bennerMenuMixGalleryImages ? (
                  <ProfileBanners
                    catererBanners={profile?.bennerMenuMixGalleryImages}
                  />
                ) : (
                  <View style={styles.dummyImage}></View>
                )}
              </View>
              <View style={styles.topicons}>
                <SafeAreaView>
                  {Platform == 'android' ? (
                    <View style={{paddingTop: StatusBar.currentHeight}}></View>
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
            </View>
            {/* Top card */}

            <Card style={styles.details}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {profile?.subscription_type_name == 'popular' ? (
                  <Image
                    source={require('../../../assets/Common/popularlabel.png')}
                    style={styles.label}
                  />
                ) : profile?.subscription_type_name == 'branded' ? (
                  <Image
                    source={require('../../../assets/Common/popularlabel.png')}
                    style={styles.label}
                  />
                ) : null}
              </View>
              <View style={[gs.p15]}>
                <Flex direction="row" align="center">
                  {profile?.bennerMenuMixGalleryImages?.length && (
                    <Image
                      source={{
                        uri: profile?.bennerMenuMixGalleryImages[0]
                          ?.image_names[0]?.medium,
                      }}
                      style={styles.profile}
                    />
                  )}
                  <View style={[gs.ml15]}>
                    <Text style={{...styles.heading, width: width / 1.5}}>
                      {profile?.vendor_service_name}
                    </Text>
                    {profile?.formatted_address && (
                      <Text
                        style={[gs.fs13, {...styles.area, width: width / 1.5}]}>
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
                    <Image
                      source={require('../../../assets/Common/rating1.png')}
                      style={styles.starIcon}
                    />
                    <Text style={[styles.startPrice, gs.fs14]}>
                      4.5 ({profile?.review_count})
                    </Text>
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
                            from: 'Caterer',
                          },
                        });
                      }}>
                      <Flex align="center">
                        <Image
                          source={require('../../../assets/Profile/location.png')}
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
                              vendor_type: 'Caterer',
                              status: profile?.is_wishlisted == true ? 0 : 1,
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
                          style={[gs.fs20, {color: ts.secondary}, gs.h25]}
                        />
                      </TouchableOpacity>
                      <Text style={[styles.startPrice, gs.fs14]}>Wishlist</Text>
                    </Flex>
                  </View>
                </Flex>
                {/* cuisines */}
                <View
                  style={[
                    {backgroundColor: '#fdf3f2'},
                    gs.mt10,
                    gs.pv10,
                    gs.ph10,
                    gs.br4,
                  ]}>
                  <Text style={[styles.startPrice, gs.fs16]}>Cuisines</Text>
                  <Flex
                    direction="row"
                    align="center"
                    flexWrap="wrap"
                    style={[gs.mt5]}>
                    {profile?.cuisines?.slice(0, 6)?.map((e, i) => (
                      <Text
                        style={[
                          gs.fs13,
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
                              color: ts.secondary,
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
                      from={'Caterers'}
                    />
                  </Flex>
                </View>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Flex direction="row" align="center" style={[gs.mt7, gs.mb5]}>
                    {profile?.servingTypes?.map((e, i) => (
                      <View
                        key={i}
                        style={[
                          {
                            backgroundColor:
                              e?.serving_type_name == 'Buffet Service'
                                ? 'rgba(62, 187, 233, 0.3)'
                                : 'rgba(232, 116, 8, 0.3)',
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                          gs.br5,
                          gs.mr10,
                          gs.ph5,
                          gs.pv5,
                          gs.mt10,
                        ]}>
                        <Flex direction="row" align="center">
                          <Image
                            source={
                              e?.serving_type_name == 'Buffet Service'
                                ? require('../../../assets/Search/buffet.png')
                                : require('../../../assets/Search/table.png')
                            }
                            style={styles.servicesIcon}
                          />
                          <Text
                            style={[
                              {
                                color:
                                  e?.serving_type_name == 'Buffet Service'
                                    ? '#00658a'
                                    : '#c76407',
                                fontFamily: ts.jakartamedium,
                              },
                              gs.fs13,
                              gs.ml5,
                            ]}>
                            {e?.serving_type_name == 'Buffet Service'
                              ? 'Buffet'
                              : 'Table'}
                          </Text>
                        </Flex>
                      </View>
                    ))}
                  </Flex>
                  <Flex direction="row" align="center" style={[gs.mt5]}>
                    <Flex direction="row" align="center" style={[gs.pv15]}>
                      {profile?.foodTypes?.length
                        ? profile.foodTypes.map((e, i) => (
                            <Flex direction="row" alignItems="center" key={i}>
                              {e?.food_type_name == 'Veg' ? (
                                <Image
                                  source={require('../../../assets/Common/veg.png')}
                                  style={[styles.foodTypeimg, gs.mr5]}
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
          {/* Gallery */}
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
                    source={require('../../../assets/Profile/servicetype.png')}
                    style={styles.serviceicon}
                  />
                </View>
                <View>
                  <Text style={[styles.subtxt, gs.fs14]}>Service Type</Text>
                  <Flex direction="row">
                    {profile?.serviceTypes?.length ? (
                      profile?.serviceTypes?.slice(0, 2)?.map((e, i) => (
                        <Text
                          style={[styles.servicedesc, gs.fs15, gs.mt5]}
                          numberOfLines={1}
                          key={i}>
                          {e.service_type_name}
                          {profile?.serviceTypes?.length == 1
                            ? null
                            : i != 1 && ','}{' '}
                        </Text>
                      ))
                    ) : (
                      <Text style={[styles.servicedesc, gs.fs15, gs.mt5]}>
                        N/A
                      </Text>
                    )}
                  </Flex>
                </View>
              </Flex>
              <Divider style={gs.mv15} />
            </>

            <>
              <Flex direction="row">
                <View>
                  <Image
                    source={require('../../../assets/Profile/ordercapacity.png')}
                    style={styles.serviceicon}
                  />
                </View>
                <View>
                  <View>
                    <Text style={[styles.subtxt, gs.fs14]}>Order Capacity</Text>
                    {profile?.minimum_capacity || profile?.maximum_capacity ? (
                      <Text
                        style={[styles.servicedesc, gs.fs15, gs.mt5]}
                        numberOfLines={1}>
                        {profile?.minimum_capacity
                          ? profile.minimum_capacity
                          : '0'}{' '}
                        -{' '}
                        {profile?.maximum_capacity
                          ? profile.maximum_capacity
                          : 'N/A'}{' '}
                        Plates
                      </Text>
                    ) : (
                      <Text style={[styles.servicedesc, gs.fs15, gs.mt5]}>
                        N/A
                      </Text>
                    )}
                  </View>
                </View>
              </Flex>
              <Divider style={gs.mv15} />
            </>

            <View>
              <Flex direction="row">
                <View>
                  <Image
                    source={require('../../../assets/Profile/workinghours.png')}
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
                      style={[styles.servicedesc, gs.fs15, gs.mt5]}
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
                        ? moment(profile.end_time, 'HH:mm:ss').format('hh:mm A')
                        : null}
                    </Text>
                  ) : (
                    <Text style={[styles.servicedesc, gs.fs15, gs.mt5]}>
                      N/A
                    </Text>
                  )}
                </View>
              </Flex>
              <Divider style={gs.mv15} />
            </View>

            <View>
              <Flex direction="row">
                {/* <FontAweSomeIcon name="user-group" style={styles.usericon} /> */}
                <Image
                  source={require('../../../assets/Profile/totalstaffs.png')}
                  alt="staff"
                  style={styles.serviceicon}
                />
                <View>
                  <Text style={[styles.subtxt, gs.fs14]}>
                    Total No of Staffs
                  </Text>
                  {profile?.total_staffs_approx ? (
                    <Text
                      style={[styles.servicedesc, gs.fs15, gs.mt5]}
                      numberOfLines={1}>
                      {profile?.total_staffs_approx
                        ? profile.total_staffs_approx
                        : '-'}
                    </Text>
                  ) : (
                    <Text style={[styles.servicedesc, gs.fs15, gs.mt5]}>
                      N/A
                    </Text>
                  )}
                </View>
              </Flex>
              <Divider style={gs.mv15} />
            </View>

            {profile?.working_since ? (
              <Flex direction="row">
                <Image
                  source={require('../../../assets/Profile/workingsince.png')}
                  alt="staff"
                  style={styles.serviceicon}
                />
                <View>
                  <Text style={[styles.subtxt, gs.fs14]}>Working Since</Text>
                  <Text
                    style={[styles.servicedesc, gs.fs15, gs.mt5]}
                    numberOfLines={1}>
                    {profile?.working_since ? profile.working_since : '-'}
                  </Text>
                </View>
              </Flex>
            ) : null}
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
                  color: ts.secondary,
                  fontFamily: ts.jakartaregular,
                }}
                seeMoreStyle={{
                  color: ts.secondary,
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
                            fontFamily: ts.jakartaregular,
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

          {/* <View style={[gs.ph5, gs.pb15]}>
            <Divider />
          </View> */}
          {/*======SIMILAR/POPULAR CATERERS====== */}
          {/* <View style={[gs.ph5]}>
            {showPopular ? (
              <Text
                style={[
                  {fontFamily: ts.secondarymedium, color: ts.primarytext},
                  gs.fs15,
                ]}>
                Similar / Popular Caterers in your area
              </Text>
            ) : (
              false
            )}

            <PopularCat
              data={searchitems}
              location={location}
              vendorType="Caterer"
              setShowPopular={setShowPopular}
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
                  {fontFamily: ts.jakartabold, color: '#000'},
                  gs.fs20,
                  gs.pb10,
                  gs.mb10,
                ]}>
                Reviews
              </Text>
            ) : null}

            <ReviewSlice
              vendor_id={vendor_id}
              from={'Caterers'}
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
                from="Caterer"
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
                  borderColor: cmtfocus ? ts.secondary : '#ccc',
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
                    review &&
                      rating &&
                      dispatch(
                        createReview({
                          vendor_id,
                          review_text: review,
                          rating: rating,
                        }),
                      );
                    setReview(null);
                  }}
                  activeOpacity={0.7}
                  style={[
                    {
                      ...styles.btn,
                      backgroundColor: !review ? '#eee' : '#fbe3e1',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.subtxt,
                      gs.fs17,
                      {
                        color: !review ? '#777' : ts.secondary,
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
      ) : null}
      <View style={styles.leveler}></View>
      {!loading && profile?.vendor_service_name ? (
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
                  gs.fs14,
                  {color: ts.secondarytext, fontFamily: ts.jakartaregular},
                ]}>
                Starting Price / Plate
              </Text>
              <Text
                style={[{color: '#000', fontFamily: ts.jakartabold}, gs.fs20]}>
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
                btntxt="Book Now"
                themecolor={ts.secondary}
                rounded={true}
              />
            </TouchableOpacity>
          </Flex>
        </Card>
      ) : null}
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {flex: 1, backgroundColor: '#fff', top: '-10@ms'},
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
  },
  subtxt: {
    fontFamily: ts.jakartamedium,
    color: ts.secondarytext,
    // lineHeight: '17@ms',
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
  staffimg: {
    height: '30@ms',
    width: '30@ms',
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
    backgroundColor: ts.secondary,
  },
  foodTypeimg: {
    height: '15@ms',
    width: '15@ms',
    marginRight: '2@ms',
    top: '2@ms',
  },
  topicons: {
    position: 'absolute',
    paddingHorizontal: '15@ms',
    marginTop: '10@ms',
  },
  backicon: {
    height: '40@ms',
    width: '40@ms',
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
    marginRight:'1@ms'
  },
  startPrice: {
    color: '#000',
    fontFamily: ts.jakartasemibold,
  },
  ratingiconcontainer: {
    // backgroundColor:'#ff0',
    width: '31%',
    justifyContent: 'center',
    alignItems: 'center',
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
  btn: {
    backgroundColor: '#fbe3e1',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10@ms',
    borderRadius: '20@ms',
    marginVertical: '10@ms',
  },
  label: {
    height: '30@ms',
    maxWidth: '150@ms',
  },
  leveler: {
    marginTop: '-10@ms',
  },
  dummyImage: {
    height: '320@ms',
  },
});
