import {View, Animated, Text} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {searchitems} from '../../../constants/Constants';
import {gs} from '../../../../GlobalStyles';
import SearchTiffinsCard from '../../Search/views/SearchTiffinsCard';
import {searchStyles} from '../../Search/Searchstyles';
import { useDispatch, useSelector } from 'react-redux';
import { getTiffinsWish } from '../../Home/controllers/WishListController';
import { Spinner } from 'native-base';
import { ts } from '../../../../ThemeStyles';
import { color } from 'native-base/lib/typescript/theme/styled-system';

function TiffinsWish({total,setTotal}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [wishData, setWishData] = useState([]);
  const {tiffinLoading, tiffinData, tiffinError} = useSelector(
    state => state.wish,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if ((limit, page)) {
      dispatch(getTiffinsWish({limit, page}));
    }
  }, [limit, page]);

  useEffect(()=>{
	if (tiffinData?.data) {
		if (page == 1) {
		  setWishData(tiffinData.data);
		} else {
		  setWishData([...wishData, ...tiffinData.data]);
		}
		setTotal(tiffinData?.total_count);
	  }
  },[tiffinData])

  const renderFooter = () => {
    if (tiffinLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };

  const fetchMoreData = () => {
    if (wishData?.length < total || tiffinData?.length==0) {
        setPage(page + 1);
    }
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
      <Animated.View style={{transform: [{scale}]}}>
        <SearchTiffinsCard item={item} from="Tiffins" />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={wishData}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderTiffinsList}
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
	  ListEmptyComponent={()=>
		!tiffinLoading && wishData?.length==0 &&
		<Text style={[{color:ts.secondarytext},gs.fs12]}>Wishlist is empty</Text>
	  }
    />
  );
}
export default memo(TiffinsWish);
