import {View, Animated} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {FlatList} from 'native-base';
import {searchitems} from '../../../constants/Constants';
import SearchCaterersCard from './SearchCaterersCard';
import SearchTiffinsCard from './SearchTiffinsCard';
import {gs} from '../../../../GlobalStyles';
import {searchStyles} from '../Searchstyles';
import {useDispatch, useSelector} from 'react-redux';
import {wishDetails} from '../../Home/controllers/WishListController';

function SearchList({
  from,
  fetchMoreData,
  renderFooter,
  vendorData,
  location,
  setVendorData,
}) {
  let theme = from === 'Caterers' ? ts.secondary : ts.primary;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchData, setSearchData] = useState([]);
  const {wish_id} = useSelector(state => state.wish);
  const dispatch = useDispatch();

  const renderCateringList = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      (searchStyles.cardheight.height +
        10 +
        searchStyles.cardmargin.marginVertical) *
        index,
      (searchStyles.cardheight.height +
        10 +
        searchStyles.cardmargin.marginVertical) *
        (index + 2),
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View style={{transform: [{scale}]}}>
        <SearchCaterersCard item={item} from={from} location={location} />
      </Animated.View>
    );
  };
  const renderTiffinsList = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      (searchStyles.cardheight.height +
        10 +
        searchStyles.cardmargin.marginVertical) *
        index,
      (searchStyles.cardheight.height +
        10 +
        searchStyles.cardmargin.marginVertical) *
        (index + 2),
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View style={{transform: [{scale}], backgroundColor: '#fff'}}>
        <SearchTiffinsCard item={item} from={from} location={location} />
      </Animated.View>
    );
  };
  useEffect(() => {
    if (Number(wish_id > 0)) {
      let data = [...vendorData];
      let updated = data.map(e =>
        e.vendor_id == wish_id
          ? {
              ...e,
              is_wishlisted: !e.is_wishlisted
            }
          : e,
      );
      setVendorData(updated);
      dispatch(wishDetails(0));
    }
  }, [wish_id]);

  return (
    <>
    
    <Animated.FlatList
      data={vendorData}
      keyExtractor={(item, index) => String(index)}
      renderItem={from === 'Caterers' ? renderCateringList : renderTiffinsList}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ],
        {useNativeDriver: true},
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {backgroundColor: '#fff', paddingTop: 10},
        gs.ph5,
      ]}
      onEndReachedThreshold={0.6}
      onEndReached={fetchMoreData}
      ListFooterComponent={renderFooter}
    />
    </>
  );
}
export default memo(SearchList);
