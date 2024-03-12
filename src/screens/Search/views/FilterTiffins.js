import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {ts} from '../../../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {gs} from '../../../../GlobalStyles';
import {Divider, Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {
  catererbudget,
  caterersort,
  headcount,
  mealtime,
} from '../../../constants/Constants';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {ScreenWrapper} from '../../../components/ScreenWrapper';

export default function FilterTiffins({navigation}) {
  const [service, setService] = useState({
    delivery: false,
    takeaway: false,
    dinein: false,
  });
  const [selectedBudget, setSelectedBudget] = useState(catererbudget[0]);
  const [headCount, setHeadCount] = useState('');
  const [mealTime, setMealTime] = useState(mealtime);
  const [selectedSort, setSelectedSort] = useState('');
  const handleMealTime = (item, index) => {
    console.log(item, index);
    let data = [...mealTime];
    let itemToInsert = {...item, selected: !item.selected};
    data[index] = itemToInsert;
    setMealTime(data);
  };
  return (
    <ScreenWrapper>
      <ThemeHeaderWrapper
        lefttxt="Filters"
        righttxt="Clear All"
        goBack={() => navigation.goBack()}
        bgColor={ts.primary}
        
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff'}, gs.ph10, gs.pv20]}>
        {/* ====CATER SERVICE TYPE====== */}
        <Card style={[gs.mh5, gs.pv10, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>Service Type</Text>
          <Divider style={[gs.mv15]} />
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-around">
            {/* ===DELIVERY======= */}
            <Flex justify="center" alignItems="center">
              <Image
                alt="delivery"
                source={require('../../../assets/Search/delivery.png')}
                style={styles.img}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  setService({
                    delivery: true,
                    takeaway: false,
                    dinein: false,
                  });
                }}>
                <Flex
                  direction="row"
                  alignItems="center"
                  style={[gs.mt10, gs.mb5]}>
                  <MaterialIcons
                    name={
                      !service.delivery ? 'circle-outline' : 'circle-slice-8'
                    }
                    style={[
                      gs.fs20,
                      gs.mr3,
                      {
                        color: service.delivery ? ts.primary : ts.secondarytext,
                      },
                    ]}
                  />
                  <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                    Delivery
                  </Text>
                </Flex>
              </TouchableWithoutFeedback>
            </Flex>
            {/* ===TAKEAWAY SERVICE======= */}
            <Flex direction="row" alignItems="center">
              <Flex justify="center" alignItems="center">
                <Image
                  alt="takeaway"
                  source={require('../../../assets/Search/takeaway.png')}
                  style={styles.img}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setService({
                      delivery: false,
                      takeaway: true,
                      dinein: false,
                    });
                  }}>
                  <Flex
                    direction="row"
                    alignItems="center"
                    style={[gs.mt10, gs.mb5]}>
                    <MaterialIcons
                      name={
                        !service.takeaway ? 'circle-outline' : 'circle-slice-8'
                      }
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: service.takeaway
                            ? ts.primary
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
            {/* ===DINE IN SERVICE======= */}
            <Flex direction="row" alignItems="center">
              <Flex justify="center" alignItems="center">
                <Image
                  alt="takeaway"
                  source={require('../../../assets/Search/dinein.png')}
                  style={styles.img}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setService({
                      delivery: false,
                      takeaway: false,
                      dinein: true,
                    });
                  }}>
                  <Flex
                    direction="row"
                    alignItems="center"
                    style={[gs.mt10, gs.mb5]}>
                    <MaterialIcons
                      name={
                        !service.dinein ? 'circle-outline' : 'circle-slice-8'
                      }
                      style={[
                        gs.fs20,
                        gs.mr3,
                        {
                          color: service.dinein ? ts.primary : ts.secondarytext,
                        },
                      ]}
                    />
                    <Text style={[styles.servicetxt, gs.fs13, gs.ml5]}>
                      Dine In
                    </Text>
                  </Flex>
                </TouchableWithoutFeedback>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        {/* ========BUDGET SELECTION========= */}
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
                        color: e == headCount ? ts.primary : ts.alternate,
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
                        color: e == selectedBudget ? ts.primary : ts.alternate,
                      },
                    ]}
                  />
                </Flex>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </Card>
        {/* ======MEAL TIME======= */}
        <Card style={[gs.mh5, gs.pv10, gs.mv15, {backgroundColor: '#fff'}]}>
          <Text style={[styles.heading, gs.fs15, gs.pl15]}>
            Choose Meal time
          </Text>
          <Divider style={[gs.mv15]} />
          <View style={[gs.ph15]}>
            {mealTime.map((e, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleMealTime(e, i);
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
                        color: e.selected ? ts.primary : ts.alternate,
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
                        color: e == selectedSort ? ts.primary : ts.alternate,
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
              {color: ts.primary, fontFamily: ts.secondaryregular},
            ]}>
            235 matching Caterers
          </Text>
          <ThemeSepBtn btntxt="Show results" themecolor={ts.primary} />
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
  },
  searchcontainer: {
    position: 'absolute',
    top: '20@ms',
    left: '10@ms',
  },
});
