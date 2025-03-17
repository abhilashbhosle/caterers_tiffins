import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getInquiryService } from '../services/InquiryServices';

// ======GET INQUIRIES=======//
export const getInquiries = createAsyncThunk(
  'getInquiries',
  async ({page, limit}, {dispatch}) => {
	try {
	  const res = await getInquiryService({page, limit});
	  return res.data;
	} catch (error) {
	  return rejectWithValue(error.message);
	}
  },
);

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState: {
	inquiryLoading:false,
	inquiryError:null,
	inquiryTiffinData:[],
	inquiryCatererData:[],
  },
  reducers: {},
  extraReducers: builder => {
	builder
	  .addCase(getInquiries.pending, (state, action) => {
		state.inquiryLoading = true;
		state.inquiryError = null;
	  })
	  .addCase(getInquiries.fulfilled, (state, action) => {
		state.inquiryLoading = false;
		state.inquiryCatererData = action.payload?.data?.Caterer;
		state.inquiryTiffinData=action.payload?.data?.Tiffin;
	  })
	  .addCase(getInquiries.rejected, (state, action) => {
		state.inquiryLoading = false;
		state.inquiryError = action.error;
	  })
  },
});
export const {} = inquirySlice.actions;
export default inquirySlice.reducer;
