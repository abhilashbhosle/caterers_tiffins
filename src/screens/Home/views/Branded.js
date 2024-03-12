import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {memo} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';
import {Center, FlatList, Flex} from 'native-base';
import {branded, explorecusines} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import FeatherIcons from 'react-native-vector-icons/Feather';

function Branded() {
  const route = useRoute();
  const renderItem = ({item}) => {
    return (
      <Card style={[styles.cardcontainer, gs.mr15, gs.br10, gs.p3]}>
        <Center>
          <ImageBackground
            source={item.img}
            style={[styles.img]}
            imageStyle={styles.imageStyle}
            alt={item.name}
          />
          <Flex direction="row" style={styles.profileContainer}>
            <Image source={item.profile} style={styles.profile} />
            <View style={styles.txtContainer}>
              <Text numberOfLines={1} style={[gs.fs10, styles.catererName]}>
                Saravana Catering Service
              </Text>
              <Text
                style={[
                  gs.fs8,
                 styles.area
                ]}>
                Adyar, Chennai
              </Text>
              <Flex direction="row" alignItems="center" style={[Platform.OS=='ios'&&gs.mt5]}>
                <Flex direction="row" alignItems="center" style={[gs.mr7]}>
                  <Image
                    source={require('../../../assets/Common/veg.png')}
                    style={styles.icon}
                  />
                  <Text style={[gs.fs10, styles.type]}>Veg</Text>
                </Flex>
                <Flex direction="row" alignItems="center">
                  <Image
                    source={require('../../../assets/Common/nonveg.png')}
                    style={styles.icon}
                  />
                  <Text style={[gs.fs10, {...styles.type, color: ts.accent4}]}>
                    Non-Veg
                  </Text>
                </Flex>
              </Flex>
            </View>
          </Flex>
        </Center>
      </Card>
    );
  };
  return (
    <>
      <View
        style={[
          gs.ph15,
          // {
          //   backgroundColor:
          //     route.name == 'Caterings'
          //       ? 'rgba(195, 51, 50,0.1)'
          //       : 'rgba(217, 130, 43,0.1)',
          // },
          gs.pt10,
        ]}>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs13,
            ]}>
            {route.name == 'Caterings'
              ? 'Branded Caterers in Chennai'
              : 'Popular Tiffin Service providers in Chennai'}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.forwardicon,
              backgroundColor:
                route.name == 'Caterings' ? ts.secondary : ts.primary,
            }}>
            <FeatherIcons
              name="arrow-right"
              style={[gs.fs14, {color: '#fff'}]}
            />
          </TouchableOpacity>
        </Flex>
      </View>
      <FlatList
        data={branded}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.contentContainerStyle,
          // backgroundColor:
          //   route.name == 'Caterings'
          //     ? 'rgba(195, 51, 50,0.1)'
          //     : 'rgba(217, 130, 43,0.1)',
        }}
      />
    </>
  );
}
export default memo(Branded);

const styles = ScaledSheet.create({
  forwardicon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20@ms',
    width: '20@ms',
  },
  img: {
    height: '80@ms',
    width: '220@ms',
    resizeMode: 'cover',
  },
  cardcontainer: {
    height: '140@ms',
    backgroundColor: '#fff',
  },
  profileContainer: {
    position: 'absolute',
    bottom: '-35@ms',
    left: '5@ms',
  },
  profile: {
    height: '55@ms',
    width: '55@ms',
    resizeMode: 'cover',
    borderRadius: '10@ms',
    borderWidth: 3,
    borderColor: '#fff',
  },
  txtContainer: {
    paddingHorizontal: '5@ms',
    top: '22@ms',
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '15@ms',
    paddingLeft: '15@ms',
  },
  imageStyle: {
    borderTopRightRadius: '10@ms',
    borderTopLeftRadius: '10@ms',
    position: 'relative',
  },
  bottomImg: {
    height: '100@ms',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  catererName: {
    color: ts.primarytext,
    fontFamily: ts.secondarysemibold,
  },
  area: {color: ts.secondarytext, fontFamily: ts.secondarymedium},
  icon: {
    height: '14@ms',
    width: '14@ms',
  },
  type: {
    color: ts.accent3,
    fontFamily: ts.secondaryregular,
    paddingLeft: '2@ms',
  },
});
