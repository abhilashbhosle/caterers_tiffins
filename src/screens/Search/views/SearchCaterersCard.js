import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {memo, useRef} from 'react';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

function SearchCaterersCard({item}) {
  const {height, width} = useWindowDimensions();
  const navigation=useNavigation()
  return (
    <Card style={styles.cardcontainer}>
      <TouchableWithoutFeedback onPress={()=>{ navigation.navigate('PageStack', {
          screen: 'CatererProfile',
        })}}>
      <Flex direction="row">
        {/* ======IMAGE====== */}
        <View>
          <ImageBackground
            source={item.img}
            imageStyle={[{...styles.img, width: width / 2.7}, gs.br10]}
            style={{
              ...styles.img,
              width: width / 2.7,
              justifyContent: 'space-between',
            }}>
            <Flex direction="row" style={[gs.p5]} align='center'>
              <TouchableOpacity style={styles.likecontainer}>
               <EntypoIcons name='heart-outlined' style={{...styles.wishicon, color: ts.primarytext}}/>
				</TouchableOpacity>
				<Text style={[gs.fs11,styles.reviews]}>62 reviews</Text>
            </Flex>
			<View style={styles.popularcontainer}>
            <Text style={styles.popular}>Popular</Text>
			</View>
          </ImageBackground>
        </View>
        {/* ======CONTENT========= */}
        <View style={[gs.pl5, gs.pr10, gs.ph10, gs.pv10]}>
          <Text
            numberOfLines={1}
            style={[{...styles.name}, gs.fs16]}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[{...styles.area}, gs.fs11]}>
            {item.area}
          </Text>
          <Flex direction="row" align="center" style={gs.mt10}>
            <Text style={[styles.foodtype, gs.fs11]}>Food Type : </Text>
            <Text
              style={[
                gs.fs11,
                {color: '#266920', fontFamily: ts.secondaryregular},
              ]}>
              {item.type}
            </Text>
          </Flex>
          <Flex direction="row" align="center">
            <Text style={[styles.foodtype, gs.fs11]}>Cuisines : </Text>
            <Text style={[styles.cuisine]}>{item.cuisine}</Text>
          </Flex>
          <Flex direction="row" align="center">
            <Text style={[styles.foodtype, gs.fs11]}>Min. & Max. order: </Text>
            <Text style={[styles.cuisine]}>{item.ordersrange}</Text>
          </Flex>
          <Flex direction="row" align="center" style={[gs.mt8]}>
            <Image
              source={require('../../../assets/Search/tableservice.png')}
              style={styles.buffeticon}
            />
            <Image
              source={require('../../../assets/Search/buffetservice.png')}
              style={styles.buffeticon}
            />
            <Text style={[styles.foodtype, gs.fs11]}>Starting Price - </Text>
            <Text
              style={[
                {color: ts.teritary, fontFamily: ts.secondarymedium},
                gs.fs13,
              ]}>
              ₹ {item.startprice}
            </Text>
          </Flex>
        </View>
      </Flex>
      </TouchableWithoutFeedback>
    </Card>
  );
}
export default memo(SearchCaterersCard);

const styles = ScaledSheet.create({
  cardcontainer: {
    height: '170@ms',
    marginVertical: '10@ms',
    backgroundColor: '#fff',
  },
  img: {
    height: '170@ms',
  },
  buffeticon: {
    height: '30@ms',
    width: '30@ms',
    marginRight: '10@ms',
  },
  name: {
    color: '#245396',
    fontFamily: ts.primarymedium,
    lineHeight:'20@ms'
  },
  area: {
    color: '#245396',
    fontFamily: ts.secondaryregular,
    lineHeight:'20@ms'
  },
  foodtype: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    lineHeight: '22@ms',
  },
  cuisine: {
    color: ts.secondary,
    fontSize: '11@ms',
    fontFamily: ts.secondaryregular,
    lineHeight: '22@ms',
  },
  likecontainer:{
	height:'25@ms',
	width:'25@ms',
	borderRadius:50,
	backgroundColor:'#fff',
	justifyContent:'center',
	alignItems:'center'
  },
  reviews:{
	color:'#fff',
	fontFamily:ts.secondarysemibold,
	marginLeft:'10@ms',
	backgroundColor:'rgba(195, 51, 50,0.7)',
	paddingHorizontal:'10@ms'
},
popularcontainer:{
	width:'70%',
	paddingVertical:'2@ms',
	backgroundColor:ts.accent3,
	borderTopRightRadius:'10@ms',
	borderBottomLeftRadius:'10@ms'
},
popular:{
	textAlign:'center',
	fontFamily:ts.secondaryregular,
	color:'#fff',
	fontSize:'11@ms',
},
wishicon:{
  fontSize:'18@ms'
}
});
