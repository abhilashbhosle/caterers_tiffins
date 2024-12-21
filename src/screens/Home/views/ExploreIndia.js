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
import {setSearchHomeJson} from '../controllers/SearchCommonController';
import {Flex} from 'native-base';
import MoreSecondarybtn from '../../../components/MoreSecondarybtn';
import MorePrimarybtn from '../../../components/MorePrimarybtn';

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
        from: route?.name == 'Caterings' ? 'Caterers' : 'Tiffin',
        selectedStartDate: today,
        selectedEndDate: dateAfter7Days,
        foodTypeData,
        subData,
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
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleCities(item)}>
        <Flex style={[gs.mr15]} alignItems={'center'} justifyContent="center">
          {item?.file_name?.medium ? (
            <ImageBackground
              source={{uri: item?.file_name?.medium}}
              style={[styles.img]}
              alt={item.city_name}
              imageStyle={[{borderRadius: 50}]}></ImageBackground>
          ) : (
            <View
              style={{
                ...styles.img,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs20]}
              />
            </View>
          )}
          <Text
            style={[
              {fontFamily: ts.jakartasemibold, color: '#000'},
              gs.fs12,
              gs.mt5,
            ]}>
            {item.name}
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  };
  if (error?.message) {
    return (
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            {fontFamily: ts.jakartabold, color: ts.primarytext},
            gs.fs18,
            gs.mb5,
          ]}>
          {route.name == 'Caterings' ? 'Explore Caterers' : 'Explore Tiffins'}
        </Text>
        <Text
          style={[
            {fontFamily: ts.jakartasemibold, color: ts.secondarytext},
            gs.fs13,
            gs.mb15,
          ]}>
          Around India
        </Text>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.jakartasemibold},
          ]}>
          No Cities found.
        </Text>
      </View>
    );
  }
  return (
    <View style={[gs.mt5]}>
      <Flex
        direction="row"
        // align="center"
        justifyContent="space-between"
        style={[gs.ph15]}>
        <View>
          <Text
            style={[
              {fontFamily: ts.jakartabold, color: ts.primarytext},
              gs.fs18,
              gs.mb5,
            ]}>
            {route.name == 'Caterings' ? 'Explore Caterers' : 'Explore Tiffins'}
          </Text>
          <Text
            style={[
              {fontFamily: ts.jakartasemibold, color: ts.secondarytext},
              gs.fs13,
              gs.mb15,
            ]}>
            Around India
          </Text>
        </View>
        <View>
          {route?.name == 'Caterings' ? (
            <MoreSecondarybtn />
          ) : (
            <MorePrimarybtn />
          )}
        </View>
      </Flex>
      {loading ? (
        <Flex style={[gs.pl15]} direction="row">
          <CitySkel />
          <CitySkel />
          <CitySkel />
        </Flex>
      ) : (
        data && (
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={[gs.pl15]}
          />
        )
      )}
    </View>
  );
}
export default memo(ExploreIndia);

const styles = ScaledSheet.create({
  img: {
    height: '75@ms',
    width: '75@ms',
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
