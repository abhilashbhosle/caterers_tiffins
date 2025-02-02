import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Card} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import {Center, Divider, Flex, Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntIcon from 'react-native-vector-icons/Ionicons';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearFilter,
  getBudget,
  getHeadCount,
  getRatings,
  getService,
  getServing,
  getSort,
} from '../../Home/controllers/FilterMainController';
import {
  handleBudget,
  handleChildrenCuisines,
  handleCount,
  handleOccassion,
  handleParentCuisines,
  handleRating,
  handleService,
  handleServing,
  handleSort,
} from '../../Home/controllers/FilterCommonController';
import {
  clearCaterers,
  getCaterersSearch,
  handleSearchSegregation,
  updateFilterData,
} from '../../Home/controllers/SearchController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSearchHomeJson} from '../../Home/controllers/SearchCommonController';
import moment from 'moment';
import {getOccassions} from '../../Home/controllers/OccassionController';
import {getCuisines} from '../../Home/controllers/ExploreCuisineController';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function FiilterMain({navigation, route}) {
  const {address, ssd, sse, location, from} = route.params;
  const [budget, setBudget] = useState([]);
  const [headCount, setHeadCount] = useState([]);
  const [searchenabled, setSearchEnabled] = useState(false);
  const [cuisine, setCuisine] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [serving, setServing] = useState([]);
  const [service, setService] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(-1);
  const [rating, setRating] = useState([]);
  const dispatch = useDispatch();
  const [sort, setSort] = useState([]);
  const {
    servingLoading,
    servingData,
    servingError,
    serviceLoading,
    serviceData,
    serviceError,
    budgetLoading,
    budgetData,
    budgetError,
    headLoading,
    headData,
    headError,
    sortLoading,
    sortData,
    sortError,
    ratingData,
    ratingError,
    ratingLoading,
    foodTypeData,
    subData,
  } = useSelector(state => state?.filterCater);

  const {loading, data, error} = useSelector(state => state?.occassion);
  const cuisines_data = useSelector(state => state?.cuisine);
  const cuisineData = cuisines_data?.data;
  const cuisineLoading = cuisines_data?.loading;
  const cuisineError = cuisines_data?.error;
  const {
    caterersLoading,
    caterersData,
    caterersError,
    filterData,
    filterLoading,
    filterError,
  } = useSelector(state => state.location);
  const [foodSortData, setFoodSortData] = useState([]);
  const [subSortData, setSubSortData] = useState([]);
  const [cuisineSortData, setCuisineSortData] = useState([]);
  const [occasionSortData, setOccassionSortData] = useState([]);

  useEffect(() => {
    dispatch(getServing());
    dispatch(getService({type: from == 'Caterers' ? 'Caterer' : 'Tiffin'}));
    dispatch(getOccassions());
    dispatch(getBudget({type: from == 'Caterers' ? 'Caterer' : 'Tiffin'}));
    dispatch(getCuisines());
    dispatch(getHeadCount());
    dispatch(getSort());
    dispatch(getRatings());
  }, []);

  useEffect(() => {
    if (servingData?.length) {
      setServing(servingData);
    }
    if (serviceData?.length) {
      setService(serviceData);
    }
    if (data?.length) {
      setOccasion(data);
    }
    if (budgetData?.length) {
      setBudget(budgetData);
    }
    if (cuisineData?.length) {
      setCuisine(cuisineData);
    }
    if (headData?.length) {
      setHeadCount(headData);
    }
    if (sortData?.length) {
      setSort(sortData);
    }
    if (ratingData?.length) {
      setRating(ratingData);
    }

    (async () => {
      let asyncData = await AsyncStorage.getItem('searchJson');
      let parsed = JSON.parse(asyncData);
      setFoodSortData(parsed?.food_types_filter);
      setSubSortData(parsed?.subscription_types_filter);
      setCuisineSortData(parsed?.cuisines_filter);
      setOccassionSortData(parsed?.occasions_filter);
    })();
  }, [
    servingData,
    serviceData,
    data,
    budgetData,
    cuisineData,
    headData,
    sortData,
    ratingData,
  ]);
  // =======SEARCH CUISINE========//
  const handleSearch = text => {
    setSearch(text);
  };
  useEffect(() => {
    let data = [...cuisineData];
    if (search?.length > 0) {
      let finalData = data.filter((e, i) => {
        let c1 = e.name.startsWith(search);
        let c2 = e.children.filter(item => item.name.startsWith(search));
        if (c1 || c2.length > 0) {
          return e;
        }
      });
      setCuisine(finalData);
    } else {
      setCuisine(cuisineData);
    }
  }, [search]);

  const handleGoBack = () => {
    Alert.alert(
      'Are you sure, you want to go back?',
      'This will clear all your filters, select "show results" instead.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: async () => {
            await dispatch(clearFilter());
            await setSearchHomeJson({
              latitude: location?.latitude,
              longitude: location?.longitude,
              city: location?.city,
              pincode: location?.pincode,
              place_id: location?.place_id,
              from,
              selectedStartDate: ssd,
              selectedEndDate: sse,
              foodTypeData,
              subData,
              cuisines_filter: cuisineSortData,
              occasions_filter: occasionSortData,
            });
            dispatch(updateFilterData());
            let params = {
              latitude: location?.latitude,
              longitude: location?.longitude,
              city: location?.city,
              pincode: location?.pincode,
              place_id: location?.place_id,
              vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
              app_type: 'app',
              start_date: moment(ssd).format('YYYY-MM-DD'),
              end_date: moment(sse).format('YYYY-MM-DD'),
              food_types_filter: foodSortData,
              subscription_types_filter: subSortData,
              cuisines_filter: cuisineSortData,
              occasions_filter: occasionSortData,
              search_term: '',
              save_filter: 1,
            };
            dispatch(
              getCaterersSearch({
                params: {
                  ...params,
                  current_page: 1,
                  limit: 5,
                },
              }),
            );
            navigation.navigate('PageStack', {
              screen: 'SearchMain',
              params: {
                from,
                ssd,
                sse,
              },
            });
          },
        },
      ],
    );
  };
  return (
    <ScreenWrapper>
      {/* <ThemeHeaderWrapper
        lefttxt="Filters"
        righttxt="Clear All"
        goBack={() => handleGoBack()}
        bgColor={ts.secondary}
        dispatch={dispatch}
      /> */}

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff',top:-10}, 
        // gs.ph10, gs.pv20
        ]}>
        <LinearGradient
          colors={['#f8b4b3', '#fbe3e1', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 0.8}}
          // locations={[0.9,0.0,0.0]}
          style={[{...styles.container}]}>
          <SafeAreaView>
            <View
              style={[
                {
                  paddingTop:
                    Platform.OS == 'android'
                      ? StatusBar.currentHeight-40
                      : 20,
                },
                gs.pb10,
              ]}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={[gs.ph15]}>
                <Flex direction="row" alignItems="center">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleGoBack()}>
                    <Image
                      source={require('../../../assets/Common/back.png')}
                      style={styles.backicon}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      gs.fs18,
                      {color: '#000', fontFamily: ts.jakartabold},
                      gs.mb5,
                    ]}>
                    Filters
                  </Text>
                </Flex>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{dispatch(clearFilter())}}>
                <Text style={[{color:'#000',fontFamily:ts.jakartamedium},gs.fs12]}>Clear All</Text>
                </TouchableOpacity>
              </Flex>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.topcontainer}>
        {/* ========BUDGET SELECTION========= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Your Budget (Per plate cost)
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph10]}>
            {budgetLoading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {budgetError?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Budget found
              </Text>
            )}
            {!budgetError &&
              !budgetLoading &&
              budget?.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    handleBudget({
                      index: i,
                      setBudget,
                      budget,
                      ssd,
                      sse,
                      location,
                      from: 'Caterers',
                      subData: subSortData,
                      foodTypeData: foodSortData,
                      occassionData: occasionSortData,
                      cuisineData: cuisineSortData,
                      dispatch,
                    });
                  }}
                  activeOpacity={0.7}>
                  <Flex direction="row" justify="space-between" align="center" style={[gs.ph10]}>
                    <Text
                      style={[
                        styles.servicetxt,
                        gs.fs13,
                        gs.mv10,
                      ]}>{`Rs. ${e.start_price} - Rs. ${e?.end_price}`}</Text>
                    <MaterialIcons
                      name={e.selected == 1 ? 'check-circle' : 'circle-outline'}
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: e.selected == 1 ? ts.secondary : ts.alternate,
                        },
                      ]}
                    />
                  </Flex>
                </TouchableOpacity>
              ))}
          </View>
        </Card>

        {/* ======CHOOSE CUISINE======= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Choose Cuisine</Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph15]}>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder="Search here.."
                style={[
                  {
                    ...styles.txtinput,
                    borderColor: searchenabled ? ts.secondary : '#bbb',
                  },
                ]}
                placeholderTextColor={
                  searchenabled ? ts.secondary : ts.secondarytext
                }
                onFocus={() => {
                  setSearchEnabled(true);
                }}
                onBlur={() => {
                  setSearchEnabled(false);
                }}
                value={search}
                onChangeText={text => {
                  handleSearch(text);
                }}
              />
              <View style={styles.searchcontainer}>
                <FontistoIcon
                  name="search"
                  style={[
                    gs.fs16,
                    {color: searchenabled ? ts.secondary : ts.secondarytext},
                  ]}
                />
              </View>
            </View>
            {cuisineLoading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {cuisineError?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Cuisine found
              </Text>
            )}
            {!cuisineError &&
              !cuisineLoading &&
              cuisine?.map((e, i) => (
                <View key={i}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" alignItems="center">
                      <TouchableOpacity
                        onPress={() => {
                          setExpanded(prev => (prev == i ? -1 : i));
                        }}>
                        <AntIcon
                          name={
                            expanded == i
                              ? 'chevron-up-outline'
                              : 'chevron-down-outline'
                          }
                          style={[gs.pr10, gs.pv10, gs.fs16, {color: '#777'}]}
                        />
                      </TouchableOpacity>
                      <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                        {e.name}
                      </Text>
                    </Flex>
                    <TouchableOpacity
                      onPress={() =>
                        handleParentCuisines({
                          index: i,
                          cuisine,
                          setCuisine,
                          ssd,
                          sse,
                          location,
                          from: 'Caterers',
                          subData: subSortData,
                          foodTypeData: foodSortData,
                          occassionData: occasionSortData,
                          cuisineData: cuisineSortData,
                          dispatch,
                        })
                      }>
                      <MaterialIcons
                        name={
                          e.selected == 1
                            ? 'checkbox-marked'
                            : 'checkbox-blank-outline'
                        }
                        style={[
                          gs.fs20,
                          gs.mr3,
                          {
                            color:
                              e.selected == 1 ? ts.secondary : ts.alternate,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </Flex>
                  {expanded == i &&
                    e?.children?.map((child, index) => (
                      <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        key={index}
                        style={[gs.ph20]}>
                        <Flex direction="row" alignItems="center">
                          <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                            {child.name}
                          </Text>
                        </Flex>
                        <TouchableOpacity
                          onPress={() => {
                            handleChildrenCuisines({
                              pi: i,
                              i: index,
                              cuisine,
                              setCuisine,
                              ssd,
                              sse,
                              location,
                              from: 'Caterers',
                              subData: subSortData,
                              foodTypeData: foodSortData,
                              occassionData: occasionSortData,
                              cuisineData: cuisineSortData,
                              dispatch,
                            });
                          }}>
                          <MaterialIcons
                            name={
                              child.selected == 1
                                ? 'checkbox-marked'
                                : 'checkbox-blank-outline'
                            }
                            style={[
                              gs.fs20,
                              gs.mr3,
                              {
                                color:
                                  child.selected == 1
                                    ? ts.secondary
                                    : ts.alternate,
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      </Flex>
                    ))}
                  <Divider />
                </View>
              ))}
          </View>
        </Card>
        {/* ====CATER SERVING TYPE====== */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Cater Serving Type
          </Text>
          <Divider style={[gs.mv15]} />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-around">
            {servingLoading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {servingError?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Serving type found
              </Text>
            )}
            {!servingLoading &&
              !servingLoading &&
              serving.map((e, i) => (
                <Flex justify="center" alignItems="center" key={i}>
                  {e?.name == 'Table Service' ? (
                    <Image
                      alt="tableservice"
                      source={require('../../../assets/Search/tableservice.png')}
                      style={styles.img}
                    />
                  ) : (
                    <Image
                      alt="buffetservice"
                      source={require('../../../assets/Search/buffetservice.png')}
                      style={styles.buffetimg}
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      handleServing({
                        index: i,
                        setServing,
                        serving,
                        ssd,
                        sse,
                        location,
                        from: 'Caterers',
                        subData: subSortData,
                        foodTypeData: foodSortData,
                        occassionData: occasionSortData,
                        cuisineData: cuisineSortData,
                        dispatch,
                      });
                    }}>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[gs.mt10, gs.mb5]}>
                      <MaterialIcons
                        name={
                          e.selected == 0 ? 'circle-outline' : 'circle-slice-8'
                        }
                        style={[
                          gs.fs20,
                          gs.mr3,
                          {
                            color:
                              e.selected == 1 ? ts.secondary : ts.secondarytext,
                          },
                        ]}
                      />
                      <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                        {e?.name}
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Flex>
              ))}
          </Flex>
        </Card>
        {/* ========SORT BY RATINGS========= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Sort By Rating</Text>
          <Divider style={[gs.mv15]} />
          {ratingLoading && (
            <Center>
              <Spinner color={ts.secondary} />
            </Center>
          )}
          {ratingError?.message && (
            <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
              No Sorts found
            </Text>
          )}
          {!ratingLoading && !ratingError && rating?.length > 0 && (
            <View style={[gs.ph20]}>
              {rating.map((e, i) => (
                <TouchableOpacity
                  onPress={() => {
                    handleRating({
                      index: i,
                      setRating,
                      rating,
                      ssd,
                      sse,
                      location,
                      from: 'Caterers',
                      subData: subSortData,
                      foodTypeData: foodSortData,
                      occassionData: occasionSortData,
                      cuisineData: cuisineSortData,
                      dispatch,
                    });
                  }}
                  key={i}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                      {e.rating}
                    </Text>
                    <MaterialIcons
                      name={e.selected == 1 ? 'check-circle' : 'circle-outline'}
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: e.selected == 1 ? ts.secondary : ts.alternate,
                        },
                      ]}
                    />
                  </Flex>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card>
        {/* =======HEAD COUNT========= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Choose Head count
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph20]}>
            {headLoading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {headError?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Head count found
              </Text>
            )}
            {!headError &&
              !headLoading &&
              headCount?.map((e, i) => (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => {
                    handleCount({
                      index: i,
                      setHeadCount,
                      headCount,
                      ssd,
                      sse,
                      location,
                      from: 'Caterers',
                      subData: subSortData,
                      foodTypeData: foodSortData,
                      occassionData: occasionSortData,
                      cuisineData: cuisineSortData,
                      dispatch,
                    });
                  }}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Text
                      style={[
                        styles.servicetxt,
                        gs.fs13,
                        gs.mv10,
                      ]}>{`${e.start} - ${e.end}`}</Text>
                    <MaterialIcons
                      name={e.selected == 1 ? 'check-circle' : 'circle-outline'}
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: e.selected == 1 ? ts.secondary : ts.alternate,
                        },
                      ]}
                    />
                  </Flex>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </Card>

        {/* ===SERVICE TYPE======= */}
        <Card style={[gs.mh5, gs.pv10, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Cater Service Type
          </Text>
          <Divider style={[gs.mv15]} />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-around">
            {serviceLoading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {serviceError?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Service type found
              </Text>
            )}
            {!serviceLoading &&
              !serviceError &&
              service?.map((e, i) => (
                <Flex justify="center" alignItems="center" key={i}>
                  <Image
                    alt="delivery"
                    source={
                      (e?.name == 'Delivery' &&
                        require('../../../assets/Search/delivery.png')) ||
                      (e?.name == 'Takeaway' &&
                        require('../../../assets/Search/takeaway.png')) ||
                      (e?.name == 'Dine In' &&
                        require('../../../assets/Search/dinein.png'))
                    }
                    style={styles.img}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      handleService({
                        index: i,
                        setService,
                        service,
                        ssd,
                        sse,
                        location,
                        from: 'Caterers',
                        subData: subSortData,
                        foodTypeData: foodSortData,
                        occassionData: occasionSortData,
                        cuisineData: cuisineSortData,
                        dispatch,
                      });
                    }}>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[gs.mt10, gs.mb5]}>
                      <MaterialIcons
                        name={
                          e.selected == 0 ? 'circle-outline' : 'circle-slice-8'
                        }
                        style={[
                          gs.fs20,
                          gs.mr3,
                          {
                            color:
                              e.selected == 1 ? ts.secondary : ts.secondarytext,
                          },
                        ]}
                      />
                      <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                        {e.name}
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Flex>
              ))}
          </Flex>
        </Card>
        {/* ======CHOOSE OCCASION======= */}
        <Card style={[ gs.pv10, gs.mv15, {backgroundColor: '#fff'},gs.mh5]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Choose Occasions
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph15]}>
            {loading && (
              <Center>
                <Spinner color={ts.secondary} />
              </Center>
            )}
            {error?.message && (
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                No Occassions found
              </Text>
            )}
            {!loading &&
              !error &&
              occasion?.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleOccassion({
                      index: i,
                      setOccasion,
                      occasion,
                      ssd,
                      sse,
                      location,
                      from: 'Caterers',
                      subData: subSortData,
                      foodTypeData: foodSortData,
                      occassionData: occasionSortData,
                      cuisineData: cuisineSortData,
                      dispatch,
                    });
                  }}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Text style={[styles.servicetxt, gs.fs13, gs.mv10,gs.ph5]}>
                      {e.occasion_name}
                    </Text>

                    <MaterialIcons
                      name={
                        e.selected == 1
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: e.selected == 1 ? ts.secondary : ts.alternate,
                        },
                      ]}
                    />
                  </Flex>
                </TouchableOpacity>
              ))}
          </View>
        </Card>
        {/* ========SORT BY========= */}
        <Card
          style={[
            gs.pv10,
            gs.mt15,
            {backgroundColor: '#fff', marginBottom: 80},
            gs.mh5
          ]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Sort By</Text>
          <Divider style={[gs.mv15]} />
          {sortLoading && (
            <Center>
              <Spinner color={ts.secondary} />
            </Center>
          )}
          {sortError?.message && (
            <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
              No Sorts found
            </Text>
          )}
          {!sortLoading && !sortError && sort?.length > 0 && (
            <View style={[gs.ph10]}>
              {sort.map((e, i) => (
                <TouchableOpacity
                  onPress={() => {
                    handleSort({
                      index: i,
                      setSort,
                      sort,
                      ssd,
                      sse,
                      location,
                      from: 'Caterers',
                      subData: subSortData,
                      foodTypeData: foodSortData,
                      occassionData: occasionSortData,
                      cuisineData: cuisineSortData,
                      dispatch,
                    });
                  }}
                  key={i}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Text style={[styles.servicetxt, gs.fs13, gs.mv10,gs.ph5]}>
                      {e.name}
                    </Text>
                    <MaterialIcons
                      name={e.selected == 1 ? 'check-circle' : 'circle-outline'}
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: e.selected == 1 ? ts.secondary : ts.alternate,
                        },
                      ]}
                    />
                  </Flex>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card>
        </View>
      </KeyboardAwareScrollView>
       <View style={{marginTop:-10}}></View>
      <Card
        style={[{borderRadius: 0, backgroundColor: '#fff'}, gs.ph15, gs.pb10]}>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={[gs.pt15, gs.pb5]}>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondary, fontFamily: ts.secondaryregular},
            ]}>
            {filterLoading ? (
              <Spinner color={from == 'Caterers' ? ts.secondary : ts.primary} />
            ) : filterData?.total_count >= 0 ? (
              filterData?.total_count
            ) : null}{' '}
            {filterData?.total_count >= 0 ? ' matching Caterers' : null}
          </Text>
          {filterLoading ? (
            <ThemeSepBtn btntxt="Show results" themecolor={'#D3D3D3'} />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={async () => {
                if (filterData?.total_count) {
                  let data = await AsyncStorage.getItem('searchFilterJson');
                  await AsyncStorage.setItem('searchJson', data);
                  dispatch(updateFilterData());
                  let searchData = await JSON.parse(data);
                  let params = searchData;
                  dispatch(
                    getCaterersSearch({
                      params: {
                        ...params,
                        current_page: 1,
                        limit: 5,
                      },
                    }),
                  );
                } else {
                  let data = await AsyncStorage.getItem('searchJson');
                  let searchData = await JSON.parse(data);
                  let params = searchData;
                  dispatch(
                    getCaterersSearch({
                      params: {
                        ...params,
                        current_page: 1,
                        limit: 5,
                      },
                    }),
                  );
                }
                navigation.navigate('PageStack', {
                  screen: 'SearchMain',
                  params: {
                    from,
                    address,
                    ssd,
                    sse,
                    location,
                  },
                });
              }}>
              <ThemeSepBtn btntxt="Show results" themecolor={ts.secondary} />
            </TouchableOpacity>
          )}
        </Flex>
      </Card>
      
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  heading: {
    fontFamily: ts.secondarysemibold,
    marginTop: '5@ms',
    color: ts.primarytext,
  },
  img: {
    height: '35@ms',
    width: '35@ms',
  },
  buffetimg: {
    height: '40@ms',
    width: '40@ms',
  },
  servicetxt: {
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
  },
  txtinput: {
    marginVertical: '10@ms',
    borderWidth: 1,
    paddingVertical: 10,
    fontFamily: ts.secondaryregular,
    fontSize: '14@ms',
    paddingLeft: '30@ms',
    paddingRight: 5,
    borderRadius: 10,
    height: '45@ms',
  },
  searchcontainer: {
    position: 'absolute',
    left: '10@ms',
    height: '45@ms',
    marginTop: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  container: {
    height: '400@ms',
  },
  topcontainer: {
    marginTop: Platform.OS == 'ios' ? '-290@ms' : '-310@ms',
    paddingHorizontal:'10@ms'
  },
  tabbarcontainer: {
    backgroundColor: 'rgba(39, 45, 55, 0.1)',
    elevation: 0,
    height: '26@ms',
    // paddingVertical: '2@ms',
    borderRadius: '6@ms',
  },
});
