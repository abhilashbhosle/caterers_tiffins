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
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../../components/ScreenWrapper';
import {caterersgallery} from '../../../../constants/Constants';
import {FlatList, Spinner} from 'native-base';
import {gs} from '../../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-reanimated-carousel';
import {useSelector} from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ts} from '../../../../../ThemeStyles';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export default function GalleryView({route, navigation}) {
  const [images, setImages] = useState(null);
  const {height, width} = Dimensions.get('screen');
  const IMAGE_SIZE = styles.imgsize.height;
  const SPACING = styles.imgsize.padding;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const {loading, data, error} = useSelector(state => state.vendor);
  const {selectedImageIndex} = route?.params;
  const [topImgLoad, setTopImgLoad] = useState(false);
  const [bottomImgLoad, setBottomImgLoad] = useState(false);
  //========REFS========//
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (data?.galleryImages?.length) {
      setImages(data.galleryImages);
    }
  }, [data]);
  const scrollToIndex = index => {
    setActiveIndex(index);
    topRef.current?.scrollTo({index: index});
    if (index * (IMAGE_SIZE + SPACING) > width / 2) {
      bottomRef.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) + IMAGE_SIZE / 2 - width / 2,
        animated: true,
      });
    } else {
      bottomRef.current?.scrollToOffset({
        offset: index,
        animated: true,
      });
    }
  };
  useEffect(() => {
    if (selectedImageIndex && images) {
      // scrollToIndex(selectedImageIndex);
      scrollToIndex(selectedImageIndex);
    }
  }, [selectedImageIndex, images]);

  if (!images) {
    return <Text>Loading</Text>;
  }

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
                    source={{uri: item?.image_names[0]?.medium}}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        ...styles.img,
                        maxHeight: height - 100,
                      },
                    ]}
                    onLoadStart={() => setTopImgLoad(true)}
                    onLoadEnd={() => setTopImgLoad(false)}>
                    {topImgLoad && (
                      <EntypoIcon
                        name="image-inverted"
                        style={[{color: '#fff'}, gs.fs30]}
                      />
                    )}
                  </ImageBackground>
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
                marginTop: Platform.OS == 'android' && StatusBar.currentHeight,
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
              <ImageBackground
                source={{uri: item?.image_names[0]?.small}}
                style={{
                  height: activeIndex == index ? IMAGE_SIZE + 10 : IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  marginRight: SPACING,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                imageStyle={{
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: activeIndex == index ? '#fff' : 'transparent',
                }}
                onLoadStart={() => {
                  setBottomImgLoad(true);
                }}
                onLoadEnd={() => {
                  setBottomImgLoad(false);
                }}>
                {bottomImgLoad && <Spinner color="#f5f5f5" />}
              </ImageBackground>
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
    justifyContent: 'center',
    alignItems: 'center',
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
