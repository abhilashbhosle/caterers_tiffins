import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getKitchenService,
  getMealService,
  getTiffinServService,
} from '../services/FilterTiffinService';

// ======GET SERVICE TYPE=======//
export const getTiffinService = createAsyncThunk(
  'getTiffinService',
  async (_, {dispatch}) => {
    try {
      const res = await getTiffinServService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ======GET MEAL TYPE=======//
export const getMeal = createAsyncThunk('getMeal', async (_, {dispatch}) => {
  try {
    const res = await getMealService();
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
// ======GET KITCHEN TYPE=======//
export const getKitchen = createAsyncThunk(
  'getKitchen',
  async (_, {dispatch}) => {
    try {
      const res = await getKitchenService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const filterTiffinSlice = createSlice({
  name: 'filterTiffin',
  initialState: {
    serviceLoading: false,
    serviceData: [],
    serviceError: null,
    mealLoading: false,
    mealData: [],
    mealError: null,
    kitchenLoading: false,
    kitchenData: [],
    kitchenError: null,
  },
  reducers: {
    updateMeal: (state, action) => {
      state.mealData = action.payload;
    },
    updateKitchen: (state, action) => {
      console.log("update kitchen called",)
      state.kitchenData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTiffinService.pending, (state, action) => {
        state.serviceLoading = true;
        state.serviceError = null;
      })
      .addCase(getTiffinService.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.serviceData = action.payload;
      })
      .addCase(getTiffinService.rejected, (state, action) => {
        state.serviceLoading = false;
        state.serviceError = action.error;
      })
      .addCase(getMeal.pending, (state, action) => {
        state.mealLoading = true;
        state.mealError = null;
      })
      .addCase(getMeal.fulfilled, (state, action) => {
        state.mealLoading = false;
        state.mealData = action.payload;
      })
      .addCase(getMeal.rejected, (state, action) => {
        state.mealLoading = false;
        state.mealError = action.error;
      })
      .addCase(getKitchen.pending, (state, action) => {
        state.kitchenLoading = true;
        state.kitchenError = null;
      })
      .addCase(getKitchen.fulfilled, (state, action) => {
        state.kitchenLoading = false;
        state.kitchenData = action.payload;
      })
      .addCase(getKitchen.rejected, (state, action) => {
        state.kitchenLoading = false;
        state.kitchenError = action.error;
      });
  },
});
export const {updateKitchen,updateMeal} = filterTiffinSlice.actions;
export default filterTiffinSlice.reducer;
