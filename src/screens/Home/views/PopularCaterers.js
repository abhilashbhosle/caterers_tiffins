import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {popularcaterers} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {Center, Flex, Image} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {getPopular, updateSearch} from '../controllers/HomeController';
import {styles} from '../styles/PopularCatererStyles';
import {
  clearCaterers,
  getCaterersSearch,
  setLocationres,
} from '../controllers/SearchController';
import {
  getSubscription,
  updateSubscriptions,
} from '../controllers/FilterMainController';
import {startLoader} from '../../../redux/CommonSlicer';
import PopularCatSkel from '../../../components/skeletons/PopularCatSkel';
import {setSearchHomeJson} from '../controllers/SearchCommonController';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MoreSecondarybtn from '../../../components/MoreSecondarybtn';

function PopularCaterers() {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularLoading, popularData, popularError} = useSelector(
    state => state.home,
  );
  const {subData, foodTypeData} = useSelector(state => state?.filterCater);
  const {height, width} = Dimensions.get('screen');
  const ref = useRef();

  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (userDetails?.length && userDetails[0]?.formatted_address) {
      dispatch(
        getPopular({
          latitude: userDetails[0]?.latitude,
          longitude: userDetails[0]?.longitude,
          vendorType: 'Caterer',
          subscriptionType: '2',
        }),
      );
    }
  }, [userDetails]);

  const handlePopular = async () => {
    try {
      dispatch(startLoader(true));
      let location = {
        latitude: userDetails[0]?.latitude,
        longitude: userDetails[0]?.longitude,
        city: userDetails[0]?.city,
        place_id: userDetails[0]?.place_id,
        pincode: userDetails[0]?.pincode,
        area: userDetails[0]?.area,
      };

      dispatch(setLocationres(location));
      let today = new Date();
      let dateAfter7Days = new Date();
      dateAfter7Days.setDate(today.getDate() + 7);

      let result = await subData.map((item, i) =>
        item.id == 2
          ? {...item, selected: (item.selected = '1')}
          : {...item, selected: '0'},
      );

      const subscription_types_filter = await result.map(e => ({
        subscription_type_id: parseInt(e.id),
        selected: e.selected,
      }));
      if (subscription_types_filter?.length) {
        await dispatch(updateSubscriptions(result));
        dispatch(clearCaterers());
        await setSearchHomeJson({
          latitude: location?.latitude,
          longitude: location?.longitude,
          city: location?.city,
          place_id: location?.place_id,
          pincode: location?.pincode,
          area: location?.area,
          from: 'Caterers',
          selectedStartDate: today,
          selectedEndDate: dateAfter7Days,
          foodTypeData,
          subData: result,
        });
        navigation.navigate('PageStack', {
          screen: 'SearchMain',
          params: {
            from: 'Caterers',
            ssd: today,
            sse: dateAfter7Days,
            move: 'forward',
          },
        });
      }
    } catch (err) {
      console.log('error in handleBranded', err);
    } finally {
      setTimeout(() => {
        dispatch(startLoader(false));
      }, 1000);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Card style={{...styles.cardContainer, width: width - 100}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('PageStack', {
              screen: 'CatererProfile',
              params: {
                branch_id: item?.id,
                vendor_id: item?.vendor_id,
                location: {
                  latitude: userDetails[0]?.latitude,
                  longitude: userDetails[0]?.longitude,
                  city: userDetails[0]?.city,
                  place_id: userDetails[0]?.place_id,
                  pincode: userDetails[0]?.pincode,
                },
              },
            });
          }}>
          {item?.gallery_images?.['vendor-banner']?.length > 0 ? (
            <ImageBackground
              source={{
                uri: item?.gallery_images?.['vendor-banner'][0]?.image_name[0]
                  ?.medium,
              }}
              style={[{...styles.img, width: '100%'}]}
              imageStyle={styles.imageStyle}
              alt={item.name}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                style={[Platform.OS == 'ios' && gs.mt15, gs.ph10,styles.iconcontaier]}>
                <Image
                  source={require('../../../assets/Common/veg.png')}
                  style={[styles.icon, gs.mr5]}
                  alt="vegicon"
                />
                <Image
                  source={require('../../../assets/Common/nonveg.png')}
                  style={styles.icon}
                  alt="vegicon"
                />
              </Flex>
              <LinearGradient
                colors={['#000f', 'transparent']}
                start={{x: 0.0, y: Platform.OS == 'ios' ? 1.2 : 1.8}}
                end={{x: 0.0, y: 0.0}}
                style={[
                  {
                    ...styles.overlay,
                    width: width - 100,
                  },
                ]}>
                  <View style={[gs.mt5]}>
                <Flex
                  direction="row"
                  // alignItems="center"
                  style={[gs.ph10, gs.mt20]}>
                  <Image
                    source={{
                      uri: item?.gallery_images?.['vendor-brand-logo'][0]
                        ?.image_name[0]?.medium,
                    }}
                    style={styles.profile}
                    alt="profile"
                  />
                  <View style={[gs.mt20,styles.txtcontainer]}>
                    <Text
                      style={[
                        gs.fs16,
                        gs.ml10,
                        {color: '#fff', fontFamily: ts.jakartasemibold},
                        gs.mt20,
                      ]}
                      numberOfLines={1}>
                      {item?.catering_service_name?.length > 20
                        ? `${item?.catering_service_name?.slice(0, 20)}..`
                        : item?.catering_service_name}
                    </Text>
                    <Text
                      style={[
                        gs.fs14,
                        gs.ml10,
                        {color: '#f5f5f5', fontFamily: ts.jakartaregular},
                        Platform.OS == 'ios' && gs.pv2,
                      ]}>
                      {item?.street_name ? item.street_name : item?.area},{' '}
                      {item?.city}
                    </Text>
                  </View>
                </Flex>
                </View>
              </LinearGradient>
            </ImageBackground>
          ) : (
            <View
              style={[
                {...styles.img, justifyContent: 'center', alignItems: 'center'},
                styles.imageStyle,
              ]}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs25]}
              />
            </View>
          )}
          <View>
            <Flex
              direction="row"
              justifyContent="space-between"
              // alignItems="center"
              style={[gs.ph10, gs.mt10]}>
              <Flex>
                <Text style={styles.startPrice}>
                  ₹ {item?.start_price ? item.start_price : 'N/A'}
                </Text>
                <Text style={[gs.fs11, styles.area, gs.pl2,gs.mt2]}>Starts from</Text>
              </Flex>
              <Flex direction="row" align="center">
                <Image
                  source={require('../../../assets/Common/rating.png')}
                  style={styles.icon}
                  alt="rating"
                />
                <Text style={[styles.startPrice, gs.fs14, gs.ph3]}>4.5</Text>
                <Text style={[styles.area, gs.ph2, gs.fs12]}>
                  ({item?.review_count})
                </Text>
              </Flex>
            </Flex>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };
  if (popularError) {
    return (
      <View style={[gs.mt15, gs.mb10, gs.ph15]}>
        <Flex direction="row" alignItems="center" justify="space-between">
          <View>
            <Text
              style={[
                {fontFamily: ts.jakartabold, color: ts.primarytext},
                gs.fs18,
                // gs.mb10,
              ]}>
              Popular Caterers
            </Text>
            <Text
              style={[
                {fontFamily: ts.jakartasemibold, color: ts.secondarytext},
                gs.fs13,
                gs.mb10,
              ]}>
              {userDetails?.length && userDetails[0]?.city}
            </Text>
          </View>
        </Flex>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.mt15, gs.mb10, gs.ph15]}>
        <Flex direction="row" justify="space-between">
          <View>
            <Text
              style={[
                {fontFamily: ts.jakartabold, color: ts.primarytext},
                gs.fs18,
                gs.mb5,
              ]}>
              Popular Caterers
            </Text>
            <Text
              style={[
                {fontFamily: ts.jakartasemibold, color: ts.secondarytext},
                gs.fs13,
                gs.mb5,
              ]}>
              {userDetails?.length && userDetails[0]?.city}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={handlePopular}>
            <MoreSecondarybtn />
          </TouchableOpacity>
        </Flex>
      </View>
      {popularLoading ? (
        <Flex direction="row" style={[gs.ph15]}>
          {[1, 2]?.map((e, i) => (
            <View style={{...styles.cardContainer, width: width - 100}} key={i}>
              <PopularCatSkel />
            </View>
          ))}
        </Flex>
      ) : null}
      {popularData?.length && !popularLoading && !popularError ? (
        <FlatList
          data={popularData}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : null}

      {/* {popularData?.length ? (
        <Center>
          <Carousel
            loop
            width={width}
            height={styles.cardContainer.height}
            autoPlay={true}
            data={popularData}
            scrollAnimationDuration={2000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={renderItem}
            style={styles.contentContainerStyle}
            mode="parallax"
            parallaxScrollingOffset={50}
            parallaxScrollingScale={0.9}
          />
        </Center>
      ) : null} */}
    </>
  );
}
export default memo(PopularCaterers);
