import {
  View,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Center} from 'native-base';
import {gs} from '../../../../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function GallerySlice() {
  const {height, width} = Dimensions.get('screen');
  const navigation = useNavigation();
  const {loading, data, error} = useSelector(state => state.vendor);

  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('PageStack', {
            screen: 'GalleryView',
            params: {
              selectedImageIndex: index,
            },
          });
        }}>
        <ImageBackground
          source={{uri: item?.image_names[0]?.medium}}
          style={[styles.img, {width: width / 3.2}, gs.mh4, gs.mv5]}
          imageStyle={[gs.br10, {resizeMode: 'cover'}]}
        />
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View
      style={{
        // backgroundColor: '#00f',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={data?.galleryImages?.slice(0, 6)}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '100@ms',
  },
});
