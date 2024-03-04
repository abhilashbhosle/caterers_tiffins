import { View, Text, FlatList, Image } from 'react-native'
import React, { memo } from 'react'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import { Divider, Flex } from 'native-base'
import { ScaledSheet } from 'react-native-size-matters'
import { gs } from '../../../../../GlobalStyles'
import { ts } from '../../../../../ThemeStyles'

function ReviewSlice({data}) {
	const renderItem=({item})=>{
		return(
			<View>
				<Flex direction='row' alignItems='center'>
					<Image
					source={item.img}
					style={styles.img}
					/>
					<View style={[gs.ml10]}>
					<Text style={[styles.name,gs.mb3]}>{item.name}</Text>
					<Text style={[styles.subtxt, gs.fs12]}>{item.date}</Text>
					</View>
				</Flex>
				<Text style={[styles.subtxt, gs.fs12,gs.mv5]}>{item.comment}</Text>
				<Divider
				style={[gs.mv15]}
				/>
			</View>
		)
	}
  return (
	<View>
	<FlatList
	data={data}
	renderItem={renderItem}
	keyExtractor={(item,index)=>String(index)}
	showsVerticalScrollIndicator={false}

	/>
	</View>
  )
}
export default memo(ReviewSlice)

const styles=ScaledSheet.create({
	img:{
		height:'30@ms',
		width:'30@ms',
		borderRadius:'15@ms'
	},
	name:{
		fontFamily:ts.secondaryregular,
		color:ts.primarytext,
		fontSize:'13@ms'
	},
	subtxt: {
		fontFamily: ts.secondaryregular,
		color: ts.secondarytext,
		lineHeight:'17@ms'
	  },
})