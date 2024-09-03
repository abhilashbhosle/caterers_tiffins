import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {haversineDistance} from './MapController';
import {Spinner, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getMap} from '../Home/controllers/SearchController';
import {ts} from '../../../ThemeStyles';
import {gs} from '../../../GlobalStyles';

export default function MapMultiple({route, navigation}) {
  const {initialRegion, profile, from} = route.params;
  const [profileData, setProfileData] = useState([]);
  const [markersWithinCircle, setMarkersWithinCircle] = useState(0);
  const dispatch = useDispatch();
  const {mapLoading, mapData, mapError} = useSelector(state => state.location);
  const toast = useToast();
  

  useEffect(() => {
    if (initialRegion?.latitude) {
      let today = new Date();
      let dateAfter7Days = new Date();
      dateAfter7Days.setDate(today.getDate() + 7);
      dispatch(
        getMap({
          from: from == 'Caterer' ? 'Caterer' : 'Tiffin',
          ssd: today,
          sse: dateAfter7Days,
          location: initialRegion,
          page: 1,
          limit: 200,
        }),
      );
    }
  }, [initialRegion]);

  useEffect(() => {
    if (mapData?.vendors?.length) {
      let updated = mapData?.vendors?.filter(e => e?.latitude && e?.longitude);
      setProfileData(updated);
    }
  }, [mapData]);

  useEffect(() => {
    if (profileData?.length && !markersWithinCircle && !mapLoading) {
      const count = profileData.filter(e => {
        const distance = haversineDistance(
          parseFloat(initialRegion.latitude),
          parseFloat(initialRegion.longitude),
          e.latitude,
          e.longitude,
        );
        return distance <= 10;
      }).length;
      setMarkersWithinCircle(count);
      toast.show({
        description: `${count} ${
          from == 'Caterer' ? 'Caterers' : 'Tiffin service providers'
        } found in 10km radius`,
      });
    }
  }, [profileData]);

  if (mapLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner color={from == 'Caterer' ? ts.secondary : ts.primary} />
        <Text
          style={[
            gs.fs12,
            gs.mt5,
            {color: ts.secondarytext, fontFamily: ts.secondaryregular},
          ]}>
          Fetching {from == 'Caterer' ? 'Caterers' : 'Tiffin service providers'}{' '}
          near you.
        </Text>
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntIcon name="arrowleft" style={styles.backIcon} />
      </TouchableOpacity>
      {profileData?.length ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: parseFloat(initialRegion?.latitude),
            longitude: parseFloat(initialRegion?.longitude),
            latitudeDelta: 0.815,
            longitudeDelta: 0.1121,
          }}>
          <Circle
            center={{
              latitude: parseFloat(initialRegion?.latitude),
              longitude: parseFloat(initialRegion?.longitude),
            }}
            radius={10000}
            strokeColor={
              from == 'Caterer'
                ? 'rgba(195, 51, 50,0.5)'
                : 'rgba(217, 130, 43, 0.5)'
            }
            fillColor={
              from == 'Caterer'
                ? 'rgba(195, 51, 50,0.2)'
                : 'rgba(217, 130, 43, 0.2)'
            }
          />
          {/* =====YOUR LOCATION====== */}
          <Marker
            coordinate={{
              latitude: parseFloat(initialRegion?.latitude),
              longitude: parseFloat(initialRegion?.longitude),
            }}
            title={'You'}
            description={'You are here!'}
            pinColor="#000">
            <MyCustomMarkerView from="me" />
          </Marker>
          {profileData?.map((e, i) => (
            <Marker
              coordinate={{
                latitude: parseFloat(e?.latitude),
                longitude: parseFloat(e?.longitude),
              }}
              key={i}>
              <MyCustomMarkerView from={from} />
              <Callout
                onPress={() => {
                  navigation.navigate('PageStack', {
                    screen:
                      from == 'Caterer' ? 'CatererProfile' : 'TiffinProfile',
                    params: {
                      branch_id: e?.id,
                      vendor_id: e?.vendor_id,
                      location: initialRegion,
                    },
                  });
                }}
                style={{width:100}}
                >
                <MyCustomCalloutView
                  profile={{
                    vendor_service_name: e?.catering_service_name,
                    foodTypes: e?.food_types,
                    formatted_address: e?.formatted_address,
                    cuisines: e?.cuisines,
                    whatsapp_business_phone_number:
                      e?.whatsapp_business_phone_number,
                  }}
                  from={from}
                  single={false}
                
                />
              </Callout>
            </Marker>
          ))}
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
