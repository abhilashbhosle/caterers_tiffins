import {View, Text, Animated, ImageBackground} from 'react-native';
import React, {memo, useRef} from 'react';
import {Center, FlatList, Flex, Image} from 'native-base';
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
      (styles.img.width + styles.seperation.margin+styles.img.paddingHorizontal*2) * index,
      (styles.img.width + styles.seperation.margin+styles.img.paddingHorizontal*2) * (index + 2),
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View style={{transform: [{scale}]}}>
        <Card style={[styles.card, gs.mr15, gs.br10]}>
          <View>
            <Center>
            <ImageBackground
              source={require('../../../assets/Search/cardimg.jpg')}
              style={[styles.img]}
              alt={item.name}
              imageStyle={styles.imageStyle}
            />
            </Center>
            <View style={[gs.pl5]}>
              <Flex direction="row" alignItems="center">
                <View style={styles.txtcontainer}>
                  <Text
                    style={[
                      {fontFamily: ts.secondarysemibold, color: ts.primarytext},
                      gs.pt5,
                      gs.fs9,
                    ]}
                    numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.typecontainer}>
                  <Image
                    source={require('../../../assets/Common/veg.png')}
                    alt="veg"
                    style={styles.typeicon}
                  />
                  <Image
                    source={require('../../../assets/Common/nonveg.png')}
                    alt="nonveg"
                    style={styles.typeicon}
                  />
                </View>
              </Flex>
              <Text
                style={[
                  {
                    fontFamily: ts.secondarymedium,
                    color: ts.secondarytext,
                  },
                  gs.fs8,
                  gs.pb5,
                ]}>
                {item.city}
              </Text>
            </View>
          </View>
        </Card>
      </Animated.View>
    );
  };
  return (
    <>
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
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
    height: '96@ms',
    width: '142@ms',
    resizeMode: 'cover',
    paddingHorizontal:'4@ms',
    marginTop:'4@ms',
  },
  card: {
    backgroundColor: '#fff',
    width: '150@ms',
    borderRadius:'10@ms'
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '15@ms',
    paddingLeft: '15@ms',
  },
  seperation: {
    margin: '30@ms',
  },
  txtcontainer: {
    width: '110@ms',
  },
  typecontainer: {
    width: '35@ms',
    flexDirection: 'row',
  },
  typeicon: {
    width: '13@ms',
    height: '13@ms',
    top: '3@ms',
    marginLeft: '2@ms',
  },
  imageStyle:{
    borderTopLeftRadius:'10@ms',
    borderTopRightRadius:'10@ms'
  }
});
