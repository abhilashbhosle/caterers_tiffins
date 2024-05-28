import {View, Text, ImageBackground, useWindowDimensions} from 'react-native';
import React, {memo, useEffect} from 'react';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {Center, FlatList} from 'native-base';
import {occasions} from '../../../constants/Constants';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getOccassions} from '../controllers/OccassionController';
import OccassionSkel from '../../../components/skeletons/OccassionSkel';

function Occasions() {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state?.occassion);
  useEffect(() => {
    dispatch(getOccassions());
  }, []);
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mb10, gs.mh5]}>
        <ImageBackground
          source={{uri: item?.file_name?.medium}}
          style={[
            {...styles.img, width: width / 2.2, justifyContent: 'flex-end'},
          ]}
          imageStyle={[gs.br12]}
          alt={item.occassion_name}>
          <LinearGradient
            colors={['#000', 'transparent']}
            start={{x: 0.0, y: 1.2}}
            end={{x: 0.0, y: 0.0}}
            style={[
              {
                ...styles.overlay,
              },
              gs.br12,
            ]}>
            <Text style={[gs.fs14, styles.title, gs.ml15, gs.mb8, gs.h25]}>
              {item.occasion_name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Card>
    );
  };
  if (error?.message) {
    return (
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb5,
          ]}>
          Explore Caterers by Occasions
        </Text>
        <Text   style={[
            gs.fs8,
            gs.p3,
            {color: ts.primarytext, fontFamily: ts.secondarysemibold},
          ]}>
          No Occasions found
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[gs.ph15, gs.mt15]}>
        <Text
          style={[
            gs.fs15,
            {fontFamily: ts.secondarysemibold, color: ts.primarytext},
            gs.fs13,
            gs.mb10,
          ]}>
          Explore Caterers by Occasions
        </Text>
      </View>

      <Center width={width}>
        {loading ? (
          <View
            style={{
              ...styles.contentContainerStyle,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 0,
            }}>
            {[1, 2].map((e, i) => (
              <View key={i} style={gs.mh5}>
                <OccassionSkel />
              </View>
            ))}
          </View>
        ) : (
          data && (
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={styles.contentContainerStyle}
              numColumns={2}
            />
          )
        )}
      </Center>
    </>
  );
}
export default memo(Occasions);
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: '15@ms',
    marginHorizontal: '15@ms',
    position: 'relative',
  },
  img: {
    height: '200@ms',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: ts.secondarymedium,
    color: '#fff',
    paddingTop: '2@ms',
  },
});
