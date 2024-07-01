import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {gs} from '../../../../../GlobalStyles';
import SearchCaterersCard from '../../../Search/views/SearchCaterersCard';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../../Onboarding/controllers/AuthController';
import {getPopular} from '../../../Home/controllers/HomeController';
import {ts} from '../../../../../ThemeStyles';
import {Center, Spinner} from 'native-base';
import {getPopularCaterers} from '../../../Home/controllers/VendorProfileController';
import {getSubscription, updateSubscriptions} from '../../../Home/controllers/FilterMainController';
import {wishDetails} from '../../../Home/controllers/WishListController';
import { getCaterersSearch, setLocationres } from '../../../Home/controllers/SearchController';
import { startLoader } from '../../../../redux/CommonSlicer';

function PopularCatSlice({data, location, vendorType}) {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularLoading, popularData, popularError} = useSelector(
    state => state.vendor,
  );
  const {subData} = useSelector(state => state?.filterCater);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [popular, setPopular] = useState([]);
  const {wish_id} = useSelector(state => state.wish);
  let today = new Date();
  let dateAfter7Days = new Date();
  dateAfter7Days.setDate(today.getDate() + 7);

  useEffect(() => {
    if (Number(wish_id > 0)) {
      let data = [...popular];
      let updated = data.map(e =>
        e.vendor_id == wish_id
          ? {
              ...e,
              is_wishlisted: !e.is_wishlisted,
            }
          : e,
      );
      setPopular(updated);
      dispatch(wishDetails(0));
    }
  }, [wish_id]);

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
    if (location?.latitude && subData?.length) {
 
      let result = subData.map((item, i) =>
        item.id == 2
          ? {...item, selected: (item.selected = '1')}
          : {...item, selected: '0'},
      );
      const subscription_types_filter = result.map(e => ({
        subscription_type_id: parseInt(e.id),
        selected: e.selected,
      }));

      dispatch(
        getPopularCaterers({
          filterData: subscription_types_filter,
          from: 'Caterer',
          ssd: today,
          sse: dateAfter7Days,
          location,
        }),
      );
    }
  }, [location, subData]);

  useEffect(() => {
    if (popularData?.length) {
      setPopular(popularData);
    }
  }, [popularData]);

  const handlePopular = async () => {
    try {
      dispatch(startLoader(true))

      dispatch(setLocationres(location));
  

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
            move:"forward"
          },
        });
      }
    } catch (err) {
      console.log('error in handleBranded');
    }finally{
      setTimeout(()=>{
        dispatch(startLoader(false))
      },1000)
    }
  };

  const renderCateringList = ({item, index}) => {
    return (
      <View>
        <SearchCaterersCard item={item} from="Caterers" location={location} />
      </View>
    );
  };

  if (popularError) {
    return (
      <Text
        style={[
          gs.mt10,
          {
            color: ts.secondarytext,
            color: ts.secondarytext,
            fontFamily: ts.secondaryregular,
          },
        ]}>
        No Popular {vendorType == 'Caterers' ? 'Caterers' : 'Tiffin Providers'}{' '}
        found
      </Text>
    );
  }
  return (
    <View>
      {popularLoading ? <Spinner color={ts.secondarytext} /> : null}
      {!popularLoading && !popularError && popular?.length ? (
        <FlatList
          data={popular}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderCateringList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{backgroundColor: '#fff', paddingTop: 10}]}
        />
      ) : null}
      {popular?.length > 0 ? (
        <Center style={[gs.pv15]}>
          <TouchableOpacity activeOpacity={0.7} onPress={handlePopular}>
          <Text
            style={[
              gs.fs12,
              {
                color: ts.secondary,
                fontFamily: ts.secondaryregular,
              },
            ]}>
            See all
          </Text>
          </TouchableOpacity>
        </Center>
      ) : null}
    </View>
  );
}
export default memo(PopularCatSlice);
