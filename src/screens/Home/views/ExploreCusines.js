import {View, Text, Image} from 'react-native';
import React, {memo, useEffect} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {useRoute} from '@react-navigation/native';
import {Center, FlatList, Flex} from 'native-base';
import {explorecusines} from '../../../constants/Constants';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getCuisines} from '../controllers/ExploreCuisineController';
import CuisineSkel from '../../../components/skeletons/CuisineSkel';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function ExploreCusines() {
  const route = useRoute();
  const {loading, data, error} = useSelector(state => ({
    loading: state?.cuisine?.loading,
    data:state?.cuisine?.data,
    error:state?.cuisine?.error
  }),
  shallowEqual
);
  const dispatch = useDispatch();
  useEffect(() => {
  console.log('explore cuisines called');
    dispatch(getCuisines());
  }, []);
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mr15, gs.br8]}>
        {item?.file_name?.medium ? (
          <Image
            source={{uri: item?.file_name?.medium}}
            style={[styles.img]}
            alt={item.name}
          />
        ) : (
          <View
            style={{
              ...styles.img,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EntypoIcon
              name="image-inverted"
              style={[{color: ts.secondarytext}, gs.fs25]}
            />
          </View>
        )}
        <Center>
          <Text
            style={[
              gs.fs8,
              gs.p3,
              {
                color: ts.primarytext,
                fontFamily: ts.secondarysemibold,
                width: styles.img.width,
              },
            ]}
            numberOfLines={1}>
            {item.name}
          </Text>
        </Center>
      </Card>
    );
  };
  if (error?.message) {
    return (
      <View>
        <View style={[gs.ph15, gs.mt10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondarysemibold, color: ts.primarytext},
              gs.fs13,
            ]}>
            Explore Cuisines
          </Text>
        </View>
        <Text
          style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.secondarysemibold},
            gs.pl15,
          ]}>
          No Cuisines found.
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.ph15, gs.mt10]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
          ]}>
          Explore Cuisines
        </Text>
      </View>
      {loading ? (
        <Flex direction="row">
          {[1, 2, 3, 4, 5, 6]?.map((e, i) => (
            <View style={styles.contentContainerStyle} key={i}>
              <CuisineSkel />
            </View>
          ))}
        </Flex>
      ) : (
        data && (
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )
      )}
    </>
  );
}
export default memo(ExploreCusines);
const styles = ScaledSheet.create({
  img: {
    height: '50@ms',
    width: '60@ms',
    resizeMode: 'cover',
    borderTopRightRadius: '8@ms',
    borderTopLeftRadius: '8@ms',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: '15@ms',
  },
});
