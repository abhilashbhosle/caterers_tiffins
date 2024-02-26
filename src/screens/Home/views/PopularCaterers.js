import {View, Text, ImageBackground} from 'react-native';
import React, { memo } from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {FlatList} from 'native-base';
import {popularcaterers} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
function PopularCaterers() {
  const renderItem = ({item}) => {
    return (
      <Card style={{marginRight: 25, backgroundColor: '#fff'}}>
        <ImageBackground
          source={item.img}
          style={[styles.img]}
          imageStyle={[gs.br5]}
          alt={item.name}
        />
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
          ]}>
          Popular Caterers in Chennai
        </Text>
      </View>
      <FlatList
        data={popularcaterers}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  );
}
export default memo(PopularCaterers)
const styles = ScaledSheet.create({
  img: {
    height: '130@ms',
    width: '145@ms',
    resizeMode: 'cover',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    marginLeft: '15@ms',
  },
});
