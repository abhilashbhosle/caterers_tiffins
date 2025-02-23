import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Actionsheet, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import { gs } from '../../GlobalStyles';

export default function CuisinesExpanded({
  cuisines,
  stretch,
  setStretch,
  from,
}) {
  return (
    <Actionsheet
      isOpen={stretch}
      onClose={() => {
        setStretch(false);
      }}>
      <Actionsheet.Content style={{backgroundColor: '#fff', width: '100%',minHeight:200}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex direction="row" flexWrap="wrap">
            {cuisines?.filter((e)=>e.selected==1)?.map((e, i) => (
              <View
                key={i}
                style={{
                  ...styles.nameContainer,
                  backgroundColor:
                    from == 'Caterers' ? ts.secondary : ts.primary,
                }}>
                <Text style={[gs.fs12,{color:'#fff',fontFamily:ts.secondaryregular}]}>{e?.cuisine_name}</Text>
              </View>
            ))}
          </Flex>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
const styles = ScaledSheet.create({
  nameContainer: {
    margin: '5@ms',
    paddingHorizontal: '8@ms',
	borderRadius:'10@ms'
  },
});
