import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList, Flex} from 'native-base';
import {occasions} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOccassions,
  updateOccassion,
} from '../controllers/OccassionController';
import OccassionSkel from '../../../components/skeletons/OccassionSkel';
import {useNavigation} from '@react-navigation/native';
import {
  getCaterersSearch,
  setLocationres,
} from '../controllers/SearchController';
import {checkLocation, updateSearch} from '../controllers/HomeController';
import {startLoader} from '../../../redux/CommonSlicer';
import {getOccassionService} from '../services/OccassionService';
import {setSearchHomeJson} from '../controllers/SearchCommonController';

function Occasions() {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, data, error} = useSelector(state => state?.occassion);
  const locationRes = useSelector(state => state.location.locationRes);
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {foodTypeData, subData} = useSelector(state => state?.filterCater);

  useEffect(() => {
    dispatch(getOccassions());
  }, []);

  const handleOccassionPress = async ({index}) => {
    try {
      dispatch(startLoader(true));
      let res = await checkLocation({
        formattedLocation: locationRes,
        userLocation: userDetails,
        dispatch,
        navigation,
      });
      if (res?.location?.city) {
        let updated = data?.map((e, i) =>
          index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
        );
        const occasions_filter = updated.map(e => ({
          id: parseInt(e.occasion_id),
          selected: e.selected,
        }));
        dispatch(setLocationres(res?.location));
        if (updated?.length) {
          await setSearchHomeJson({
            latitude: res?.location?.latitude,
            longitude: res?.location?.longitude,
            city: res?.location?.city,
            place_id: res?.location?.place_id,
            pincode: res?.location?.pincode,
            area: res?.location?.area,
            from: 'Caterers',
            selectedStartDate: res?.startData,
            selectedEndDate: res?.endDate,
            foodTypeData,
            subData,
            occasions_filter: JSON.stringify(occasions_filter),
          });
          await dispatch(updateOccassion(updated));
          navigation.navigate('PageStack', {
            screen: 'SearchMain',
            params: {
              from: 'Caterers',
              ssd: res.startData,
              sse: res.endDate,
            },
          });
        }
        // dispatch(
        //   updateSearch({
        //     location: res?.location,
        //     filterKey:"occassion",
        //     filterData:occasions_filter,
        //     vendorType:"Caterer",
        //     startDate:res?.startData,
        //     endDate:res?.endDate,
        //     navigation,
        //     from:"Caterers",
        //     updated_response:updated,
        //   }),
        // );
      }
    } catch (err) {
      console.log('error in handleOccassion', err);
    } finally {
      setTimeout(() => {
        dispatch(startLoader(false));
      }, 1000);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Flex alignItems='center'>
        <Card style={[{backgroundColor: '#fff'}, gs.mb10, gs.mr10,gs.br16]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleOccassionPress({index});
            }}>
            <ImageBackground
              source={{uri: item?.file_name?.medium}}
              style={[{...styles.img, justifyContent: 'flex-end'}]}
              imageStyle={[gs.br16]}
              alt={item.occassion_name}
            />
          </TouchableOpacity>
        </Card>
        <Text style={[gs.fs14, styles.title,{textAlign:'center'}]} numberOfLines={1}>
          {item.occasion_name}
        </Text>
      </Flex>
    );
  };
  if (error?.message) {
    return (
      <View style={[gs.ph15, gs.mt10]}>
        <Text
          style={[
            {fontFamily: ts.jakartabold, color: ts.primarytext},
            gs.fs18,
            gs.mb10,
          ]}>
          Explore by Occasions
        </Text>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.jakartasemibold},
          ]}>
          No Occasions found
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
        <Text
          style={[
            {fontFamily: ts.jakartabold, color: ts.primarytext},
            gs.fs18,
            gs.mb5,
          ]}>
          Explore by Occasions
        </Text>
      </View>

        {loading ? (
          <View
            style={{
              ...styles.contentContainerStyle,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 0,
            }}>
            {[1, 2].map((e, i) => (
              <View key={i} style={gs.mh5}>
                <OccassionSkel />
              </View>
            ))}
          </View>
        ) : (
          data && (
            <FlatList
              data={data}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={styles.contentContainerStyle}
              horizontal
              overScrollMode='never'
            />
          )
        )}
    </>
  );
}
export default memo(Occasions);
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: '15@ms',
    marginHorizontal: '15@ms',
    paddingRight:'10@ms'
  },
  img: {
    height: '100@ms',
    resizeMode: 'cover',
    width: '100@ms',
  },
  title: {
    fontFamily: ts.jakartasemibold,
    color: ts.primarytext,
    paddingTop: '2@ms',
    width: '100@ms',
    marginRight:'15@ms'
  },
});
