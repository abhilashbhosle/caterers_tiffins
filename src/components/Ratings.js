import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Actionsheet, Center, Flex} from 'native-base';
import StarRating from 'react-native-star-rating-widget';
import {gs} from '../../GlobalStyles';
import ThemeSepBtn from './ThemeSepBtn';

function Ratings({rating, setRating, from, vendorName}) {
  const [openBs, setOpenBs] = useState(false);
  const [rate, setRate] = useState(0);
  const handleClose = () => {
    setOpenBs(false);
    setRate(0);
  };
  const handleSubmit = () => {
    setRating(rate);
  };
  useEffect(()=>{
    setRating(rate)
  },[rate])
  return (
    <>
    
      {/* <Actionsheet isOpen={openBs} onClose={handleClose}> */}
        {/* <Actionsheet.Content style={{height: 360}}> */}
          <Flex
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Center>
                <Text style={{...styles.ratingNum, color: ts.primarytext}}>
                  {rate}
                </Text>
              </Center>
              <Center>
              <View style={[gs.mb20]}>
                <StarRating
                  rating={rate}
                  onChange={setRate}
                  // color={from == 'Caterer' ? ts.secondary : ts.primary}
                  starSize={40}
                  enableHalfStar={false}
                />
              </View>
              </Center>
            </View>
          </Flex>
        {/* </Actionsheet.Content> */}
      {/* </Actionsheet> */}
    </>
  );
}
export default memo(Ratings);

const styles = ScaledSheet.create({
  ratingContainer: {
    height: '45@ms',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '8@ms',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10@ms',
  },
  ratingTxt: {
    fontFamily: ts.secondaryregular,
    color: '#777',
    marginVertical: '5@ms',
    textAlignVertical: 'top',
    fontSize: '13@ms',
  },
  downIcon: {
    fontSize: '22@ms',
    color: '#777',
  },
  ratingNum: {
    fontSize: '65@ms',
    fontFamily: ts.primarysemibold,
  },
});
