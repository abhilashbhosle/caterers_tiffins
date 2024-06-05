import axios from 'axios';
import {endpoints} from '../../../endpoints';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearRegStates, getUser } from '../controllers/AuthController';
import {GOOGLE_KEY} from '@env';
import { startLoader } from '../../../redux/CommonSlicer';
// import {setLocation, startLoader} from '../../redux/slicers/CommomSlicer';

// =======GET OTP========//
export const getOtpService = async ({name, phoneNumber, navigation}) => {
  let body = {
    phone_number: phoneNumber,
    name: name,
    phone_number_extension: '+91',
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
      navigation.navigate('VerifyOtp', {phoneNumber: phoneNumber,from:'register'});
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
		navigation.navigate('VerifyOtp', {phoneNumber: phoneNumber,from:'login'});
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
export const resendLoginOtpService = async ({phoneNumber, setTimer, setValue}) => {
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
	dispatch,
  }) => {
	let body = {
	  phone_number: phoneNumber,
	  otp_code: otp,
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
	from
  }) => {
	try {
	  dispatch(startLoader(true));
	  let res = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`,
	  );
  
	  const results = res.data.results;
	  let maxAddressComponentsLength = -1;
	  let selectedAddress = null;
  
	  results.forEach(result => {
		const addressComponentsLength = result.address_components.length;
		if (addressComponentsLength > maxAddressComponentsLength) {
		  maxAddressComponentsLength = addressComponentsLength;
		  selectedAddress = result;
		}
	  });
  
	  // Extracting specific components
	  if (selectedAddress) {
		const addressComponents = selectedAddress.address_components;
		const addressData = {
		  street_name: getAddressComponent(addressComponents, 'route'),
		  area: getAddressComponent(addressComponents, 'sublocality_level_1'),
		  pincode: getAddressComponent(addressComponents, 'postal_code'),
		  latitude: latitude,
		  longitude: longitude,
		//   address: getAddressComponent(
		// 	addressComponents,
		// 	'administrative_area_level_3',
		//   ),
		  city: getAddressComponent(addressComponents, 'locality'),
		  state: getAddressComponent(
			addressComponents,
			'administrative_area_level_1',
		  ),
		  country: getAddressComponent(addressComponents, 'country'),
		  formatted_address: res.data.results[0].formatted_address,
		  place_id: res.data.results[0].place_id,
		};
		console.log("addressdata",addressData)
		await updateLocationService({temp:addressData, navigation,dispatch,from});
	  }
	//   dispatch(setLocation(res.data.results[0]));
	} catch (error) {
	  console.log('error in location', error);
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
  export const updateLocationService = async ({temp, navigation,dispatch,from}) => {
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
		if(!from){
		navigation.navigate('BottomBarStack');
		}
		else{
			setTimeout(()=>{
				dispatch(getUser())
			},1000)
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
		console.log('inside error in manual location', error.response.data);
		return error.response.data;
	  } else {
		return error.message;
	  }
	}
  };

//   =======GET USER======//
export const getUserService = async (dispatch) => {
	console.log("entered inside get user service")
	try {
	  dispatch(startLoader(true));
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}get-user-info`,
		{
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
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
