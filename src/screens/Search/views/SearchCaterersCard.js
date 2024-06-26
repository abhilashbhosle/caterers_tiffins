import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {memo, useRef} from 'react';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {
  updateWishList,
  wishDetails,
} from '../../Home/controllers/WishListController';

function SearchCaterersCard({item, from, location}) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Card style={styles.cardcontainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('PageStack', {
            screen: 'CatererProfile',
            params: {
              branch_id: item?.id,
              vendor_id: item?.vendor_id,
            },
          });
          // console.log(item)
        }}>
        <Flex direction="row">
          {/* ======IMAGE====== */}
          <View>
            <ImageBackground
              source={item.img}
              imageStyle={[{...styles.img, width: width / 2.7}, gs.br10]}
              style={{
                ...styles.img,
                width: width / 2.7,
                justifyContent: 'space-between',
              }}>
              <LinearGradient
                colors={['#0004', 'transparent']}
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 1.0}}>
                <Flex direction="row" style={[gs.p5]} align="center">
                  <TouchableOpacity
                    style={styles.likecontainer}
                    onPress={() => {
                      dispatch(wishDetails(item.vendor_id));
                      dispatch(
                        updateWishList({
                          branch_id: item.id,
                          vendor_type: 'Caterer',
                          status: item?.is_wishlisted == true ? 0 : 1,
                        }),
                      );
                    }}>
                    <EntypoIcons
                      name={item?.is_wishlisted ? 'heart' : 'heart-outlined'}
                      style={{
                        ...styles.wishicon,
                        color: item?.is_wishlisted
                          ? from == 'Caterers'
                            ? ts.secondary
                            : ts.primary
                          : '#fff',
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={[gs.fs11, styles.reviews]}>
                    {item?.review_count ? item.review_count : 0} reviews
                  </Text>
                </Flex>
              </LinearGradient>
              <View
                style={{
                  ...styles.popularcontainer,
                  backgroundColor:
                    item?.subscription_type_display == 'Branded'
                      ? ts.branded
                      : ts.accent3,
                }}>
                <Text
                  style={{
                    ...styles.popular,
                  }}>
                  {item?.subscription_type_display}
                </Text>
              </View>
            </ImageBackground>
          </View>
          {/* ======CONTENT========= */}
          <View
            style={[gs.pl5, gs.pr10, gs.ph10, gs.pv10, {width: width / 1.61}]}>
            <Text numberOfLines={1} style={[{...styles.name}, gs.fs16]}>
              {item?.catering_service_name
                ? item?.catering_service_name?.length > 24
                  ? `${item?.catering_service_name.slice(0, 22)}..`
                  : item?.catering_service_name
                : 'No Service Name'}
            </Text>

            <Text numberOfLines={1} style={[{...styles.area}, gs.fs12]}>
              {item?.area?.length ? item?.area : location?.city}
            </Text>

            <Flex direction="row" align="center" style={gs.mt7}>
              {item?.food_types?.map((e, i) => (
                <Text
                  key={i}
                  style={[
                    gs.fs11,
                    {color: '#266920', fontFamily: ts.secondaryregular},
                  ]}>
                  {e}
                </Text>
              ))}
            </Flex>
            <Flex direction="row" align="center">
              {/* <Text style={[styles.foodtype, gs.fs11]}>Cuisines : </Text> */}
              <Text numberOfLines={1}>
                {item?.cuisines?.slice(0, 2)?.map((e, i) => (
                  <Text style={[styles.cuisine]} key={i}>
                    {e} {'|'}{' '}
                  </Text>
                ))}
                {item?.cuisines?.length > 2 && '..'}
              </Text>
            </Flex>
            {/* <Flex direction="row" align="center">
              <Text style={[styles.foodtype, gs.fs11]}>
                Min. & Max. order:{' '}
              </Text>

              <Text style={[styles.cuisine]}>
                {item?.minimum_quantity ? item.minimum_quantity : 0} -{' '}
                {item?.maximum_capacity ? item.maximum_capacity : 0}
              </Text>
            </Flex> */}
            <Flex direction="row" align="center" style={[gs.mt8]}>
              {item?.service_types?.map((e, i) => (
                <View
                  key={i}
                  style={[
                    {
                      backgroundColor:
                        from == 'Caterers'
                          ? 'rgba(195, 51, 50,0.4 )'
                          : ts.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    gs.br10,
                    gs.mr2,
                  ]}>
                  <Text
                    style={[
                      {
                        color: from == 'Caterers' ? ts.secondary : ts.primary,
                        fontFamily: ts.secondarymedium,
                      },
                      gs.fs10,
                      gs.ph10,
                      gs.pv2,
                    ]}>
                    {e}
                  </Text>
                </View>
              ))}
            </Flex>

            <Flex
              alignItems="flex-end"
              justifyContent="flex-end"
              style={[gs.mt15]}>
              <Flex direction="row" alignItems="center">
                <Text style={[styles.foodtype, gs.fs11]}>
                  Starting Price -{' '}
                </Text>
                <Text
                  style={[
                    {
                      color: from == 'Caterers' ? ts.secondary : ts.primary,
                      fontFamily: ts.secondarymedium,
                    },
                    gs.fs13,
                  ]}>
                  ₹ {item?.start_price ? parseInt(item?.start_price) : 'N/A'}
                </Text>
              </Flex>
            </Flex>
          </View>
        </Flex>
      </TouchableWithoutFeedback>
    </Card>
  );
}
export default memo(SearchCaterersCard);

const styles = ScaledSheet.create({
  cardcontainer: {
    height: '170@ms',
    marginVertical: '10@ms',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
  },
  img: {
    height: '170@ms',
  },
  buffeticon: {
    height: '30@ms',
    width: '30@ms',
    marginRight: '10@ms',
  },
  name: {
    color: '#245396',
    fontFamily: ts.primarymedium,
    lineHeight: '20@ms',
  },
  area: {
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
    lineHeight: '20@ms',
  },
  foodtype: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    lineHeight: '22@ms',
  },
  cuisine: {
    color: ts.teritary,
    fontSize: '11@ms',
    fontFamily: ts.secondaryregular,
    lineHeight: '22@ms',
    width: '55%',
  },
  likecontainer: {
    height: '25@ms',
    width: '25@ms',
    borderRadius: 50,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviews: {
    color: '#fff',
    fontFamily: ts.secondarysemibold,
    marginLeft: '10@ms',
    // backgroundColor: 'rgba(195, 51, 50,0.3)',
    paddingHorizontal: '10@ms',
  },
  popularcontainer: {
    width: '70%',
    paddingVertical: '2@ms',
    backgroundColor: ts.accent3,
    borderTopRightRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
  },
  popular: {
    textAlign: 'center',
    fontFamily: ts.secondaryregular,
    color: '#fff',
    fontSize: '11@ms',
  },
  wishicon: {
    fontSize: '18@ms',
  },
});
