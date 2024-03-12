import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import {caterertypes, tiffintypes} from '../../../constants/Checks';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Flex} from 'native-base';

function Badges({from}) {
  let types = from == 'Caterers' ? caterertypes : tiffintypes;
  let theme = from === 'Caterers' ? ts.secondary : ts.primary;
  const [selectedItem, setSelectedItem] = useState(types[0]);

  // const renderItem = ({item}) => {
  //   return (

  //   );
  // };
  return (
    <View style={[gs.ph10, gs.pv20, {backgroundColor: '#fff'}]}>
      {/* <FlatList
        data={types}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      /> */}
      <Flex direction="row" alignItems="center">
        {types.map((item, i) => {
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
      </Flex>
    </View>
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
