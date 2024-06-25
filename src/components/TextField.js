import {TextInput} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';

export default function TextField(props) {
  return (
    <TextInput
      style={{
        ...styles.container,
        borderColor: props?.borderColor ? props.borderColor : '#fff',
        color:props?.color?props.color:'#fff'
      }}
      placeholder={props.placeholder}
      placeholderTextColor={props?.placeholderTextColor?props.placeholderTextColor: "#fff"}
      cursorColor={'#fff'}
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      maxLength={props.maxLength}
      keyboardType={props?.keyboardType ? props.keyboardType : 'default'}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '50@ms',
    borderWidth: 2,
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    fontFamily: ts.secondaryregular,
  },
});
