import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Linking,
} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
} from 'react-native-maps';
import {ScaledSheet} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {MyCustomMarkerView} from './MyCustomMarkerView';
import {MyCustomCalloutView} from './MyCustomCallOutView';

export default function MapSingle({route, navigation}) {
  const {initialRegion, profile, from} = route.params;


  return (
    <ScreenWrapper>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}

        >
        <AntIcon name="arrowleft" style={styles.backIcon} />
      </TouchableOpacity>
      {initialRegion?.latitude && profile?.latitude ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: parseFloat(initialRegion?.latitude),
            longitude: parseFloat(initialRegion?.longitude),
            latitudeDelta: 0.615,
            longitudeDelta: 0.1121,
          }}>
          <Circle
            center={{
              latitude: parseFloat(initialRegion?.latitude),
              longitude: parseFloat(initialRegion?.longitude),
            }}
            radius={10000} // 10 km in meters
			strokeColor={from=="Caterer"? 'rgba(195, 51, 50,0.5)':'rgba(217, 130, 43, 0.5)'}
            fillColor={from=="Caterer"?'rgba(195, 51, 50,0.2)':'rgba(217, 130, 43, 0.2)'}
          />
          {/* ======YOUR LOCATION====== */}
          <Marker
            coordinate={{
              latitude: parseFloat(initialRegion?.latitude),
              longitude: parseFloat(initialRegion?.longitude),
            }}
            title={'You'}
            description={'You are here!'}
            pinColor="#000">
              <MyCustomMarkerView from={"me"}/>
            </Marker>
          <Marker
            coordinate={{
              latitude: parseFloat(profile?.latitude),
              longitude: parseFloat(profile?.longitude),
            }}>
            <MyCustomMarkerView from={from} />
            <Callout>
              <MyCustomCalloutView profile={profile} from={from} single={true}/>
            </Callout>
          </Marker>
        </MapView>
      ) : null}
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: Platform?.OS == 'ios' ? '40@ms' : '60@ms',
    left: '10@ms',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: '5@ms',
  },
  backIcon: {
    color: '#000',
    fontSize: '30@ms',
  },
});
