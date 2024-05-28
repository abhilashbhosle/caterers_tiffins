import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {Skeleton, VStack} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';

export default function OccassionSkel() {
  const {height, width} = Dimensions.get('screen');
  return (
    <VStack
      style={[{...styles.img, width: width / 2.2, justifyContent: 'flex-end'}]}
      borderWidth="1"
      space={2}
      overflow="hidden"
      rounded="md"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton style={styles.card} />
    </VStack>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '200@ms',
    resizeMode: 'cover',
	borderRadius:'12@ms'
  },
  card:{
	height:'200@ms'
  }
});
