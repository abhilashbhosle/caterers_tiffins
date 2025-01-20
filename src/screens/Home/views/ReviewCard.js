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
      <Flex direction="row" alignItems="center" width={'100%'}>
        <View style={{width: '10%'}}>
          <View
            style={{
              ...styles.img,
              backgroundColor: from == 'Tiffins' ? ts.primary : ts.secondary,
            }}>
            <Text
              style={[
                gs.fs16,
                {color: '#fff', fontFamily: ts.secondarymedium},
              ]}>
              {item?.username?.slice(0, 1)}
            </Text>
          </View>
        </View>
        <Flex
          style={[gs.ml10, {width: '80%'}]}
          direction="row"
          // align="center"
          justifyContent="space-between">
          <View>
            <Text style={[styles.name,gs.ml10]}>{item?.username}</Text>
            <Flex style={[gs.mt5,gs.ml8]} direction='row' align='center'>
              <StarRating
                rating={parseInt(item?.rating)}
                maxStars={parseInt(item?.rating)}
                // color={from == 'Tiffins' ? ts.primary : ts.secondary}
                starSize={25}
                enableHalfStar={false}
                starStyle={{marginHorizontal: -1}}
                enableSwiping={false}
                onChange={() => {}}
              />
              <Text style={[styles.name,gs.ml5,{fontFamily:ts.jakartaregular}]}>{item?.rating}</Text>
            </Flex>
          </View>
          <Text style={[styles.subtxt, gs.fs12]}>
            {timeSince(item.review_date)}
          </Text>
        </Flex>
      </Flex>

      <ReadMore
        style={[styles.name, gs.mv5]}
        numberOfLines={3}
        seeMoreText="read more"
        seeLessText="read less"
        seeLessStyle={{
          color: from == 'Tiffins' ? ts.primary : ts.secondary,
          fontFamily: ts.secondaryregular,
        }}
        seeMoreStyle={{
          color: from == 'Tiffins' ? ts.primary : ts.secondary,
          fontFamily: ts.jakartamedium,
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
    height: '42@ms',
    width: '42@ms',
    borderRadius: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: ts.jakartamedium,
    color: ts.primarytext,
    fontSize: '16@ms',
  },
  subtxt: {
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    lineHeight: '17@ms',
  },
});
