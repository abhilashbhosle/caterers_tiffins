import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LocationSheet from '../../../components/LocationSheet';

function HeaderView({from, navigation}) {
  const route = useRoute();
  const opacity = useRef(new Animated.Value(0)).current;
  const [locSheetOpen,setLocSheetOpen]=useState(false)
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
  return (
    <Animated.View
      style={[
        {
          backgroundColor:
            route.name == 'Caterings' ? ts.secondary : ts.primary,
          opacity,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
        gs.p20,
      ]}>
      <SafeAreaView>
        {/* =======TOP BAR LOCATION/NOTIFY/WISHLIST/PROFILE========= */}
        <Flex direction="row" alignItems="center" justify="space-between">
          <TouchableWithoutFeedback onPress={()=>{setLocSheetOpen(true)}}>
            <Flex direction="row" alignItems="center">
              <IonIcons
                name="location-sharp"
                style={[gs.fs20, {color: '#fff'}]}
              />
              <Text
                style={[
                  {fontFamily: ts.secondarymedium, color: '#fff'},
                  gs.fs13,
                  gs.ml5,
                ]}>
                Location
              </Text>
              <IonIcons name='chevron-down' style={[gs.fs16,gs.ml5,{color:'#fff'}]}/>
            </Flex>
          </TouchableWithoutFeedback>
          <Flex direction="row">
            <TouchableOpacity style={gs.ph10} activeOpacity={0.7} 
             onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'Notification',
              });
            }}
            >
              <IonIcons
                name="notifications-outline"
                style={[gs.fs24, {color: '#fff'}]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={gs.ph10} activeOpacity={0.7}  onPress={() => {
            navigation.navigate('PageStack', {
              screen: 'WishList',
            });
          }}>
              <MaterialIcons name="favorite-border" style={[gs.fs24, {color: '#fff'}]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={gs.ph10}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PageStack', {
                  screen: 'ProfileMain',
                });
              }}>
              <FontAwesome name="user" style={[gs.fs20, {color: '#fff'}]} />
            </TouchableOpacity>
          </Flex>
        </Flex>
        {/* =====SEARCHBAR/CALENDAR======= */}
        <View style={[gs.mt20]}>
          <SearchBar from={from} navigation={navigation} />
        </View>
      </SafeAreaView>
      <LocationSheet locSheetOpen={locSheetOpen} setLocSheetOpen={setLocSheetOpen} from={from}/>
    </Animated.View>
  );
}
export default memo(HeaderView);
