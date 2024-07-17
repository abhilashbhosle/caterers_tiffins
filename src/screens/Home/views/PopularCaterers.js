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
  getCaterersSearch,
  setLocationres,
} from '../controllers/SearchController';
import {
  getSubscription,
  updateSubscriptions,
} from '../controllers/FilterMainController';
import {startLoader} from '../../../redux/CommonSlicer';
function PopularCaterers() {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularLoading, popularData, popularError} = useSelector(
    state => state.home,
  );
  const {subData} = useSelector(state => state?.filterCater);
  const {height, width} = Dimensions.get('screen');
  const ref = useRef();

  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const [segre, setSegre] = useState({
    serving_types_filter: [],
    service_types_filter: [],
    occasions_filter: [],
    price_ranges: [],
    head_count_ranges: [],
    order_by_filter: [],
    cuisines_filter: [],
    search_term: '',
    food_types_filter: [],
    subscription_types_filter: [],
    meal_times_filter: [],
    kitchen_types_filter: [],
  });

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
        area:userDetails[0]?.area
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
        await dispatch(
          getCaterersSearch({
            filterKey: 'subscription',
            filteredData: subscription_types_filter,
            from: 'Caterers',
            ssd: today,
            sse: dateAfter7Days,
            location: location,
            segre,
          }),
        );
        await dispatch(updateSubscriptions(result));
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
      console.log('error in handleBranded');
    } finally {
      setTimeout(() => {
        dispatch(startLoader(false));
      }, 1000);
    }
  };

 

  const renderItem = ({item}) => {
    return (
      <Card style={{...styles.cardContainer, width}}>
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
              style={[{...styles.img, width: width}]}
              imageStyle={styles.imageStyle}
              alt={item.name}
            />
          ) : (
            <View
              style={[{...styles.img, width: width}, styles.imageStyle]}></View>
          )}

          <LinearGradient
            colors={['#c33332', '#0005']}
            start={{x: 0.0, y: Platform.OS == 'ios' ? 1.2 : 1.8}}
            end={{x: 0.0, y: 0.0}}
            style={[
              {
                ...styles.overlay,
                width: width,
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
      {/* <FlatList
        data={popularcaterers}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      /> */}
      {popularData?.length ? (
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
      ) : null}
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
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '15@ms',
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
