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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../../components/ScreenWrapper';
import {caterersgallery} from '../../../../constants/Constants';
import {FlatList} from 'native-base';
import {gs} from '../../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function GalleryView({route, navigation}) {
  const [images, setImages] = useState(null);
  const {height, width} = Dimensions.get('screen');
  const IMAGE_SIZE = styles.imgsize.height;
  const SPACING = styles.imgsize.padding;
  const [activeIndex, setActiveIndex] = React.useState(0);
  //   ========REFS========//
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
    console.log('inside scroll to index', index);
    topRef.current.scrollToOffset({
      offset: index * width,
      animated: true,
    });
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
          <Animated.FlatList
            ref={topRef}
            data={images}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <View style={{height, width}}>
                <ImageBackground
                  source={item.img}
                  style={[StyleSheet.absoluteFillObject, styles.img]}
                  imageStyle={{resizeMode: 'contain'}}
                />
              </View>
            )}
            // onMomentumScrollEnd={event =>{
            //   scrollToIndex(
            //     Math.floor(event.nativeEvent.contentOffset.x / width),
            //   )
            //   console.log(Math.ceil(event.nativeEvent.contentOffset.x / width))
            //   }
            // }
            scrollEnabled={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={{
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
            ]}>
            {activeIndex > 0 ? (
              <TouchableOpacity
                style={[styles.arrowcontainer]}
                onPress={() => {
                  scrollToIndex(activeIndex - 1);
                }}>
                <MaterialIcons
                  name="arrow-left-thick"
                  style={[gs.fs30, {color: '#000'}]}
                />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            {activeIndex !== images?.length - 1 ? (
              <TouchableOpacity
                style={[styles.arrowcontainer]}
                onPress={() => {
                  scrollToIndex(activeIndex + 1);
                }}>
                <MaterialIcons
                  name="arrow-right-thick"
                  style={[gs.fs30, {color: '#000'}]}
                />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
          <TouchableOpacity
            style={[
              {
                ...styles.arrows,
                padding: 10,
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
    marginBottom: '80@ms',
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
  imgsize:{
    height:'80@ms',
    padding:'10@ms'
  }
});
