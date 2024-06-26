import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../../Home/views/SearchBar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Flex, Spinner} from 'native-base';
import {labels} from '../../../constants/Checks';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Badges from './Badges';
import SearchList from './SearchList';
import {ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {handleFoodType} from '../../Home/controllers/FilterCommonController';
import {getOccassions} from '../../Home/controllers/OccassionController';
import {getCuisines} from '../../Home/controllers/ExploreCuisineController';
import {
  clearCaterers,
  getCaterersSearch,
  handleSearchSegregation,
} from '../../Home/controllers/SearchController';
import {doSegregate} from '../../Home/controllers/FilterMainController';

export default function SearchMain({route, navigation}) {
  const {width, height} = useWindowDimensions();
  const {from, ssd, sse} = route.params;
  const [vendorData, setVendorData] = useState([]);
  const [subType, setSubType] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const {
    servingData,
    serviceData,
    budgetData,
    headData,
    sortData,
    foodTypeLoading,
    foodTypeData,
    foodTypeError,
    subData,
  } = useSelector(state => state?.filterCater);
  const {
    mealData,
    kitchenData
  }=useSelector(state=>state?.filterTiffin)
  const cuisines_data = useSelector(state => state?.cuisine.data);
  const occasion = useSelector(state => state?.occassion?.data);
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
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {caterersLoading, caterersData, caterersError} = useSelector(
    state => state.location,
  );
  const location=useSelector(state=>state.location.locationRes)
  useFocusEffect(() => {
    // ========TINT COLORS=========//
    if (Platform.OS == 'android')
      if (from == 'Caterers') {
        StatusBar.setBarStyle('light-content', true, {
          backgroundColor: ts.secondary,
        });
      } else {
        StatusBar.setBarStyle('light-content', true, {
          backgroundColor: ts.primary,
        });
      }
  });
  // =========SETTING UP ALL THE FILTERS======//
  useEffect(() => {
    setTotal(0)
    setVendorData([])
    setPage(1)
    if (foodTypeData?.length) {
      setFoodType(foodTypeData);
    }
    if (subData?.length) {
      setSubType(subData);
    }
    (async () => {
      let res = await handleSearchSegregation({
        setSegre,
        foodTypeData,
        serviceData,
        servingData,
        occasion,
        headData,
        sortData,
        cuisines_data,
        budgetData,
        subData,
        mealData,
        kitchenData,
      });
      setFlag(res);
    })();
  }, [
    foodTypeData,
    serviceData,
    serviceData,
    budgetData,
    headData,
    sortData,
    cuisines_data,
    occasion,
    subData,
    mealData,
    kitchenData,
    route
  ]);


  useEffect(() => {
    if (caterersData?.vendors) {
      if (page == 1) {
        setVendorData(caterersData.vendors);
      } else {
        setVendorData([...vendorData, ...caterersData.vendors]);
      }
      setTotal(caterersData?.total_count);
    }
  }, [caterersData]);

  useEffect(() => {
    if (page && flag) {
      dispatch(clearCaterers())
      dispatch(
        getCaterersSearch({
          from,
          ssd,
          sse,
          location,
          page,
          limit,
          segre,
        }),
      );
    }
  }, [page, flag]);
  const fetchMoreData = () => {
    if (vendorData?.length < total) {
      if (vendorData?.length == 0) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    }
  };
  const renderFooter = () => {
    if (caterersLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };
  return (
    <ScreenWrapper>
      <View
        style={[
          {
            backgroundColor: from == 'Caterers' ? ts.secondary : ts.primary,
          },
          styles.headercontainer,
          gs.ph20,
        ]}>
        <SafeAreaView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('BottomBarStack');
            }}
            style={[gs.pb20]}>
            {/* ========SEARCH============ */}
            <AntIcon
              name="arrowleft"
              style={[gs.fs22, {color: '#fff'}, gs.mt10]}
            />
          </TouchableOpacity>
          <SearchBar
            from={from}
            navigation={navigation}
            ssd={ssd}
            sse={sse}
          />
        </SafeAreaView>
      </View>
      {/* ========TOP SELECTOR============ */}
      <Flex
        style={[{width, backgroundColor: '#fff'}, gs.ph10, gs.pt15]}
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}>
        <Flex direction="row" alignItems="center">
          {foodType?.map((e, i) => (
            <TouchableOpacity
              onPress={() => {
                // setSelectedType(e.type);
                handleFoodType({
                  index: i,
                  setFoodType,
                  foodType,
                  dispatch,
                  segre,
                  setVendorData,
                  ssd,
                  sse,
                  location,
                  from,
                  setSegre,
                });
              }}
              key={i}>
              <Flex direction="row" alignItems="center" style={[gs.pr10]}>
                <MaterialIcons
                  name={e.selected != 1 ? 'circle-outline' : 'circle-slice-8'}
                  style={[
                    gs.fs20,
                    gs.mr3,
                    {
                      color:
                        e.selected != 1
                          ? '#555'
                          : from == 'Caterers'
                          ? ts.secondary
                          : ts.primary,
                    },
                  ]}
                />
                <Text
                  style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
                  {e.name}
                </Text>
              </Flex>
            </TouchableOpacity>
          ))}
        </Flex>
        <Flex direction="row" alignItems="center">
          <IonIcons
            name="location-sharp"
            style={[gs.fs22, {color: '#555'}, gs.mr5]}
          />
          <Text style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
            Map
          </Text>
        </Flex>
        <TouchableWithoutFeedback
          onPress={() => {
            from == 'Caterers'
              ? navigation.navigate('PageStack', {
                  screen: 'FilterMain',
                  params: {
                    ssd,
                    sse,
                    location,
                    from,
                  },
                })
              : navigation.navigate('PageStack', {
                  screen: 'FilterTiffins',
                  params: {
                    ssd,
                    sse,
                    location,
                    from,
                  },
                });
          }}>
          <Flex direction="row" alignItems="center">
            <MaterialIcons
              name="filter"
              style={[gs.fs22, {color: '#555'}, gs.mr5]}
            />
            <Text style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
              Filters
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
      </Flex>
      {/* ========SORTING BY TYPES========= */}
      <Badges
        from={from}
        subType={subType}
        setSubType={setSubType}
        segre={segre}
        setVendorData={setVendorData}
        ssd={ssd}
        sse={sse}
        location={location}
        setPage={setPage}
        setSegre={setSegre}
      />
      {/* ========SEARCH CARDS======== */}
      <View style={[{paddingHorizontal: 5, backgroundColor: '#fff'}]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarymedium, color: '#555'},
            gs.fs13,
          ]}>
          {from == 'Tiffins'
            ? `${location?.city}: ${total} Tiffin service providers found`
            : `${location?.city}: ${total} Catering service providers found`}
        </Text>
      </View>
      <SearchList
        from={from}
        fetchMoreData={fetchMoreData}
        renderFooter={renderFooter}
        vendorData={vendorData}
        setVendorData={setVendorData}
        location={location}
      />
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  headercontainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minHeight: Platform.OS == 'ios' ? '150@ms' : '150@ms',
  },
});
