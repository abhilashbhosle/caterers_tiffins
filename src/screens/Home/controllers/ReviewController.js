import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createReviewService, getReviewService} from '../services/ReviewService';

// ======GET OCCASSIONS=======//
export const getReviews = createAsyncThunk(
  'getReviews',
  async ({page, limit, vendor_id}, {dispatch}) => {
    try {
      const res = await getReviewService({page, limit, vendor_id});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//   =========CREATE REVIEW==========//
export const createReview = createAsyncThunk(
  'createReview',
  async ({vendor_id, rating = 4, review_text}, {dispatch}) => {
	let body={
		vendor_id,
		rating,
		review_text
	}
    try {
      const res = await createReviewService({body,dispatch});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewLoading: false,
    reviewData: [],
    reviewError: null,
    createLoading: false,
    createData: null,
    createError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getReviews.pending, (state, action) => {
        state.reviewLoading = true;
        state.reviewError = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewData = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.error;
      })
      .addCase(createReview.pending, (state, action) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createData = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error;
      });
  },
});
export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
