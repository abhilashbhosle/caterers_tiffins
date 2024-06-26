import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getCaterersWishService, getTiffinssWishService, updateWishListService } from '../services/WishListService';

// ======UPDATE WISHLIST=======//
export const updateWishList = createAsyncThunk(
  'updateWishList',
  async ({branch_id, status , vendor_type}, {dispatch}) => {
    try {
      const res = await updateWishListService({branch_id, status , vendor_type});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =========GET CATERERS WISHLIST======//
export const getCaterersWish = createAsyncThunk(
	'getCaterersWish',
	async ({limit, page }, {dispatch}) => {
	  try {
		const res = await getCaterersWishService({limit,page});
		
		return res;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );

  // =========GET TIFFINS WISHLIST======//
export const getTiffinsWish = createAsyncThunk(
	'getTiffinsWish',
	async ({limit, page }, {dispatch}) => {
	  try {
		const res = await getTiffinssWishService({limit,page});
		
		return res;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	},
  );



const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    updateLoading: false,
    updateData: [],
    updateError: null,
	wish_id:null,
	catererLoading:false,
	catererData:[],
	catererError:null,
	tiffinLoading:false,
	tiffinData:[],
	tiffinError:null
  },
  reducers: {
	wishDetails: (state, action) => {
		state.wish_id=action.payload
	  },
  },
  extraReducers: builder => {
    builder
      .addCase(updateWishList.pending, (state, action) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateWishList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateData = action.payload;
      })
      .addCase(updateWishList.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error;
      })
	  .addCase(getCaterersWish.pending, (state, action) => {
        state.catererLoading = true;
        state.catererError = null;
      })
      .addCase(getCaterersWish.fulfilled, (state, action) => {
        state.catererLoading = false;
        state.catererData = action.payload;
      })
      .addCase(getCaterersWish.rejected, (state, action) => {
        state.catererLoading = false;
        state.catererError = action.error;
      })
	  .addCase(getTiffinsWish.pending, (state, action) => {
        state.tiffinLoading = true;
        state.tiffinError = null;
      })
      .addCase(getTiffinsWish.fulfilled, (state, action) => {
        state.tiffinLoading = false;
        state.tiffinData = action.payload;
      })
      .addCase(getTiffinsWish.rejected, (state, action) => {
        state.tiffinLoading = false;
        state.tiffinError = action.error;
      })
  },
});
export const {wishDetails} = wishListSlice.actions;
export default wishListSlice.reducer;
