import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeWrapper from '../../../components/ThemeWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {gs} from '../../../../GlobalStyles';
import {Center, Radio, Flex} from 'native-base';
import OctIcons from 'react-native-vector-icons/Octicons';
import WhiteCoverBtn from '../../../components/WhiteCoverBtn';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
export default function VerifyOtp({navigation}) {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <View style={styles.container}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{marginTop:Platform.OS=='android'&& StatusBar.currentHeight}}
                >
                <AntIcon
                  name="arrowleft"
                  style={[gs.fs22, {color: '#fff'}, gs.p5]}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={[{...gs.btnPlaneWhite, marginVertical: 25}, gs.fs17]}>
                  Verify with OTP sent to [Mobile number]
                </Text>
              </View>
              <Center style={{width:'100%'}}>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </Center>
              <TouchableOpacity activeOpacity={0.7}>
                <Flex direction="row" alignItems="center">
                  <OctIcons name="circle" style={[gs.fs18, {color: '#fff'}]} />
                  <Text
                    style={[
                      {...gs.btnPlaneWhite, marginVertical: 0},
                      gs.fs16,
                      gs.ml10,
                    ]}>
                    Auto fetching OTP
                  </Text>
                </Flex>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{marginTop: 40}}
                onPress={() => {
                  navigation.navigate('Location');
                }}>
                <WhiteCoverBtn btntxt="Continue" />
              </TouchableOpacity>
              <Center>
                <Text
                  style={[
                    {fontFamily: 'ReadexPro-Medium', color: '#fff'},
                    gs.fs12,
                    gs.mt20,
                  ]}>
                  Didn't receive it? Retry in 00:30
                </Text>
              </Center>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ThemeWrapper>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '20@ms',
    paddingTop: 30,
  },
  codeFieldRoot: {
    marginVertical: '20@ms'
  },
  cell: {
    width: '40@ms',
    height: '40@ms',
    lineHeight: '38@ms',
    fontSize: '24@ms',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    textAlign: 'center',
    marginRight:'10@ms',
    color:'#fff',
    borderRadius:10
  },
  focusCell: {
    borderColor: '#fff',
    borderWidth:2
  },
});
