import {View, Text, FlatList, Image, useWindowDimensions, Animated} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

export const Pagination=({data,scrollX,index})=>{
	const {height, width} = useWindowDimensions();
	return(
		<View style={[[styles.dotcontainer,{width}]]}>
			{
				data.map((_,idx)=>{
					const inputRange=[(idx-1)*width,idx*width,(idx+1)*width]
					const dotWidth=scrollX.interpolate({
						inputRange,
						outputRange:[10,25,10],
						extrapolate:'clamp'
					})
					return(
						<Animated.View key={idx.toString()} style={[styles.dot,{width:dotWidth},idx==index&&styles.dotActive]}/>
					)
				})
			}
		</View>
	)
}

function ProfileBanners({catererBanners}) {
  const {height, width} = useWindowDimensions();
  const scrollX=useRef(new Animated.Value(0)).current;
  const [index,setIndex]=useState(0)
  const scrollRef=useRef()
  const renderBanners = ({item}) => {
    return (
      <View style={{width}}>
        <Image 
		source={item.img} 
		style={[styles.img, {width:'100%'}]} 
		/>
      </View>
    );
  };
  const handleOnScroll=event=>{
	Animated.event([
		{
			nativeEvent:{
				contentOffset:{
					x:scrollX
				}
			}
		}
	],{
		useNativeDriver:false
	})(event)
  }
  const handleOnViewableItemsChanged=useRef(({viewableItems})=>{
	// console.log('viewableItems',viewableItems)
	setIndex(viewableItems[0].index)
  }).current;

  const viewabilityConfig=useRef({
	itemVisiblePercentThreshold:50,
  }).current;
  const intervalRef = useRef(null);

  const scrollToIndex = (index) => {
    scrollRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 === catererBanners.length ? 0 : prevIndex + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
	<View style={{position:'relative'}}>
    <FlatList
      data={catererBanners}
	  ref={scrollRef}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderBanners}
      horizontal
      showsHorizontalScrollIndicator={false}
	  pagingEnabled
	  snapToAlignment='center'
	  onScroll={handleOnScroll}
	  onViewableItemsChanged={handleOnViewableItemsChanged}
	  viewabilityConfig={viewabilityConfig}
    />
	<View style={{position:'absolute',bottom:15}}>
	<Pagination data={catererBanners} scrollX={scrollX} index={index}/>
	</View>
	</View>
  );
}
export default memo(ProfileBanners);

const styles = ScaledSheet.create({
  img: {
    height: '180@ms',
    resizeMode: 'cover',
  },
  dot:{
	height:10,
	width:10,
	borderRadius:'5@ms',
	backgroundColor:'#fffa',
	marginHorizontal:'3@ms'
  },
  dotcontainer:{
	flexDirection:'row',
	justifyContent:'center',
	alignItems:'center',
  },
  dotActive:{
	backgroundColor:'#fff'
  }
});
