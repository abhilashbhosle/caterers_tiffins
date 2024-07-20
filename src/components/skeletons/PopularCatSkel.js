import {View, Text} from 'react-native';
import React from 'react';
import {Skeleton, VStack} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';

export default function PopularCatSkel() {
  return (
    <VStack
      style={styles.container}
      borderWidth="1"
      overflow="hidden"
      rounded="md"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton style={styles.card}/>
	  <Skeleton.Text
          lines={3}
          alignItems="center"
          style={styles.text}
        />
    </VStack>
  );
}
const styles = ScaledSheet.create({
  // container:{
  // 	height:'200@ms',
  // 	width:'100%'
  // },
  card: {
    height: '130@ms',
    width: '100%',
	backgroundColor: '#fff',
  },
  text:{
	height:'10@ms',
	position:'absolute',
	top:"60@ms",
	paddingRight:'20@ms',
	paddingLeft:'5@ms'
	// marginLeft:'70@ms'
  }
});

