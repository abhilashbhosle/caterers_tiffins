import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Flex} from 'native-base';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';

const data=['How to book my Caterer ?','How to book my Tiffins ?','How to contact my Caterer ?','How to search for Branded ?','How to search for Popular ?']
export default function Faq({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ThemeHeaderWrapper
        lefttxt="FAQ's"
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={[gs.ph20, {flex: 1}]}>

        <View style={[gs.mv10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: '#555'},
              gs.fs13,
            ]}>
            Click to view
          </Text>
        </View>
		{
			data.map((e,i)=>{
				return(
					<TouchableOpacity activeOpacity={0.7} style={styles.cardlayout} key={i}>
					<Flex
					  direction="row"
					  alignItems="center"
					  justifyContent="space-between">
					  <Flex direction="row" alignItems="center">
						<Text style={styles.cardtxt}>{e}</Text>
					  </Flex>
					  <EntypoIcons
						name="chevron-small-right"
						style={[gs.fs26, {color: ts.secondarytext}]}
					  />
					</Flex>
				  </TouchableOpacity>
				)
			})
		}
     
      </ScrollView>
    </View>
  );
}
const styles = ScaledSheet.create({
  cardlayout: {
    height: '55@ms',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    marginTop: '10@ms',
  },
  cardtxt: {
    fontSize: '15@ms',
    marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
});
