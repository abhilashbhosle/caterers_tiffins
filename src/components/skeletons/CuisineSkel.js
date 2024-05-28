import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton, VStack } from 'native-base'
import { ScaledSheet } from 'react-native-size-matters'

export default function CuisineSkel() {
  return (
	<VStack style={styles.container} borderWidth="1" space={2} overflow="hidden" rounded="md" _dark={{
		borderColor: "coolGray.500"
	  }} _light={{
		borderColor: "coolGray.200"
	  }}>
		  <Skeleton style={styles.card} />
		  <Skeleton style={{height:4}} my={1}/>
		</VStack>
  )
}
const styles=ScaledSheet.create({
	container:{
		width:'60@ms',
	},
	card:{
		height: '50@ms',
		width: '60@ms',
	}
})