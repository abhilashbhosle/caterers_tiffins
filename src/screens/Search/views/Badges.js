import {View, Text, Touchable, TouchableOpacity, FlatList} from 'react-native';
import React, {memo, useState} from 'react';
import {caterertypes, tiffintypes} from '../../../constants/Checks';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Flex} from 'native-base';
import {handleSubType} from '../../Home/controllers/FilterCommonController';
import { useDispatch } from 'react-redux';

function Badges({
  from,
  subType,
  setSubType,
  segre,
  setVendorData,
  ssd,
  sse,
  location,
  setPage,
  setSegre
}) {
  let types = from == 'Caterers' ? caterertypes : tiffintypes;
  let theme = from === 'Caterers' ? ts.secondary : ts.primary;
  const dispatch=useDispatch()
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          {
            ...styles.badge,
            backgroundColor: item.selected == 1 ? theme : '#e0e3e7',
          },
          gs.br20,
        ]}
        activeOpacity={0.8}
        onPress={() => {
          handleSubType({
            index,
            subType,
            setSubType,
            segre,
            setVendorData,
            ssd,
            sse,
            location,
            setPage,
            from,
            dispatch,
            setSegre
          });
        }}>
        <Text
          style={[
            {
              color: item.selected == 1 ? '#fff' : '#57636c',
              fontFamily: ts.secondaryregular,
            },
            gs.fs14,
          ]}>
          {item?.display_name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    subType && (
      <View style={[gs.ph10, gs.pv20, {backgroundColor: '#fff'}]}>
        <FlatList
          data={subType}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
        {/* <Flex direction="row" alignItems="center">
        {data?.map((item, i) => {
          return (
            <TouchableOpacity
              style={[
                {
                  ...styles.badge,
                  backgroundColor: selectedItem == item ? theme : '#e0e3e7',
                },
                gs.br20,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedItem(item);
              }}
              key={i}>
              <Text
                style={[
                  {
                    color: selectedItem == item ? '#fff' : '#57636c',
                    fontFamily: ts.secondaryregular,
                  },
                  gs.fs14,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Flex> */}
      </View>
    )
  );
}
export default memo(Badges);

const styles = ScaledSheet.create({
  badge: {
    height: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '12@ms',
    marginRight: '12@ms',
  },
});
