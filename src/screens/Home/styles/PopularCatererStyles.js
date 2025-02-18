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
    height: '150@ms',
    resizeMode: 'cover',
  },
  cardContainer: {
    // height: '200@ms',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
    marginRight: '15@ms',
    marginTop: '5@ms',
    paddingBottom:'10@ms'
  },
  contentContainerStyle: {
    paddingBottom: '5@ms',
    //   paddingTop: '10@ms',
    paddingHorizontal: '15@ms',
    marginBottom:'40@ms'
  },
  imageStyle: {
    borderRadius: '10@ms',
  },
  overlay: {
    position: 'absolute',
    borderRadius: '10@ms',
    justifyContent: 'space-between',
    // paddingBottom: '10@ms',
    // paddingLeft: '10@ms',
    height: '150@ms',
  },
  typeicon: {
    height: '16@ms',
    width: '16@ms',
  },
  startPrice: {
    fontSize: '18@ms',
    fontFamily: ts.jakartabold,
    color: '#000',
  },
  area: {
    color: ts.secondarytext,
    fontFamily: ts.jakartaregular,
    paddingHorizontal: '10@ms',
  },
  iconcontaier:{
    paddingTop:Platform.OS=="android"?'10@ms':null
  },
  icon: {
    height: '14@ms',
    width: '14@ms',
  },
  profile: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: '60@ms',
  },
  txtcontainer:{
    marginTop:'40@ms'
  }
});
