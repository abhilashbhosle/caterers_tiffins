import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Actionsheet, Center, Divider, Flex, ScrollView} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {gs} from '../../GlobalStyles';
import ThemeSepBtn from './ThemeSepBtn';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocation,
  getUser,
} from '../screens/Onboarding/controllers/AuthController';
import {debounce} from '../constants/Debounce';
import {
  clearSearch,
  getLocationData,
  getLocations,
} from '../screens/Home/controllers/SearchController';
import {getLocationService} from '../screens/Onboarding/services/AuthService';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

function LocationSheet({locSheetOpen, setLocSheetOpen, from}) {
  const {height, width} = Dimensions.get('screen');
  const [focused, setFocused] = useState(false);
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const [location, setLocation] = useState('');
  // const {searchLoading, searchData, searchError} = useSelector(
  //   state => state.location,
  // );
  const searchLoading = useSelector(state => state.location.locationLoading);
  const searchData = useSelector(state => state.location.locationData);
  const searchError = useSelector(state => state.location.locationError);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const handleClose = () => {
    setLocSheetOpen(false);
    setFocused(false);
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (userDetails?.length > 0 && userDetails[0]?.formatted_address) {
      setLocation(userDetails[0]?.formatted_address);
    }
  }, [userDetails]);
  const handleOnChange = text => {
    setLocation(text);
    handleSearch(text);
  };

  const handleSearch = useCallback(
    debounce(text => {
      dispatch(getLocationData({data: text}));
    }, 200),
    [],
  );
  const handleSelectedSearch = async e => {
    setLocation(e.formatted_address);
    dispatch(clearSearch());
    await getLocationService({
      latitude: e.geometry.location.lat,
      longitude: e.geometry.location.lng,
      dispatch,
      from: 'internal',
      formatted_address:e.formatted_address
    });
    setTimeout(() => {
      dispatch(getUser());
    }, 1000);
    setFocused(false);
    setLocSheetOpen(false);
  };
  const checkLocation = () => {
    dispatch(getLocation({navigation, from: 'internal'}));
  };
  return (
    <Actionsheet isOpen={locSheetOpen} onClose={handleClose}>
      <Actionsheet.Content style={[{height: height / 1.3}]}>
        <KeyboardAwareScrollView style={{width: '100%'}}>
          <View style={{position: 'relative'}}>
            <TextInput
              label="Try A2B, Mg road, Banglore.."
              style={styles.inputcontainer}
              placeholderTextColor={'#777'}
              mode="outlined"
              activeOutlineColor={
                from === 'Caterers' ? ts.secondary : ts.primary
              }
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              outlineStyle={gs.br10}
              textColor={ts.primarytext}
              value={location}
              onChangeText={text => {
                handleOnChange(text);
              }}
              right={
                  // <TouchableOpacity>
                    <TextInput.Icon icon="close" onPress={()=>{setLocation("")}}/>
                  // </TouchableOpacity>
              }
            />
            <View style={[{position: 'absolute', left: 20}, gs.mt18]}>
              <MaterialIcons
                name="map-marker-radius"
                style={[
                  gs.fs20,
                  {
                    color: focused
                      ? from == 'Caterers'
                        ? ts.secondary
                        : ts.primary
                      : '#777',
                  },
                ]}
              />
            </View>
          </View>
          {!focused && (
            <>
              <Flex
                direction="row"
                flex={1}
                align="center"
                justify="space-between"
                style={[gs.mt15]}>
                <View style={styles.border}></View>
                <Text
                  style={[
                    gs.fs13,
                    {color: '#777', fontFamily: ts.secondaryregular},
                  ]}>
                  or
                </Text>
                <View style={styles.border}></View>
              </Flex>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={checkLocation}
                style={[gs.mt15]}>
                <ThemeSepBtn
                  btntxt="Allow current location"
                  themecolor={from == 'Caterers' ? ts.secondary : ts.primary}
                />
              </TouchableOpacity>
            </>
          )}
          {/* ======SEARCH RESULTS========= */}
          {searchData?.length > 0 &&
            location?.length > 0 &&
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
        </KeyboardAwareScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
export default memo(LocationSheet);
const styles = ScaledSheet.create({
  inputcontainer: {
    width: '100%',
    // height: '45@ms',
    borderRadius: '10@ms',
    color: ts.primarytext,
    fontSize: '14@ms',
    paddingLeft: '30@ms',
    backgroundColor: '#fff',
    // paddingRight: '30@ms',
  },
  border: {
    width: '46%',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
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
