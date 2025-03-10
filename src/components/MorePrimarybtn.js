import {View, Text} from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { ts } from '../../ThemeStyles';

export default function MorePrimarybtn() {
  return (
      <View activeOpacity={0.7} style={styles.more_button}>
        <Text style={styles.moretxt}>more</Text>
      </View>
  );
}
const styles = ScaledSheet.create({
  more_button: {
    backgroundColor: '#F6D6B2',
    borderRadius: '15@ms',
    height:'23@ms',
    width:'57@ms',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  moretxt: {
    color: '#D9822B',
    fontSize: '14@ms',
    fontFamily: ts.secondaryregular,
  },
});
