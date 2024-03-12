import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../../components/ScreenWrapper';
import {caterersgallery} from '../../../../constants/Constants';
import {FlatList} from 'native-base';
import {gs} from '../../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-reanimated-carousel';

export default function GalleryView({route, navigation}) {
  const [images, setImages] = useState(null);
  const {height, width} = Dimensions.get('screen');
  const IMAGE_SIZE = styles.imgsize.height;
  const SPACING = styles.imgsize.padding;
  const [activeIndex, setActiveIndex] = React.useState(0);
  //========REFS========//
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setImages(caterersgallery);
  }, [route]);
  if (!images) {
    return <Text>Loading</Text>;
  }
  const scrollToIndex = index => {
    setActiveIndex(index);
    topRef.current.scrollTo({index: index});
    if (index * (IMAGE_SIZE + SPACING) > width / 2) {
      bottomRef.current.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) + IMAGE_SIZE / 2 - width / 2,
        animated: true,
      });
    } else {
      bottomRef.current.scrollToOffset({
        offset: index,
        animated: true,
      });
    }
  };

  return (
    <ScreenWrapper>
      <View>
        {/* =======TOP FLATLIST======== */}
        <View style={{height, position: 'relative'}}>
          <Carousel
          loop={false}
            ref={topRef}
            width={width}
            height={height}
            data={images}
            onSnapToItem={index => scrollToIndex(index)}
            renderItem={({item}) => {
              return (
                <View style={{height, width}}>
                  <ImageBackground
                    source={item.img}
                    style={[StyleSheet.absoluteFillObject, {...styles.img,maxHeight:height-100}]}
                    imageStyle={{resizeMode: 'contain'}}
                  />
                </View>
              );
            }}
            style={{
              height: height,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View
            style={[
              {
                ...styles.arrows,
                width,
                top: height / 2.3,
              },
            ]}></View>
          <TouchableOpacity
            style={[
              {
                ...styles.arrows,
                padding: 10,
                marginTop:Platform.OS=='android'&& StatusBar.currentHeight
              },
            ]}
            onPress={() => {
              navigation.goBack();
            }}>
            <SafeAreaView>
              <AntIcon
                name="arrowleft"
                style={[gs.fs22, {color: '#fff'}, gs.mt10]}
              />
            </SafeAreaView>
          </TouchableOpacity>
        </View>
        {/* =======BOTTOM FLATLIST======== */}
        <FlatList
          ref={bottomRef}
          data={images}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => scrollToIndex(index)}>
              <Image
                source={item.img}
                style={{
                  height: activeIndex == index ? IMAGE_SIZE + 10 : IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  marginRight: SPACING,
                  borderRadius: 10,
                  borderColor: activeIndex == index ? '#fff' : 'transparent',
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
          )}
          style={{position: 'absolute', bottom: IMAGE_SIZE}}
          contentContainerStyle={{
            paddingHorizontal: SPACING,
            alignItems: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  img: {
  },
  arrowcontainer: {
    height: '40@ms',
    width: '40@ms',
    backgroundColor: '#fff8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrows: {
    position: 'absolute',
    // backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgsize: {
    height: '80@ms',
    padding: '10@ms',
  },
});
