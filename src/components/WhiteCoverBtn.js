import {View, Text} from 'react-native';
import React from 'react';
import { ts } from '../../ThemeStyles';
import { gs } from '../../GlobalStyles';

export default function WhiteCoverBtn(props) {
  return (
    <View
      style={{
        height: 43,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
      }}>
      <Text style={[{
		fontFamily:'ReadexPro-Medium',
		color:props.color?props.color:ts.primary,
		},gs.fs15]}>{props.btntxt}</Text>
    </View>
  );
}
