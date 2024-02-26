import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ts } from '../../ThemeStyles'
import { gs } from '../../GlobalStyles'

export default function Themebtn(props) {
  return (
	<LinearGradient
	colors={[ts.secondary, ts.primary]}
	start={{x: 0.0, y: 0.0}}
	end={{x: 1.0, y: 0.0}}
	style={[
	  gs.ph15,
	  {
		height: 40,
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	  },
	]}>
	<Text
	  style={[
		gs.fs13,
		{fontFamily: ts.secondarymedium, color: '#fff'},
	  ]}>
	  {props.btntxt}
	</Text>
  </LinearGradient>
  )
}