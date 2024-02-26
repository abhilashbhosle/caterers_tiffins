import {View, Text, ImageBackground, useWindowDimensions} from 'react-native';
import React, { memo } from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList} from 'native-base';
import {occasions} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';

function Occasions() {
  const {width, height} = useWindowDimensions();
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mb10,gs.mh5]}>
        <ImageBackground
          source={item.img}
          style={[
            {...styles.img, width: width / 2.2, justifyContent: 'flex-end'},
          ]}
          imageStyle={[gs.br12]}
          alt={item.name}>
          <Text style={[gs.fs14, styles.title, gs.ml15, gs.mb8,gs.h25,gs.pl10]}>
            {item.name}
          </Text>
        </ImageBackground>
      </Card>
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
            gs.mb10
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
export default memo(Occasions)
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    marginHorizontal: '15@ms',
    position: 'relative',
  },
  img: {
    height: '240@ms',
    width: '140@ms',
    resizeMode: 'cover',
  },
  title: {
	fontFamily: ts.secondarymedium,
	 color: '#fff',
	 backgroundColor:'rgba(195, 51, 50,0.7)',
	 justifyContent:'center',
	 paddingTop:'2@ms',
	},
});
