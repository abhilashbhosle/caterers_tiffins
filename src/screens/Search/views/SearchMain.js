import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../../Home/views/SearchBar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Flex, Spinner} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Badges from './Badges';
import SearchList from './SearchList';
import {ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  clearCaterers,
  getCaterersSearch,
} from '../../Home/controllers/SearchController';
import {clearFilterService} from '../../Home/services/FilterMainService';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getSubscription,
  updateSubscriptions,
} from '../../Home/controllers/FilterMainController';

export default function SearchMain({route, navigation}) {
  const {width, height} = useWindowDimensions();
  const {from, ssd, sse, move} = route.params;
  const [vendorData, setVendorData] = useState([]);
  const [subType, setSubType] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const {foodTypeData, subData} = useSelector(state => state?.filterCater);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [firstItemVisible, setFirstItemVisible] = useState(true);
  const {caterersLoading, caterersData, caterersError} = useSelector(
    state => state.location,
  );
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const location = useSelector(state => state.location.locationRes);
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor(
          from === 'Caterers' ? ts.secondary : ts.primary,
        );
      }
    }, [from]),
  );

  useEffect(() => {
    if (foodTypeData?.length) {
      setFoodType(foodTypeData);
    }
  }, [foodTypeData]);

  useEffect(() => {
    if (subType?.length == 0) {
      setSubType(subData);
    }
  }, [subData]);

  useEffect(() => {
    (async () => {
      let searchJson = await AsyncStorage.getItem('searchJson');
      let searchData = await JSON.parse(searchJson);
      let params = searchData;
      dispatch(
        getCaterersSearch({
          params: {
            ...params,
            current_page: page,
            limit,
          },
        }),
      );
    })();
  }, [page]);

  useEffect(() => {
    if (caterersData?.vendors) {
      if (page == 1 || caterersData?.current_page == 1) {
        setVendorData(caterersData.vendors);
      } else {
        setVendorData([...vendorData, ...caterersData.vendors]);
      }
      setTotal(caterersData?.total_count);
    }
  }, [caterersData]);

  useMemo(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [Keyboard]);

  const fetchMoreData = () => {
    if (vendorData?.length < total) {
      if (vendorData?.length == 0) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    }
  };
  const renderFooter = useMemo(() => {
    if (caterersLoading) return <Spinner color={ts.secondarytext} />;
    return null;
  }, [caterersLoading]);

  const handleSelection = async (arr, setData, index) => {
    const updatedFoodTypes = await arr.map((item, i) =>
      i === index
        ? {...item, selected: (item.selected = '1')}
        : {...item, selected: '0'},
    );

    setData(updatedFoodTypes);
    return updatedFoodTypes;
  };

  const handleFoodTypes = async index => {
    let data = [...foodType];
    let res = await handleSelection(data, setFoodType, index);
    let searchJson = await AsyncStorage.getItem('searchJson');
    let search = JSON.parse(searchJson);
    let params = {
      ...search,
      food_types_filter: JSON.stringify(res),
    };
    await AsyncStorage.setItem('searchJson', JSON.stringify(params));
    dispatch(
      getCaterersSearch({
        params: {
          ...params,
          current_page: 1,
          limit: 5,
        },
      }),
    );
    setVendorData([]);
    setPage(1);
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
            onPress={async () => {
              await clearFilterService({dispatch, from});
              navigation.navigate('BottomBarStack');
              setVendorData(0);
            }}
            style={[gs.pb20]}>
            {/* ========SEARCH============ */}
            <AntIcon
              name="arrowleft"
              style={[gs.fs22, {color: '#fff'}, gs.mt10]}
            />
          </TouchableOpacity>
          <SearchBar from={from} navigation={navigation} ssd={ssd} sse={sse} />
        </SafeAreaView>
      </View>
      {/* ========TOP SELECTOR============ */}
      {firstItemVisible && !keyboardVisible ? (
        <Flex
          style={[{width, backgroundColor: '#fff'}, gs.ph10, gs.pt15]}
          direction="row"
          alignItems="center"
          justifyContent={'space-between'}>
          <Flex direction="row" alignItems="center">
            {foodType?.map((e, i) => (
              <TouchableOpacity
                onPress={() => {
                  handleFoodTypes(i);
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
                    style={[
                      {fontFamily: ts.secondary, color: '#222'},
                      gs.fs13,
                    ]}>
                    {e.name}
                  </Text>
                </Flex>
              </TouchableOpacity>
            ))}
          </Flex>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              let data = [...vendorData];
              navigation.navigate('PageStack', {
                screen: 'MapMultiple',
                params: {
                  initialRegion: location,
                  profile: data,
                  from: from == 'Caterers' ? 'Caterer' : 'Tiffin',
                },
              });
            }}>
            <Flex direction="row" alignItems="center">
              <IonIcons
                name="location-sharp"
                style={[gs.fs22, {color: '#555'}, gs.mr5]}
              />
              <Text
                style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
                Map
              </Text>
            </Flex>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() => {
              setPage(1);
              setVendorData([]);
              dispatch(clearCaterers());
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
              <Text
                style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
                Filters
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex>
      ) : null}

      {/* ========SORTING BY TYPES========= */}
      {firstItemVisible && !keyboardVisible ? (
        <>
          <Badges
            from={from}
            subType={subType}
            setSubType={setSubType}
            setPage={setPage}
            setVendorData={setVendorData}
          />
          <View style={[{paddingHorizontal: 5, backgroundColor: '#fff'}]}>
            <Text
              style={[
                gs.fs15,
                {fontFamily: ts.secondarymedium, color: '#555'},
                gs.fs13,
              ]}
              numberOfLines={1}>
              {from == 'Caterers'
                ? `${
                    location?.area ? location?.area : location?.city
                  }: ${total} Caterers found in ${
                    location?.area ? location?.area : ''
                  }${location?.area ? ',' : ''} ${location?.city}`
                : `${
                    location?.area ? location?.area : location?.city
                  }: ${total} Tiffins found in ${
                    location?.area ? location?.area : ''
                  }${location?.area ? ',' : ''} ${location?.city}`}
            </Text>
          </View>
        </>
      ) : null}

      {/* ========SEARCH CARDS======== */}
      {!keyboardVisible ? (
        <>
          <SearchList
            from={from}
            fetchMoreData={fetchMoreData}
            renderFooter={renderFooter}
            vendorData={vendorData}
            setVendorData={setVendorData}
            location={location}
            setFirstItemVisible={setFirstItemVisible}
            firstItemVisible={firstItemVisible}
          />
        </>
      ) : null}
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  headercontainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minHeight: Platform.OS == 'ios' ? '150@ms' : '150@ms',
    paddingBottom: 20,
  },
});
