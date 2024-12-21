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

function ReviewSlice({data, vendor_id, from, setShowReviews}) {
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
  useEffect(() => {
    if (reviewData?.data?.length) {
      setShowReviews(true);
    }
  }, [reviewData]);

  const renderItem = ({item, index}) => {
    return (
      <>
      <ReviewCard
        item={item}
        index={index}
        from={from}
        reviews={reviewData?.data}
      />
      {
        index!=reviewData?.data?.length-1?
        <Divider style={[gs.mv10]}/>
        :
        null
      }

      </>
    );
  };
  return reviewData?.data?.length == 0 ? (
    <Text style={[styles.name, gs.mb3]}></Text>
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
      {/* {reviewData?.total_count > 3 && ( */}
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
          }}
          style={{
            ...styles.btn,
            backgroundColor:
              from == 'Tiffins' ? 'rgba(217, 130, 43, 0.2)' : '#fbe3e1',
          }}>
          <Text
            style={[
              styles.subtxt,
              gs.fs17,
              {
                color: from == 'Tiffins' ? ts.primary : ts.secondary,
                fontFamily: ts.jakartabold,
              },
            ]}>
            View all reviews
          </Text>
        </TouchableOpacity>
      </Center>
      {/* )} */}
    </View>
  );
}
export default memo(ReviewSlice);

const styles = ScaledSheet.create({
  btn: {
    marginHorizontal: '10@ms',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    height:'47@ms',
    marginTop:'5@ms'
  },
});
