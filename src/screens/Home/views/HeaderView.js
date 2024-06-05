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
  useFocusEffect(
    useCallback(() => {
      Animated.spring(opacity, {
        toValue: 1,
        easing: Easing.in,
        useNativeDriver: true,
        delay: 100,
      }).start();
    }, []),
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);
  // console.log(userDetails)
  return (
    <Animated.View
      style={[
        {
          backgroundColor:
            route.name == 'Caterings' ? ts.secondary : ts.primary,
          opacity,
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
              <IonIcons
                name="location-sharp"
                style={[gs.fs22, {color: '#fff'}]}
              />
              <Text
                style={[
                  {fontFamily: ts.secondarymedium, color: '#fff', width: '40%'},
                  gs.fs13,
                  gs.ml5,
                ]}
                numberOfLines={1}>
                {userDetails?.length > 0 && userDetails[0]?.city
                  ? userDetails[0].city
                  : 'Location'}
              </Text>
              <IonIcons
                name="chevron-down"
                style={[gs.fs16, gs.ml5, {color: '#fff'}]}
              />
            </Flex>
          </TouchableWithoutFeedback>
          <Flex direction="row" alignItems="center">
            <TouchableOpacity
              style={gs.ph10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'Notifications',
                });
              }}>
              <IonIcons
                name="notifications"
                style={[gs.fs24, {color: '#fff'}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={gs.ph14}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'WishList',
                });
              }}>
              <MaterialIcons
                name="favorite"
                style={[gs.fs24, {color: '#fff'}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={gs.ph10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'ProfileMain',
                });
              }}>
              {/* <FontAwesome name="user" style={[gs.fs20, {color: '#fff'}]} /> */}
              {/* <Image
                source={require('../../../assets/India/06.jpg')}
                alt="user"
                style={styles.userimg}
              /> */}
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
            </TouchableOpacity>
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
    </Animated.View>
  );
}
export default memo(HeaderView);

const styles = ScaledSheet.create({
  userimg: {
    height: '28@ms',
    width: '28@ms',
    borderRadius: 50,
  },
  name: {
    fontFamily: ts.primarymedium,
    fontWeight:'700'
  },
});
