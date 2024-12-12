import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ts} from '../../ThemeStyles';
import {gs} from '../../GlobalStyles';
import {Flex} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet} from 'react-native-size-matters';
import {clearFilter} from '../screens/Home/controllers/FilterMainController';
import {removeWishListService} from '../screens/Home/services/WishListService';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

function ThemeHeaderWrapper(props) {
  const dispatch = useDispatch();
  const {catererData} = useSelector(state => state.wish);
  const {tiffinData} = useSelector(state => state.wish);
  const renderChildren = () => {
    return (
      <SafeAreaView>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Flex direction="row" alignItems="center">
            <TouchableOpacity activeOpacity={0.7} onPress={props.goBack}>
              {/* <IonIcons
                name="chevron-back"
                style={[gs.fs20, gs.pr15, {color: '#fff'}]}
              /> */}
              <Image
                source={require('../assets/Common/back.png')}
                style={styles.backicon}
              />
            </TouchableOpacity>
            <Text
              style={[
                gs.fs18,
                {color: '#000', fontFamily: ts.secondarysemibold},
              ]}>
              {props.lefttxt}
            </Text>
          </Flex>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props?.righttxt == 'Clear All'
                ? props.dispatch(clearFilter())
                : null;
              props?.righttxt == 'Remove All' &&
              (catererData?.data?.length || tiffinData?.data?.length)
                ? removeWishListService({dispatch})
                : props?.righttxt == 'Remove All' &&
                  showMessage({
                    message: 'Nothing found!',
                    description: 'You have no items added to wishlist.',
                    type: 'warning',
                  });
            }}>
            <Text
              style={[
                gs.fs12,
                {color: '#000', fontFamily: ts.secondaryregular},
              ]}>
              {props.righttxt}
            </Text>
          </TouchableOpacity>
        </Flex>
      </SafeAreaView>
    );
  };
  return props.bgColor ? (
    <LinearGradient
      colors={['#fbe3e1', '#F6D6B2']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.8, y: 1.0}}
      style={[gs.ph15, {...styles.container, backgroundColor: props.bgColor}]}>
      {renderChildren()}
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={['#fbe3e1', '#F6D6B2']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.8, y: 1.0}}
      style={[gs.ph15, {...styles.container, backgroundColor: props.bgColor}]}>
      {renderChildren()}
    </LinearGradient>
  );
}
export default memo(ThemeHeaderWrapper);
const styles = ScaledSheet.create({
  container: {
    height: Platform.OS == 'ios' ? '100@ms' : '110@ms',
    paddingTop: Platform.OS == 'android' ? '60@ms' : '60@ms',
  },
  backicon: {
    height: '35@ms',
    width: '35@ms',
    marginRight: '10@ms',
  },
});
