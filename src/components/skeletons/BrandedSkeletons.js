import React from 'react';
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import { text } from 'stream/consumers';

export const BrandedSkeleton = () => {
  return (
      <VStack
	  style={styles.cardcontainer}
        borderWidth="1"
        space={6}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="50%" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
		  style={styles.profile}
        />
        <Skeleton.Text lines={2} alignItems="center" px="12" style={styles.text}/>
      </VStack>
  );
};
const styles = ScaledSheet.create({
  cardcontainer: {
    height: '140@ms',
    backgroundColor: '#fff',
	width: '220@ms',
  },
  profile:{
	marginTop:"-55@ms",
	height:'55@ms',
	width:'55@ms',
	marginLeft:'-125@ms',
	borderRadius:'10@ms'
  },
  text:{
	height:'10@ms',
	marginTop:'-40@ms',
	marginLeft:'70@ms'
  }
});
