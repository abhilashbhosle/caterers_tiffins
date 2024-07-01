import {View, Text, TouchableOpacity,FlatList} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Center, Spinner} from 'native-base';
import {searchitems} from '../../../../constants/Constants';
import {gs} from '../../../../../GlobalStyles';
import SearchTiffinsCard from '../../../Search/views/SearchTiffinsCard';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getPopularTiffins} from '../../../Home/controllers/VendorProfileController';
import { ts } from '../../../../../ThemeStyles';
import { wishDetails } from '../../../Home/controllers/WishListController';
import { startLoader } from '../../../../redux/CommonSlicer';
import { getCaterersSearch, setLocationres } from '../../../Home/controllers/SearchController';
import { updateSubscriptions } from '../../../Home/controllers/FilterMainController';

function PopularTiffinsSlice({data, location, vendorType}) {
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {popularTLoading, popularTData, popularTError} = useSelector(
    state => state.vendor,
  );
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

  useEffect(() => {
    if (location?.latitude && subData?.length) {
      let result = subData.map((item, i) =>
        item.id == 5
          ? {...item, selected: (item.selected = '1')}
          : {...item, selected: '0'},
      );
      const subscription_types_filter = result.map(e => ({
        subscription_type_id: parseInt(e.id),
        selected: e.selected,
      }));

      dispatch(
        getPopularTiffins({
          filterData: subscription_types_filter,
          from: 'Tiffin',
          ssd: today,
          sse: dateAfter7Days,
          location,
        }),
      );
    }
  }, [location, subData]);
  const handlePopular = async () => {
    try {
      dispatch(startLoader(true))

      dispatch(setLocationres(location));
  

      let result = await subData.map((item, i) =>
        item.id == 5
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
            from: 'Tiffins',
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
            from: 'Tiffins',
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

  useEffect(() => {
    if (popularTData?.length) {
      setPopular(popularTData);
    }
  }, [popularTData]);


  const renderTiffinsList = ({item, index}) => {
    return (
      <View>
        <SearchTiffinsCard item={item} location={location} from={"Tiffins"}/>
      </View>
    );
  };
  if (popularTError) {
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
        No Popular TiffinProviders found
      </Text>
    );
  }
  return (
    <View>
      {popularTLoading ? <Spinner color={ts.secondarytext} /> : null}
      {!popularTLoading && !popularTError && popular?.length>0 ? (
        <FlatList
          data={popular}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderTiffinsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {backgroundColor: '#fff', paddingTop: 10},
          ]}
        />
      ) : null}
       {popular?.length? (
        <Center style={[gs.pv15]}>
          <TouchableOpacity activeOpacity={0.7} 
          onPress={handlePopular}
          >
          <Text
            style={[
              gs.fs12,
              {
                color: ts.primary,
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
export default memo(PopularTiffinsSlice);
