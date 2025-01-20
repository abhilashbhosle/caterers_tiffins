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
import {ts} from '../../../../../ThemeStyles';

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
                  selectedImageIndex: index<=7?index:0,
                },
              })
        }}>
        <View style={{position: 'relative'}}>
          <ImageBackground
            source={{uri: item?.image_names[0]?.medium}}
            style={[styles.img, {width: width / 4.72}, gs.mh4, gs.mv5]}
            imageStyle={[gs.br10, {resizeMode: 'cover'}]}>
            {data?.galleryImages?.length>8 && index == 7 ? (
              <View
                style={[
                  {
                    ...styles.img,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000a',
                    width: width / 4.72,
                  },
                  gs.br10,
                ]}>
                <Text
                  style={[
                    gs.fs16,
                    {color: '#f5f5f5', fontFamily: ts.secondaryregular},
                  ]}>
                  +{data?.galleryImages?.length}
                </Text>
              </View>
            ) : null}
          </ImageBackground>
          <View></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View
      style={{
        // backgroundColor: '#00f',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <FlatList
        data={data?.galleryImages?.slice(0, 8)}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        numColumns={4}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '80@ms',
  },
});
