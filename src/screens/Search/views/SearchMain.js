import {View, Text, TouchableOpacity, useWindowDimensions, Platform} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../../Home/views/SearchBar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Flex} from 'native-base';
import {labels} from '../../../constants/Checks';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Badges from './Badges';
import SearchList from './SearchList';
import {ScaledSheet} from 'react-native-size-matters';

export default function SearchMain({route, navigation}) {
  const {width, height} = useWindowDimensions();
  const {from} = route.params;
  const [selectedType, setSelectedType] = useState('');

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
            onPress={() => {
              navigation.goBack();
            }}
            style={[gs.pb20]}>
            {/* ========SEARCH============ */}
            <AntIcon name="arrowleft" style={[gs.fs22, {color: '#fff'},gs.mt10]} />
          </TouchableOpacity>
          <SearchBar from={from} navigation={navigation} />
        </SafeAreaView>
      </View>
      {/* ========TOP SELECTOR============ */}
      <Flex
        style={[{width, backgroundColor: '#fff'}, gs.ph10, gs.pt15]}
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}>
        <Flex direction="row" alignItems="center">
          {labels.map((e, i) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedType(e.type);
              }}>
              <Flex direction="row" alignItems="center" style={[gs.pr10]}>
                <MaterialIcons
                  name={
                    e.type !== selectedType
                      ? 'circle-outline'
                      : 'circle-slice-8'
                  }
                  style={[
                    gs.fs20,
                    gs.mr3,
                    {
                      color:
                        e.type !== selectedType
                          ? '#555'
                          : from == 'Caterers'
                          ? ts.secondary
                          : ts.primary,
                    },
                  ]}
                />
                <Text
                  style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
                  {e.type}
                </Text>
              </Flex>
            </TouchableOpacity>
          ))}
        </Flex>
        <Flex direction="row" alignItems="center">
          <IonIcons
            name="location-sharp"
            style={[gs.fs22, {color: '#555'}, gs.mr5]}
          />
          <Text style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
            Map
          </Text>
        </Flex>
        <Flex direction="row" alignItems="center">
          <MaterialIcons
            name="filter"
            style={[gs.fs22, {color: '#555'}, gs.mr5]}
          />
          <Text style={[{fontFamily: ts.secondary, color: '#222'}, gs.fs13]}>
            Filters
          </Text>
        </Flex>
      </Flex>
      {/* ========SORTING BY TYPES========= */}
      <Badges from={from} />
      {/* ========SEARCH CARDS======== */}
      <View style={[{paddingHorizontal: 5, backgroundColor: '#fff'}]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarymedium, color: '#555'},
            gs.fs13,
          ]}>
          {from == 'Tiffins'
            ? 'Adyar: 78 Tiffin service providers found'
            : 'Chennai: 78 Catering service providers found'}
        </Text>
      </View>
      <SearchList from={from} />
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  headercontainer: {
	borderBottomLeftRadius: 10,
	 borderBottomRightRadius: 10,
	 height:Platform.OS=='ios'?'150@ms':'110@ms'
	},
});
