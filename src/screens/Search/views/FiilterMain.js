import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Card} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import {Center, Divider, Flex, Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  catererbudget,
  caterercuisine,
  caterersort,
  headcount,
  occasions,
} from '../../../constants/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntIcon from 'react-native-vector-icons/Ionicons';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {getServing} from '../../Home/controllers/FilterMainController';

export default function FiilterMain({navigation}) {
  const [tserviceSelect, setTserviceSelect] = useState(true);
  const [bserviceSelect, setBserviceSelect] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(catererbudget[0]);
  const [headCount, setHeadCount] = useState('');
  const [searchenabled, setSearchEnabled] = useState(false);
  const [cuisine, setCuisine] = useState(caterercuisine);
  const [occasion, setOccasion] = useState(occasions);
  const [deliverySelect, setDeliverySelect] = useState(true);
  const [takeawaySelect, setTakeawaySelect] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [serving, setServing] = useState([]);
  const dispatch = useDispatch();
  const {servingLoading, servingData, servingError} = useSelector(
    state => state?.filterCater,
  );

  const handleCuisineSelect = (item, index) => {
    let data = [...cuisine];
    let itemToInsert = {...item, selected: !item.selected};
    data[index] = itemToInsert;
    setCuisine(data);
  };
  const handleOccasionSelect = (item, index) => {
    let data = [...occasion];
    let itemToInsert = {...item, selected: !item.selected};
    data[index] = itemToInsert;
    setOccasion(data);
  };

  useEffect(() => {
    dispatch(getServing());
  }, []);
  useEffect(() => {
    if (servingData?.length) {
      setServing(servingData);
    }
  }, [servingData]);
  return (
    <ScreenWrapper>
      <ThemeHeaderWrapper
        lefttxt="Filters"
        righttxt="Clear All"
        goBack={() => navigation.goBack()}
        bgColor={ts.secondary}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff'}, gs.ph10, gs.pv20]}>
        {/* ====CATER SERVING TYPE====== */}
        <Card style={[gs.mh5, gs.pv10, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Cater Serving Type
          </Text>
          <Divider style={[gs.mv15]} />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-around">
            {servingLoading && (
              <Center>
                <Spinner color={ts.secondary}/>
              </Center>
            )}
            {
              servingError?.message && 
              <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>No Serving type found</Text>
            }
            {!servingLoading &&
              serving.map((e, i) => (
                <Flex justify="center" alignItems="center" key={i}>
                  {e?.name == 'Table Service' ? (
                    <Image
                      alt="tableservice"
                      source={require('../../../assets/Search/tableservice.png')}
                      style={styles.img}
                    />
                  ) : (
                    <Image
                      alt="buffetservice"
                      source={require('../../../assets/Search/buffetservice.png')}
                      style={styles.buffetimg}
                    />
                  )}

                  <TouchableWithoutFeedback>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[gs.mt10, gs.mb5]}>
                      <MaterialIcons
                        name={
                          !tserviceSelect ? 'circle-outline' : 'circle-slice-8'
                        }
                        style={[
                          gs.fs20,
                          gs.mr3,
                          {
                            color: tserviceSelect
                              ? ts.secondary
                              : ts.secondarytext,
                          },
                        ]}
                      />
                      <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                        {e?.name}
                      </Text>
                    </Flex>
                  </TouchableWithoutFeedback>
                </Flex>
              ))
             
            }
          </Flex>
        </Card>
        {/* =======HEAD COUNT========= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Choose Head count
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph10]}>
            {headcount.map((e, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setHeadCount(e);
                }}
                key={i}>
                <Flex direction="row" justify="space-between" align="center">
                  <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>{e}</Text>
                  <MaterialIcons
                    name={e == headCount ? 'check-circle' : 'circle-outline'}
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: e == headCount ? ts.secondary : ts.alternate,
                      },
                    ]}
                  />
                </Flex>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Card>
        {/* ========BUDGET SELECTION========= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Your Budget (Per plate cost)
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph10]}>
            {catererbudget.map((e, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setSelectedBudget(e);
                }}
                key={i}>
                <Flex direction="row" justify="space-between" align="center">
                  <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>{e}</Text>
                  <MaterialIcons
                    name={
                      e == selectedBudget ? 'check-circle' : 'circle-outline'
                    }
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color:
                          e == selectedBudget ? ts.secondary : ts.alternate,
                      },
                    ]}
                  />
                </Flex>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Card>
        {/* ======CHOOSE CUISINE======= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Choose Cuisine</Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph15]}>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder="Search here.."
                style={[
                  {
                    ...styles.txtinput,
                    borderColor: searchenabled ? ts.secondary : '#bbb',
                  },
                ]}
                placeholderTextColor={
                  searchenabled ? ts.secondary : ts.secondarytext
                }
                onFocus={() => {
                  setSearchEnabled(true);
                }}
                onBlur={() => {
                  setSearchEnabled(false);
                }}
              />
              <View style={styles.searchcontainer}>
                <FontistoIcon
                  name="search"
                  style={[
                    gs.fs16,
                    {color: searchenabled ? ts.secondary : ts.secondarytext},
                  ]}
                />
              </View>
            </View>
            {cuisine.map((e, i) => (
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                key={i}>
                <Flex direction="row" alignItems="center">
                  <TouchableWithoutFeedback>
                    <AntIcon
                      name="chevron-down-outline"
                      style={[gs.pr10, gs.pv10, gs.fs16, {color: '#777'}]}
                    />
                  </TouchableWithoutFeedback>
                  <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                    {e.name}
                  </Text>
                </Flex>
                <TouchableWithoutFeedback
                  onPress={() => {
                    handleCuisineSelect(e, i);
                  }}>
                  <MaterialIcons
                    name={
                      e.selected ? 'checkbox-marked' : 'checkbox-blank-outline'
                    }
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: e.selected ? ts.secondary : ts.alternate,
                      },
                    ]}
                  />
                </TouchableWithoutFeedback>
              </Flex>
            ))}
          </View>
        </Card>
        {/* ===SERVICE TYPE======= */}
        <Card style={[gs.mh5, gs.pv10, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Cater Service Type
          </Text>
          <Divider style={[gs.mv15]} />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-around">
            {/* ===DELIVERY SERVICE======= */}
            <Flex justify="center" alignItems="center">
              <Image
                alt="tableservice"
                source={require('../../../assets/Search/delivery.png')}
                style={styles.img}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  setDeliverySelect(prev => !prev);
                  setTakeawaySelect(false);
                }}>
                <Flex
                  direction="row"
                  alignItems="center"
                  style={[gs.mt10, gs.mb5]}>
                  <MaterialIcons
                    name={!deliverySelect ? 'circle-outline' : 'circle-slice-8'}
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: deliverySelect ? ts.secondary : ts.secondarytext,
                      },
                    ]}
                  />
                  <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                    Delivery Service
                  </Text>
                </Flex>
              </TouchableWithoutFeedback>
            </Flex>
            {/* ===TAKEAWAY SERVICE======= */}
            <Flex direction="row" alignItems="center">
              <Flex justify="center" alignItems="center">
                <Image
                  alt="tableservice"
                  source={require('../../../assets/Search/takeaway.png')}
                  style={styles.img}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTakeawaySelect(prev => !prev);
                    setDeliverySelect(false);
                  }}>
                  <Flex
                    direction="row"
                    alignItems="center"
                    style={[gs.mt10, gs.mb5]}>
                    <MaterialIcons
                      name={
                        !takeawaySelect ? 'circle-outline' : 'circle-slice-8'
                      }
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: takeawaySelect
                            ? ts.secondary
                            : ts.secondarytext,
                        },
                      ]}
                    />
                    <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                      Takeaway
                    </Text>
                  </Flex>
                </TouchableWithoutFeedback>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        {/* ======CHOOSE OCCASION======= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Choose Occasions
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph15]}>
            {occasion.map((e, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleOccasionSelect(e, i);
                }}
                key={i}>
                <Flex direction="row" justify="space-between" align="center">
                  <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>
                    {e.name}
                  </Text>

                  <MaterialIcons
                    name={
                      e.selected ? 'checkbox-marked' : 'checkbox-blank-outline'
                    }
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: e.selected ? ts.secondary : ts.alternate,
                      },
                    ]}
                  />
                </Flex>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Card>
        {/* ========SORT BY========= */}
        <Card
          style={[
            gs.mh5,
            gs.pv10,
            gs.mt15,
            {backgroundColor: '#fff', marginBottom: 80},
          ]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Sort By</Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph10]}>
            {caterersort.map((e, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setSelectedSort(e);
                }}
                key={i}>
                <Flex direction="row" justify="space-between" align="center">
                  <Text style={[styles.servicetxt, gs.fs13, gs.mv10]}>{e}</Text>
                  <MaterialIcons
                    name={e == selectedSort ? 'check-circle' : 'circle-outline'}
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: e == selectedSort ? ts.secondary : ts.alternate,
                      },
                    ]}
                  />
                </Flex>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Card>
      </KeyboardAwareScrollView>
      <Card
        style={[{borderRadius: 0, backgroundColor: '#fff'}, gs.ph15, gs.pb10]}>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          style={[gs.pt15, gs.pb10]}>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondary, fontFamily: ts.secondaryregular},
            ]}>
            235 matching Caterers
          </Text>
          <ThemeSepBtn btntxt="Show results" themecolor={ts.secondary} />
        </Flex>
      </Card>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  heading: {
    fontFamily: ts.secondarysemibold,
    marginTop: '5@ms',
    color: ts.primarytext,
  },
  img: {
    height: '35@ms',
    width: '35@ms',
  },
  buffetimg: {
    height: '40@ms',
    width: '40@ms',
  },
  servicetxt: {
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
  },
  txtinput: {
    marginVertical: '10@ms',
    borderWidth: 1,
    paddingVertical: 10,
    fontFamily: ts.secondaryregular,
    fontSize: '14@ms',
    paddingLeft: '30@ms',
    paddingRight: 5,
    borderRadius: 10,
    height: '45@ms',
  },
  searchcontainer: {
    position: 'absolute',
    left: '10@ms',
    height: '45@ms',
    marginTop: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
