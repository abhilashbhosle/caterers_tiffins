import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import { gs } from '../../GlobalStyles';
import { ts } from '../../ThemeStyles';

export default function ThemeSepBtn(props) {
  return (
      <View
        style={[
          gs.h40,
          gs.ph20,
          {
            backgroundColor: props.themecolor,
            justifyContent: 'center',
            alignItems: 'center',
          },
         props.rounded?gs.br20: gs.br10,
        ]}>
        <Text
          style={[gs.fs15, {color: '#fff', fontFamily: ts.secondarymedium}]}>
          {props.btntxt}
        </Text>
      </View>
  );
}
