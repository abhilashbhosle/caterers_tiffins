import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServingService } from '../services/FilterMainService';

// ======GET SERVING TYPE=======//
export const getServing = createAsyncThunk(
	'getServing',
	async (_, {dispatch}) => {
	  try {
		const res = await getServingService();
		return res.data;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );

  const filterSlice = createSlice({
	name: 'filter',
	initialState: {
	 servingLoading:false,
	 servingData:[],
	 servingError:null
	},
	reducers: {},
	extraReducers: builder => {
	  builder
		.addCase(getServing.pending, (state, action) => {
		  state.servingLoading = true;
		  state.servingError = null; 
		})
		.addCase(getServing.fulfilled, (state, action) => {
		  state.servingLoading = false;
		  state.servingData = action.payload;
		})
		.addCase(getServing.rejected, (state, action) => {
		  state.servingLoading = false;
		  state.servingError = action.error;
		})
	},
  });
  export const {} = filterSlice.actions;
  export default filterSlice.reducer;