import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Divider, Flex, Spinner} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getReviews} from '../controllers/ReviewController';
import ReadMore from '@fawazahmed/react-native-read-more';
import {timeSince} from '../../../components/TimeFormat';
import ReviewCard from './ReviewCard';

export default function Reviews({route, navigation}) {
  const {from, vendor_id} = route?.params;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const {reviewLoading, reviewData, reviewError} = useSelector(
    state => state.review,
  );
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (page && vendor_id && limit) {
      dispatch(getReviews({page, limit, vendor_id}));
    }
  }, [page, vendor_id, limit]);

  useEffect(() => {
    if (reviewData?.data) {
      if (page == 1) {
        setReviews(reviewData.data);
      } else {
        setReviews([...reviews, ...reviewData.data]);
      }
      setTotal(reviewData?.total_count);
    }
  }, [reviewData]);

  const fetchMoreData = () => {
    if (reviews?.length < total) {
      setPage(page + 1);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <ReviewCard item={item} index={index} from={from} reviews={reviews} />
    );
  };
  const renderFooter = () => {
    if (reviewLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };
  return (
    <ScreenWrapper>
      <View
        style={[
          gs.ph15,
          {
            ...styles.headercontainer,
            backgroundColor: from == 'Tiffins' ? ts.primary : ts.secondary,
          },
        ]}>
        <SafeAreaView>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={[Platform.OS == 'ios' ? gs.mt10 : gs.mt5]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
                dispatch(getReviews({page: 1, limit: 3, vendor_id}));
              }}>
              <AntIcon name="arrowleft" style={[gs.fs22, {color: '#fff'}]} />
            </TouchableOpacity>
          </Flex>
        </SafeAreaView>
      </View>
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.pv10, gs.ph5]}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.6}
          onEndReached={fetchMoreData}
          ListFooterComponent={renderFooter}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  headercontainer: {
    height: '100@ms',
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : '20@ms',
  },
});
