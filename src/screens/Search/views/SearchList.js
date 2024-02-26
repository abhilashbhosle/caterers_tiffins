import {View, Animated} from 'react-native';
import React, {memo, useRef} from 'react';
import {ts} from '../../../../ThemeStyles';
import {FlatList} from 'native-base';
import {searchitems} from '../../../constants/Constants';
import SearchCaterersCard from './SearchCaterersCard';
import SearchTiffinsCard from './SearchTiffinsCard';
import { gs } from '../../../../GlobalStyles';

function SearchList({from}) {
  let theme = from === 'Caterers' ? ts.secondary : ts.primary;
  const scrollY = useRef(new Animated.Value(0)).current;
 
  const renderCateringList = ({item,index}) => {
	const inputRange = [
		-1,
		0,
		(180 + 10 + 20) * index,
		(180 + 10 + 20) * (index + 2),
	  ];
	  const scale = scrollY.interpolate({
		inputRange,
		outputRange: [1, 1, 1, 0],
	  });
    return (
	<Animated.View style={{transform: [{scale}],opacity:scale}}>
	<SearchCaterersCard item={item} />
	</Animated.View>
	)
	;
  };
  const renderTiffinsList = ({item,index}) => {
	const inputRange = [
		-1,
		0,
		(180 + 10 + 20) * index,
		(180 + 10 + 20) * (index + 2),
	  ];
	  const scale = scrollY.interpolate({
		inputRange,
		outputRange: [1, 1, 1, 0],
	  });
    return (
		<Animated.View style={{transform: [{scale}],opacity:scale}}>
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
          from === 'Caterers' ? renderCateringList : renderTiffinsList
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
export default memo(SearchList);
