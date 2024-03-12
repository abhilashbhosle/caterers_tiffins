import {View, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
import React, {memo, useState} from 'react';
import {Actionsheet, Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {gs} from '../../GlobalStyles';
import ThemeSepBtn from './ThemeSepBtn';

function LocationSheet({locSheetOpen, setLocSheetOpen, from}) {
  const {height, width} = Dimensions.get('screen');
  const [focused, setFocused] = useState(false);
  const handleClose = () => {
    setLocSheetOpen(false);
    setFocused(false)
  };
  return (
    <Actionsheet isOpen={locSheetOpen} onClose={handleClose}>
      <Actionsheet.Content style={[{height: height / 1.5}]}>
        <KeyboardAwareScrollView style={{width: '100%'}}>
          <View style={{position: 'relative'}}>
            <TextInput
              label="Try A2B, Mg road, Banglore.."
              style={styles.inputcontainer}
              placeholderTextColor={'#777'}
              mode="outlined"
              activeOutlineColor={
                from === 'Caterers' ? ts.secondary : ts.primary
              }
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              outlineStyle={gs.br10}
            />
            <View style={[{position: 'absolute', left: 20}, gs.mt18]}>
              <MaterialIcons
                name="map-marker-radius"
                style={[
                  gs.fs20,
                  {
                    color: focused
                      ? from == 'Caterers'
                        ? ts.secondary
                        : ts.primary
                      : '#777',
                  },
                ]}
              />
            </View>
          </View>
          {!focused && (
            <>
              <Flex
                direction="row"
                flex={1}
                align="center"
                justify="space-between"
                style={[gs.mt15]}>
                <View style={styles.border}></View>
                <Text
                  style={[
                    gs.fs13,
                    {color: '#777', fontFamily: ts.secondaryregular},
                  ]}>
                  or
                </Text>
                <View style={styles.border}></View>
              </Flex>
              <TouchableWithoutFeedback>
                <View style={[gs.mt15]}>
                  <ThemeSepBtn
                    btntxt="Allow current location"
                    themecolor={from == 'Caterers' ? ts.secondary : ts.primary}
                  />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        </KeyboardAwareScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
export default memo(LocationSheet);
const styles = ScaledSheet.create({
  inputcontainer: {
    width: '100%',
    height: '45@ms',
    borderRadius: '10@ms',
    color: ts.primarytext,
    fontSize: '14@ms',
    paddingLeft: '30@ms',
    backgroundColor:'#fff'
  },
  border: {
    width: '46%',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
});
