import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {ts} from '../../../../ThemeStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Flex, Spinner} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {caterersinquiry, tiffinsenquiry} from '../../../constants/Constants';
import {Card, Divider} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getInquiries} from '../../Home/controllers/InquiryController';
import moment from 'moment';
export default function MyInquiries({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Caterers'},
    {key: 'second', title: 'Tiffins'},
  ]);
  const {height, width} = Dimensions.get('screen');
  const dispatch = useDispatch();
  const {inquiryLoading, inquiryCatererData, inquiryTiffinData, inquiryError} =
    useSelector(state => state.inquiry);
  useEffect(() => {
    dispatch(getInquiries({page: 1, limit: 100}));
  }, []);

  const renderFooter = () => {
    if (inquiryLoading) {
      return <Spinner color={ts.secondarytext} />;
    }
  };
  // console.log(inquiryCatererData)

  //   ========CATERERS INWUIRY LIST=============== //
  const renderCaterers = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mt10, gs.pv15]}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Text
            style={[
              gs.fs17,
              {width: width / 1.7, color: '#000', fontFamily: ts.jakartabold},
              gs.ml15,
            ]}
            numberOfLines={1}>
            {item?.vendor_service_name}
          </Text>
          <Image
            source={require('../../../assets/Common/brandedrev.png')}
            style={styles.labelStyle}
          />
        </Flex>
        <Text
          style={[
            gs.fs14,
            {fontFamily: ts.jakartalight, color: '#000'},
            gs.mt5,
            gs.mb10,
            gs.ml15,
          ]}>
          {item?.area ? item?.area : 'N/A'}
        </Text>
        <Divider />

        <Flex direction="row" align="center" style={[gs.mb5, gs.mh15]}>
          <View>
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Food Type{' '}
            </Text>
            {item?.insertedData?.food_types?.length ? (
              item.insertedData.food_types.map((e, i) => (
                <Flex direction="row" align="center" key={i}>
                  {e?.food_type_name == 'Veg' || e?.food_type_name == 'All' ? (
                    <Image
                      source={require('../../../assets/Common/veg.png')}
                      style={styles.foodtypimg}
                    />
                  ) : null}
                  {e?.food_type_name == 'NonVeg' ||
                  e?.food_type_name == 'All' ? (
                    <Image
                      source={require('../../../assets/Common/nonveg.png')}
                      style={styles.foodtypimg}
                    />
                  ) : null}
                  <Text style={[styles.typestxt, gs.fs14]}>
                    {e?.food_type_name.toUpperCase()}
                  </Text>
                </Flex>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}

            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Occasion{' '}
            </Text>
            {item?.insertedData?.occasions?.length ? (
              item.insertedData.occasions.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.occasion_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
          </View>
          <View style={{marginLeft: 80}}>
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Cuisines{' '}
            </Text>
            {item?.insertedData?.cuisines?.length ? (
              item.insertedData.cuisines.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.cuisine_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Service{' '}
            </Text>
            {item?.insertedData?.service_types?.length ? (
              item.insertedData.service_types.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.service_type_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
          </View>
        </Flex>
        <Divider style={[gs.mv10]} />
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={[gs.mh15]}>
          <Text
            style={[gs.fs14, {fontFamily: ts.jakartamedium, color: '#70747b'}]}>
            {moment(item?.enquiry_date).format('DD/MM/YYYYY')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.callnowbtn,
              gs.br20,
              {backgroundColor: ts.secondary},
            ]}
            onPress={() => {
              item?.vendor_phone_number
                ? Linking.openURL(`tel:${item?.vendor_phone_number}`)
                : Alert.alert('No Phone Number Found.');
            }}>
            <Flex direction="row" alignItems="center">
              <Image
                style={styles.phoneicon}
                source={require('../../../assets/Common/phone.png')}
              />
              <Text
                style={[
                  gs.fs14,
                  {fontFamily: ts.jakartasemibold, color: '#fff'},
                  gs.ml5,
                  gs.mb4,
                ]}>
                Call Now
              </Text>
            </Flex>
          </TouchableOpacity>
        </Flex>
      </Card>
    );
  };
  // console.log(caterersinquiry)
  // =========CATERERS==========//
  const Caterers = () => (
    <FlatList
      data={!inquiryLoading ? inquiryCatererData : []}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderCaterers}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[gs.ph15, gs.pv10]}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={
        !inquiryLoading && !inquiryCatererData?.length ? (
          <Text
            style={[
              gs.fs14,
              {fontFamily: ts.jakartalight, color: '#000'},
              gs.mt5,
              gs.mb10,
              gs.ml15,
            ]}>
            No Inquiries found
          </Text>
        ) : null
      }
    />
  );
  //   ========TIFFINS INWUIRY LIST=============== //
  const renderTiffins = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mt10, gs.pv15]}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Text
            style={[
              gs.fs17,
              {width: width / 1.7, color: '#000', fontFamily: ts.jakartabold},
              gs.ml15,
            ]}
            numberOfLines={1}>
            {item?.vendor_service_name}
          </Text>
          <Image
            source={require('../../../assets/Common/brandedrev.png')}
            style={styles.labelStyle}
          />
        </Flex>
        <Text
          style={[
            gs.fs14,
            {fontFamily: ts.jakartalight, color: '#000'},
            gs.mt5,
            gs.mb10,
            gs.ml15,
          ]}>
          {item?.area ? item?.area : 'N/A'}
        </Text>
        <Divider />

        <Flex direction="row" align="center" style={[gs.mb5, gs.mh15]}>
          <View>
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Food Type{' '}
            </Text>
            {item?.insertedData?.food_types?.length ? (
              item.insertedData.food_types.map((e, i) => (
                <Flex direction="row" align="center" key={i}>
                  {e?.food_type_name == 'Veg' || e?.food_type_name == 'All' ? (
                    <Image
                      source={require('../../../assets/Common/veg.png')}
                      style={styles.foodtypimg}
                    />
                  ) : null}
                  {e?.food_type_name == 'NonVeg' ||
                  e?.food_type_name == 'All' ? (
                    <Image
                      source={require('../../../assets/Common/nonveg.png')}
                      style={styles.foodtypimg}
                    />
                  ) : null}
                  <Text style={[styles.typestxt, gs.fs14]}>
                    {e?.food_type_name.toUpperCase()}
                  </Text>
                </Flex>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}

            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Occasion{' '}
            </Text>
            {item?.insertedData?.occasions?.length ? (
              item.insertedData.occasions.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.occasion_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
          </View>
          <View style={{marginLeft: 80}}>
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Cuisines{' '}
            </Text>
            {item?.insertedData?.cuisines?.length ? (
              item.insertedData.cuisines.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.cuisine_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
            <Text style={[styles.types, gs.fs14, gs.mt10, gs.mb5]}>
              Service{' '}
            </Text>
            {item?.insertedData?.service_types?.length ? (
              item.insertedData.service_types.map((e, i) => (
                <Text style={[styles.typestxt, gs.fs14]} key={i}>
                  {e.service_type_name}{' '}
                </Text>
              ))
            ) : (
              <Text style={[styles.typestxt, gs.fs14]}>N/A</Text>
            )}
          </View>
        </Flex>
        <Divider style={[gs.mv10]} />
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={[gs.mh15]}>
          <Text
            style={[gs.fs14, {fontFamily: ts.jakartamedium, color: '#70747b'}]}>
            {moment(item?.enquiry_date).format('DD/MM/YYYYY')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.callnowbtn, gs.br20, {backgroundColor: ts.primary}]}
            onPress={() => {
              item?.vendor_phone_number
                ? Linking.openURL(`tel:${item?.vendor_phone_number}`)
                : Alert.alert('No Phone Number Found.');
            }}>
            <Flex direction="row" alignItems="center">
              <Image
                style={styles.phoneicon}
                source={require('../../../assets/Common/phone.png')}
              />
              <Text
                style={[
                  gs.fs14,
                  {fontFamily: ts.jakartasemibold, color: '#fff'},
                  gs.ml5,
                  gs.mb4,
                ]}>
                Call Now
              </Text>
            </Flex>
          </TouchableOpacity>
        </Flex>
      </Card>
    );
  };
  //   =====TIFFINS========//
  const Tiffins = () => (
    <ScreenWrapper>
      <FlatList
        data={!inquiryLoading ? inquiryTiffinData : []}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderTiffins}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gs.ph15, gs.pv10]}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !inquiryLoading && !inquiryTiffinData?.length ? (
            <Text
              style={[
                gs.fs14,
                {fontFamily: ts.jakartalight, color: '#000'},
                gs.mt5,
                gs.mb10,
                gs.ml15,
              ]}>
              No Inquiries found
            </Text>
          ) : null
        }
      />
    </ScreenWrapper>
  );
  const renderScene = SceneMap({
    first: Caterers,
    second: Tiffins,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        colors={['#fff0f0', '#FFFDF5', '#fff']}
        start={{x: 0.2, y: 0.5}}
        end={{x: 0.5, y: 1.2}}
        // locations={[0.9,0.0,0.0]}
        style={[{...styles.container}]}>
        <SafeAreaView>
          <View
            style={[
              {
                paddingTop:
                  Platform.OS == 'android' ? StatusBar.currentHeight + 10 : 20,
              },
              gs.pb10,
            ]}>
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={[gs.ph15]}>
              <Flex direction="row" alignItems="center">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../../assets/Common/back.png')}
                    style={styles.backicon}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    gs.fs18,
                    {color: '#000', fontFamily: ts.jakartabold},
                    gs.mb5,
                  ]}>
                  My Inquiries
                </Text>
              </Flex>
            </Flex>
          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* <View style={[gs.ph15, styles.topcontainer]}> */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={[styles.topcontainer]}
        renderTabBar={props => (
          <View style={[gs.ph15]}>
            <TabBar
              {...props}
              style={[styles.tabbarcontainer]}
              renderLabel={({focused, route}) => {
                return (
                  <View
                    style={[
                      styles.titlecontainer,
                      {
                        backgroundColor: focused ? '#fff' : 'transparent',
                        width: width / 2.21,
                      },
                    ]}>
                    <Text
                      // size={20}
                      category="Medium"
                      style={{
                        ...styles.title,
                        color: '#000',
                        // backgroundColor: focused ? '#fff' : 'transparent',
                        // width: width / 2.21,
                        // left:-2
                      }}>
                      {route.title}{' '}
                      {focused && route.title == 'Caterers'
                        ? `(${
                            inquiryCatererData?.length
                              ? inquiryCatererData?.length
                              : 0
                          })`
                        : focused && route.title == 'Tiffins'
                        ? `(${
                            inquiryTiffinData?.length
                              ? inquiryTiffinData?.length
                              : 0
                          })`
                        : null}
                    </Text>
                  </View>
                );
              }}
              indicatorStyle={{backgroundColor: 'transparent'}}
            />
          </View>
        )}
      />
      {/* </View> */}
    </View>
  );
}
const styles = ScaledSheet.create({
  cardtxt: {
    fontSize: '12@ms',
    marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    marginTop: '10@ms',
  },
  labelcontainer: {
    height: '25@ms',
    width: '80@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15@ms',
  },
  name: {color: ts.teritary, fontFamily: ts.secondaryregular},
  types: {
    color: '#000',
    fontFamily: ts.jakartalight,
  },
  typestxt: {
    color: '#000',
    fontFamily: ts.jakartamedium,
  },
  callnowbtn: {
    height: '30@ms',
    width: '110@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  container: {
    height: '400@ms',
  },
  topcontainer: {
    marginTop: Platform.OS == 'ios' ? '-280@ms' : '-300@ms',
  },
  tabbarcontainer: {
    backgroundColor: 'rgba(39, 45, 55, 0.1)',
    elevation: 0,
    height: '26@ms',
    // paddingVertical: '2@ms',
    borderRadius: '6@ms',
  },
   titlecontainer: {
    borderRadius: '6@ms',
    height: '23@ms',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '9@ms',
  },
  title: {
 fontFamily: ts.jakartasemibold,
    fontSize: '12@ms',
    textAlign: 'center',
    // bottom: '9.45@ms',
    paddingTop: '2@ms',
    height: '23@ms',
    borderRadius: '6@ms',
  },
  labelStyle: {
    height: '23.3@ms',
    width: '73.5@ms',
  },
  foodtypimg: {
    width: '20@ms',
    height: '20@ms',
    marginRight: '4@ms',
  },
  phoneicon: {
    width: '15@ms',
    height: '15@ms',
  },
});
