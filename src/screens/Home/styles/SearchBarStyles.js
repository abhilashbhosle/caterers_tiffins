import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';

export const styles = ScaledSheet.create({
  container:{
    borderWidth:'1@ms',
    backgroundColor:'#fff'
  },
  ml:{
    marginLeft: '-1@ms',
  },
  ml0:{
    marginLeft: '-0@ms',
  },
  calendarTextInput: {
    width: '34%',
    height: '48@ms',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchTextInput: {
    width: '63%',
    height: Platform.OS == 'ios' ? '47.4@ms' : '48@ms',
    backgroundColor: '#fff',
    marginLeft: '-1@ms',
    paddingLeft: '10@ms',

    // paddingRight:'40@ms',
  },
  searchIcon: {
    height: '20@ms',
    width: '20@ms',
    right:'5@ms'
  },
  searchIconContainers: {
    // position: 'absolute',
    width: '11%',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
    justifyContent:'center',
    alignItems:'center',
    left:'-1@ms'
  },
  calIcon: {
    height: '15@ms',
    width: '15@ms',
    top: '1.5@ms',
  },
  searchtxt: {
    fontSize: '12@ms',
    color: '#000',
    fontFamily: ts.jakartasemibold,
    marginLeft: '5@ms',
  },
  seperator: {
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '12@ms',
    marginTop: '13@ms',
    position: 'absolute',
  },
  searchIconContainer: {
    width: '12%',
    height: '40@ms',
    backgroundColor: '#fff',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@ms',
  },
  chefhat: {
    height: '40@ms',
    width: '40@ms',
  },
  midicon: {color: '#fff', fontSize: '40@ms'},
  searchContainer: {
    backgroundColor: '#fff',
    maxHeight: '210@ms',
    width: '100%',
    padding: '20@ms',
    //   borderRadius: '6@ms',
  },
  loctxt: {
    fontSize: '14@ms',
    color: ts.primarytext,
    fontFamily: ts.secondaryregular,
  },
});
