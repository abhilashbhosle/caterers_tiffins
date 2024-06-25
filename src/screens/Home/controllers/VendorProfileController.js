import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getVendorProfileService} from '../services/VendorProfileService';

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

const vendorSlice = createSlice({
  name: 'vendorProfile',
  initialState: {
    loading: false,
    data: [],
    error: null,
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
      });
  },
});
export const {clearProfile} = vendorSlice.actions;
export default vendorSlice.reducer;
