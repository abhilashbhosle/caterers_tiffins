import {View, Animated} from 'react-native';
import React, {memo, useRef} from 'react';
import {searchitems} from '../../../constants/Constants';
import { gs } from '../../../../GlobalStyles';
import SearchTiffinsCard from '../../Search/views/SearchTiffinsCard';
import { searchStyles } from '../../Search/Searchstyles';

function TiffinsWish() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const renderTiffinsList = ({item,index}) => {
	const inputRange = [
		-1,
		0,
		(searchStyles.cardheight.height + 10 + searchStyles.cardmargin.marginVertical) * index,
		(searchStyles.cardheight.height + 10 + searchStyles.cardmargin.marginVertical) * (index + 2),
	  ];
	  const scale = scrollY.interpolate({
		inputRange,
		outputRange: [1, 1, 1, 0],
	  });
    return (
		<Animated.View style={{transform: [{scale}]}}>
	<SearchTiffinsCard item={item} />
	</Animated.View>
	)
	;
  };


  return (
      <Animated.FlatList
        data={searchitems}
        keyExtractor={(item, index) => String(index)}
        renderItem={
			renderTiffinsList
        }
		onScroll={Animated.event(
			[
			  {
				nativeEvent: {contentOffset: {y: scrollY}},
			  },
			],
			{useNativeDriver: true},
		  )}
		showsVerticalScrollIndicator={false}
		contentContainerStyle={[{backgroundColor:'#fff',paddingTop:10},gs.ph5]}
      />
  );
}
export default memo(TiffinsWish);
