import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import {india} from '../../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getCities} from '../controllers/ExploreIndiaController';
import CitySkel from '../../../components/skeletons/CitySkel';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {setLocationres} from '../controllers/SearchController';
import { setSearchHomeJson } from '../controllers/SearchCommonController';

function ExploreIndia() {
  const route = useRoute();
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state?.city);
  const {subData, foodTypeData} = useSelector(state => state?.filterCater);
  useEffect(() => {
    dispatch(getCities());
  }, []);
  const navigation = useNavigation();

  const handleCities = async location => {
    try {
      let loc = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.name,
        place_id: 133333,
        pincode: 1211111,
      };
      dispatch(setLocationres(loc));
      let today = new Date();
      let dateAfter7Days = new Date();
      dateAfter7Days.setDate(today.getDate() + 7);
      // console.log(location)
      await setSearchHomeJson({
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.name,
        place_id: 133333,
        pincode: 1211111,
        from:route?.name == 'Caterings' ? 'Caterers' : 'Tiffin',
        selectedStartDate:today,
        selectedEndDate:dateAfter7Days,
        foodTypeData,
        subData
      });
      navigation.push('PageStack', {
        screen: 'SearchMain',
        params: {
          from: route?.name == 'Caterings' ? 'Caterers' : 'Tiffin',
          ssd: today,
          sse: dateAfter7Days,
        },
      });
    } catch (err) {
      console.log('error in handlecities');
    }
  };
  const renderItem = ({item}) => {
    return (
      <Card style={{backgroundColor: '#fff', marginBottom: 15}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCities(item)}>
          {item?.file_name?.medium ? (
            <ImageBackground
              source={{uri: item?.file_name?.medium}}
              style={[styles.img]}
              alt={item.city_name}
              imageStyle={gs.br12}></ImageBackground>
          ) : (
            <View
              style={{
                ...styles.img,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs30]}
              />
            </View>
          )}

          <View style={[styles.overlay, gs.br12]}></View>
          <LinearGradient
            colors={['#0004', 'transparent']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1}}
            style={[
              {
                ...styles.overlay,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              },
              gs.h40,
              styles.txtoverlay,
            ]}>
            <View>
              <Text
                style={[
                  {fontFamily: ts.primarymedium, color: '#fff'},
                  gs.fs21,
                  gs.mr20,
                  gs.mt5,
                ]}>
                {item.name}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Card>
    );
  };
  if (error?.message) {
    return (
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb10,
          ]}>
          {route.name == 'Caterings'
            ? 'Explore Caterers around India'
            : 'Explore Tiffin Service providers around India'}
        </Text>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.secondarysemibold},
          ]}>
          No Cities found.
        </Text>
      </View>
    );
  }
  return (
    <View style={[gs.ph15, gs.mt15]}>
      <Text
        style={[
          gs.fs15,
          {fontFamily: ts.secondarysemibold, color: ts.primarytext},
          gs.fs13,
          gs.mb10,
        ]}>
        {route.name == 'Caterings'
          ? 'Explore Caterers around India'
          : 'Explore Tiffin Service providers around India'}
      </Text>
      {loading ? (
        <CitySkel />
      ) : (
        data && (
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={{marginTop: 20}}
          />
        )
      )}
    </View>
  );
}
export default memo(ExploreIndia);

const styles = ScaledSheet.create({
  img: {
    height: '200@ms',
    resizeMode: 'cover',
    position: 'relative',
  },
  overlay: {
    height: '200@ms',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  txtoverlay: {
    borderTopRightRadius: '12@ms',
    borderTopLeftRadius: '12@ms',
  },
});
