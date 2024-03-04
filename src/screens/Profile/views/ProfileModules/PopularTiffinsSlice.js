import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {FlatList} from 'native-base';
import {searchitems} from '../../../../constants/Constants';
import {gs} from '../../../../../GlobalStyles';
import SearchTiffinsCard from '../../../Search/views/SearchTiffinsCard';

function PopularTiffinsSlice() {
  const renderTiffinsList = ({item, index}) => {
    return (
      <View>
        <SearchTiffinsCard item={item} />
      </View>
    );
  };
  return (
    <FlatList
      data={searchitems}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderTiffinsList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {backgroundColor: '#fff', paddingTop: 10},
        gs.ph5,
      ]}
    />
  );
}
export default memo(PopularTiffinsSlice);
