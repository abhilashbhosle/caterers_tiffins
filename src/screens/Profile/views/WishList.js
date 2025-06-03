import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ts} from '../../../../ThemeStyles';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import CaterersWish from './CaterersWish';
import TiffinsWish from './TiffinsWish';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {gs} from '../../../../GlobalStyles';

export default function WishList({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Caterers'},
    {key: 'second', title: 'Tiffins'},
  ]);
  const {height, width} = Dimensions.get('screen');
  const [caterersCount, setCaterersCount] = useState(0);
  const [tiffinsCount, setTiffinsCount] = useState(0);
  // =========CATERERS==========//
  const Caterers = () => (
    <View style={[{flex: 1}, gs.ph15]}>
      <CaterersWish setCaterersCount={setCaterersCount} />
    </View>
  );

  const Tiffins = () => (
    <View style={[{flex: 1}, gs.ph15]}>
      <TiffinsWish setTiffinsCount={setTiffinsCount} />
    </View>
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
        // locations={[0.8,0.2,0.0]}
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
                  My Wishlist
                </Text>
              </Flex>
            </Flex>
          </View>
        </SafeAreaView>
      </LinearGradient>
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
                        backgroundColor: focused ? '#fff' : 'transparent',   width: width / 2.21,
                      },
                    ]}>
                    <Text
                      style={{
                        ...styles.title,
                        color: '#000',
                      }}>
                      {route.title} (
                      {route?.title == 'Caterers'
                        ? caterersCount
                        : tiffinsCount}
                      )
                    </Text>
                  </View>
                );
              }}
              indicatorStyle={{backgroundColor: 'transparent'}}
            />
          </View>
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
  titlecontainer: {
    borderRadius: '6@ms',
    height: '23@ms',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '9@ms',
  },
  container: {
    height: '400@ms',
  },
  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
  tabbarcontainer: {
    backgroundColor: 'rgba(39, 45, 55, 0.1)',
    elevation: 0,
    height: '26@ms',
    // paddingVertical: '2@ms',
    borderRadius: '6@ms',
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
  topcontainer: {
    marginTop: Platform.OS == 'ios' ? '-280@ms' : '-300@ms',
  },
});
