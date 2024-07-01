import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Center, FlatList, Flex} from 'native-base';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getCuisines} from '../controllers/ExploreCuisineController';
import CuisineSkel from '../../../components/skeletons/CuisineSkel';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {checkLocation, updateSearch} from '../controllers/HomeController';
import {
  getCaterersSearch,
  setLocationres,
} from '../controllers/SearchController';
import {getCatererSearchService} from '../services/SearchService';
import { startLoader } from '../../../redux/CommonSlicer';

function ExploreCusines() {
  const route = useRoute();
  const navigation = useNavigation();
  const {loading, data, error} = useSelector(
    state => ({
      loading: state?.cuisine?.loading,
      data: state?.cuisine?.data,
      error: state?.cuisine?.error,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('explore cuisines called');
    dispatch(getCuisines());
  }, []);
  const [segre, setSegre] = useState({
    serving_types_filter: [],
    service_types_filter: [],
    occasions_filter: [],
    price_ranges: [],
    head_count_ranges: [],
    order_by_filter: [],
    cuisines_filter: [],
    search_term: '',
    food_types_filter: [],
    subscription_types_filter: [],
    meal_times_filter: [],
    kitchen_types_filter: [],
  });
  const locationRes = useSelector(state => state.location.locationRes);
  const userDetails = useSelector(state => state.auth?.userInfo?.data);

  const handleCuisinePress = async ({dispatch, navigation, index}) => {
    try {
      dispatch(startLoader(true))
      let res = await checkLocation({
        formattedLocation: locationRes,
        userLocation: userDetails,
        dispatch,
        navigation,
      });
      if (res?.location?.city) {
        const updatedData = data.map((item, i) => {
          if (i === index) {
            return {...item, selected: item.selected == '0' ? '1' : '0'};
          }
          return item;
        });
        const updatedChilds = data[index].children.map((item, i) => {
          return {
            ...item,
            selected: updatedData[index].selected == '1' ? '1' : '0',
          };
        });
        updatedData[index].children = updatedChilds;
        let temp = [];
        updatedData.map((e, i) => {
          temp.push({id: Number(e.id), selected: Number(e.selected)});
          e.children.map(item => {
            temp.push({
              id: Number(item.id),
              selected: Number(item.selected),
            });
          });
        });
        if (temp?.length) {
          await dispatch(
            getCaterersSearch({
              filterKey: 'cuisine',
              filteredData: temp,
              from: 'Caterers',
              ssd: res.startData,
              sse: res.endDate,
              location: res.location,
              segre,
              updated_response: updatedData,
            }),
          );
        }
        await dispatch(setLocationres(res?.location));
        navigation.navigate('PageStack', {
          screen: 'SearchMain',
          params: {
            from: 'Caterers',
            ssd: res.startData,
            sse: res.endDate,
            move:"forward"

          },
        });
        // dispatch(
        //   updateSearch({
        //     location: res?.location,
        //     filterKey: 'cuisine',
        //     filterData: temp,
        //     vendorType: 'Caterer',
        //     startDate: res?.startData,
        //     endDate: res?.endDate,
        //     navigation,
        //     from: 'Caterers',
        //     updated_response: updatedData,
        //   }),
        // );
      }
    } catch (err) {
      console.log('error in handleCuisinePress', err);
    }finally{
      setTimeout(()=>{
        dispatch(startLoader(false))
      },1000)
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mr15, gs.br8]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleCuisinePress({
              dispatch,
              navigation,
              index,
            });
          }}>
          {item?.file_name?.medium ? (
            <Image
              source={{uri: item?.file_name?.medium}}
              style={[styles.img]}
              alt={item.name}
            />
          ) : (
            <View
              style={{
                ...styles.img,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs25]}
              />
            </View>
          )}
          <Center>
            <Text
              style={[
                gs.fs8,
                gs.p3,
                {
                  color: ts.primarytext,
                  fontFamily: ts.secondarysemibold,
                  width: styles.img.width,
                },
              ]}
              numberOfLines={1}>
              {item.name}
            </Text>
          </Center>
        </TouchableOpacity>
      </Card>
    );
  };
  if (error?.message) {
    return (
      <View>
        <View style={[gs.ph15, gs.mt10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs13,
            ]}>
            Explore Cuisines
          </Text>
        </View>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.secondarysemibold},
            gs.pl15,
          ]}>
          No Cuisines found.
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
          ]}>
          Explore Cuisines
        </Text>
      </View>
      {loading ? (
        <Flex direction="row">
          {[1, 2, 3, 4, 5, 6]?.map((e, i) => (
            <View style={styles.contentContainerStyle} key={i}>
              <CuisineSkel />
            </View>
          ))}
        </Flex>
      ) : (
        data && (
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )
      )}
    </>
  );
}
export default memo(ExploreCusines);
const styles = ScaledSheet.create({
  img: {
    height: '50@ms',
    width: '60@ms',
    resizeMode: 'cover',
    borderTopRightRadius: '8@ms',
    borderTopLeftRadius: '8@ms',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: '15@ms',
  },
});
