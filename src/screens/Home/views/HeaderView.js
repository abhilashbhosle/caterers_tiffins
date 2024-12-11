import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {styles} from '../styles/HeaderStyles';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {Flex} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBar from './SearchBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LocationSheet from '../../../components/LocationSheet';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../Onboarding/controllers/AuthController';

function HeaderView({from, navigation}) {
  const route = useRoute();
  const opacity = useRef(new Animated.Value(0)).current;
  const [locSheetOpen, setLocSheetOpen] = useState(false);
  const userDetails = useSelector(state => state.auth?.userInfo?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <View
      style={[
        {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: Platform.OS == 'android' && StatusBar.currentHeight + 10,
        },
        gs.p20,
      ]}>
      <SafeAreaView>
        {/* =======TOP BAR LOCATION/NOTIFY/WISHLIST/PROFILE========= */}
        <Flex direction="row" alignItems="center" justify="space-between">
          <TouchableWithoutFeedback
            onPress={() => {
              setLocSheetOpen(true);
            }}>
            <Flex direction="row" alignItems="center">
              <Image
                source={
                  route.name == 'Caterings' || from == 'Caterers'?
                  require('../../../assets/Search/location_new.png')
                  :
                  require('../../../assets/Search/location_newt.png')
                }
                style={styles.topIcons}
              />
              <Text
                style={[
                  {
                    fontFamily: ts.secondaryregular,
                    color: '#000',
                    maxWidth: '60%',
                  },
                  gs.fs16,
                  gs.ml5,
                ]}
                numberOfLines={1}>
                {userDetails?.length > 0 && userDetails[0]?.city
                  ? userDetails[0].city
                  : 'Location'}
              </Text>
              <IonIcons
                name="chevron-down"
                style={[gs.fs16, gs.ml5, {color: '#000'}]}
              />
            </Flex>
          </TouchableWithoutFeedback>
          <Flex direction="row" alignItems="center">
            <TouchableOpacity
              style={gs.pl10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'Notifications',
                });
              }}>
              <Image
                source={
                  route.name == 'Caterings' || from == 'Caterers'
                    ? require('../../../assets/Search/notify_new.png')
                    : require('../../../assets/Search/notify_newt.png')
                }
                style={styles.topIcons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={gs.pl10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'WishList',
                });
              }}>
              <Image
                source={
                  route.name == 'Caterings' || from == 'Caterers'?
                  require('../../../assets/Search/wish_new.png'):
                  require('../../../assets/Search/wish_newt.png')
                }
                style={styles.topIcons}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={gs.ph10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'ProfileMain',
                });
              }}>
          
              <View
                style={{
                  ...styles.userimg,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    gs.fs14,
                    {
                      ...styles.name,
                      color: from == 'Caterers' ? ts.secondary : ts.primary,
                    },
                  ]}>
                  {userDetails?.length > 0 &&
                    userDetails[0]?.username?.slice(0, 1)}
                </Text>
              </View>
            </TouchableOpacity> */}
          </Flex>
        </Flex>
        {/* =====SEARCHBAR/CALENDAR======= */}
        <View style={[gs.mt20]}>
          <SearchBar from={from} navigation={navigation} />
        </View>
      </SafeAreaView>
      <LocationSheet
        locSheetOpen={locSheetOpen}
        setLocSheetOpen={setLocSheetOpen}
        from={from}
      />
    </View>
  );
}
export default memo(HeaderView);
