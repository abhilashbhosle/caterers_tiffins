import axios from 'axios';
import {endpoints} from '../../../endpoints';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearRegStates, getUser} from '../controllers/AuthController';
import {GOOGLE_KEY} from '@env';
import {startLoader} from '../../../redux/CommonSlicer';
// import {setLocation, startLoader} from '../../redux/slicers/CommomSlicer';

// =======GET OTP========//
export const getOtpService = async ({name, phoneNumber, navigation}) => {
  let body = {
    phone_number: phoneNumber,
    name: name,
    phone_extension: '+91',
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-user-send-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
      navigation.navigate('VerifyOtp', {
        phoneNumber: phoneNumber,
        from: 'register',
        name,
      });
    }
    return res;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

// =======GET LOGIN OTP========//
export const getLoginOtpService = async ({phoneNumber, navigation}) => {
  let body = {
    phone_number: phoneNumber,
    //   phone_number_extension: '+91',
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-send-user-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
      navigation.navigate('VerifyOtp', {
        phoneNumber: phoneNumber,
        from: 'login',
      });
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======RESEND OTP========//
export const resendOtpService = async ({phoneNumber, setTimer, setValue}) => {
  let body = {
    phone_number: phoneNumber,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-user-resend-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
      setTimer(30);
      setValue('');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======RESEND LOGIN OTP========//
export const resendLoginOtpService = async ({
  phoneNumber,
  setTimer,
  setValue,
}) => {
  let body = {
    phone_number: phoneNumber,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-resend-user-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
      setTimer(30);
      setValue('');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

// =======VERIFY OTP========//
export const verifyOtpService = async ({
  phoneNumber,
  otp,
  navigation,
  name,
  dispatch,
}) => {
  let body = {
    phone_number: phoneNumber,
    otp_code: otp,
    phone_extension: '+91',
    name: name,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-user-verify-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Verified!',
        description: 'Otp Verified Successfully.',
        type: 'success',
      });
      dispatch(clearRegStates());
      navigation.navigate('Location');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

// =======VERIFY LOGIN OTP========//
export const verifyLoginOtpService = async ({
  phoneNumber,
  otp,
  navigation,
  dispatch,
}) => {
  let body = {
    phone_number: phoneNumber,
    otp_code: otp,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-verify-user-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Verified!',
        description: 'Otp Verified Successfully.',
        type: 'success',
      });
      dispatch(clearRegStates());
      navigation.navigate('BottomBarStack');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// ===========GET LOCATION===========//

export const getLocationService = async ({
  latitude,
  longitude,
  dispatch,
  navigation,
  from,
  formatted_address,
}) => {
  try {
    dispatch(startLoader(true));
    let res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`,
    );

    const results = res.data.results;
    let maxAddressComponentsLength = -1;
    let selectedAddress = null;

    // Find the address with the most components
    results.forEach(result => {
      const addressComponentsLength = result.address_components.length;
      if (addressComponentsLength > maxAddressComponentsLength) {
        maxAddressComponentsLength = addressComponentsLength;
        selectedAddress = result;
      }
    });

    if (selectedAddress) {
      let addressComponents = selectedAddress.address_components;
      let street_name = getAddressComponent(addressComponents, 'route');
      let area = getAddressComponent(addressComponents, 'sublocality_level_1');

      // If street_name or area are missing, try to find them in other results
      if (!street_name || !area) {
        for (let i = 0; i < results.length; i++) {
          if (!street_name) {
            street_name = getAddressComponent(
              results[i].address_components,
              'route',
            );
          }
          if (!area) {
            area = getAddressComponent(
              results[i].address_components,
              'sublocality_level_1',
            );
          }
          // Stop searching if both components are found
          if (street_name && area) break;
        }
      }

      // Fallback to default values if still not found
      street_name = street_name || 'Unknown Street';
      area = area || 'Unknown Area';

      const addressData = {
        street_name: street_name,
        area: area,
        pincode: getAddressComponent(addressComponents, 'postal_code'),
        latitude: latitude,
        longitude: longitude,
        city: getAddressComponent(addressComponents, 'locality'),
        state: getAddressComponent(
          addressComponents,
          'administrative_area_level_1',
        ),
        country: getAddressComponent(addressComponents, 'country'),
        formatted_address:
          res.data.results[0].formatted_address || `${street_name}, ${area}`,
        place_id: res.data.results[0].place_id,
      };

      await updateLocationService({
        temp: addressData,
        navigation,
        dispatch,
        from,
      });
    }
  } catch (error) {
    console.error('Error in getLocationService:', error);
  } finally {
    dispatch(startLoader(false));
  }
};

const getAddressComponent = (addressComponents, type) => {
  const component = addressComponents.find(component =>
    component.types.includes(type),
  );
  return component ? component.long_name : '';
};
// ======UPDATE LOCATION=========//
export const updateLocationService = async ({
  temp,
  navigation,
  dispatch,
  from,
}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-user-location`,
      temp,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Location Updated Successfully.',
        type: 'success',
      });
      if (!from) {
        navigation.navigate('BottomBarStack');
      } else {
        setTimeout(() => {
          dispatch(getUser());
        }, 1000);
      }
    }
    return res;
  } catch (error) {
    dispatch(startLoader(false));
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

//   =======GET USER======//
export const getUserService = async dispatch => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-user-info`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    dispatch(startLoader(false));
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

//   ========UPDATE PROFILE OTP========//
export const updateProfile = async (body, dispatch) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}send-update-profile-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    dispatch(startLoader(false));
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  } finally {
    dispatch(startLoader(false));
  }
};

//   ========UPDATE PROFILE OTP========//
export const updateUserProfile = async (body, dispatch, setEnableOtp) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-user-profile`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await AsyncStorage.setItem('token', res.data.data.updated_token);
    setTimeout(() => {
      dispatch(getUser());
    }, 1000);
    if (res.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Profile Updated Successfully.',
        type: 'success',
      });
      setEnableOtp(false);
    }
    //   return res.data;
  } catch (error) {
    dispatch(startLoader(false));
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  } finally {
    dispatch(startLoader(false));
  }
};
