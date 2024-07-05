import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
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

export default function TiffinProviders() {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth?.userInfo?.data);
  const {tiffinLoading, tiffinData, tiffinError} = useSelector(
    state => state.home,
  );
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
          endDate: dateAfter7Days,
        }),
      );
    }
  }, [userDetails]);

  const renderItem = ({item}) => {
    return (
      <Card
        style={[
          {backgroundColor: '#fff', width: width / 2.4},
          gs.mh10,
          gs.mb15,
          gs.br5,
        ]}>
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
                  pinCode: userDetails[0]?.pincode,
                  placeId: userDetails[0]?.place_id,
                },
              },
            });
          }}>
          {item?.brand_logo?.medium ? (
            <ImageBackground
              source={{uri: item.brand_logo.medium}}
              style={[
                {...styles.img, width: '100%', justifyContent: 'flex-end'},
              ]}
              alt={item.name}
              imageStyle={styles.bgimg}
            />
          ) : (
            <View
              style={{
                ...styles.img,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}>
              <EntypoIcon
                name="image-inverted"
                style={[{color: ts.secondarytext}, gs.fs25]}
              />
            </View>
          )}

          <View style={[gs.ph10]}>
            <Text
              style={[{fontFamily: ts.secondaryregular}, gs.pv5, gs.fs13]}
              numberOfLines={1}>
              {item?.catering_service_name}
            </Text>
            <Flex direction="row" align="center">
              <Text
                style={[
                  {
                    fontFamily: ts.secondaryregular,
                    color: ts.primary,
                  },
                  gs.fs13,
                  gs.pb10,
                ]}>
                {item.area}
              </Text>
            </Flex>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };
  if (tiffinLoading) {
    return;
  }
  return (
    <>
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb10,
          ]}>
          Tiffin Service providers near you
        </Text>
      </View>
      {!tiffinError && tiffinData?.vendors?.length > 0 ? (
        <Center>
          <FlatList
            data={tiffinData?.vendors}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={2}
          />
        </Center>
      ) : null}
    </>
  );
}
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    marginHorizontal: '15@ms',
    position: 'relative',
  },
  img: {
    height: '100@ms',
    resizeMode: 'cover',
  },
  bgimg: {
    borderTopLeftRadius: '5@ms',
    borderTopRightRadius: '5@ms',
  },
});
