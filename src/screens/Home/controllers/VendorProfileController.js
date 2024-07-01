import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getPopularCaterersService,
  getPopularTiffinService,
  getVendorProfileService,
} from '../services/VendorProfileService';
import moment from 'moment';

// ======GET OCCASSIONS=======//
export const getVendorProfile = createAsyncThunk(
  'getVendorProfile',
  async ({branch_id, vendor_id}, {dispatch}) => {
    try {
      const res = await getVendorProfileService({
        branch_id,
        vendor_id,
        dispatch,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPopularCaterers = createAsyncThunk(
  'getPopularCaterers',
  async (
    {  filterData,
      from,
      ssd,
      sse,
      location
    },
    {dispatch},
  ) => {
    try {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from,
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        subscription_types_filter:JSON.stringify(filterData),
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        pincode: location.pincode,
        place_id: location.place_id,
        limit: 3,
        current_page: 1,
      };
      const res = await getPopularCaterersService({
        params,
      });
      return res.data.vendors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPopularTiffins = createAsyncThunk(
  'getPopularTiffins',
  async (
    {  filterData,
      from,
      ssd,
      sse,
      location
    },
    {dispatch},
  ) => {
    try {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from,
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        subscription_types_filter:JSON.stringify(filterData),
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        pincode: location.pincode,
        place_id: location.place_id,
        limit: 3,
        current_page: 1,
      };
      const res = await getPopularTiffinService({
        params,
      });
      return res.data.vendors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const vendorSlice = createSlice({
  name: 'vendorProfile',
  initialState: {
    loading: false,
    data: [],
    error: null,
    popularLoading:false,
    popularData:[],
    popularError:null,
    popularTLoading:false,
    popularTData:[],
    popularTError:null
  },
  reducers: {
    clearProfile: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getVendorProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getPopularCaterers.pending, (state, action) => {
        state.popularLoading = true;
        state.popularError = null;
      })
      .addCase(getPopularCaterers.fulfilled, (state, action) => {
        state.popularLoading = false;
        state.popularData = action.payload;
      })
      .addCase(getPopularCaterers.rejected, (state, action) => {
        state.popularLoading = false;
        state.popularError = action.error;
      })
      .addCase(getPopularTiffins.pending, (state, action) => {
        state.popularTLoading = true;
        state.popularTError = null;
      })
      .addCase(getPopularTiffins.fulfilled, (state, action) => {
        state.popularTLoading = false;
        state.popularTData = action.payload;
      })
      .addCase(getPopularTiffins.rejected, (state, action) => {
        state.popularTLoading = false;
        state.popularTError = action.error;
      });
  },
});
export const {clearProfile} = vendorSlice.actions;
export default vendorSlice.reducer;
