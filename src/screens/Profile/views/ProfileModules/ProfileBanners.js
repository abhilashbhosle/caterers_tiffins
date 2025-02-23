import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {ts} from '../../../../../ThemeStyles';
import {gs} from '../../../../../GlobalStyles';

export const Pagination = ({data, scrollX, index}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={[[styles.dotcontainer, {width}]]}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 25, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth},
              idx == index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

function ProfileBanners({catererBanners}) {
  const {height, width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const scrollRef = useRef();

  const renderBanners = ({item}) => {
    return (
      <View style={{width}}>
        <ImageBackground
          source={{uri: item?.image_names[0]?.large}}
          style={[styles.img, {width: '100%'}]}
          imageStyle={styles.imgbrdr}
        />
      </View>
    );
  };
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };
  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0]?.index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  const intervalRef = useRef(null);

  const scrollToIndex = index => {
    scrollRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(prevIndex => {
        const nextIndex =
          prevIndex + 1 == catererBanners?.length ? 0 : prevIndex + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalRef.current);
  }, [catererBanners]);

  return (
    <View style={{position: 'relative'}}>
      {catererBanners?.length == 1 || catererBanners?.length==0 ? (
        <View
          style={[
            styles.img,
            {
              width: '100%',
              backgroundColor: '#f5f5f5',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <EntypoIcon
            name="image-inverted"
            style={[{color: ts.secondarytext}, gs.fs30]}
          />
          <Text
            style={[
              gs.fs10,
              gs.mv5,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            ]}>
            No Banner Preview
          </Text>
        </View>
      ) : (
        <FlatList
          data={catererBanners?.slice(1,2)}
          ref={scrollRef}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderBanners}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      )}
      {catererBanners?.length > 1 && (
        <View style={{position: 'absolute', bottom: 15}}>
          <Pagination data={catererBanners} scrollX={scrollX} index={index} />
        </View>
      )}
    </View>
  );
}
export default memo(ProfileBanners);

const styles = ScaledSheet.create({
  img: {
    height: '320@ms',
    resizeMode: 'cover',
    borderBottomLeftRadius:'5@ms',
    borderBottomRightRadius:'5@ms'
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: '5@ms',
    backgroundColor: '#fffa',
    marginHorizontal: '3@ms',
  },
  dotcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  imgbrdr:{
    borderBottomLeftRadius:'15@ms',
    borderBottomRightRadius:'15@ms'
  }
});
