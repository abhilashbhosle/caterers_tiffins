import {View, Text, Animated} from 'react-native';
import React, {memo, useRef} from 'react';
import {FlatList, Flex, Image} from 'native-base';
import {recentsearches} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';

function RecentSearches() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const rendeItem = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      (190 + 40 + 20) * index,
      (190 + 40 + 20) * (index + 2),
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View style={{transform: [{scale}],opacity:scale}}>
        <Card style={{marginRight: 15, backgroundColor: '#fff'}}>
          <View style={[gs.p10]}>
            <Image
              source={require('../../../assets/Search/cardimg.jpg')}
              style={[styles.img, gs.br12]}
              alt={item.city}
            />
            <Text style={[{fontFamily: ts.secondarymedium}, gs.pv5, gs.fs15]}>
              {item.city}
            </Text>
            <Flex direction="row" align="center">
              <Text
                style={[
                  {
                    fontFamily: ts.secondaryregular,
                    color:
                      route.name == 'Caterings' ? ts.secondary : ts.primary,
                  },
                  gs.fs13,
                ]}>
                {item.time},
              </Text>
              <Text
                style={[
                  {
                    fontFamily: ts.secondaryregular,
                    color: '#777',
                  },
                  gs.fs13,
                ]}>
                {' '}
                {item.people}
              </Text>
            </Flex>
          </View>
        </Card>
      </Animated.View>
    );
  };
  return (
    <>
      <View style={[{paddingHorizontal: 15}, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarymedium, color: '#555'},
            gs.fs13,
          ]}>
          Your Recent Searches
        </Text>
      </View>
      <Animated.FlatList
        data={recentsearches}
        keyExtractor={(item, index) => String(index)}
        renderItem={rendeItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  );
}
export default memo(RecentSearches);
const styles = ScaledSheet.create({
  img: {
    height: '170@ms',
    width: '185@ms',
    resizeMode: 'cover',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    marginLeft: '15@ms',
  },
});
