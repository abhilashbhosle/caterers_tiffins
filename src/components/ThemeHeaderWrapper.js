import { View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ts } from '../../ThemeStyles'
import { gs } from '../../GlobalStyles'
import { Flex } from 'native-base'
import IonIcons from 'react-native-vector-icons/Ionicons'


function ThemeHeaderWrapper(props) {
  return (
	<LinearGradient
	colors={[ts.secondary, ts.primary]}
	start={{x: 0.0, y: 0.0}}
	end={{x: 1.0, y: 0.0}}
	style={[
	  gs.ph15,
	  {
		height: Platform.OS == 'ios' ? 100 : 70,
		paddingTop:20
	  },
	]}>
	<SafeAreaView>
	  <Flex
		direction="row"
		justifyContent="space-between"
		alignItems="center">
	  <Flex direction='row' align='center'>
		  <TouchableOpacity activeOpacity={0.7} onPress={props.goBack}>
		  <IonIcons name='chevron-back' style={[gs.fs20,gs.pr15,{color:'#fff'}]}/>
		  </TouchableOpacity>
		<Text style={[gs.fs15,{color:'#fff',fontFamily:ts.secondarymedium}]}>{props.lefttxt}</Text>
		</Flex>
		<Text style={[gs.fs12,{color:'#fff',fontFamily:ts.secondaryregular}]}>{props.righttxt}</Text>
	  </Flex>
	</SafeAreaView>
  </LinearGradient>
  )
}
export default memo(ThemeHeaderWrapper)