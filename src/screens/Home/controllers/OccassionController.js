import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOccassionService } from '../services/OccassionService';

// ======GET OCCASSIONS=======//
export const getOccassions = createAsyncThunk(
	'getOccassions',
	async (_, {dispatch}) => {
	  try {
		const res = await getOccassionService();
		return res.data;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );

  const occassionSlice = createSlice({
	name: 'occassion',
	initialState: {
	 loading:false,
	 data:[],
	 error:null
	},
	reducers: {},
	extraReducers: builder => {
	  builder
		.addCase(getOccassions.pending, (state, action) => {
		  state.loading = true;
		  state.error = null; 
		})
		.addCase(getOccassions.fulfilled, (state, action) => {
		  state.loading = false;
		  state.data = action.payload;
		})
		.addCase(getOccassions.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error;
		})
	},
  });
  export const {} = occassionSlice.actions;
  export default occassionSlice.reducer;