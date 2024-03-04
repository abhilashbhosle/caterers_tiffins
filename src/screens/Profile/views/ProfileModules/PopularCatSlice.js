import {View, Text, FlatList} from 'react-native';
import React, {memo} from 'react';
import {gs} from '../../../../../GlobalStyles';
import SearchCaterersCard from '../../../Search/views/SearchCaterersCard';

function PopularCatSlice({data}) {
  const renderCateringList = ({item, index}) => {
    return (
      <View>
        <SearchCaterersCard item={item} />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data.slice(0, 3)}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderCateringList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {backgroundColor: '#fff', paddingTop: 10},
          gs.ph5,
        ]}
      />
    </View>
  );
}
export default memo(PopularCatSlice);
