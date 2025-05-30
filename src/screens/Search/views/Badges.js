import {View, Text, Touchable, TouchableOpacity, FlatList} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {caterertypes, tiffintypes} from '../../../constants/Checks';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Flex} from 'native-base';
import {handleSubType} from '../../Home/controllers/FilterCommonController';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCaterersSearch} from '../../Home/controllers/SearchController';

function Badges({from, subType, setSubType, setPage, setVendorData}) {
  let types = from == 'Caterers' ? caterertypes : tiffintypes;
  let theme = from === 'Caterers' ? ts.secondary : ts.primary;
  const dispatch = useDispatch();
  const {subData} = useSelector(state => state?.filterCater);

  const handleSelection = async (arr, setData, index) => {
    const updatedFoodTypes = await arr.map((item, i) =>
      i === index
        ? {...item, selected: (item.selected = '1')}
        : {...item, selected: '0'},
    );

    setData(updatedFoodTypes);
    return updatedFoodTypes;
  };
  // ===HANDLING SUBSCRIPTIONS=====//
  const handleSubTypes = async index => {
    let data = [...subType];
    let result = await handleSelection(data, setSubType, index);
    const subscription_types_filter = await result.map(e => ({
      subscription_type_id: parseInt(e.id),
      selected: e.selected,
    }));
    let searchJson = await AsyncStorage.getItem('searchJson');
    let search = JSON.parse(searchJson);
    let params = {
      ...search,
      subscription_types_filter: JSON.stringify(subscription_types_filter),
    };
    await AsyncStorage.setItem('searchJson', JSON.stringify(params));
    dispatch(
      getCaterersSearch({
        params: {
          ...params,
          current_page: 1,
          limit: 5,
        },
      }),
    );
    setVendorData([]);
    setPage(1);
  };

  
  return (
    
    subType && (
      <View style={[gs.pl5, gs.pv20]}>
        <Flex direction="row" alignItems="center">
          {subType?.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  {
                    ...styles.badge,
                    backgroundColor: item.selected == 1 ? theme : '#fff',
                    borderWidth:1,borderColor:from=="Caterers"?'#ed9f9e':'#efb76e'
                  },
                  gs.br20,
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  handleSubTypes(index);
                }}
                key={index}>
                <Text
                  style={[
                    {
                      color: item.selected == 1 ? '#fff' : '#57636c',
                      fontFamily:
                        item.selected == 1
                          ? ts.jakartasemibold
                          : ts.jakartamedium,
                    },
                    gs.fs14,
                    styles.textadjust
                  ]}>
                  {item?.display_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Flex>
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
    marginRight: '5@ms',
  },
  textadjust:{
    bottom:'2@ms'
  }
});
