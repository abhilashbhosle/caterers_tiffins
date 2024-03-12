import {View, Text, ImageBackground, useWindowDimensions} from 'react-native';
import React, {memo} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList} from 'native-base';
import {occasions} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

function Occasions() {
  const {width, height} = useWindowDimensions();
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mb10, gs.mh5]}>
        <ImageBackground
          source={item.img}
          style={[
            {...styles.img, width: width / 2.2, justifyContent: 'flex-end'},
          ]}
          imageStyle={[gs.br12]}
          alt={item.name}>
          <LinearGradient
            colors={['#000', 'transparent']}
            start={{x: 0.0, y: 1.2}}
            end={{x: 0.0, y: 0.0}}
            style={[
              {
                ...styles.overlay,
              },
              gs.br12
            ]}>
            <Text
              style={[gs.fs14, styles.title, gs.ml15, gs.mb8, gs.h25]}>
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Card>
    );
  };
  return (
    <>
      <View style={[gs.ph15,gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb10,
          ]}>
          Explore Caterers by Occasions
        </Text>
      </View>
      <Center width={width}>
        <FlatList
          data={occasions}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={2}
        />
      </Center>
    </>
  );
}
export default memo(Occasions);
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: '15@ms',
    marginHorizontal: '15@ms',
    position: 'relative',
  },
  img: {
    height: '200@ms',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: ts.secondarymedium,
    color: '#fff',
    paddingTop: '2@ms',
  },
});
