import {View, Text} from 'react-native';
import React from 'react';
import {HStack, Skeleton, VStack} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';

export default function CitySkel() {
  return (
    <HStack
      style={styles.container}
      borderWidth="1"
      space={2}
      overflow="hidden"
      rounded="full"
      _dark={{
        borderColor: 'coolGray.700',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}
	  >
      <Skeleton style={styles.card} />
    </HStack>
  );
}
const styles = ScaledSheet.create({
  container: {
    height: '75@ms',
    width: '75@ms',
	marginRight:'15@ms'
  },
  card: {
    height: '75@ms',
    width: '75@ms',
  },
});
