import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Center, FlatList, Flex} from 'native-base';
import {branded, explorecusines} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {
  getBranded,
  getPopulaTiffin,
  updateSearch,
} from '../controllers/HomeController';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {BrandedSkeleton} from '../../../components/skeletons/BrandedSkeletons';
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
import {setSearchHomeJson} from '../controllers/SearchCommonController';
import {styles} from '../styles/PopularTiffinStyles';
import MorePrimarybtn from '../../../components/MorePrimarybtn';

function PopularTiffins() {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularTLoading, popularTData, popularTError} = useSelector(
    state => state.home,
  );
  const {subData, foodTypeData} = useSelector(state => state?.filterCater);
  const route = useRoute();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getSubscription({from: 'Tiffins'}));
    }, [route]),
  );

  useEffect(() => {
    if (userDetails?.length && userDetails[0]?.formatted_address) {
      dispatch(
        getPopulaTiffin({
          latitude: userDetails[0]?.latitude,
          longitude: userDetails[0]?.longitude,
          vendorType: 'Tiffin',
          subscriptionType: '5',
        }),
      );
    }
  }, [userDetails]);

  const handleBranded = async () => {
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
        item.id == '5'
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
          from: 'Tiffins',
          selectedStartDate: today,
          selectedEndDate: dateAfter7Days,
          foodTypeData,
          subData: result,
        });
        navigation.navigate('PageStack', {
          screen: 'SearchMain',
          params: {
            from: 'Tiffins',
            ssd: today,
            sse: dateAfter7Days,
            move: 'forward',
          },
        });
      }
      //   dispatch(
      //     updateSearch({
      //       location: location,
      //       filterKey: 'subscription',
      //       filterData: subscription_types_filter,
      //       vendorType: 'Tiffin',
      //       startDate: today,
      //       endDate: dateAfter7Days,
      //       navigation,
      //       from: 'Tiffins',
      //       updated_response: result,
      //     }),
      //   );
    } catch (err) {
      console.log('error in popularTiffins', err);
    } finally {
      setTimeout(() => {
        dispatch(startLoader(false));
      }, 1000);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Card style={[styles.cardcontainer, gs.mr15, gs.br10]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('PageStack', {
              screen: 'TiffinProfile',
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
          <Center>
            {item?.gallery_images?.['vendor-banner']?.length > 0 ? (
              <ImageBackground
                source={{
                  uri: item?.gallery_images?.['vendor-banner'][0].image_name[0]
                    ?.medium,
                }}
                style={[styles.img]}
                imageStyle={styles.imageStyle}
                alt={item.name}
              />
            ) : (
              <View style={[styles.img, styles.imageStyle]}></View>
            )}

            <Flex direction="row" style={styles.profileContainer}>
              {item?.gallery_images?.['vendor-brand-logo']?.length ? (
                <Image
                  source={{
                    uri: item?.gallery_images?.['vendor-brand-logo'][0]
                      ?.image_name[0]?.medium,
                  }}
                  style={styles.profile}
                />
              ) : (
                <View
                  style={{
                    ...styles.profile,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <EntypoIcon
                    name="image-inverted"
                    style={[{color: ts.secondarytext}, gs.fs20]}
                  />
                </View>
              )}

              <View style={styles.txtContainer}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  style={[Platform.OS == 'ios' && gs.mt15]}>
                  <Image
                    source={require('../../../assets/Common/veg.png')}
                    style={[styles.icon, gs.mr5]}
                  />
                  <Image
                    source={require('../../../assets/Common/nonveg.png')}
                    style={styles.icon}
                  />
                </Flex>
              </View>
            </Flex>
          </Center>
          <Text numberOfLines={1} style={[gs.fs13, styles.catererName]}>
            {item?.catering_service_name
              ? item.catering_service_name.slice(0, 28)
              : 'N/A'}
          </Text>
          <Text style={[gs.fs10, styles.area]}>
            {item?.street_name ? item.street_name : item?.area}, {item?.city}
          </Text>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={[gs.ph10, gs.mt10]}>
            <Flex>
              <Text style={styles.startPrice}>
                ₹ {item?.start_price ? item.start_price : 'N/A'}
              </Text>
              <Text style={[gs.fs9, styles.area, gs.pl2]}>Starts from</Text>
            </Flex>
            <Flex direction="row" align="center">
              <Image
                source={require('../../../assets/Common/rating.png')}
                style={styles.icon}
              />
              <Text style={[styles.startPrice, gs.fs13, gs.ph3]}>4.5</Text>
              <Text style={[styles.area, gs.ph2, gs.fs11]}>
                ({item?.review_count})
              </Text>
            </Flex>
          </Flex>
        </TouchableOpacity>
      </Card>
    );
  };

  if (popularTError) {
    return (
      <View style={[gs.ph15, gs.pt10]}>
        <Flex flexDirection="row" justifyContent="space-between">
          <View>
            <Text
              style={[
                {fontFamily: ts.secondarysemibold, color: ts.primarytext},
                gs.fs18,
                gs.mb5,
              ]}>
              Popular Tiffin
            </Text>
            <Text
              style={[
                {fontFamily: ts.secondaryregular, color: ts.secondarytext},
                gs.fs13,
              ]}>
              {userDetails?.length && userDetails[0]?.city}
            </Text>
          </View>
        </Flex>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.secondarysemibold},
            gs.pl15,
          ]}>
          No Popular Tiffin found.
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.ph15, gs.pt10, gs.mt10]}>
        <Flex flexDirection="row" justifyContent="space-between">
          <View>
            <Text
              style={[
                {fontFamily: ts.secondarysemibold, color: ts.primarytext},
                gs.fs18,
                gs.mb5,
              ]}>
             Popular Tiffin
            </Text>
            <Text
              style={[
                {fontFamily: ts.secondaryregular, color: ts.secondarytext},
                gs.fs13,
              ]}>
              {userDetails?.length && userDetails[0]?.city}
            </Text>
          </View>
          {popularTData?.length ? (
            <TouchableOpacity activeOpacity={0.7} onPress={handleBranded}>
              <MorePrimarybtn />
            </TouchableOpacity>
          ) : null}
        </Flex>
      </View>
      {popularTLoading ? (
        <Flex direction="row">
          {[1, 2]?.map((e, i) => (
            <View style={styles.contentContainerStyle} key={i}>
              <BrandedSkeleton />
            </View>
          ))}
        </Flex>
      ) : (
        popularTData && (
          <FlatList
            data={popularTData}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              ...styles.contentContainerStyle,
            }}
          />
        )
      )}
    </>
  );
}
export default memo(PopularTiffins);
