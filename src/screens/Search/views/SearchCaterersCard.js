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
import {Divider, Flex} from 'native-base';
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
import { styles } from '../../Home/styles/SearchCardStyles';

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
              location: location,
            },
          });
        }}>
        <Flex direction="row">
          {/* ======IMAGE====== */}
          <View>
            {item?.brand_logo?.medium ? (
              <ImageBackground
                source={{uri: item.brand_logo.medium}}
                imageStyle={[
                  {...styles.img, resizeMode: 'cover'},
                ]}
                style={{
                  ...styles.img,
                  justifyContent: 'space-between',
                }}>
                <LinearGradient
                  colors={['#0004', 'transparent']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={[styles.gradient]}>
                  <Image
                    source={
                      item?.subscription_type_display == 'Popular'
                        ? require('../../../assets/Common/popular.png')
                        : require('../../../assets/Common/branded.png')
                    }
                    style={styles.sticker}
                  />
                </LinearGradient>
              </ImageBackground>
            ) : (
              <View
                style={{
                  ...styles.img,
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                }}>
                <LinearGradient
                  colors={['#0004', 'transparent']}
                  start={{x: 0.0, y: 0.0}}
                  end={{x: 0.0, y: 1.0}}
                  style={[styles.gradient]}>
                  <Image
                    source={
                      item?.subscription_type_display == 'Popular'
                        ? require('../../../assets/Common/popular.png')
                        : require('../../../assets/Common/branded.png')
                    }
                    style={styles.sticker}
                  />
                </LinearGradient>
              </View>
            )}
          </View>
          {/* ======CONTENT========= */}
          <View
            style={[gs.pl10, gs.pr10, gs.ph10, gs.pv10, {width: width / 1.65}]}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text numberOfLines={1} style={[{...styles.name}, gs.fs17]}>
                {item?.catering_service_name
                  ? item?.catering_service_name?.length > 18
                    ? `${item?.catering_service_name.slice(0, 16)}..`
                    : item?.catering_service_name
                  : 'No Service Name'}
              </Text>
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
                      : '#70747b',
                  }}
                />
              </TouchableOpacity>
            </Flex>

            <Text numberOfLines={1} style={[{...styles.area}, gs.fs13]}>
              {item?.area?.length ? `${item?.area} ,`:null}
              {location?.city?location?.city:null}
            </Text>

            <Flex direction="row" align="center" style={[gs.mt5]}>
              {/* <Text style={[styles.foodtype, gs.fs11]}>Cuisines : </Text> */}
              <Text numberOfLines={1}>
                {item?.cuisines?.length > 2 &&
                  item?.cuisines?.slice(0, 2)?.map((e, i) => (
                    <Text style={[styles.cuisine]} key={i}>
                      {e} {'.'}{' '}
                    </Text>
                  ))}
                {item?.cuisines?.length <= 2 &&
                  item?.cuisines?.slice(0, 2)?.map((e, i) => (
                    <Text style={[styles.cuisine]} key={i}>
                      {e} {item?.cuisines?.length > 1 && i < 1 ? '.' : ' '}{' '}
                    </Text>
                  ))}
                {item?.cuisines?.length > 2 && ''}
              </Text> 
            </Flex>

            <Flex
              direction="row"
              align="center"
              style={[gs.mt4]}
              justifyContent="space-between">
              <View>
                <Flex direction="row" align="center" style={[gs.mt4, gs.mb5]}>
                  {item?.serving_types?.map((e, i) => (
                    <View
                      key={i}
                      style={[
                        {
                          backgroundColor:
                            e == 'Buffet Service'
                              ? 'rgba(62, 187, 233, 0.3)'
                              : 'rgba(232, 116, 8, 0.3)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        gs.br5,
                        gs.mr4,
                        gs.ph5,
                        gs.pv5,
                      ]}>
                      <Flex direction="row" align="center">
                        <Image
                          source={
                            e == 'Buffet Service'
                              ? require('../../../assets/Search/buffet.png')
                              : require('../../../assets/Search/table.png')
                          }
                          style={styles.servicesIcon}
                        />
                        <Text
                          style={[
                            {
                              color:
                                e == 'Buffet Service' ? '#00658a' : '#c76407',
                              fontFamily: ts.jakartamedium,
                            },
                            gs.fs13,
                            gs.ml5,
                          ]}>
                          {e == 'Buffet Service' ? 'Buffet' : 'Table'}
                        </Text>
                      </Flex>
                    </View>
                  ))}
                </Flex>
              </View>
              <Flex direction="row" align="center" style={[gs.mt7, gs.mb5]}>
                {item?.food_types?.map((e, i) => (
                  <Flex direction="row" alignItems="center" key={i}>
                    {e == 'Veg' ? (
                      <Image
                        source={require('../../../assets/Common/veg.png')}
                        style={styles.foodTypeimg}
                      />
                    ) : e == 'Non Veg' ? (
                      <Image
                        source={require('../../../assets/Common/nonveg.png')}
                        style={styles.foodTypeimg}
                      />
                    ) : null}
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Divider style={[gs.mt5, gs.mb8]} />
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Flex direction="row" align="center">
                <Image
                  source={require('../../../assets/Common/rating.png')}
                  style={styles.ratingicon}
                />
                <Text style={[styles.startPrice, gs.fs14, gs.ph5]}>
                  {item?.rating?.slice(0, 1)}
                </Text>
              </Flex>
              <Flex direction="row" align="center">
                <Text style={[styles.foodtype, gs.fs12]}>Starts from </Text>
                <Text
                  style={[
                    {
                      color: '#000',
                      fontFamily: ts.jakartasemibold,

                    },
                    gs.fs16,
                    gs.ml2
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


