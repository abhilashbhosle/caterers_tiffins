import { ScaledSheet } from "react-native-size-matters";
import { ts } from "../../../../ThemeStyles";

export const styles = ScaledSheet.create({
	cardcontainer: {
	  height: '170@ms',
	  marginVertical: '10@ms',
	  backgroundColor: '#fff',
	  borderRadius: '10@ms',
	},
	img: {
	  height: '170@ms',
	  borderTopLeftRadius: '10@ms',
	  borderBottomLeftRadius: '10@ms',
	},
	buffeticon: {
	  height: '30@ms',
	  width: '30@ms',
	  marginRight: '10@ms',
	},
	name: {
	  color: '#000',
	  fontFamily: ts.primarymedium,
	  lineHeight: '20@ms',
	},
	area: {
	  color: ts.secondarytext,
	  fontFamily: ts.secondarylight,
	  lineHeight: '20@ms',
	},
	foodtype: {
	  fontFamily: ts.secondarylight,
	  color: ts.primarytext,
	  lineHeight: '22@ms',
	},
	cuisine: {
	  color: ts.primarytext,
	  fontSize: '14@ms',
	  fontFamily: ts.secondaryregular,
	  // lineHeight: '22@ms',
	  width: '65%',
	},
	likecontainer: {
	  height: '25@ms',
	  width: '25@ms',
	  borderRadius: 50,
	  // backgroundColor: '#fff',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	reviews: {
	  color: '#fff',
	  fontFamily: ts.secondarysemibold,
	  marginLeft: '10@ms',
	  // backgroundColor: 'rgba(195, 51, 50,0.3)',
	  paddingHorizontal: '10@ms',
	},
	popularcontainer: {
	  width: '70%',
	  paddingVertical: '2@ms',
	  backgroundColor: ts.accent3,
	  borderTopRightRadius: '10@ms',
	  borderBottomLeftRadius: '10@ms',
	},
	popular: {
	  textAlign: 'center',
	  fontFamily: ts.secondaryregular,
	  color: '#fff',
	  fontSize: '11@ms',
	},
	wishicon: {
	  fontSize: '20@ms',
	},
	foodTypeimg: {
	  height: '15@ms',
	  width: '15@ms',
	  marginRight: '4@ms',
	},
	gradient: {
	  // borderBottomLeftRadius: '10@ms',
	  borderTopLeftRadius: '10@ms',
	},
	sticker: {
	  width: '80@ms',
	  height: '20@ms',
	  marginTop: '15@ms',
	},
	servicesIcon: {
	  height: '16@ms',
	  width: '16@ms',
	},
	ratingicon: {
	  width: '20@ms',
	  height: '20@ms',
	},
	startPrice: {
	  color: '#000',
	  fontFamily: ts.secondarymedium,
	  fontSize: '14@ms',
	},
  });