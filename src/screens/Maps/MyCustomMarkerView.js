import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ts} from '../../../ThemeStyles';
import {Image} from 'react-native';

export const MyCustomMarkerView = ({from}) => {
  return from == 'Caterer' ? (
    <MaterialIcons
      name="chef-hat"
      style={{
        ...styles.marker,
        color: ts.secondary,
      }}
    />
  ) : (
    <Image
      source={require('../../assets/Bottombar/tiffinf.png')}
      style={styles.img}
      tintColor={ts.primary}
    />
  );
};

const styles = ScaledSheet.create({
  marker: {
    color: '#000',
    fontSize: '30@ms',
  },
  img: {
    height: '30@ms',
    width: '30@ms',
  },
});
