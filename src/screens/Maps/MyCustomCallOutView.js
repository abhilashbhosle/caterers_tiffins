import {Flex} from 'native-base';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {gs} from '../../../GlobalStyles';
import {ts} from '../../../ThemeStyles';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import OctIcon from 'react-native-vector-icons/Octicons';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export const MyCustomCalloutView = ({profile, from, single}) => {
  const {height, width} = Dimensions.get('screen');
  return (
    <View style={[{backgroundColor: '#fff', width: width / 1.5}, gs.pv10]}>
      <Flex direction="row">
        <View
          style={{
            ...styles.profileContainer,
            backgroundColor: from == 'Caterer' ? ts.secondary : ts.primary,
          }}>
          <Text style={styles.profileName}>
            {profile?.vendor_service_name?.slice(0, 1)}
          </Text>
        </View>
        <View style={[gs.ml10]}>
          <Text
            style={[
              gs.fs14,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
            ]}>
            {profile?.vendor_service_name?.slice(0, 25)}{' '}
            {profile?.vendor_service_name?.length > 25 ? '..' : ' '}
          </Text>

          <Flex direction="row" align="center" style={[gs.mt7, gs.mb5]}>
            {
            profile?.foodTypes?.map((e, i) =>
              e.hasOwnProperty('food_type_name') ? (
                <Flex direction="row" alignItems="center" key={i}>
                  {e.food_type_name == 'Veg' ? (
                    <View
                      style={{...styles.dotContainer, borderColor: '#266920'}}>
                      <OctIcon
                        name="dot-fill"
                        style={[[{color: '#266920'}, gs.fs13]]}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        ...styles.dotContainer,
                        borderColor: ts.secondary,
                      }}>
                      <OctIcon
                        name="dot-fill"
                        style={[{color: ts.secondary}, gs.fs13]}
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      gs.fs11,
                      {
                        color:
                          e.food_type_name == 'Veg' ? '#266920' : ts.accent4,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {e.food_type_name}{' '}
                  </Text>
                </Flex>
              ) : (
                <Flex direction="row" alignItems="center" key={i}>
                  {e == 'Veg' ? (
                    <View
                      style={{...styles.dotContainer, borderColor: '#266920'}}>
                      <OctIcon
                        name="dot-fill"
                        style={[[{color: '#266920'}, gs.fs13]]}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        ...styles.dotContainer,
                        borderColor: ts.secondary,
                      }}>
                      <OctIcon
                        name="dot-fill"
                        style={[{color: ts.secondary}, gs.fs13]}
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      gs.fs11,
                      {
                        color: e == 'Veg' ? '#266920' : ts.accent4,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {e}{' '}
                  </Text>
                </Flex>
              ),
            )}
          </Flex>
          <Flex direction="row" align="center">
            <Text numberOfLines={1}>
              
              {profile?.cuisines?.slice(0, 2)?.map((e, i) => (
                <Text style={[styles.cuisine]} key={i}>
                  {e?.hasOwnProperty("cuisine_name")? e.cuisine_name:e} {'|'}{' '}
                </Text>
              ))}
              {profile?.cuisines?.length > 2 && '..'}
            </Text>
          </Flex>
          <Text
            numberOfLines={1}
            style={[gs.fs10, gs.mt2, {color: ts.secondarytext}]}>
            {profile?.formatted_address?.slice(0, 30)}{' '}
            {profile?.formatted_address?.length > 30 ? '..' : ' '}
          </Text>
          <Flex
            direction="row"
            align="center"
            justifyContent="space-between"
            style={[gs.mt5]}>
            <Text style={[gs.fs10, {color: ts.primarytext}]}>
              {profile?.business_phone_number ||
                profile?.whatsapp_business_phone_number}
            </Text>
          </Flex>
          {!single ? (
            <TouchableOpacity style={[gs.mt10]} activeOpacity={0.7}>
              <ThemeSepBtn
                btntxt="View Profile"
                themecolor={from == 'Caterer' ? ts.secondary : ts.primary}
              />
            </TouchableOpacity>
          ) : (
            false
          )}
        </View>
      </Flex>
    </View>
  );
};

const styles = ScaledSheet.create({
  profileContainer: {
    height: '35@ms',
    width: '35@ms',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    color: '#fff',
    fontSize: '18@ms',
    fontFamily: ts.secondarymedium,
  },
  foodTypeimg: {
    height: '15@ms',
    width: '15@ms',
    marginRight: '2@ms',
  },
  dotContainer: {
    // height: '15@ms',
    width: '15@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginRight: '2@ms',
  },
  cuisine: {
    color: ts.teritary,
    fontSize: '10@ms',
    fontFamily: ts.secondaryregular,
    lineHeight: '22@ms',
    width: '55%',
  },
});
