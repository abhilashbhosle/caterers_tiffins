import { View, Text,Platform } from 'react-native'
import React from 'react'
import HeaderView from './HeaderView'
import RecentSearches from './RecentSearches'
import Branded from './Branded'
import ExploreIndia from './ExploreIndia'
import { ScrollView } from 'react-native-virtualized-view';
import TiffinProviders from './TiffinProviders'
import { ScaledSheet } from 'react-native-size-matters'

export default function Tiffins({navigation}) {
  return (
	<View>
	 <HeaderView from='Tiffins' navigation={navigation}/>
	 <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
	 <RecentSearches/>
	 <Branded/>
	 <ExploreIndia/>
	 <TiffinProviders/>
	 </ScrollView>
	</View>
  )
}
const styles=ScaledSheet.create({
container:{backgroundColor:'#fff',marginBottom:Platform.OS==='ios'?'150@ms':'130@ms'}
})