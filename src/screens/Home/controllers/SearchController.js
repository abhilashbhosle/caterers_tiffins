import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLocationService} from '../services/SearchService';

// ======GET  LOCATIONs=======//
export const getLocations = createAsyncThunk(
  'getLocations',
  async ({data}, {dispatch}) => {
    try {
      const res = await getLocationService(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchLoading: false,
    searchData: [],
    searchError: null,
  },
  reducers: {
    clearSearch: (state, action) => {
      state.searchData = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLocations.pending, (state, action) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchData = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error;
      });
  },
});
export const {clearSearch} = searchSlice.actions;
export default searchSlice.reducer;
