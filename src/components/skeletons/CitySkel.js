import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton, VStack } from 'native-base'
import { ScaledSheet } from 'react-native-size-matters'

export default function CitySkel() {
  return (
	<VStack style={styles.container} borderWidth="1" space={2} overflow="hidden" rounded="md" _dark={{
		borderColor: "coolGray.500"
	  }} _light={{
		borderColor: "coolGray.200"
	  }}>
		  <Skeleton style={styles.card} />
		</VStack>
  )
}
const styles=ScaledSheet.create({
	container:{
		height:'200@ms',
		width:'100%'
	},
	card:{
		height: '200@ms',
		width:'100%'
	}
})