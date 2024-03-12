import {View, Text, Image} from 'react-native';
import React, {memo} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';
import {Center, FlatList} from 'native-base';
import {explorecusines} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

function ExploreCusines() {
  const route = useRoute();
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mr15, gs.br8]}>
        <Image source={item.img} style={[styles.img]} alt={item.name} />
        <Center>
          <Text
            style={[
              gs.fs8,
              gs.p3,
              {color: ts.primarytext, fontFamily: ts.secondarysemibold},
            ]}
            numberOfLines={1}
            >
            {item.name}
          </Text>
        </Center>
      </Card>
    );
  };
  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
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
    height: '50@ms',
    width: '60@ms',
    resizeMode: 'cover',
    borderTopRightRadius: '8@ms',
    borderTopLeftRadius: '8@ms',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: '15@ms',
  },
});
