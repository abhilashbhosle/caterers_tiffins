import {View, Text, useWindowDimensions, Platform} from 'react-native';
import React from 'react';
import HeaderView from './HeaderView';
import RecentSearches from './RecentSearches';
import ExploreCusines from './ExploreCusines';
import Branded from './Branded';
import ExploreIndia from './ExploreIndia';
import PopularCaterers from './PopularCaterers';
import Occasions from './Occasions';
import {ScrollView} from 'react-native-virtualized-view';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {shallowEqual, useSelector} from 'react-redux';
import {Divider} from 'native-base';
import {ts} from '../../../../ThemeStyles';

const MemoizedHeaderView = React.memo(HeaderView);
const MemoizedExploreCusines = React.memo(ExploreCusines);
const MemoizedBranded = React.memo(Branded);
const MemoizedExploreIndia = React.memo(ExploreIndia);
const MemoizedPopularCaterers = React.memo(PopularCaterers);
const MemoizedOccasions = React.memo(Occasions);

export default function Caterers({navigation}) {
 
  return (
    <ScreenWrapper>
      <MemoizedHeaderView from="Caterers" navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <RecentSearches /> */}
        <MemoizedExploreCusines />
        <MemoizedBranded />
        <MemoizedExploreIndia />
        <MemoizedPopularCaterers />
        <MemoizedOccasions />
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
  },
 
});
