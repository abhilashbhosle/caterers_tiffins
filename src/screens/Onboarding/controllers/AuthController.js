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
      dispatch(startLoader(false));
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
      dispatch(startLoader(false));
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
// ======GET LOCATION======//
export const getLocation = createAsyncThunk(
	'getLocation',
	async ({navigation,from}, {dispatch}) => {
    console.log('called')
	  try {
		dispatch(startLoader(true))
		let res = await GetLocation.getCurrentPosition({
		  enableHighAccuracy: true,
		  timeout: 60000,
		});
		if(res){
		  getLocationService({
			latitude:res.latitude,
			longitude:res.longitude,
			// latitude:13.1319,
			// longitude:80.2644,
			dispatch,navigation,
      from
		}) 
    
		}
		console.log('res in get location',res)
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
        dispatch(startLoader(true));
        const res = await getUserService(dispatch);
        return res.data
      } catch (error) {
        // return error;
      } finally {
        dispatch(startLoader(false));
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
      console.log('clear reg states got called');
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
