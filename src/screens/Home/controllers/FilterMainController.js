import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearFilterService,
  getBudgetService,
  getFoodTypesService,
  getHeadCountService,
  getRatingsService,
  getServService,
  getServingService,
  getSortService,
  getSubscriptionService,
} from '../services/FilterMainService';
import {getCatererSearchService} from '../services/SearchService';
import { getCaterersSearch } from './SearchController';

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
// ======GET SERVICE TYPE=======//
export const getService = createAsyncThunk(
  'getService',
  async ({type}, {dispatch}) => {
    try {
      const res = await getServService({type});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//===GET BUDGET===//
export const getBudget = createAsyncThunk(
  'getBudget',
  async ({type}, {dispatch}) => {
    try {
      const res = await getBudgetService({type});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//===GET HEAD COUNT====//
export const getHeadCount = createAsyncThunk(
  'getHeadCount',
  async (_, {dispatch}) => {
    try {
      const res = await getHeadCountService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//===GET SORT BY====//
export const getSort = createAsyncThunk('getSort', async (_, {dispatch}) => {
  try {
    const res = await getSortService();
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
// =======CLEAR FILTERS======//
export const clearFilter = createAsyncThunk(
  'clearFilter',
  async ({type,navigation}, {dispatch}) => {
    console.log("entered inside")
    try {
      const res = await clearFilterService({dispatch, type});
      if (res?.status=="success") {
        let data = await AsyncStorage.getItem('searchJson');
        let searchData = await JSON.parse(data);
        let params = searchData;
        dispatch(
          getCaterersSearch({
            params: {
              ...params,
              current_page: 1,
              limit: 5,
            },
          }),
        );
        navigation.navigate('PageStack', {
          screen: 'SearchMain',
          params: {
            from:type=="Caterer"?"Caterers":"Tiffins",
            ssd:params.ssd,
            sse:params.sse,
          },
        });
      }
      return res;
    } catch (error) {
      console.log("error",error)
      return rejectWithValue(error.message);
    }
  },
);
// =====GET FOOD TYPES======//
export const getFoodTypes = createAsyncThunk(
  'getFoodType',
  async (_, {dispatch}) => {
    try {
      const res = await getFoodTypesService({dispatch});
      return res.data.slice(1);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// =====GET SUBSCRIPTION TYPES======//
export const getSubscription = createAsyncThunk(
  'getSubscription',
  async ({from}, {dispatch}) => {
    try {
      const res = await getSubscriptionService({dispatch, from});
      return res.subscription_types;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =====GET SUBSCRIPTION TYPES======//
export const getRatings = createAsyncThunk(
  'getRatings',
  async (_, {dispatch}) => {
    try {
      const res = await getRatingsService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    servingLoading: false,
    servingData: [],
    servingError: null,
    serviceLoading: false,
    serviceData: [],
    serviceError: null,
    budgetLoading: false,
    budgetData: [],
    budgetError: null,
    headLoading: false,
    headData: [],
    headError: null,
    sortLoading: false,
    sortData: [],
    sortError: null,
    foodTypeLoading: false,
    foodTypeData: [],
    foodTypeError: null,
    subLoading: false,
    subData: [],
    subError: null,
    ratingLoading: false,
    ratingData: [],
    ratingError: null,
    updatedSubData: [],
  },
  reducers: {
    updateBudget: (state, action) => {
      state.budgetData = action.payload;
    },
    updateServing: (state, action) => {
      state.servingData = action.payload;
    },
    updateHeadCount: (state, action) => {
      state.headData = action.payload;
    },
    updateservice: (state, action) => {
      state.serviceData = action.payload;
    },
    updateSort: (state, action) => {
      state.sortData = action.payload;
    },
    updateSubscriptions: (state, action) => {
      state.subData = action.payload;
    },
    updateRating: (state, action) => {
      state.ratingData = action.payload;
    },
  },
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
      .addCase(getService.pending, (state, action) => {
        state.serviceLoading = true;
        state.serviceError = null;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.serviceData = action.payload;
      })
      .addCase(getService.rejected, (state, action) => {
        state.serviceLoading = false;
        state.serviceError = action.error;
      })
      .addCase(getBudget.pending, (state, action) => {
        state.budgetLoading = true;
        state.budgetError = null;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.budgetLoading = false;
        state.budgetData = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.budgetLoading = false;
        state.budgetError = action.error;
      })
      .addCase(getHeadCount.pending, (state, action) => {
        state.headLoading = true;
        state.headError = null;
      })
      .addCase(getHeadCount.fulfilled, (state, action) => {
        state.headLoading = false;
        state.headData = action.payload;
      })
      .addCase(getHeadCount.rejected, (state, action) => {
        state.headLoading = false;
        state.headError = action.error;
      })
      .addCase(getSort.pending, (state, action) => {
        state.sortLoading = true;
        state.sortError = null;
      })
      .addCase(getSort.fulfilled, (state, action) => {
        state.sortLoading = false;
        state.sortData = action.payload;
      })
      .addCase(getSort.rejected, (state, action) => {
        state.sortLoading = false;
        state.sortError = action.error;
      })
      .addCase(getFoodTypes.pending, (state, action) => {
        state.foodTypeLoading = true;
        state.foodTypeError = null;
      })
      .addCase(getFoodTypes.fulfilled, (state, action) => {
        state.foodTypeLoading = false;
        state.foodTypeData = action.payload;
      })
      .addCase(getFoodTypes.rejected, (state, action) => {
        state.foodTypeLoading = false;
        state.foodTypeError = action.error;
      })
      .addCase(getSubscription.pending, (state, action) => {
        state.subLoading = true;
        state.subError = null;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.subLoading = false;
        state.subData = action.payload;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.subLoading = false;
        state.subError = action.error;
      })
      .addCase(getRatings.pending, (state, action) => {
        state.ratingLoading = true;
        state.ratingError = null;
      })
      .addCase(getRatings.fulfilled, (state, action) => {
        state.ratingLoading = false;
        state.ratingData = action.payload;
      })
      .addCase(getRatings.rejected, (state, action) => {
        state.ratingLoading = false;
        state.ratingError = action.error;
      });
  },
});
export const {
  updateBudget,
  updateServing,
  updateHeadCount,
  updateservice,
  updateSort,
  updateSubscriptions,
  updateRating,
} = filterSlice.actions;
export default filterSlice.reducer;
