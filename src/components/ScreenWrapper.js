import {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StatusBar, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {NativeModules} from 'react-native';
import {ts} from '../../ThemeStyles';
export const ScreenWrapper = ({children}) => {
  // we obtain the object that contains info about the current route
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      switch (route.name) {
        case 'Notification':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Register':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Login':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Location':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
        case 'VerifyOtp':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Caterings':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.secondary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Tiffins':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.primary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'SearchMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'ProfileMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'WishList':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'MyInquiries':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'AboutUs':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Faq':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Help':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Notifications':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'FilterMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.secondary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'FilterTiffins':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.primary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'TiffinProfile':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.primary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'CatererProfile':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && ts.secondary,
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'GalleryView':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && '#000',
            translucent: Platform.OS == 'android' && true,
          });
        case 'Reviews':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && '#000',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        default:
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: true});
      }
    }, []),
  );

  // we are applying the background color to the component itself
  return (
    <>
      <StatusBar />
      {children}
    </>
  );
};
