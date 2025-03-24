import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Center, Divider, Flex, Modal, Spinner, theme} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import AntIcons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocation,
  getUser,
} from '../../Onboarding/controllers/AuthController';
import {styles} from '../styles/SearchBarStyles';
import {
  clearCaterers,
  clearSearch,
  getLocations,
  getSearchVendors,
  handleSearchResults,
  setEdate,
  setEndFullDate,
  setLocationres,
  setSdate,
  setSearchRes,
  setSelectedLocRes,
  setStartDate,
  setStartFullDate,
} from '../controllers/SearchController';
import {debounce} from '../../../constants/Debounce';
import {showMessage} from 'react-native-flash-message';
import {getOccassions} from '../controllers/OccassionController';
import {getCuisines} from '../controllers/ExploreCuisineController';
import {
  getBudget,
  getFoodTypes,
  getHeadCount,
  getRatings,
  getService,
  getServing,
  getSort,
  getSubscription,
} from '../controllers/FilterMainController';
import {getKitchen, getMeal} from '../controllers/FilterTiffinController';
import {
  setSearchHomeJson,
  setSearchJson,
} from '../controllers/SearchCommonController';
import {getAddress} from '../../Onboarding/services/AuthService';
const minDate = new Date(); // Today
const maxDate = new Date(2037, 6, 3);

function SearchBar({from, navigation, ssd, sse, hideDate}) {
  const route = useRoute();
  const calendarRef = useRef();
  let today = new Date();
  let dateAfter7Days = new Date();
  dateAfter7Days.setDate(today.getDate() + 7);
  const [openCalendarPicker, setOpenCalendarPicker] = useState(false);
  const theme = from == 'Caterers' ? ts.secondary : ts.primary;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [dates, setDates] = useState({start: null, end: null});
  const [fromdate, setFromdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [selection, setSelection] = useState(null);
  const inputRef = useRef();

  const [selectedLocation, setSelectedLocation] = useState({
    city: null,
    longitude: null,
    latitude: null,
    pincode: 1,
    place_id: null,
    area: null,
  });
  const userDet = useSelector(state => state.auth?.userInfo?.data);
  const searchRes = useSelector(state => state.location?.searchRes);
  const locationRes = useSelector(state => state.location.locationRes);

  useMemo(() => {
    setUserDetails(userDet);
  }, [userDet]);

  useEffect(() => {
    if (searchRes) {
      setSearch(searchRes);
    } else {
      setSearch('');
    }
    if (locationRes) {
      setSelectedLocation(locationRes);
    }
  }, [searchRes, locationRes]);
  const {vendorData, vendorLoading, vendorError} = useSelector(
    state => state.location,
  );
  const {searchData, searchLoading, searchError} = useSelector(
    state => state.location,
  );

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setEnddate(date ? moment(date).format('MMM DD') : null);
      setDates({
        ...dates,
        end: date ? moment(date).format('YYYY-MM-DD') : null,
      });
    } else {
      setSelectedStartDate(date);
      setFromdate(date ? moment(date).format('MMM DD') : null);
      setSelectedEndDate(null);
      setEnddate(null);
      setDates({
        ...dates,
        start: date ? moment(date).format('YYYY-MM-DD') : null,
      });
    }
  };
  const handleReset = () => {
    setSelectedEndDate(null);
    setSelectedStartDate(null);
    setFromdate(null);
    setEnddate(null);
    calendarRef.current.resetSelections();
  };
  const onClose = () => {
    setOpenCalendarPicker(false);
    // handleReset();
  };

  const handleOnChange = text => {
    setSearch(text);
    if (userDetails?.length > 0 && userDetails[0]?.latitude?.length) {
      handleSearch(text);
    } else {
      dispatch(getUser());
    }
  };
  const handleSearch = useCallback(
    debounce(text => {
      let params = {
        search_term: text,
        order_by_filter: JSON.stringify([{id: 2, value: 'a_z'}]),
        limit: 20,
        current_page: 1,
        // latitude: userDetails?.length > 0 && userDetails[0]?.latitude,
        // longitude: userDetails?.length > 0 && userDetails[0]?.longitude,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
      };
      if (text?.length > 0 && text != userDetails[0]?.formatted_address) {
        console.log('hellooo');
        // dispatch(getSearchVendors({params}));
        dispatch(getLocations({data: text}));
        // setSearchTerm(text);
      } else {
        dispatch(clearSearch());
      }
    }, 500),
    [],
  );

  const handleSelectedSearch = async e => {
    // let tempData = e.formatted_address.split(',');
    let address = await getAddress({place_id: e.place_id});
    // console.log(address)
    setSelectedLocation({
      ...selectedLocation,
      latitude: address?.latitude,
      longitude: address?.longitude,
      place_id: address?.place_id,
      city: address?.city,
      area: address?.area ? address.area : '',
      pincode: address?.pincode ? address.pincode : '',
    });
    // console.log("address",address);
    // console.log(e);
    // setVendorId(e?.id);
    setSearch(e.formatted_address);
    setSelection({ start: 0, end: 0 });
    dispatch(clearSearch());
    setSelectedSearch(e);
    setSelection(null)
  };

  const handleCalendarPicker = () => {
    if (!dates.start || !dates.end) {
      showMessage({
        message: 'Start or End Date Missing.',
        description: 'Please select start and end date.',
        type: 'info',
      });
    }
    setOpenCalendarPicker(false);
  };
  useEffect(() => {
    if (sse && ssd) {
      setSelectedStartDate(ssd);
      setSelectedEndDate(sse);
      setEnddate(sse ? moment(sse).format('MMM DD') : null);
      setFromdate(ssd ? moment(ssd).format('MMM DD') : null);
      setDates({
        ...dates,
        end: sse ? moment(sse).format('YYYY-MM-DD') : null,
        start: ssd ? moment(ssd).format('YYYY-MM-DD') : null,
      });
    }
  }, [ssd, sse]);

  useEffect(() => {
    console.log('triggered');
    dispatch(getFoodTypes());
    dispatch(getSubscription({from}));
    dispatch(getServing());
    dispatch(getService({type: from == 'Caterers' ? 'Caterer' : 'Tiffin'}));
    dispatch(getOccassions());
    dispatch(getBudget({type: from == 'Caterers' ? 'Caterer' : 'Tiffin'}));
    dispatch(getCuisines());
    dispatch(getHeadCount());
    dispatch(getSort());
    dispatch(getMeal());
    dispatch(getKitchen());
    dispatch(getRatings());
    dispatch(getUser());
  }, []);

  const {foodTypeData, subData} = useSelector(state => state?.filterCater);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: from == 'Caterers' ? '#ed9f9e' : '#efb76e',
          },
          gs.br10,
        ]}>
        <Flex direction="row" alignItems="center">
          {/* =====CALENDAR====== */}
          {hideDate ? null : (
            <TouchableWithoutFeedback
              onPress={() => {
                setOpenCalendarPicker(true);
              }}>
              <Flex
                style={[styles.calendarTextInput, gs.pl10]}
                direction="row"
                alignItems="center"
                justifyContent="flex-start">
                <View>
                  <Image
                    source={
                      route.name == 'Caterings' || from == 'Caterers'
                        ? require('../../../assets/Search/calender_new.png')
                        : require('../../../assets/Search/calender_newt.png')
                    }
                    style={styles.calIcon}
                  />
                </View>
                <View>
                  {fromdate && enddate ? (
                    <Text style={styles.searchtxt}>
                      {fromdate} - {enddate?.slice(4)}
                    </Text>
                  ) : (
                    <Text style={styles.searchtxt}>Date</Text>
                  )}
                </View>
              </Flex>
            </TouchableWithoutFeedback>
          )}

          {/* ======SEARCH======= */}

          <View style={[{width: '89%'}]}>
            <Flex direction="row">
              {/* ======SEARCH INPUT======== */}
              <TextInput
                style={[
                  {
                    ...styles.searchTextInput,
                    color: ts.secondarytext,
                    fontFamily: ts.jakartasemibold,
                    width: hideDate ? '100%' : '63%',
                    borderTopLeftRadius: hideDate ? 10 : 0,
                    borderBottomLeftRadius: hideDate ? 10 : 0,
                    marginLeft: hideDate ? '0@ms' : '-1@ms',
                  },
                  gs.fs14,
                  gs.ph10,
                ]}
                placeholder={
                  // from == 'Caterers' ? 'Search Caterers' : 'Search Tiffins'
                  ' Search Area, City'
                }
                placeholderTextColor="gray"
                value={search}
                onChangeText={text => handleOnChange(text)}
                returnKeyType="search"
                returnKeyLabel="search"
                ref={inputRef}
                selection={selection}
              />
              {hideDate == true ? null : <View style={styles.seperator}></View>}
              <Pressable
                style={styles.searchIconContainers}
                onPress={async () => {
                  dispatch(clearCaterers());
                  dispatch(setSearchRes(search));
                  dispatch(setLocationres(selectedLocation));
                  await setSearchHomeJson({
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    city: selectedLocation.city,
                    pincode: selectedLocation.pincode,
                    place_id: selectedLocation.place_id,
                    from,
                    selectedStartDate: selectedStartDate
                      ? selectedStartDate
                      : today,
                    selectedEndDate: selectedEndDate ? selectedEndDate : today,
                    foodTypeData,
                    subData,
                    searchTerm: '',
                    selected_vendor:
                      search != userDetails[0]?.formatted_address
                        ? vendorId
                        : '',
                    is_city_search: 1,
                    order_by: 'distance',
                  });
                  handleSearchResults({
                    navigation,
                    from,
                    search,
                    selectedStartDate: selectedStartDate
                      ? selectedStartDate
                      : today,
                    selectedEndDate: selectedEndDate ? selectedEndDate : today,
                    userDetails,
                    selectedLocation,
                    setSelectedLocation,
                    setSearch,
                    dispatch,
                    foodTypeData,
                    subData,
                    searchTerm: search,
                    selected_vendor:
                      search != userDetails[0]?.formatted_address
                        ? vendorId
                        : '',
                    is_city_search: 1,
                  });
                }}>
                <Image
                  source={
                    from == 'Caterers'
                      ? require('../../../assets/Search/searchright.png')
                      : require('../../../assets/Search/searchright_t.png')
                  }
                  style={styles.searchIcon}
                />
              </Pressable>
            </Flex>
          </View>
        </Flex>
        {/* ======SEARCH RESULTS========= */}
        {searchData?.length > 0 &&
          search?.length > 0 &&
          !searchLoading &&
          !searchError && (
            <ScrollView style={[styles.searchContainer, gs.mt2, gs.br10]} showsVerticalScrollIndicator={false}>
              {searchData?.map((e, i) => (
                <View key={i}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      handleSelectedSearch(e);
                    }}>
                    <Text style={styles.loctxt} numberOfLines={1}>
                      {e?.formatted_address}
                    </Text>
                    {/* {e?.area ? (
                      <Text
                        style={[
                          {...styles.loctxt, color: ts.secondarytext},
                          gs.fs12,
                        ]}
                        numberOfLines={1}>
                        {e?.area}
                        {e?.city ? (
                          <Text numberOfLines={1}>, {e?.city}</Text>
                        ) : null}
                      </Text>
                    ) : null} */}

                    <Divider
                      backgroundColor={
                        from == 'Caterers' ? ts.secondary : ts.primary
                      }
                      style={gs.mv10}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        {searchLoading && (
          <Center>
            <View style={{...styles.searchContainer}}>
              <Spinner color={ts.secondarytext} />
            </View>
          </Center>
        )}
      </View>
      {/* {searchData?.length == 0 && search?.length>0 && (
        <ScrollView style={styles.searchContainer}>
              <Text style={styles.loctxt} numberOfLines={2}>No search results found</Text>
        </ScrollView>
      )} */}
      <Modal isOpen={openCalendarPicker} onClose={onClose}>
        <View
          style={[
            {
              ...styles.calendarcontainer,
              backgroundColor: theme,
              width: '100%',
            },
            gs.p10,
          ]}>
          <Flex style={styles.rangecontainer} alignItems="center">
            <Flex direction="row" style={[gs.mt15]}>
              <Text
                style={[
                  gs.fs18,
                  {fontFamily: ts.primarymedium, color: '#fff'},
                ]}>
                Start Date
              </Text>
            </Flex>

            <View style={styles.dashedborder}>
              {from == 'Caterers' ? (
                <Image
                  source={require('../../../assets/Bottombar/chefhatf.png')}
                  style={styles.chefhat}
                  tintColor="#fff"
                />
              ) : (
                <Image
                  source={require('../../../assets/Bottombar/tiffinf.png')}
                  style={styles.chefhat}
                  tintColor="#fff"
                />
              )}
            </View>
            <Flex direction="row" align="center" style={[gs.mt15]}>
              <Text
                style={[
                  gs.fs18,
                  {fontFamily: ts.primarymedium, color: '#fff'},
                ]}>
                End Date
              </Text>
            </Flex>
          </Flex>
          <Flex
            style={{...styles.rangecontainer, marginVertical: 10}}
            alignItems="center">
            <Text
              style={[gs.fs13, {color: '#fff', fontFamily: ts.primaryregular}]}>
              {fromdate}
            </Text>
            <Text
              style={[gs.fs13, {color: '#fff', fontFamily: ts.primaryregular}]}>
              {enddate}
            </Text>
          </Flex>
          <CalendarPicker
            startFromMonday={true}
            ref={calendarRef}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#fffa"
            selectedDayColor={from == 'Caterers' ? ts.secondary : ts.primary}
            selectedDayTextColor={
              from == 'Caterers' ? ts.secondary : ts.primary
            }
            onDateChange={onDateChange}
            yearTitleStyle={{color: '#fff'}}
            monthTitleStyle={{color: '#fff'}}
            selectedRangeStyle={{backgroundColor: '#fff'}}
            textStyle={{color: '#fff', fontFamily: ts.primarysemibold}}
            dayLabelsWrapper={{borderColor: '#fff'}}
            disabledDatesTextStyle={{color: '#ddd'}}
            previousComponent={
              <AntIcons name="arrowleft" style={[gs.fs22, {color: '#fff'}]} />
            }
            nextComponent={
              <AntIcons name="arrowright" style={[gs.fs22, {color: '#fff'}]} />
            }
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
          />
          <TouchableOpacity
            style={[{width: '100%'}, gs.ph5, gs.mt10]}
            onPress={handleCalendarPicker}>
            <WhiteCoverBtn btntxt="Submit" color={theme} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
            <Center style={[gs.mv15]}>
              <Text
                style={[
                  gs.fs14,
                  {color: '#fff', fontFamily: ts.primaryregular},
                ]}>
                Reset
              </Text>
            </Center>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
export default memo(SearchBar);
