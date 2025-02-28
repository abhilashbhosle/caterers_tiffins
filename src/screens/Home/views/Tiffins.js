import {View, Text, Platform} from 'react-native';
import React, {useCallback, useEffect} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import ExploreByKitchen from './ExploreByKitchen';
import {gs} from '../../../../GlobalStyles';
import { useDispatch } from 'react-redux';
import { clearSearch } from '../controllers/SearchController';

export default function Tiffins({navigation}) {
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await AsyncStorage.removeItem('searchFilterJson');
        await AsyncStorage.removeItem('searchJson');
      })();
    }, [navigation]),
  );
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <LinearGradient
          start={{x: 0, y: 0.2}}
          end={{x: 0.4, y: 2}}
          colors={['#F6D6B2', '#fff', '#FFF']} // Lighter and softer shades
        >
          <View style={[gs.mt10]}>
            <HeaderView from="Tiffins" navigation={navigation} />
          </View>
          <ExploreIndia />
        </LinearGradient>
        <PopularTiffins />
        <ExploreByKitchen />
        {/* <RecentSearches/> */}
        {/* <Branded/> */}
        <TiffinProviders />
      </ScrollView>
         <View style={styles.leveler}></View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {backgroundColor: '#fff', top: '-10@ms'},
  leveler:{
    marginTop:'-10@ms'
  }
});
