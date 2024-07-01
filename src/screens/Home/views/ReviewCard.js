import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Divider, Flex} from 'native-base';
import {timeSince} from '../../../components/TimeFormat';
import ReadMore from '@fawazahmed/react-native-read-more';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import StarRating from 'react-native-star-rating-widget';

function ReviewCard({item, index, from, reviews}) {
  return (
    <View>
      <Flex direction="row" alignItems="center">
        <View
          style={{
            ...styles.img,
            backgroundColor: from == 'Tiffins' ? ts.primary : ts.secondary,
          }}>
          <Text
            style={[gs.fs16, {color: '#fff', fontFamily: ts.secondarymedium}]}>
            {item?.username?.slice(0, 1)}
          </Text>
        </View>
        <View style={[gs.ml10]}>
          <Text style={[styles.name, gs.mb3]}>{item?.username}</Text>
          <Text style={[styles.subtxt, gs.fs12]}>
            {timeSince(item.review_date)}
          </Text>
        </View>
      </Flex>
      <Flex style={[gs.mv5]}>
      <StarRating
        rating={parseInt(item?.rating)}
        maxStars={parseInt(item?.rating)}
        color={from == 'Tiffins' ? ts.primary : ts.secondary}
        starSize={25}
        enableHalfStar={false}
        starStyle={{marginHorizontal:-1}}
        enableSwiping={false}
        onChange={()=>{}}
      />
      </Flex>
      <ReadMore
        style={[styles.subtxt, gs.fs12, gs.mv5]}
        numberOfLines={3}
        seeMoreText="read more"
        seeLessText="read less"
        seeLessStyle={{
          color: from == 'Tiffins' ? ts.primary : ts.secondary,
          fontFamily: ts.secondaryregular,
        }}
        seeMoreStyle={{
          color: from == 'Tiffins' ? ts.primary : ts.secondary,
          fontFamily: ts.secondaryregular,
        }}>
        {item.review_text}
      </ReadMore>

      {reviews?.length - 1 > index && <Divider style={[gs.mv15]} />}
    </View>
  );
}
export default memo(ReviewCard);
const styles = ScaledSheet.create({
  img: {
    height: '32@ms',
    width: '32@ms',
    borderRadius: '15@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    fontSize: '13@ms',
  },
  subtxt: {
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    lineHeight: '17@ms',
  },
});
