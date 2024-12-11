import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import { Platform } from 'react-native';

export const styles = ScaledSheet.create({
  forwardicon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20@ms',
    width: '20@ms',
  },
  img: {
    height: '120@ms',
    width: '220@ms',
    resizeMode: 'cover',
  },
  cardcontainer: {
    backgroundColor: '#fff',
	paddingBottom:'15@ms'
  },
  profileContainer: {
    position: 'absolute',
    bottom: '-35@ms',
    left: '5@ms',
  },
  profile: {
    height: '60@ms',
    width: '60@ms',
    resizeMode: 'cover',
    borderRadius: '50@ms',
    borderWidth: 3,
    borderColor: '#fff',
  },
  txtContainer: {
    paddingHorizontal: '5@ms',
    top:Platform.OS=='ios'?'15@ms':'30@ms',
	width:'150@ms'
  },
  contentContainerStyle: {
    paddingBottom: '20@ms',
    paddingTop: '15@ms',
    paddingLeft: '15@ms',
  },
  imageStyle: {
    borderTopRightRadius: '10@ms',
    borderTopLeftRadius: '10@ms',
    position: 'relative',
  },
  bottomImg: {
    height: '100@ms',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  catererName: {
    color: ts.primarytext,
    fontFamily: ts.secondaryregular,
    marginTop: '40@ms',
    paddingHorizontal: '10@ms',
  },
  area: {
    color: ts.secondarytext,
    fontFamily: ts.secondarylight,
    paddingHorizontal: '10@ms',
  },
  icon: {
    height: '14@ms',
    width: '14@ms',
  },
  type: {
    color: ts.accent3,
    fontFamily: ts.secondaryregular,
    paddingLeft: '2@ms',
  },
  startPrice:{
	fontSize:'17@ms',
	fontFamily:ts.primarysemibold,
	color:ts.primarytext
  }
});
