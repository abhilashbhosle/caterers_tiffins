import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Center, Divider, Flex, Spinner} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../../../GlobalStyles';
import {ts} from '../../../../../ThemeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getReviews} from '../../../Home/controllers/ReviewController';
import ReadMore from '@fawazahmed/react-native-read-more';
import {useNavigation} from '@react-navigation/native';
import {timeSince} from '../../../../components/TimeFormat';
import ReviewCard from '../../../Home/views/ReviewCard';

function ReviewSlice({data, vendor_id, from}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {reviewLoading, reviewData, reviewError} = useSelector(
    state => state.review,
  );
  useEffect(() => {
    if (vendor_id && page && limit) {
      dispatch(getReviews({page, limit, vendor_id}));
    }
  }, [vendor_id, page, limit]);

  const renderItem = ({item, index}) => {
    return (
      <ReviewCard item={item} index={index} from={from} reviews={reviewData?.data}/>
    );
  };
  return reviewData?.data?.length == 0 ? (
    <Text style={[styles.name, gs.mb3]}>No Reviews</Text>
  ) : (
    <View>
      {reviewLoading && (
        <Spinner color={from == 'Tiffins' ? ts.primary : ts.secondary} />
      )}
      {!reviewLoading && !reviewError && (
        <FlatList
          data={reviewData?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
        />
      )}
      {reviewData?.total_count > 3 && (
        <Center>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PageStack', {
                screen: 'Reviews',
                params: {
                  from,
                  vendor_id,
                },
              });
            }}>
            <Text
              style={[
                styles.subtxt,
                gs.fs12,
                {color: from == 'Tiffins' ? ts.primary : ts.secondary},
              ]}>
              See all {reviewData?.total_count} reviews
            </Text>
          </TouchableOpacity>
        </Center>
      )}
    </View>
  );
}
export default memo(ReviewSlice);

const styles = ScaledSheet.create({
 
});
