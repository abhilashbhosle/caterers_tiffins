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
import {Center, FlatList, Flex, Skeleton} from 'native-base';
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
import {getKitchen} from '../controllers/FilterTiffinController';

function ExploreByKitchen() {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const kitchenTypes = [
    {name: 'Homemade', img: require('../../../assets/Common/homemade.png')},
    {name: 'Restaurant', img: require('../../../assets/Common/kitchen.png')},
    {name: 'Corporate', img: require('../../../assets/Common/corporate.png')},
    {name: 'Commercial', img: require('../../../assets/Common/commercial.png')},
    {name: 'Cloud', img: require('../../../assets/Common/cloud.png')},
  ];
  const {kitchenLoading, kitchenData, kitchenError} = useSelector(
    state => state.filterTiffin,
  );
  useEffect(() => {
    dispatch(getKitchen());
  }, []);

  // console.log(kitchenData)

  const renderItem = ({item, index}) => {
    return (
      <Flex alignItems="center">
        <Card style={[gs.mb10, gs.mr10, {backgroundColor: 'transparent'}]}>
          <TouchableOpacity activeOpacity={0.7}>
            <ImageBackground
              source={item.img}
              style={[
                {
                  ...styles.img,
                },
              ]}
              imageStyle={[gs.br12]}
              alt={item.name}
            />
          </TouchableOpacity>
        </Card>
        <Text
          style={[
            {fontFamily: ts.jakartasemibold, color: '#000'},
            gs.fs12,
            // gs.mt5,
          ]}
          numberOfLines={1}>
          {item.name}
        </Text>
      </Flex>
    );
  };

  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
        <Flex flexDirection="row" justifyContent="space-between" align="center">
          <Text
            style={[
              {fontFamily: ts.jakartabold, color: ts.primarytext},
              gs.fs18,
              gs.mb15,
            ]}>
            Explore by Kitchentype
          </Text>
          {/* <TouchableOpacity activeOpacity={0.7}>
            <MorePrimarybtn />
          </TouchableOpacity> */}
        </Flex>
      </View>
      {kitchenLoading ? (
        <Flex direction="row" style={[gs.ph15]}>
          {[1, 2, 3, 4].map((e, i) => (
            <Skeleton style={[styles.img, gs.br12,gs.mr10]} key={i} />
          ))}
        </Flex>
      ) : (
        <FlatList
          data={kitchenTypes}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          overScrollMode="never"
        />
      )}
    </>
  );
}
export default memo(ExploreByKitchen);
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: '10@ms',
    paddingTop: '15@ms',
    paddingHorizontal: '15@ms',
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
