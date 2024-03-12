import {View, Text, FlatList, Image, ImageBackground} from 'react-native';
import React, {memo} from 'react';
import {useRoute} from '@react-navigation/native';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import {india} from '../../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

function ExploreIndia() {
  const route = useRoute();
  const renderItem = ({item}) => {
    return (
      <Card style={{backgroundColor: '#fff', marginBottom: 15}}>
        <ImageBackground
          source={item.img}
          style={[styles.img]}
          alt={item.name}
          imageStyle={gs.br12}></ImageBackground>
        <View style={[styles.overlay, gs.br12]}></View>
        <LinearGradient
          colors={['#0004', 'transparent']}
          start={{x: 0.0, y: 0.0}}
          end={{x: 0.0, y: 1}}
          style={[
            {
              ...styles.overlay,
              justifyContent: 'flex-end',
              flexDirection: 'row',
            },
            gs.h40,
            styles.txtoverlay,
          ]}
          >
          <View
           >
            <Text
              style={[
                {fontFamily: ts.primarymedium, color: '#fff'},
                gs.fs21,
                gs.mr20,
                gs.mt5,
              ]}>
              {item.name}
            </Text>
          </View>
        </LinearGradient>
      </Card>
    );
  };
  return (
    <View style={[gs.ph15, gs.mt15]}>
      <Text
        style={[
          gs.fs15,
          {fontFamily: ts.secondarysemibold, color: ts.primarytext},
          gs.fs13,
          gs.mb10,
        ]}>
        {route.name == 'Caterings'
          ? 'Explore Caterers around India'
          : 'Explore Tiffin Service providers around India'}
      </Text>
      <FlatList
        data={india}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{marginTop: 20}}
      />
    </View>
  );
}
export default memo(ExploreIndia);

const styles = ScaledSheet.create({
  img: {
    height: '200@ms',
    resizeMode: 'cover',
    position: 'relative',
  },
  overlay: {
    height: '200@ms',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  txtoverlay: {
    borderTopRightRadius: '12@ms',
    borderTopLeftRadius: '12@ms',
  },
});
