import {View, Text, Image} from 'react-native';
import React, {memo} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'native-base';
import {explorecusines} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

function ExploreCusines() {
  const route = useRoute();
  const renderItem = ({item}) => {
    return (
      <Card style={{marginRight: 25, backgroundColor: '#fff'}}>
        <Image
          source={item.img}
          style={[styles.img, gs.br12]}
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
          Explore Cuisines
        </Text>
      </View>
      <FlatList
        data={explorecusines}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  );
}
export default memo(ExploreCusines);
const styles = ScaledSheet.create({
  img: {
    height: '150@ms',
    width: '165@ms',
    resizeMode: 'cover',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: '15@ms',
  },
});
