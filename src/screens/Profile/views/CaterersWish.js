import {View, Animated, Text} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {FlatList, Spinner} from 'native-base';
import {searchitems} from '../../../constants/Constants';
import {gs} from '../../../../GlobalStyles';
import SearchCaterersCard from '../../Search/views/SearchCaterersCard';
import SearchTiffinsCard from '../../Search/views/SearchTiffinsCard';
import {searchStyles} from '../../Search/Searchstyles';
import {useDispatch, useSelector} from 'react-redux';
import {getCaterersWish} from '../../Home/controllers/WishListController';

function CaterersWish({total,setTotal}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [wishData, setWishData] = useState([]);
  const {catererLoading, catererData, catererError} = useSelector(
    state => state.wish,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if ((limit, page)) {
      dispatch(getCaterersWish({limit, page}));
    }
  }, [limit, page]);

  useEffect(()=>{
	if (catererData?.data) {
		if (page == 1) {
		  setWishData(catererData.data);
		} else {
		  setWishData([...wishData, ...catererData.data]);
		}
		setTotal(catererData?.total_count);
	  }
  },[catererData])

  const renderFooter = () => {
    if (catererLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };

  const fetchMoreData = () => {
    if (wishData?.length < total || catererData?.length==0) {
        setPage(page + 1);
    }
  };

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
        <SearchCaterersCard item={item} from="Caterers" />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={wishData}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderCateringList}
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
		!catererLoading && wishData?.length==0 &&
		<Text style={[{color:ts.secondarytext},gs.fs12]}>Wishlist is empty</Text>
	  }
    />
  );
}
export default memo(CaterersWish);
