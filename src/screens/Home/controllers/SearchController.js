import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getCatererSearchService,
  getLocationService,
  getSearchFilterService,
  getSearchVendorsService,
} from '../services/SearchService';
import {showMessage} from 'react-native-flash-message';
import {Alert} from 'react-native';
import moment from 'moment';
import {setSearchHomeJson, setSearchJson} from './SearchCommonController';

// ======GET LOCATIONs=======//
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
// ======GET LOCATION=======//
export const getLocationData = createAsyncThunk(
  'getLocation',
  async ({data}, {dispatch}) => {
    try {
      const res = await getLocationService(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========SEARCH VENDORS========//
export const getSearchVendors = createAsyncThunk(
  'getSearchVendors',
  async ({params}, {dispatch}) => {
    try {
      const res = await getSearchVendorsService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//======SEARCH RESULTS=========//
export const handleSearchResults = ({
  navigation,
  from,
  search,
  selectedStartDate,
  selectedEndDate,
  userDetails,
  selectedLocation,
  setSelectedLocation,
  setSearch,
  dispatch,
  locationData,
  foodTypeData,
  subData,
  searchTerm,
  selected_vendor,
}) => {
  let flag = false;
  if (!selectedStartDate || !selectedEndDate) {
    showMessage({
      message: 'Start or End Date Missing.',
      description: 'Please select start and end date.',
      type: 'warning',
    });
    return;
  }
  if (!search && !userDetails[0]?.city) {
    showMessage({
      message: "Couldn't Proceed.",
      description: 'Please enter the address.',
      type: 'warning',
    });
    return;
  }
  if (!search && userDetails[0]?.city?.length > 0) {
    // setSearch(userDetails[0]?.formatted_address);
    setSelectedLocation({
      ...selectedLocation,
      latitude: userDetails[0]?.latitude,
      longitude: userDetails[0]?.longitude,
      city: userDetails[0]?.city,
      place_id: userDetails[0]?.place_id,
      pincode: userDetails[0]?.pincode,
      area: userDetails[0]?.area,
    });
    dispatch(
      setLocationres({
        latitude: userDetails[0]?.latitude,
        longitude: userDetails[0]?.longitude,
        city: userDetails[0]?.city,
        place_id: userDetails[0]?.place_id,
        pincode: userDetails[0]?.pincode,
        area: userDetails[0]?.area,
      }),
    );
    setSearchHomeJson({
      latitude: userDetails[0]?.latitude,
      longitude: userDetails[0]?.longitude,
      city: userDetails[0]?.city,
      place_id: userDetails[0]?.place_id,
      pincode: userDetails[0]?.pincode,
      area: userDetails[0]?.area,
      from,
      selectedStartDate,
      selectedEndDate,
      foodTypeData,
      subData,
      searchTerm: '',
      selected_vendor: '',
    });
    navigation.push('PageStack', {
      screen: 'SearchMain',
      params: {
        from,
        ssd: selectedStartDate,
        sse: selectedEndDate,
        move: 'forward',
      },
    });

  }
  if (
    search?.length &&
    selectedEndDate &&
    selectedStartDate &&
    selectedLocation?.latitude
  ) {
    flag = true;
  } 

  if (flag) {
    // console.log("selected location inside flag",selectedLocation)
    navigation.push('PageStack', {
      screen: 'SearchMain',
      params: {
        from,
        ssd: selectedStartDate,
        sse: selectedEndDate,
        move: 'forward',
      },
    });
  }
};
// =======SEARCH SEGREGATION=======//
export const handleSearchSegregation = async ({
  setSegre,
  foodTypeData,
  serviceData,
  servingData,
  occasion,
  headData,
  sortData,
  cuisines_data,
  budgetData,
  subData,
  mealData,
  kitchenData,
  ratingData,
}) => {
  const food_filter = await foodTypeData.map(e => ({
    id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, food_types_filter: food_filter}));

  const meal_times_filter = await mealData.map(e => ({
    id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, meal_times_filter: meal_times_filter}));

  const kitchen_types_filter = await kitchenData.map(e => ({
    id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, kitchen_types_filter: kitchen_types_filter}));

  const subscription_types_filter = await subData.map(e => ({
    subscription_type_id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({
    ...prev,
    subscription_types_filter: subscription_types_filter,
  }));

  const serving_types_filter = await servingData.map(e => ({
    id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, serving_types_filter: serving_types_filter}));

  const ratings_filter = await ratingData.map(e => ({
    rating: e.rating,
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, ratings_filter: ratings_filter}));

  const service_types_filter = await serviceData.map(e => ({
    id: parseInt(e.id),
    selected: e.selected,
  }));
  setSegre(prev => ({...prev, service_types_filter: service_types_filter}));
  if (occasion?.length) {
    const occasions_filter = await occasion.map(e => ({
      id: parseInt(e.occasion_id),
      selected: e.selected,
    }));
    setSegre(prev => ({...prev, occasions_filter: occasions_filter}));
  }
  const order_by_filter = await sortData
    ?.filter(e => e.selected === 1)
    .map(e => ({id: e.id, value: e.sort_text}));
  setSegre(prev => ({...prev, order_by_filter: order_by_filter}));
  let temp = [];
  cuisines_data.map((e, i) => {
    temp.push({id: Number(e.id), selected: Number(e.selected)});
    e.children.map(item => {
      temp.push({
        id: Number(item.id),
        selected: Number(item.selected),
      });
    });
  });
  setSegre(prev => ({...prev, cuisines_filter: temp}));

  let budget = await budgetData
    ?.filter(e => e.selected == 1)
    ?.map(e => ({
      id: parseInt(e.id),
      start_price: parseInt(e.start_price),
      end_price: parseInt(e.end_price),
    }));
  setSegre(prev => ({...prev, price_ranges: budget}));

  let head = await headData
    ?.filter(e => e.selected == 1)
    .map(e => ({
      id: parseInt(e.id),
      start: parseInt(e.start),
      end: parseInt(e.end),
    }));
  setSegre(prev => ({...prev, head_count_ranges: head}));
  return true;
};

// ========SEARCH=========//
export const getCaterersSearch = createAsyncThunk(
  'getCaterersSearch',
  async ({params}, {dispatch}) => {
    console.log("params inside getCaterers search",params)
    try {
      const res = await getCatererSearchService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  },
);

//====SEARCH FILTERS=======//
export const getSearchFilters = createAsyncThunk(
  'getSearchFilters',
  async ({params}, {dispatch}) => {
    try {
      const res = await getSearchFilterService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  },
);

// ======GET MAP=======//
export const getMap = createAsyncThunk(
  'getMap',
  async ({from, ssd, sse, location, page, limit}, {dispatch}) => {
    let params = {
      search_term: '',
      order_by_filter: [],
      save_filter: 1,
      vendor_type: from,
      app_type: 'app',
      start_date: moment(ssd).format('YYYY-MM-DD'),
      end_date: moment(sse).format('YYYY-MM-DD'),
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      pincode: location.pincode,
      place_id: location.place_id,
      limit: limit,
      current_page: page,
    };
    try {
      const res = await getCatererSearchService({params});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  },
);
// ========GET MAP SEARCH=========//

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchLoading: false,
    searchData: [],
    searchError: null,
    caterersLoading: false,
    caterersData: [],
    caterersError: null,
    searchRes: null,
    locationRes: null,
    selectedLocRes: null,
    foodTypes: [],
    mapLoading: false,
    mapData: [],
    mapError: null,
    locationLoading: false,
    locationData: [],
    locationError: null,
    filterData: [],
    filterLoading: false,
    filterError: null,
    vendorData: [],
    vendorLoading: false,
    vendorError: null,
  },
  reducers: {
    clearSearch: (state, action) => {
      state.searchData = [];
      state.locationData = [];
      state.vendorData = [];
    },
    clearCaterers: (state, action) => {
      state.caterersData = [];
    },
    updateFilterData: (state, action) => {
      state.filterData = [];
    },
    setSearchRes: (state, action) => {
      state.searchRes = action.payload;
    },
    setLocationres: (state, action) => {
      state.locationRes = action.payload;
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
      })
      .addCase(getCaterersSearch.pending, (state, action) => {
        state.caterersLoading = true;
        state.caterersError = null;
      })
      .addCase(getCaterersSearch.fulfilled, (state, action) => {
        state.caterersLoading = false;
        state.caterersData = action.payload;
      })
      .addCase(getCaterersSearch.rejected, (state, action) => {
        state.caterersLoading = false;
        state.caterersError = action.error;
      })
      .addCase(getMap.pending, (state, action) => {
        state.mapLoading = true;
        state.mapError = null;
      })
      .addCase(getMap.fulfilled, (state, action) => {
        state.mapLoading = false;
        state.mapData = action.payload;
      })
      .addCase(getMap.rejected, (state, action) => {
        state.mapLoading = false;
        state.mapError = action.error;
      })
      .addCase(getLocationData.pending, (state, action) => {
        state.locationLoading = true;
        state.locationError = null;
      })
      .addCase(getLocationData.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.locationData = action.payload;
      })
      .addCase(getLocationData.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationError = action.error;
      })
      .addCase(getSearchFilters.pending, (state, action) => {
        state.filterLoading = true;
        state.filterError = null;
      })
      .addCase(getSearchFilters.fulfilled, (state, action) => {
        state.filterLoading = false;
        state.filterData = action.payload;
      })
      .addCase(getSearchFilters.rejected, (state, action) => {
        state.filterLoading = false;
        state.filterError = action.error;
      })
      .addCase(getSearchVendors.pending, (state, action) => {
        state.vendorLoading = true;
        state.vendorError = null;
      })
      .addCase(getSearchVendors.fulfilled, (state, action) => {
        state.vendorLoading = false;
        state.vendorData = action.payload;
      })
      .addCase(getSearchVendors.rejected, (state, action) => {
        state.vendorLoading = false;
        state.vendorError = action.error;
      });
  },
});
export const {
  clearSearch,
  clearCaterers,
  setSearchRes,
  setLocationres,
  setSelectedLocRes,
  segreFoodType,
  updateFilterData,
} = searchSlice.actions;
export default searchSlice.reducer;
