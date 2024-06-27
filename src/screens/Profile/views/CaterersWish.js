import {View, Animated, Text} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList, Spinner} from 'native-base';
import {searchitems} from '../../../constants/Constants';
import {gs} from '../../../../GlobalStyles';
import SearchCaterersCard from '../../Search/views/SearchCaterersCard';
import SearchTiffinsCard from '../../Search/views/SearchTiffinsCard';
import {searchStyles} from '../../Search/Searchstyles';
import {useDispatch, useSelector} from 'react-redux';
import {getCaterersWish} from '../../Home/controllers/WishListController';
import {ScaledSheet} from 'react-native-size-matters';

function CaterersWish() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [wishData, setWishData] = useState([]);
  const {catererLoading, catererData, catererError} = useSelector(
    state => state.wish,
  );
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((limit, page)) {
      dispatch(getCaterersWish({limit, page}));
    }
  }, [limit, page]);

  useEffect(() => {
    if (catererData?.data) {
      if (page == 1) {
        setWishData(catererData.data);
      } else {
        setWishData([...wishData, ...catererData.data]);
      }
      setTotal(catererData?.total_count);
    }
  }, [catererData]);

  const renderFooter = () => {
    if (catererLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };

  const fetchMoreData = () => {
    if (wishData?.length < total) {
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

  // console.log(wishData?.length)

  return (
    <>
      <Center>
        <Text style={styles.cardtxt}>Total : {total} Saved</Text>
      </Center>
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
        ListEmptyComponent={() =>
          !catererLoading &&
          wishData?.length == 0 && (
            <Text style={[{color: ts.secondarytext}, gs.fs12]}>
              Wishlist is empty
            </Text>
          )
        }
      />
    </>
  );
}
export default memo(CaterersWish);

const styles = ScaledSheet.create({
  cardtxt: {
    fontSize: '12@ms',
    marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    marginTop: '10@ms',
  },
});
