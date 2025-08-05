import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLocation} from '../../Onboarding/controllers/AuthController';
import {
  getHomePageService,
  getSimilarTiffinService,
  updateSearchService,
} from '../services/HomeServices';
import moment from 'moment';
import {getCuisines} from './ExploreCuisineController';

// ======UPDATE SEARCH=======//
export const updateSearch = createAsyncThunk(
  'updateSearch',
  async (
    {
      location,
      filterKey,
      filterData,
      vendorType,
      startDate,
      endDate,
      navigation,
      from,
      updated_response,
    },
    {dispatch},
  ) => {
    let params = {
      search_term: '',
      save_filter: 1,
      vendor_type: vendorType,
      app_type: 'app',
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
      cuisines_filter: filterKey == 'cuisine' ? JSON.stringify(filterData) : [],
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      pincode: location?.pincode ? location.pincode : 11111,
      place_id: location.place_id,
      occasions_filter:
        filterKey == 'occassion' ? JSON.stringify(filterData) : [],
      subscription_types_filter:
        filterKey == 'subscription' ? JSON.stringify(filterData) : [],
    };
    try {
      const res = await updateSearchService({
        params,
        dispatch,
        navigation,
        from,
        ssd: startDate,
        sse: endDate,
        updated_response,
        filterKey,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =====CHECK LOCATION BEFORE EVERY CLICK ON FILTERS=====//
export const checkLocation = async ({
  formattedLocation,
  userLocation,
  dispatch,
  navigation,
}) => {
  let today = new Date();
  let dateAfter7Days = new Date();
  dateAfter7Days.setDate(today.getDate() + 7);
  let location = null;
  if (formattedLocation?.city) {
    location = await formattedLocation;
  } else if (userLocation[0]?.formatted_address) {
    location = await {
      latitude: userLocation[0]?.latitude,
      longitude: userLocation[0]?.longitude,
      city: userLocation[0]?.city,
      place_id: userLocation[0]?.place_id,
      pincode: userLocation[0]?.pincode,
      area:userLocation[0]?.area
    };
  } else {
    dispatch(getLocation({navigation}));
  }
  if (location?.city) {
    return (data = {
      location: location,
      startData: today,
      endDate: today,
    });
  }
};
// ======GET BRANDED VENDORS=======//
export const getBranded = createAsyncThunk(
  'getBranded',
  async ({latitude, longitude, vendorType, subscriptionType,is_city_search}, {dispatch}) => {
    let params = {
      latitude,
      longitude,
      vendor_type: vendorType,
      subscription_type_id: subscriptionType,
      limit: 3,
      current_page: 1,
      is_city_search:is_city_search
    };
    try {
      const res = await getHomePageService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ======GET BRANDED VENDORS=======//
export const getPopulaTiffin = createAsyncThunk(
  'getPopulaTiffin',
  async ({latitude, longitude, vendorType, subscriptionType}, {dispatch}) => {
    let params = {
      latitude,
      longitude,
      vendor_type: vendorType,
      subscription_type_id: subscriptionType,
      limit: 3,
      current_page: 1,
      is_city_search:1
    };
    try {
      const res = await getHomePageService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPopular = createAsyncThunk(
  'getPopular',
  async ({latitude, longitude, vendorType, subscriptionType}, {dispatch}) => {
    let params = {
      latitude,
      longitude,
      vendor_type: vendorType,
      subscription_type_id: subscriptionType,
      // limit: 3,
      // current_page: 1,
      is_city_search:1
    };
    try {
      const res = await getHomePageService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======GET SIMILAR TIFFINS======//

export const getSimilarTiffins = createAsyncThunk(
  'getSimilarTiffins',
  async (
    {
      latitude,
      longitude,
      city,
      pinCode,
      placeId,
      startDate,
      endDate,
      vendorType,
    },
    {dispatch},
  ) => {
    let params = {
      latitude,
      longitude,
      city,
      pincode: pinCode,
      place_id: placeId,
      limit: 5,
      current_page: 1,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
      vendor_type: vendorType,
      save_filter:0,
      app_type:"app",
      search_term:''
    };
    console.log(params)
    try {
      const res = await getSimilarTiffinService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    brandedLoading: false,
    brandedData: [],
    brandedError: null,
    popularLoading: false,
    popularData: [],
    popularError: null,
    popularTLoading: false,
    popularTData: [],
    popularTError: null,
    tiffinLoading: false,
    tiffinData: [],
    tiffinError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBranded.pending, (state, action) => {
        state.brandedLoading = true;
        state.brandedError = null;
      })
      .addCase(getBranded.fulfilled, (state, action) => {
        state.brandedLoading = false;
        state.brandedData = action.payload;
      })
      .addCase(getBranded.rejected, (state, action) => {
        state.brandedLoading = false;
        state.brandedError = action.error;
      })
      .addCase(getPopular.pending, (state, action) => {
        state.popularLoading = true;
        state.popularError = null;
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.popularLoading = false;
        state.popularData = action.payload;
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.popularLoading = false;
        state.popularError = action.error;
      })
      .addCase(getPopulaTiffin.pending, (state, action) => {
        state.popularTLoading = true;
        state.popularTError = null;
      })
      .addCase(getPopulaTiffin.fulfilled, (state, action) => {
        state.popularTLoading = false;
        state.popularTData = action.payload;
      })
      .addCase(getPopulaTiffin.rejected, (state, action) => {
        state.popularTLoading = false;
        state.popularTError = action.error;
      })
      .addCase(getSimilarTiffins.pending, (state, action) => {
        state.tiffinLoading = true;
        state.tiffinError = null;
      })
      .addCase(getSimilarTiffins.fulfilled, (state, action) => {
        state.tiffinLoading = false;
        state.tiffinData = action.payload;
      })
      .addCase(getSimilarTiffins.rejected, (state, action) => {
        state.tiffinLoading = false;
        state.tiffinError = action.error;
      });
  },
});
export const {} = homeSlice.actions;
export default homeSlice.reducer;
