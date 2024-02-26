import {
  View,
  Text,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React from 'react';
import HeaderView from './HeaderView';
import RecentSearches from './RecentSearches';
import ExploreCusines from './ExploreCusines';
import Branded from './Branded';
import ExploreIndia from './ExploreIndia';
import PopularCaterers from './PopularCaterers';
import Occasions from './Occasions';
import { ScrollView } from 'react-native-virtualized-view';

export default function Caterers({navigation}) {
  return (
    <View>
      <HeaderView from='Caterers' navigation={navigation}/>
      <ScrollView
        style={{
          backgroundColor: '#fff',
          marginBottom: Platform.OS === 'ios' ? 150 : 130,
        }}
        showsVerticalScrollIndicator={false}
        >
        <RecentSearches />
        <ExploreCusines />
        <Branded />
        <ExploreIndia />
        <PopularCaterers />
        <Occasions />
      </ScrollView>
    </View>
  );
}
