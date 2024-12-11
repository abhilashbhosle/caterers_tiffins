import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';

export const styles = ScaledSheet.create({
  calendarTextInput: {
    width: '34%',
    height: '48@ms',
    backgroundColor: '#fff',
    position: 'relative',
    borderTopLeftRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
  },
  searchTextInput: {
    width: '65%',
    height: Platform.OS == 'ios' ? '47.4@ms' : '48@ms',
    backgroundColor: '#fff',
    borderTopRightRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    marginLeft: '-1@ms',
	paddingLeft:'25@ms'
  },
  searchIcon: {
    height: '13@ms',
    width: '13@ms',
	position: 'absolute',
	top:'17@ms',
	left:'8@ms'
  },
  calIcon: {
    height: '15@ms',
    width: '15@ms',
  },
  searchtxt: {
    fontSize: '13@ms',
    color: '#000',
    fontFamily: ts.primarymedium,
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
    borderTopRightRadius: '6@ms',
    borderBottomRightRadius: '6@ms',
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
    maxHeight: '200@ms',
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
