import {View, Text,FlatList,Image, ImageBackground, useWindowDimensions} from 'react-native';
import React from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Center,Flex} from 'native-base';
import {tiffinproviders} from '../../../constants/Constants';
import { Card } from 'react-native-paper';

export default function TiffinProviders() {
  const {width,height}=useWindowDimensions()
  const renderItem = ({item}) => {
    return(
    <Card style={[{backgroundColor: '#fff',width: width / 2.4},gs.mh10,gs.mb15,gs.br5]}>
        <ImageBackground
          source={item.img}
          style={[
            {...styles.img, width: '100%', justifyContent: 'flex-end'},
          ]}
          alt={item.name}
          imageStyle={styles.bgimg}
        />
        <View style={[gs.ph10]}>
        <Text style={[{fontFamily: ts.secondaryregular}, gs.pv5, gs.fs13]}>
          {item.name}
        </Text>
        <Flex direction="row" align="center">
          <Text
            style={[
              {
                fontFamily: ts.secondaryregular,
                color: ts.primary,
              },
              gs.fs13,
              gs.pb10
            ]}>
            {item.area}
          </Text>
        </Flex>
        </View>
    </Card>
    )
  };
  return (
    <>
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb10,
          ]}>
          Tiffin Service providers near you
        </Text>
      </View>
      <Center>
        <FlatList
          data={tiffinproviders}
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
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    marginHorizontal: '15@ms',
    position: 'relative',
  },
  img: {
    height: '100@ms',
    resizeMode: 'cover',
  },
  bgimg:{
    borderTopLeftRadius:'5@ms',
    borderTopRightRadius:'5@ms'
  }
});
