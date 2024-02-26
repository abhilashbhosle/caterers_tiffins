import { View, Text,Platform } from 'react-native'
import React from 'react'
import HeaderView from './HeaderView'
import RecentSearches from './RecentSearches'
import Branded from './Branded'
import ExploreIndia from './ExploreIndia'
import { ScrollView } from 'react-native-virtualized-view';
import TiffinProviders from './TiffinProviders'

export default function Tiffins({navigation}) {
  return (
	<View>
	 <HeaderView from='Tiffins' navigation={navigation}/>
	 <ScrollView style={{backgroundColor:'#fff',marginBottom:Platform.OS==='ios'?150:130}} showsVerticalScrollIndicator={false}>
	 <RecentSearches/>
	 <Branded/>
	 <ExploreIndia/>
	 <TiffinProviders/>
	 </ScrollView>
	</View>
  )
}