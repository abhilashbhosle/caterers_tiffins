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
import { setSearchHomeJson } from '../controllers/SearchCommonController';
function PopularCaterers() {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularLoading, popularData, popularError} = useSelector(
    state => state.home,
  );
  const {subData,foodTypeData} = useSelector(state => state?.filterCater);
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
      console.log('error in handleBranded',err);
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
              alt={item.name}
            />
          ) : (
            <View
              style={[{...styles.img, width: width}, styles.imageStyle]}></View>
          )}

          <LinearGradient
            colors={['#0005', '#0005']}
            start={{x: 0.0, y: Platform.OS == 'ios' ? 1.2 : 1.8}}
            end={{x: 0.0, y: 0.0}}
            style={[
              {
                ...styles.overlay,
                width: width - 100,
              },
            ]}>
            <View></View>
            <View>
              <Text
                style={[
                  gs.fs14,
                  {color: '#fff', fontFamily: ts.secondarysemibold},
                ]}
                numberOfLines={1}>
                {item?.catering_service_name}
              </Text>
              <Text
                style={[
                  gs.fs12,
                  {color: '#fff', fontFamily: ts.secondaryregular},
                  Platform.OS == 'ios' && gs.pv2,
                ]}>
                {item?.street_name ? item.street_name : item?.area},{' '}
                {item?.city}
              </Text>
              <Text
                style={[
                  gs.fs12,
                  {color: '#fff', fontFamily: ts.secondaryregular},
                ]}>
                Veg | Non-Veg
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Card>
    );
  };
  if (popularError) {
    return (
      <View style={[gs.mt15, gs.mb10, gs.ph15]}>
        <Flex direction="row" alignItems="center" justify="space-between">
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs13,
            ]}>
            Popular Caterers in {userDetails?.length && userDetails[0]?.city}
          </Text>
        </Flex>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.mt15, gs.mb10, gs.ph15]}>
        <Flex direction="row" alignItems="center" justify="space-between">
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs13,
            ]}>
            Popular Caterers in {userDetails?.length && userDetails[0]?.city}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.forwardicon,
              backgroundColor: ts.secondary,
            }}
            onPress={handlePopular}>
            <FeatherIcons
              name="arrow-right"
              style={[gs.fs14, {color: '#fff'}]}
            />
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
      {popularData?.length && !popularLoading && !popularError? (
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
const styles = ScaledSheet.create({
  forwardicon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20@ms',
    width: '20@ms',
  },
  img: {
    height: '130@ms',
    resizeMode: 'cover',
  },
  cardContainer: {
    height: '130@ms',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
    marginRight: '10@ms',
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '10@ms',
    paddingHorizontal: '15@ms',
  },
  imageStyle: {
    borderRadius: '10@ms',
    position: 'absolute',
  },
  overlay: {
    height: '130@ms',
    position: 'absolute',
    borderRadius: '10@ms',
    justifyContent: 'space-between',
    paddingBottom: '10@ms',
    paddingLeft: '10@ms',
  },
  typeicon: {
    height: '16@ms',
    width: '16@ms',
  },
});
