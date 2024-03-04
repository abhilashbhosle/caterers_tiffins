import {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StatusBar, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {NativeModules} from 'react-native';
export const ScreenWrapper = ({children}) => {
  // we obtain the object that contains info about the current route
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      switch (route.name) {
        case 'Notification':
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: false,backgroundColor:Platform.OS=='android'&&'#000'});
          break;
        case 'Register':
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: false,backgroundColor:Platform.OS=='android'&&'#000'});
          break;
          case 'Login':
            StatusBar.pushStackEntry({barStyle: 'light-content', hidden: false,backgroundColor:Platform.OS=='android'&&'#000'});
            break;
        case 'Location':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'Caterings':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'Tiffins':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'SearchMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'ProfileMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'FilterMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'FilterTiffins':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        case 'TiffinProfile':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
          case 'CatererProfile':
            StatusBar.pushStackEntry({
              barStyle: 'light-content',
              animated: true,
              hidden: false,
              backgroundColor:Platform.OS=='android'&&'#000'
            });
            break;
        case 'GalleryView':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor:Platform.OS=='android'&&'#000'
          });
          break;
        default:
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: true,});
          
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
