import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
	getLocationService,
  getLoginOtpService,
  getOtpService,
  getUserService,
  resendLoginOtpService,
  resendOtpService,
  verifyLoginOtpService,
  verifyOtpService,
} from '../services/AuthService';
import {startLoader} from '../../../redux/CommonSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { act } from 'react-test-renderer';
import axios from 'axios';
import {GOOGLE_KEY} from '@env';


// ======GET OTP=======//
export const getOtp = createAsyncThunk(
  'getOtp',
  async ({name, phoneNumber, navigation}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getOtpService({name, phoneNumber, navigation});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      setTimeout(()=>{
        dispatch(startLoader(false));
        },1000)
    }
  },
);
// ======GET LOGIN OTP=======//
export const getLoginOtp = createAsyncThunk(
  'getLoginOtp',
  async ({phoneNumber, navigation}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getLoginOtpService({phoneNumber, navigation});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      setTimeout(()=>{
      dispatch(startLoader(false));
      },1000)
    }
  },
);
// ======RESEND OTP=======//
export const resendOtp = createAsyncThunk(
  'resendOtp',
  async ({phoneNumber, setTimer, setValue}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await resendOtpService({phoneNumber, setTimer, setValue});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======RESEND LOGIN OTP=======//
export const resendLoginOtp = createAsyncThunk(
  'resendLoginOtp',
  async ({phoneNumber, setTimer, setValue}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await resendLoginOtpService({
        phoneNumber,
        setTimer,
        setValue,
      });
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======VERIFY OTP=======//
export const verifyOtp = createAsyncThunk(
  'verifyOtp',
  async ({phoneNumber, otp, navigation,name}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await verifyOtpService({
        phoneNumber,
        otp,
        navigation,
        name,
        dispatch,
      });
      await AsyncStorage.setItem('token', res.data.data.token);
      dispatch(clearRegStates());
      return res.data;
    } catch (error) {
      // return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======VERIFY LOGIN OTP=======//
export const verifyLoginOtp = createAsyncThunk(
  'verifyLoginOtp',
  async ({phoneNumber, otp, navigation}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await verifyLoginOtpService({
        phoneNumber,
        otp,
        navigation,
        dispatch,
      });
      console.log('res', res.data);
      await AsyncStorage.setItem('token', res.data.data.token);
      return res.data;
    } catch (error) {
      // return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
const getPlaceIdFromCoordinates = async (latitude, longitude) => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_KEY,
      },
    });

    console.log('Geocoding API response:', data);

    if (data.status !== 'OK') throw new Error(`Google Geocoding API Error: ${data.status}`);

    const place_id = data.results[0]?.place_id;

    if (!place_id) throw new Error('Place ID not found for given coordinates.');

    return place_id;
  } catch (error) {
    console.error('Error in getPlaceIdFromCoordinates:', error.message);
    return null;
  }
};
// ======GET LOCATION======//
export const getLocation = createAsyncThunk(
	'getLocation',
	async ({navigation,from}, {dispatch}) => {
	  try {
		dispatch(startLoader(true))
		let res = await GetLocation.getCurrentPosition({
		  enableHighAccuracy: true,
		  timeout: 60000,
		});
		if(res){
   const place_id=await getPlaceIdFromCoordinates(res.latitude,res.longitude)
		  getLocationService({
			latitude:res.latitude,
			longitude:res.longitude,
			// latitude:13.1319,
			// longitude:80.2644,
			dispatch,navigation,
      from,
      place_id
		}) 
    
		}
		return res;
	  } catch (error) {
		return error;
	  } finally {
		dispatch(startLoader(false));
	  }
	},
  );
// =======GET USER=========//
  export const getUser = createAsyncThunk(
    'getUser',
    async (_,{dispatch}) => {
      try {
        // dispatch(startLoader(true));
        const res = await getUserService(dispatch);
        return res.data
      } catch (error) {
        // return error;
      } finally {
        // dispatch(startLoader(false));
      }
    },
  );

  
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isGetOtpLoading: false,
    getOtpData: [],
    getOtpError: '',
    isGetLoginOtpLoading: false,
    getLoginOtpData: [],
    getLoginOtpError: '',
    userInfo:''
  },
  reducers: {
    clearRegStates: (state, action) => {
      state.isGetOtpLoading = false;
      state.getOtpData = [];
      state.getOtpError = '';
      (state.isGetLoginOtpLoading = false), (state.getLoginOtpData = []);
      state.getLoginOtpError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOtp.pending, (state, action) => {
        state.isGetOtpLoading = true;
        state.getOtpError = null; // Reset error state
      })
      .addCase(getOtp.fulfilled, (state, action) => {
        state.isGetOtpLoading = false;
        state.getOtpData = action.payload;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.isGetOtpLoading = false;
        state.getOtpError = action.error;
      })
      .addCase(getUser.fulfilled,(state,action)=>{
        state.userInfo=action.payload
      })
    // .addCase(resendOtp.fulfilled, (state, action) => {
    //   state.getOtpData = action.payload;
    // })
    // .addCase(resendLoginOtp.fulfilled, (state, action) => {
    //   state.getLoginOtpData = action.payload;
    // })
    // .addCase(getLoginOtp.pending, (state, action) => {
    //   state.isGetLoginOtpLoading = true;
    //   state.getLoginOtpError = null; // Reset error state
    // })
    // .addCase(getLoginOtp.fulfilled, (state, action) => {
    //   state.isGetLoginOtpLoading = false;
    //   state.getLoginOtpData = action.payload;
    // })
    // .addCase(getLoginOtp.rejected, (state, action) => {
    //   state.isGetLoginOtpLoading = false;
    //   state.getLoginOtpError = action.error;
    // });
  },
});
export const {clearRegStates} = authSlice.actions;
export default authSlice.reducer;
