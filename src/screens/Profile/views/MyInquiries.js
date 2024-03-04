import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {ts} from '../../../../ThemeStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {caterersinquiry, tiffinsenquiry} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import FontIcons from 'react-native-vector-icons/FontAwesome';
export default function MyInquiries({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Caterers'},
    {key: 'second', title: 'Tiffins'},
  ]);
  //   ========CATERERS INWUIRY LIST=============== //
  const renderCaterers = ({item}) => {
    return (
      <Card style={[gs.p10, {backgroundColor: '#fff'}, gs.mt10]}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Text style={[gs.fs17, styles.name]}>{item.name}</Text>
          <View
            style={{
              ...styles.labelcontainer,
              backgroundColor:
                item.label == 'Branded' ? ts.branded : ts.accent3,
            }}>
            <Text
              style={[
                gs.fs13,
                {color: '#fff', fontFamily: ts.secondaryregular},
              ]}>
              {item.label}
            </Text>
          </View>
        </Flex>
        <Text style={[gs.fs13, {...styles.name}, gs.mv5]}>{item.area}</Text>
        <Text style={[gs.fs11, {...styles.name, color: ts.secondary}, gs.mv12]}>
          {item.contactdate}
        </Text>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>Food Type : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.accent3}]}>
            {item.type}
          </Text>
        </Flex>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>Cuisines : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.primarytext}]}>
            {item.cuisine}
          </Text>
        </Flex>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>Occasion : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.primarytext}]}>
            {item.occasion}
          </Text>
        </Flex>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>service : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.primarytext}]}>
            {item.service}
          </Text>
        </Flex>
        <Flex direction="row" alignItems="flex-end" justifyContent="flex-end">
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.callnowbtn,
              {borderWidth: 1, borderColor: ts.secondary},
              gs.br10,
            ]}>
            <Flex direction="row" alignItems="center">
              <FontIcons
                name="phone"
                style={[gs.fs20, {color: ts.secondary}]}
              />
              <Text
                style={[
                  gs.fs13,
                  {fontFamily: ts.secondaryregular, color: ts.secondary},
                  gs.ml5,
                ]}>
                Call Now
              </Text>
            </Flex>
          </TouchableOpacity>
        </Flex>
      </Card>
    );
  };

  // =========CATERERS==========//
  const Caterers = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={caterersinquiry}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderCaterers}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gs.ph10,gs.pv10]}
      />
    </View>
  );
  //   ========TIFFINS INWUIRY LIST=============== //
  const renderTiffins = ({item}) => {
    return (
      <Card style={[gs.p10, {backgroundColor: '#fff'}, gs.mt10]}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Text style={[gs.fs17, styles.name]}>{item.name}</Text>
          <View
            style={{
              ...styles.labelcontainer,
              backgroundColor:
                item.label == 'Branded' ? ts.branded : ts.accent3,
            }}>
            <Text
              style={[
                gs.fs13,
                {color: '#fff', fontFamily: ts.secondaryregular},
              ]}>
              {item.label}
            </Text>
          </View>
        </Flex>
        <Text style={[gs.fs13, {...styles.name}, gs.mv5]}>{item.area}</Text>
        <Text style={[gs.fs11, {...styles.name, color: ts.primary}, gs.mv12]}>
          {item.contactdate}
        </Text>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>Food Type : </Text>
          <Text style={[styles.types, gs.fs13, {color: '#f00'}]}>
            {item.type}
          </Text>
        </Flex>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>Mealtime : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.primarytext}]}>
            {item.mealtime}
          </Text>
        </Flex>
        <Flex direction="row" align="center" style={[gs.mb5]}>
          <Text style={[styles.types, gs.fs13]}>service : </Text>
          <Text style={[styles.types, gs.fs13, {color: ts.primarytext}]}>
            {item.service}
          </Text>
        </Flex>
        <Flex direction="row" alignItems="flex-end" justifyContent="flex-end">
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.callnowbtn,
              {borderWidth: 1, borderColor: ts.primary},
              gs.br10,
            ]}>
            <Flex direction="row" alignItems="center">
              <FontIcons name="phone" style={[gs.fs20, {color: ts.primary}]} />
              <Text
                style={[
                  gs.fs13,
                  {fontFamily: ts.secondaryregular, color: ts.primary},
                  gs.ml5,
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={tiffinsenquiry}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderTiffins}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gs.ph10,gs.pv10]}
      />
    </View>
  );
  const renderScene = SceneMap({
    first: Caterers,
    second: Tiffins,
  });
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ThemeHeaderWrapper
        lefttxt="My Inquiries"
        goBack={() => navigation.goBack()}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: '#fff'}}
            renderLabel={({focused, route}) => {
              return (
                <Text
                  size={20}
                  category="Medium"
                  style={{
                    ...styles.title,
                    color: focused ? ts.primarytext : 'gray',
                  }}>
                  {route.title}
                </Text>
              );
            }}
            indicatorStyle={{backgroundColor: ts.teritary}}
          />
        )}
      />
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
    color: '#666',
    fontFamily: ts.secondaryregular,
  },
  callnowbtn: {
    height: '30@ms',
    width: '100@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: ts.secondaryregular,
    fontSize: '15@ms',
  },
});
