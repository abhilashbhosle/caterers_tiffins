import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity
} from 'react-native';
import React, {memo, useRef} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {popularcaterers} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {Center, Flex, Image} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcons from 'react-native-vector-icons/Feather';
function PopularCaterers() {
  const {height, width} = Dimensions.get('screen');
  const ref=useRef()
  const renderItem = ({item}) => {
    return (
      <Card style={{...styles.cardContainer, width}}>
        <ImageBackground
          source={item.img}
          style={[{...styles.img, width: width}]}
          imageStyle={styles.imageStyle}
          alt={item.name}
        />
        <LinearGradient
          colors={['#c33332', '#0005']}
          start={{x: 0.0, y:Platform.OS=='ios'?1.2:1.8}}
          end={{x: 0.0, y: 0.0}}
          style={[
            {
              ...styles.overlay,
              width: width,
            },
          ]}>
          <View>
          </View>
          <View>
            <Text
              style={[
                gs.fs14,
                {color: '#fff', fontFamily: ts.secondarysemibold},
              ]}
              numberOfLines={1}>
              Saravana Catering Service
            </Text>
            <Text
              style={[
                gs.fs12,
                {color: '#fff', fontFamily: ts.secondaryregular},
                Platform.OS=='ios'&&gs.pv2
              ]}>
              Adyar, Chennai
            </Text>
            <Text
              style={[
                gs.fs12,
                {color: '#fff', fontFamily: ts.secondaryregular},
              ]}>
              Veg | Non-Veg
            </Text>
          </View>
        </LinearGradient>
      </Card>
    );
  };
  return (
    <>
      <View style={[gs.mt15, gs.mb10, gs.ph15,]}>
        <Flex direction='row' alignItems='center' justify='space-between'>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            
          ]}>
          Popular Caterers in Chennai
        </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.forwardicon,
              backgroundColor: ts.secondary
            }}>
            <FeatherIcons
              name="arrow-right"
              style={[gs.fs14, {color: '#fff'}]}
            />
          </TouchableOpacity>
          </Flex>
      </View>
      {/* <FlatList
        data={popularcaterers}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      /> */}
      <Center>
        <Carousel
          loop
          width={width}
          height={styles.cardContainer.height}
          autoPlay={true}
          data={popularcaterers}
          scrollAnimationDuration={2000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={renderItem}
          style={styles.contentContainerStyle}
          mode="parallax"
          parallaxScrollingOffset={50}
          parallaxScrollingScale={0.9}
        />
      </Center>
    </>
  );
}
export default memo(PopularCaterers);
const styles = ScaledSheet.create({
  forwardicon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20@ms',
    width: '20@ms',
  },
  img: {
    height: '130@ms',
    resizeMode: 'cover',
  },
  cardContainer: {
    height: '130@ms',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '15@ms',
  },
  imageStyle: {
    borderRadius: '10@ms',
    position: 'absolute',
  },
  overlay: {
    height: '130@ms',
    position: 'absolute',
    borderRadius: '10@ms',
    justifyContent: 'space-between',
    paddingBottom: '10@ms',
    paddingLeft: '10@ms',
  },
  typeicon: {
    height: '16@ms',
    width: '16@ms',
  },
});
