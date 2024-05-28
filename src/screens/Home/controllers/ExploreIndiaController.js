import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getCitiesService } from '../services/ExploreIndiaService';

// ======GET CITIES=======//
export const getCities = createAsyncThunk(
	'getCities',
	async (_, {dispatch}) => {
	  try {
		const res = await getCitiesService();
		return res.data;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );

  const citySlice = createSlice({
	name: 'city',
	initialState: {
	 loading:false,
	 data:[],
	 error:null
	},
	reducers: {},
	extraReducers: builder => {
	  builder
		.addCase(getCities.pending, (state, action) => {
		  state.loading = true;
		  state.error = null; 
		})
		.addCase(getCities.fulfilled, (state, action) => {
		  state.loading = false;
		  state.data = action.payload;
		})
		.addCase(getCities.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error;
		})
	},
  });
  export const {} = citySlice.actions;
  export default citySlice.reducer;