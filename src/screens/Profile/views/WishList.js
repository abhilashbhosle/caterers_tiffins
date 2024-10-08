import {View, Text, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ts} from '../../../../ThemeStyles';
import {Center} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import CaterersWish from './CaterersWish';
import TiffinsWish from './TiffinsWish';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useSelector} from 'react-redux';

export default function WishList({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Caterers'},
    {key: 'second', title: 'Tiffins'},
  ]);
  const [caterersCount, setCaterersCount] = useState(0);
  const [tiffinsCount, setTiffinsCount] = useState(0);
  // =========CATERERS==========//
  const Caterers = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CaterersWish setCaterersCount={setCaterersCount} />
    </View>
  );

  const Tiffins = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TiffinsWish setTiffinsCount={setTiffinsCount} />
    </View>
  );
  const renderScene = SceneMap({
    first: Caterers,
    second: Tiffins,
  });

  return (
    <ScreenWrapper>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ThemeHeaderWrapper
          lefttxt="My Wishlist"
          righttxt="Remove All"
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
                      ...styles.titlecontainer,
                      color: focused ? ts.primarytext : 'gray',
                    }}>
                    {route.title} ({route?.title=="Caterers"?caterersCount:tiffinsCount})
                  </Text>
                );
              }}
              indicatorStyle={{backgroundColor: ts.teritary}}
            />
          )}
        />
      </View>
    </ScreenWrapper>
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
  titlecontainer: {fontFamily: ts.secondaryregular, fontSize: '15@ms'},
});
