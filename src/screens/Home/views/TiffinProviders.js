import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Center, Flex} from 'native-base';
import {tiffinproviders} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../Onboarding/controllers/AuthController';
import {getSimilarTiffins} from '../controllers/HomeController';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/TiffinProviderStyles';
import {BrandedSkeleton} from '../../../components/skeletons/BrandedSkeletons';

function TiffinProviders() {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {tiffinLoading, tiffinData, tiffinError} = useSelector(
    state => state.home,
  );
  const navigation = useNavigation();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  useEffect(() => {
    let today = new Date();
    let dateAfter7Days = new Date();
    dateAfter7Days.setDate(today.getDate() + 7);
    if (userDetails?.length && userDetails[0]?.formatted_address) {
      dispatch(
        getSimilarTiffins({
          latitude: userDetails[0]?.latitude,
          longitude: userDetails[0]?.longitude,
          vendorType: 'Tiffin',
          city: userDetails[0]?.city,
          pinCode: userDetails[0]?.pincode,
          placeId: userDetails[0]?.place_id,
          startDate: today,
          endDate: today,
        }),
      );
    }
  }, [userDetails]);

  const renderItem = ({item}) => {
    return (
      <Card style={{...styles.cardContainer, width: width - 100}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('PageStack', {
              screen: 'TiffinProfile',
              params: {
                branch_id: item?.id,
                vendor_id: item?.vendor_id,
                location: {
                  latitude: userDetails[0]?.latitude,
                  longitude: userDetails[0]?.longitude,
                  city: userDetails[0]?.city,
                  place_id: userDetails[0]?.place_id,
                  pincode: userDetails[0]?.pincode,
                },
              },
            });
          }}>
          {item?.banner_images?.length > 0 ? (
            <ImageBackground
              source={{
                uri: item?.banner_images[0]?.medium,
              }}
              style={[{...styles.img, width: '100%'}]}
              imageStyle={styles.imageStyle}
              alt={item.name}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                style={[
                  Platform.OS == 'ios' && gs.mt15,
                  gs.ph10,
                  styles.iconcontaier,
                ]}>
                <Image
                  source={require('../../../assets/Common/veg.png')}
                  style={[styles.icon, gs.mr5]}
                  alt="vegicon"
                />
                <Image
                  source={require('../../../assets/Common/nonveg.png')}
                  style={styles.icon}
                  alt="vegicon"
                />
              </Flex>
              <LinearGradient
                colors={['#000f', 'transparent']}
                start={{x: 0.0, y: Platform.OS == 'ios' ? 1.2 : 1.8}}
                end={{x: 0.0, y: 0.0}}
                style={[
                  {
                    ...styles.overlay,
                    width: width - 100,
                  },
                ]}>
                <View style={[gs.mt5]}>
                  <Flex
                    direction="row"
                    // alignItems="center"
                    style={[gs.ph10, gs.mt20]}>
                    <Image
                      source={{
                        uri: item?.brand_logo?.medium,
                      }}
                      style={styles.profile}
                      alt="profile"
                    />
                    <View style={[gs.mt20, styles.txtcontainer]}>
                      <Text
                        style={[
                          gs.fs16,
                          gs.ml10,
                          {color: '#fff', fontFamily: ts.jakartasemibold},
                          gs.mt20,
                        ]}
                        numberOfLines={1}>
                        {item?.catering_service_name?.length > 20
                          ? `${item?.catering_service_name?.slice(0, 20)}..`
                          : item?.catering_service_name}
                      </Text>
                      <Text
                        style={[
                          gs.fs14,
                          gs.ml10,
                          {color: '#f5f5f5', fontFamily: ts.jakartaregular},
                          Platform.OS == 'ios' && gs.pv2,
                        ]}>
                        {item?.street_name ? item.street_name : item?.area},{' '}
                        {item?.city}
                      </Text>
                    </View>
                  </Flex>
                </View>
              </LinearGradient>
            </ImageBackground>
          ) : (
            <View
              style={[
                {...styles.img, justifyContent: 'center', alignItems: 'center'},
                styles.imageStyle,
              ]}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs25]}
              />
            </View>
          )}
          <View>
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={[gs.ph10, gs.mt10]}>
              <Flex>
                <Text style={styles.startPrice}>
                  ₹ {item?.start_price ? item.start_price : 'N/A'}
                </Text>
                <Text style={[gs.fs11, styles.area, gs.pl2, gs.mt2]}>
                  Starts from
                </Text>
              </Flex>
              <Flex direction="row" align="center">
                <Image
                  source={require('../../../assets/Common/rating.png')}
                  style={styles.icon}
                  alt="rating"
                />
                <Text style={[styles.startPrice, gs.fs14, gs.ph3]}>4.5</Text>
                <Text style={[styles.area, gs.ph2, gs.fs12]}>
                  ({item?.review_count})
                </Text>
              </Flex>
            </Flex>

            <Text
              style={[
                gs.fs12,
                {color: '#fff', fontFamily: ts.secondaryregular},
              ]}>
              Veg | Non-Veg
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <>
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            {fontFamily: ts.jakartabold, color: ts.primarytext},
            gs.fs18,
            gs.mb10,
          ]}>
          Tiffins near you
        </Text>
      </View>
      {tiffinLoading ? (
        <Flex direction="row">
          {[1, 2]?.map((e, i) => (
            <View style={styles.contentContainerStyle} key={i}>
              <BrandedSkeleton />
            </View>
          ))}
        </Flex>
      ) : null}
      {!tiffinError && tiffinData?.vendors?.length > 0 && !tiffinLoading? (
        <FlatList
          data={tiffinData?.vendors}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          overScrollMode="never"
        />
      ) : (
        !tiffinLoading &&
        <Text
          style={[
            gs.fs12,
            {color: '#000', fontFamily: ts.secondaryregular},
            gs.ph15,
            gs.mb15,
            gs.ml5,
          ]}>
          No near by tiffins
        </Text>
      )}
    </>
  );
}
export default memo(TiffinProviders);
