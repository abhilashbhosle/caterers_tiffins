import {View, Text, Platform} from 'react-native';
import React, {useCallback} from 'react';
import HeaderView from './HeaderView';
import RecentSearches from './RecentSearches';
import Branded from './Branded';
import ExploreIndia from './ExploreIndia';
import {ScrollView} from 'react-native-virtualized-view';
import TiffinProviders from './TiffinProviders';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import PopularTiffins from './PopularTiffins';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tiffins({navigation}) {
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await AsyncStorage.removeItem("searchFilterJson")
        await AsyncStorage.removeItem("searchJson")
      })();
    }, [navigation]),
  );
  return (
    <ScreenWrapper>
      <HeaderView from="Tiffins" navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <RecentSearches/> */}
        {/* <Branded/> */}
        <PopularTiffins />
        <ExploreIndia />
        <TiffinProviders />
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {backgroundColor: '#fff'},
});
