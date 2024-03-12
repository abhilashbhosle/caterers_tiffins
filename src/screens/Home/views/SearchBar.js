import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import {Center, Flex, Modal, theme} from 'native-base';
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
const minDate = new Date(); // Today
const maxDate = new Date(2037, 6, 3);

function SearchBar({from, navigation}) {
  const route = useRoute();
  const calendarRef = useRef();
  const [openCalendarPicker, setOpenCalendarPicker] = useState(false);
  const theme = from == 'Caterers' ? ts.secondary : ts.primary;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [fromdate, setFromdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const {width, height} = Dimensions.get('screen');

  const onDateChange = (date, type) => {
    // console.log(date, type);
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setEnddate(date ? moment(date).format('MMM DD') : null);
    } else {
      setSelectedStartDate(date);
      setFromdate(date ? moment(date).format('MMM DD') : null);
      setSelectedEndDate(null);
      setEnddate(null);
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
    handleReset();
  };

  return (
    <>
      <Flex direction="row">
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
            <Text style={[gs.fs11, {color: '#57636c'}, gs.ml4]}>
              Feb 16 - 18
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
        {/* ======SEARCH======= */}
        <Flex direction="row" w={'100%'}>
          {/* ======SEARCH INPUT======== */}
          <TextInput
            style={[
              {...styles.searchTextInput, color: '#57636c'},
              gs.fs11,
              gs.ph10,
            ]}
            placeholder="Search"
            placeholderTextColor="#57636c"
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
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'SearchMain',
                params: {from},
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
      </Flex>

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
          <Flex style={styles.rangecontainer} alignItems='center'>
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
                  tintColor='#fff'
                />
              ) : (
                <Image
                source={require('../../../assets/Bottombar/tiffinf.png')}
                style={styles.chefhat}
                tintColor='#fff'
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
          <Flex style={{...styles.rangecontainer, marginVertical: 10}} alignItems='center'>
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
            selectedDayColor={theme}
            selectedDayTextColor={ts.secondary}
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
          />
          <View style={[{width: '100%'}, gs.ph5, gs.mt10]}>
            <WhiteCoverBtn btntxt="Submit" color={theme} />
          </View>
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
});
