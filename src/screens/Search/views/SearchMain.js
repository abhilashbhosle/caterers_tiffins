import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../../Home/views/SearchBar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actionsheet, Divider, Flex, Spinner} from 'native-base';
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
import LinearGradient from 'react-native-linear-gradient';

export default function SearchMain({route, navigation}) {
  const {width, height} = useWindowDimensions();
  const {from, ssd, sse, move} = route.params;
  const [vendorData, setVendorData] = useState([]);
  const [subType, setSubType] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [total, setTotal] = useState(-1);
  const dispatch = useDispatch();
  const {foodTypeData, subData,updatedSubData} = useSelector(state => state?.filterCater);
  const [foodText, setFoodText] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [firstItemVisible, setFirstItemVisible] = useState(true);
  const {caterersLoading, caterersData, caterersError} = useSelector(
    state => state.location,
  );
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [enableFoodTypeDD, setEnableFoodTypeDD] = useState(false);
  const loading = useSelector(state => state.common.loading);
  const [refreshing, setRefreshing] = useState(false);
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
      setFoodText(foodTypeData[0]?.name);
    }
  }, [foodTypeData]);

  useMemo(() => {
    console.log("updated subdata",subData)
    // if (subType?.length == 0) {
    setSubType(subData);
    // }
  }, [subData]);

  useEffect(() => {
    (async () => {
      let searchJson = await AsyncStorage.getItem('searchJson');
      let searchData = await JSON.parse(searchJson);
      let params = searchData;
      console.log('params passing', params);
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
    if (caterersLoading) {
      return (
        // <View style={{height: 200}}>
        <Spinner color={ts.secondarytext} />
        // </View>
      );
    }
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

  const handleFoodTpeDD = () => {
    setEnableFoodTypeDD(prev => !prev);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    setSubType([])
    setFoodType([])
    setVendorData([]);
    let searchJson = await AsyncStorage.getItem('searchJson');
    let searchData = JSON.parse(searchJson);
    dispatch(getSubscription({from}));
    setSubType(subData);
    setFoodType(foodTypeData);
    dispatch(
      getCaterersSearch({
        params: {
          ...searchData,
          current_page: 1,
          limit: 5,
        },
      }),
    );
    setPage(1);

    setTimeout(() => {
      setRefreshing(false);
    }, 500); // To give some delay for UI indication
  };
  

  return (
    <ScreenWrapper>
      <ScrollView
        style={{...styles.container, flex: 1, backgroundColor: '#fff'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}   progressViewOffset={60}/>
        }>
        {/* =====SEARCH BAR */}
        <LinearGradient
          style={[
            {
              backgroundColor: from == 'Caterers' ? ts.secondary : ts.primary,
            },
            styles.headercontainer,
            // gs.ph10,/
            gs.pt20,
          ]}
          start={from == 'Caterers' ? {x: 0, y: 0} : {x: 0, y: 0}}
          end={from == 'Caterers' ? {x: 0, y: 1} : {x: 0, y: 2}}
          colors={
            from == 'Caterers'
              ? ['#f8b4b3', '#fbe3e1', '#fff']
              : ['#F6D6B2', '#fff', '#FFF']
          }>
          <SafeAreaView>
            <Flex
              direction="row"
              alignItems="center"
              style={[gs.ph10, gs.mt10]}>
              <View style={{width: '13%'}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={async () => {
                    await clearFilterService({dispatch, from});
                    navigation.navigate('BottomBarStack');
                    setVendorData(0);
                  }}>
                  {/* ========SEARCH============ */}
                  <Image
                    alt="backbtn"
                    source={
                      from == 'Caterers'
                        ? require('../../../assets/Common/back.png')
                        : require('../../../assets/Common/backtiffin.png')
                    }
                    style={styles.backbtn}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '86%'}}>
                <SearchBar
                  from={from}
                  navigation={navigation}
                  ssd={ssd}
                  sse={sse}
                />
              </View>
            </Flex>
          </SafeAreaView>
          <View style={styles.selectorcontainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollcontainer}>
              {/* ========TOP SELECTOR============ */}
              {firstItemVisible &&
              !keyboardVisible &&
              foodType?.length &&
              subType?.length ? (
                <Flex style={[{width}]} direction="row" alignItems="center">
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
                    <View
                      style={[
                        {
                          ...styles.btn,
                          borderWidth: 1,
                          borderColor:
                            from == 'Caterers' ? '#ed9f9e' : '#efb76e',
                        },
                        gs.pl20,
                        gs.pr10,
                      ]}>
                      <Flex
                        align="center"
                        direction="row"
                        justifyContent="space-between">
                        <Text style={styles.btntxt}>Filter</Text>
                        <Image
                          alt="downbtn"
                          source={require('../../../assets/Common/downbtn.png')}
                          style={[styles.downArrow, gs.ml5]}
                        />
                      </Flex>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      style={[
                        {
                          ...styles.btn,
                          borderWidth: 1,
                          borderColor:
                            from == 'Caterers' ? '#ed9f9e' : '#efb76e',
                        },
                        gs.ph10,
                      ]}
                      onPress={handleFoodTpeDD}>
                      <Flex
                        align="center"
                        direction="row"
                        justifyContent="space-between">
                        {foodText == 'Veg' && (
                          <Image
                            source={require('../../../assets/Common/veg.png')}
                            style={[styles.icon, gs.mr5]}
                            alt="vegicon"
                          />
                        )}
                        {foodText == 'Non Veg' && (
                          <Image
                            source={require('../../../assets/Common/nonveg.png')}
                            style={[styles.icon, gs.mr5]}
                            alt="vegicon"
                          />
                        )}
                        {foodText == 'All' ? (
                          <Flex direction="row" alignItems="center">
                            <Image
                              source={require('../../../assets/Common/veg.png')}
                              style={[styles.icon, gs.mr5]}
                              alt="vegicon"
                            />
                            <Image
                              source={require('../../../assets/Common/nonveg.png')}
                              style={[styles.icon, gs.mr5]}
                              alt="vegicon"
                            />
                          </Flex>
                        ) : null}
                        <Text style={styles.btntxt}>{foodText}</Text>
                        <Image
                          alt="downbtn"
                          source={require('../../../assets/Common/downbtn.png')}
                          style={styles.downArrow}
                        />
                      </Flex>
                    </TouchableOpacity>
                    <Actionsheet
                      isOpen={enableFoodTypeDD}
                      onClose={() => {
                        setEnableFoodTypeDD(false);
                      }}>
                      <Actionsheet.Content style={{backgroundColor: '#fff'}}>
                        {foodType?.map((e, i) => (
                          <View key={i} style={[{width: '100%'}, gs.ph10]}>
                            <TouchableOpacity
                              onPress={() => {
                                handleFoodTypes(i);
                                handleFoodTpeDD();
                                setFoodText(e.name);
                              }}>
                              <Text
                                style={[
                                  {
                                    ...styles.btntxt,
                                    fontFamily:
                                      foodText == e.name
                                        ? ts.secondarymedium
                                        : ts.secondarylight,
                                  },
                                  gs.fs16,
                                  gs.mv10,
                                ]}>
                                {e?.name}
                              </Text>
                            </TouchableOpacity>
                            <Divider />
                          </View>
                        ))}
                      </Actionsheet.Content>
                    </Actionsheet>
                  </View>
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
                    }}
                    style={[
                      styles.btn,
                      {
                        marginRight: 0,
                        borderWidth: 1,
                        borderColor: from == 'Caterers' ? '#ed9f9e' : '#efb76e',
                      },
                    ]}>
                    <Flex direction="row" alignItems="center">
                      <IonIcons
                        name="location-sharp"
                        style={[
                          gs.fs18,
                          {
                            color:
                              from == 'Caterers' ? ts.secondary : ts.primary,
                          },
                          gs.mr2,
                        ]}
                      />
                      <Text style={styles.btntxt}>Map</Text>
                    </Flex>
                  </TouchableOpacity>
                  {/* {!refreshing ? ( */}
                    <Badges
                      from={from}
                      subType={subType}
                      setSubType={setSubType}
                      setPage={setPage}
                      setVendorData={setVendorData}
                    />
                  {/* ) : (
                    <View style={{style:60}}></View>
                  )} */}
                </Flex>
              ) : null}
            </ScrollView>
          </View>
          {firstItemVisible && !keyboardVisible ? (
            <>
              <View style={[{paddingHorizontal: 15}]}>
                {/* <Text
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
                </Text> */}
              </View>
            </>
          ) : null}
          <View style={[gs.h100]}></View>
        </LinearGradient>
        {/* ========SEARCH CARDS======== */}
        {!keyboardVisible ? (
          <View style={styles.searchlistContainer}>
            <SearchList
              from={from}
              fetchMoreData={fetchMoreData}
              renderFooter={renderFooter}
              vendorData={vendorData}
              setVendorData={setVendorData}
              location={location}
              setFirstItemVisible={setFirstItemVisible}
              firstItemVisible={firstItemVisible}
              total={total}
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.leveler}></View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    top: '-10@ms',
  },
  headercontainer: {
    // minHeight: Platform.OS == 'ios' ? '150@ms' : '150@ms',
    paddingBottom: 20,
  },
  backbtn: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  btn: {
    height: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5@ms',
    backgroundColor: '#fff',
    borderRadius: '15@ms',
    paddingHorizontal: '20@ms',
  },
  btntxt: {
    color: '#444',
    fontFamily: ts.secondaryregular,
    fontSize: '14@ms',
  },
  downArrow: {
    height: '20@ms',
    width: '20@ms',
    marginLeft: '5@ms',
  },
  filterDownArrow: {
    height: '20@ms',
    width: '20@ms',
  },
  scrollcontainer: {
    paddingRight: '350@ms',
  },
  searchlistContainer: {
    marginTop: '-138@ms',
  },
  selectorcontainer: {
    marginTop: Platform.OS == 'ios' ? '-35@ms' : '-5@ms',
    marginLeft: '10@ms',
  },
  icon: {
    height: '14@ms',
    width: '14@ms',
  },
  leveler: {
    marginTop: '-10@ms',
  },
});
