import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList, Flex} from 'native-base';
import {occasions} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOccassions,
  updateOccassion,
} from '../controllers/OccassionController';
import OccassionSkel from '../../../components/skeletons/OccassionSkel';
import {useNavigation} from '@react-navigation/native';
import {
  getCaterersSearch,
  setLocationres,
} from '../controllers/SearchController';
import {checkLocation, updateSearch} from '../controllers/HomeController';
import {startLoader} from '../../../redux/CommonSlicer';
import {getOccassionService} from '../services/OccassionService';
import {setSearchHomeJson} from '../controllers/SearchCommonController';
import MorePrimarybtn from '../../../components/MorePrimarybtn';

function ExploreByKitchen() {
  const {width, height} = useWindowDimensions();
  const kitchenTypes = [
    {name: 'Restaurant', img: require('../../../assets/Common/kitchen.png')},
    {name: 'Homemade', img: require('../../../assets/Common/homemade.png')},
    {name: 'Corporate', img: require('../../../assets/Common/corporate.png')},
    {name: 'Commercial', img: require('../../../assets/Common/commercial.png')},
  ];

  const renderItem = ({item, index}) => {
    return (
      <Flex alignItems="center">
        <Card style={[{backgroundColor: '#fff'}, gs.mb10, gs.mr10]}>
          <TouchableOpacity activeOpacity={0.7}>
            <ImageBackground
              source={item.img}
              style={[{...styles.img,marginRight:index==kitchenTypes.length-1 && 10}]}
              imageStyle={[gs.br12]}
              alt={item.name}
            />
          </TouchableOpacity>
        </Card>
        <Text
          style={[gs.fs12, styles.title, {textAlign: 'center'}]}
          numberOfLines={1}>
          {item.name}
        </Text>
      </Flex>
    );
  };

  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text
            style={[
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs18,
              gs.mb15,
            ]}>
            Explore by Kitchentype
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <MorePrimarybtn />
          </TouchableOpacity>
        </Flex>
      </View>
        <FlatList
          data={kitchenTypes}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
        />
    </>
  );
}
export default memo(ExploreByKitchen);
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: '10@ms',
    paddingTop: '15@ms',
    marginLeft:'15@ms'
    // position: 'relative',

  },
  img: {
    height: '100@ms',
    resizeMode: 'cover',
    width: '100@ms',
  },
  title: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    paddingTop: '2@ms',
    width: '100@ms',
    marginRight: '10@ms',
  },
});
