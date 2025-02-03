import {View, Animated, Text} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {FlatList} from 'native-base';
import {searchitems} from '../../../constants/Constants';
import SearchCaterersCard from './SearchCaterersCard';
import SearchTiffinsCard from './SearchTiffinsCard';
import {gs} from '../../../../GlobalStyles';
import {searchStyles} from '../Searchstyles';
import {useDispatch, useSelector} from 'react-redux';
import {wishDetails} from '../../Home/controllers/WishListController';
import {debounce} from 'lodash';

function SearchList({
  from,
  fetchMoreData,
  renderFooter,
  vendorData,
  location,
  setVendorData,
  setFirstItemVisible,
  firstItemVisible,
  caterersLoading
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
      <View style={{}}>
        <SearchCaterersCard item={item} from={from} location={location} />
      </View>
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
      <View>
        <SearchTiffinsCard item={item} from={from} location={location} />
      </View>
    );
  };
  useEffect(() => {
    if (Number(wish_id > 0)) {
      let data = [...vendorData];
      let updated = data.map(e =>
        e.vendor_id == wish_id
          ? {
              ...e,
              is_wishlisted: !e.is_wishlisted,
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
        renderItem={
          from === 'Caterers' ? renderCateringList : renderTiffinsList
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            // backgroundColor:'#fff',
            paddingTop: 10,
          },
          gs.ph15,
        ]}
        onEndReachedThreshold={0.6}
        onEndReached={fetchMoreData}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !caterersLoading && 
          <View style={[{height: 200}]}>
            <Text
              style={{
                color: ts.secondarytext,
                fontSize: 14,
                fontFamily: ts.secondaryregular,
              }}>
              No vendors found
            </Text>
          </View>
        }
      />
    </>
  );
}
export default memo(SearchList);
