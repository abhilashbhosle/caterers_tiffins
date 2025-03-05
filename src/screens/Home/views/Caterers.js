import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  BackHandler,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import HeaderView from './HeaderView';
import RecentSearches from './RecentSearches';
import ExploreCusines from './ExploreCusines';
import Branded from './Branded';
import ExploreIndia from './ExploreIndia';
import PopularCaterers from './PopularCaterers';
import Occasions from './Occasions';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {clearSearch} from '../controllers/SearchController';
import {getCuisines} from '../controllers/ExploreCuisineController';
import {getCities} from '../controllers/ExploreIndiaController';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {getBranded, getPopular} from '../controllers/HomeController';
import {getOccassions} from '../controllers/OccassionController';

const MemoizedHeaderView = React.memo(HeaderView);
const MemoizedExploreCusines = React.memo(ExploreCusines);
const MemoizedBranded = React.memo(Branded);
const MemoizedExploreIndia = React.memo(ExploreIndia);
const MemoizedPopularCaterers = React.memo(PopularCaterers);
const MemoizedOccasions = React.memo(Occasions);

export default function Caterers({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await AsyncStorage.removeItem('searchFilterJson');
        await AsyncStorage.removeItem('searchJson');
      })();
    }, [navigation]),
  );
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true; // Returning true means the event is handled and should not propagate further
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const handleBack = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit this App?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed');
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCuisines());
    dispatch(getCities());
    dispatch(getOccassions());
    if (userDetails?.length && userDetails[0]?.formatted_address) {
      dispatch(
        getBranded({
          latitude: userDetails[0]?.latitude,
          longitude: userDetails[0]?.longitude,
          vendorType: 'Caterer',
          subscriptionType: '3',
        }),
      );
      dispatch(
        getPopular({
          latitude: userDetails[0]?.latitude,
          longitude: userDetails[0]?.longitude,
          vendorType: 'Caterer',
          subscriptionType: '2',
        }),
      );
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={60}
        />
    
        }  
        >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 1}}
          colors={['#f8b4b3', '#fbe3e1', '#fff']}>
          <View style={[gs.mt10]}>
            <MemoizedHeaderView from="Caterers" navigation={navigation} />
          </View>
          {/* <RecentSearches /> */}
          <MemoizedExploreIndia />
        </LinearGradient>
        <MemoizedExploreCusines />
        <MemoizedBranded />
        <MemoizedOccasions />
        <MemoizedPopularCaterers />
      </ScrollView>
      <View style={styles.leveler}></View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    top: '-10@ms',
  },
  leveler: {
    marginTop: '-10@ms',
  },
});
