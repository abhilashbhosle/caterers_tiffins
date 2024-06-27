import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCuisineService } from '../services/ExploreCusineService';

// ======GET CUISINES=======//
export const getCuisines = createAsyncThunk(
	'getCuisines',
	async (_, {dispatch}) => {
	  try {
		const res = await getCuisineService();
		return res.data;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );

  const cuisineSlice = createSlice({
	name: 'cuisine',
	initialState: {
	 loading:false,
	 data:[],
	 error:null
	},
	reducers: {
		updateCuisine:(state,action)=>{
			state.data=action.payload
		}
	},
	extraReducers: builder => {
	  builder
		.addCase(getCuisines.pending, (state, action) => {
		  state.loading = true;
		  state.error = null; 
		})
		.addCase(getCuisines.fulfilled, (state, action) => {
		  state.loading = false;
		  state.data = action.payload;
		})
		.addCase(getCuisines.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error;
		})
	},
  });
  export const {updateCuisine} = cuisineSlice.actions;
  export default cuisineSlice.reducer;