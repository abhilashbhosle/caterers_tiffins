import {TextInput} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';

export default function TextField(props) {
  return (
    <TextInput
      style={styles.container}
      placeholder={props.placeholder}
      placeholderTextColor="#fff"
      cursorColor={'#fff'}
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      maxLength={props.maxLength}
      keyboardType={props?.keyboardType?props.keyboardType:"default"}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '50@ms',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    color: '#fff',
    fontFamily: ts.secondaryregular,
  },
});
