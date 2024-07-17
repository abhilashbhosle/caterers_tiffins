import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ts} from '../../../ThemeStyles';
import {Image} from 'react-native';

export const MyCustomMarkerView = ({from}) => {
  return from == 'Caterer' ? (
    <EntypoIcon
      name="location-pin"
      style={{
        ...styles.marker,
        color: ts.secondary,
      }}
    />
  ) : (
    from=="me"?
    <EntypoIcon
      name="location-pin"
      style={{
        ...styles.marker,
        color: "#0077c4",
      }}
    />
    :
    <EntypoIcon
      name="location-pin"
      style={{
        ...styles.marker,
        color: ts.primary,
      }}
    />
  );
};

const styles = ScaledSheet.create({
  marker: {
    color: '#000',
    fontSize: '35@ms',
  },
  img: {
    height: '30@ms',
    width: '30@ms',
  },
});
