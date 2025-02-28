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
  console.log("error into get otp",error)
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
  place_id
}) => {
  console.log("placeid", place_id)
  try {
    dispatch(startLoader(true));
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id,
          key: GOOGLE_KEY,
          components: "country:IN",
        },
      }
    );

    const { address_components, formatted_address, geometry } = response.data.result;

    const getAddressComponent = (components, type) =>
      components.find((component) => component.types.includes(type))?.long_name || '';

      const addressData = {
        street_name: getAddressComponent(address_components, 'route') || 'Unknown Street',
        area: getAddressComponent(address_components, 'sublocality_level_1') || '',
        pincode: getAddressComponent(address_components, 'postal_code') || '',
        city: getAddressComponent(address_components, 'locality') ||
              getAddressComponent(address_components, 'administrative_area_level_2'),
        state: getAddressComponent(address_components, 'administrative_area_level_1') || '',
        country: getAddressComponent(address_components, 'country') || '',
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        formatted_address,
        place_id,
      };
      
      // console.log(addressData);

      await updateLocationService({
        temp: addressData,
        navigation,
        dispatch,
        from,
      });
  } catch (error) {
    console.error('Error in getLocationService:', error);
  } finally {
    dispatch(startLoader(false));
  }
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
    console.log(error)
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
