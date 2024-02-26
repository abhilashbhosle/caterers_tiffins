import {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StatusBar} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
export const ScreenWrapper = ({children}) => {
  // we obtain the object that contains info about the current route
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      switch (route.name) {
        case 'Notification':
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: false});
          break;
        case 'Register':
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: false});
          break;
        case 'Location':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
          });
          break;
        case 'Caterings':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
          });
          break;
        case 'Tiffins':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
          });
          break;
        case 'SearchMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
          });
          break;
        case 'ProfileMain':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
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
