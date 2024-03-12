import {View, Text, FlatList, Dimensions, ImageBackground,TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Center} from 'native-base';
import { gs } from '../../../../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

export default function GallerySlice({data}) {
  const {height, width} = Dimensions.get('screen');
  const navigation=useNavigation()
  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback  onPress={() => {
        navigation.navigate('PageStack', {
          screen: 'GalleryView',
        });
      }}>
        <ImageBackground
          source={item.img}
          style={[
            styles.img,
            {width: width / 2 - 22.5, marginHorizontal: 7, marginVertical: 7},
          ]}
		  imageStyle={[gs.br10]}
        />
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Center>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={renderItem}
      />
    </Center>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '180@ms',
  },
});
