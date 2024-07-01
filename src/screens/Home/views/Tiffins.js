import { View, Text,Platform } from 'react-native'
import React from 'react'
import HeaderView from './HeaderView'
import RecentSearches from './RecentSearches'
import Branded from './Branded'
import ExploreIndia from './ExploreIndia'
import { ScrollView } from 'react-native-virtualized-view';
import TiffinProviders from './TiffinProviders'
import { ScaledSheet } from 'react-native-size-matters'
import { ScreenWrapper } from '../../../components/ScreenWrapper'
import PopularTiffins from './PopularTiffins'

export default function Tiffins({navigation}) {
  return (
	<ScreenWrapper>
	 <HeaderView from='Tiffins' navigation={navigation}/>
	 <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
	 {/* <RecentSearches/> */}
	 {/* <Branded/> */}
	 <PopularTiffins/>
	 <ExploreIndia/>
	 <TiffinProviders/>
	 </ScrollView>
	</ScreenWrapper>
  )
}
const styles=ScaledSheet.create({
container:{backgroundColor:'#fff'}
})