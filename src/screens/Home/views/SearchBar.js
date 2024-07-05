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
} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
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
import {getLocation} from '../../Onboarding/controllers/AuthController';
import {
  clearCaterers,
  clearSearch,
  getLocations,
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
const minDate = new Date(); // Today
const maxDate = new Date(2037, 6, 3);

function SearchBar({from, navigation, ssd, sse}) {
  const route = useRoute();
  const calendarRef = useRef();
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

  const [selectedLocation, setSelectedLocation] = useState({
    city: null,
    longitude: null,
    latitude: null,
    pincode: 1,
    place_id: null,
  });
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const searchRes = useSelector(state => state.location?.searchRes);
  const locationRes = useSelector(state => state.location.locationRes);

  useEffect(() => {
    if (searchRes) {
      setSearch(searchRes);
    }
    if (locationRes) {
      setSelectedLocation(locationRes);
    }
  }, [searchRes, locationRes]);
  const {searchLoading, searchData, searchError} = useSelector(
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
    handleSearch(text);
  };
  const handleSearch = useCallback(
    debounce(text => {
      dispatch(getLocations({data: text}));
    }, 500),
    [],
  );

  const handleSelectedSearch = async e => {
    let tempData = e.formatted_address.split(',');
    setSelectedLocation({
      ...selectedLocation,
      latitude: e.geometry.location.lat,
      longitude: e.geometry.location.lng,
      place_id: e.place_id,
      city: tempData[tempData.length - 3].trim(),
    });
    setSearch(e.formatted_address);
    setSelectedSearch(e);
    dispatch(clearSearch());
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
    dispatch(getFoodTypes());
    dispatch(getSubscription({from}));
    dispatch(getServing());
    dispatch(getService());
    dispatch(getOccassions());
    dispatch(getBudget());
    dispatch(getCuisines());
    dispatch(getHeadCount());
    dispatch(getSort());
    dispatch(getMeal());
    dispatch(getKitchen());
    dispatch(getRatings())
  }, []);

  return (
    <>
      <Flex direction="row" alignItems="center">
        {/* =====CALENDAR====== */}
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenCalendarPicker(true);
          }}>
          <Flex
            style={styles.calendarTextInput}
            direction="row"
            alignItems="center"
            justifyContent="center">
            <View>
              <MaterialIcon
                name="edit-calendar"
                style={[
                  gs.fs25,
                  {
                    color:
                      route.name == 'Caterings' || from == 'Caterers'
                        ? ts.secondary
                        : ts.primary,
                  },
                ]}
              />
            </View>
            {fromdate && enddate ? (
              <Text style={[gs.fs11, {color: ts.primarytext}, gs.ml4]}>
                {fromdate} - {enddate?.slice(4)}
              </Text>
            ) : (
              <Text style={[gs.fs11, {color: ts.secondarytext}, gs.ml10]}>
                Date
              </Text>
            )}
          </Flex>
        </TouchableWithoutFeedback>
        {/* ======SEARCH======= */}

        <View style={{width: '100%'}}>
          <Flex direction="row">
            {/* ======SEARCH INPUT======== */}
            <TextInput
              style={[
                {...styles.searchTextInput, color: ts.primarytext},
                gs.fs11,
                gs.ph10,
              ]}
              placeholder="Search"
              placeholderTextColor="#57636c"
              value={search}
              onChangeText={text => handleOnChange(text)}
            />
            <TouchableOpacity
              style={{
                ...styles.searchIconContainer,
                borderLeftWidth: 1,
                borderLeftColor:
                  route.name == 'Caterings' || from == 'Caterers'
                    ? ts.secondary
                    : ts.primary,
              }}
              activeOpacity={0.9}
              onPress={async () => {
                dispatch(clearCaterers());
                dispatch(setSearchRes(search));
                dispatch(setLocationres(selectedLocation));
                // console.log("search",search)
                handleSearchResults({
                  navigation,
                  from,
                  search,
                  selectedStartDate,
                  selectedEndDate,
                  userDetails,
                  selectedLocation,
                  setSelectedLocation,
                  setSearch,
                  dispatch,
                });
              }}>
              <MaterialIcon
                name="search"
                style={[
                  gs.fs20,
                  {
                    color:
                      route.name == 'Caterings' || from == 'Caterers'
                        ? ts.secondary
                        : ts.primary,
                  },
                ]}
              />
            </TouchableOpacity>
          </Flex>
        </View>
      </Flex>
      {/* ======SEARCH RESULTS========= */}
      {searchData?.length > 0 &&
        search?.length > 0 &&
        !searchLoading &&
        !searchError && (
          <ScrollView style={styles.searchContainer}>
            {searchData?.map((e, i) => (
              <View key={i}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleSelectedSearch(e);
                  }}>
                  <Text style={styles.loctxt} numberOfLines={2}>
                    {e?.formatted_address}
                  </Text>
                  <Divider
                    backgroundColor={
                      from == 'Caterers' ? ts.secondary : ts.primary
                    }
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
const styles = ScaledSheet.create({
  calendarTextInput: {
    width: '34%',
    height: '40@ms',
    backgroundColor: '#fff',
    position: 'relative',
    borderTopLeftRadius: '6@ms',
    borderBottomLeftRadius: '6@ms',
  },
  searchTextInput: {
    width: '53%',
    height: Platform.OS == 'ios' ? '39.4@ms' : '40@ms',
    backgroundColor: '#fff',
    marginLeft: 2,
  },
  searchIconContainer: {
    width: '12%',
    height: '40@ms',
    backgroundColor: '#fff',
    borderTopRightRadius: '6@ms',
    borderBottomRightRadius: '6@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@ms',
  },
  chefhat: {
    height: '40@ms',
    width: '40@ms',
  },
  midicon: {color: '#fff', fontSize: '40@ms'},
  searchContainer: {
    backgroundColor: '#fff',
    maxHeight: '200@ms',
    width: '100%',
    padding: '20@ms',
    borderRadius: '6@ms',
  },
  loctxt: {
    fontSize: '14@ms',
    color: ts.primarytext,
    fontFamily: ts.secondaryregular,
    marginVertical: '5@ms',
  },
});
