import {View, Text, useWindowDimensions, Platform,BackHandler,Alert} from 'react-native';
import React, {useCallback, useEffect} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'native-base';

const MemoizedHeaderView = React.memo(HeaderView);
const MemoizedExploreCusines = React.memo(ExploreCusines);
const MemoizedBranded = React.memo(Branded);
const MemoizedExploreIndia = React.memo(ExploreIndia);
const MemoizedPopularCaterers = React.memo(PopularCaterers);
const MemoizedOccasions = React.memo(Occasions);

export default function Caterers({navigation}) {
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await AsyncStorage.removeItem('searchFilterJson');
        await AsyncStorage.removeItem('searchJson');
      })();
    }, [navigation]),
  );
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
      handleBack()
        return true; // Returning true means the event is handled and should not propagate further
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const handleBack=()=>{
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit this App?',
      [
        {
          text:'Cancel',
          onPress:()=>{
              console.log('Cancel Pressed')
          }
        },
        {
          text:'Ok',
          onPress:()=>{
            BackHandler.exitApp()
          }
        }
      ]
    )
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 1}}
          colors={['#f8b4b3', '#fbe3e1', '#fff']}>
          <MemoizedHeaderView from="Caterers" navigation={navigation} />
          {/* <RecentSearches /> */}
          <MemoizedExploreIndia />
        </LinearGradient>
        <MemoizedExploreCusines />
        <MemoizedBranded />
        <MemoizedOccasions />
        <MemoizedPopularCaterers />
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
