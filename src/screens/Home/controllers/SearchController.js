import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getCatererSearchService,
  getLocationService,
  updateSearchService,
} from '../services/SearchService';
import {showMessage} from 'react-native-flash-message';
import {Alert} from 'react-native';
import moment from 'moment';
import {
  updateBudget,
  updateHeadCount,
  updateRating,
  updateServing,
  updateSort,
  updateservice,
} from './FilterMainController';
import {updateCuisine} from './ExploreCuisineController';
import {updateOccassion} from './OccassionController';
import {updateKitchen, updateMeal} from './FilterTiffinController';
import { setSearchJson } from './SearchCommonController';

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
    Alert.alert(
      'No Search Data Found.',
      'Do you want to use your current location for searching?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: async () => {
            setSearch(userDetails[0]?.formatted_address);
            setSelectedLocation({
              ...selectedLocation,
              latitude: userDetails[0]?.latitude,
              longitude: userDetails[0]?.longitude,
              city: userDetails[0]?.city,
              place_id: userDetails[0]?.place_id,
              pincode: userDetails[0]?.pincode,
              area:userDetails[0]?.area
            });
            dispatch(
              setLocationres({
                latitude: userDetails[0]?.latitude,
                longitude: userDetails[0]?.longitude,
                city: userDetails[0]?.city,
                place_id: userDetails[0]?.place_id,
                pincode: userDetails[0]?.pincode,
                area:userDetails[0]?.area
              }),
            );
            await setSearchJson({userDetails,from,selectedStartDate,selectedEndDate})
          },
        },
      ],
      {cancelable: false},
    );
  }
  if (search?.length && selectedEndDate && selectedStartDate) {
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
export const getCaterersSearch = createAsyncThunk(
  'getCaterersSearch',
  async (
    {
      filterKey,
      filteredData,
      from,
      ssd,
      sse,
      location,
      page,
      limit,
      segre,
      updated_response,
    },
    {dispatch},
  ) => {
    let params = {
      search_term: '',
      order_by_filter:
        filterKey == 'sort'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.order_by_filter),
      save_filter: 1,
      vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
      app_type: 'app',
      start_date: moment(ssd).format('YYYY-MM-DD'),
      end_date: moment(sse).format('YYYY-MM-DD'),
      service_types_filter:
        filterKey == 'service'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.service_types_filter),
      occasions_filter:
        filterKey == 'occasion'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.occasions_filter),
      serving_types_filter:
        filterKey == 'servingType'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.serving_types_filter),
      meal_times_filter:
        from !== 'Caterers'
          ? filterKey == 'mealTime'
            ? JSON.stringify(filteredData)
            : JSON.stringify(segre.meal_times_filter)
          : [],
      kitchen_types_filter:
        from !== 'Caterers'
          ? filterKey == 'kitchenTypes'
            ? JSON.stringify(filteredData)
            : JSON.stringify(segre.kitchen_types_filter)
          : [],
      food_types_filter:
        filterKey == 'foodType'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.food_types_filter),
      subscription_types_filter:
        filterKey == 'subscription'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.subscription_types_filter),
      cuisines_filter:
        filterKey == 'cuisine'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.cuisines_filter),
      price_ranges:
        filterKey == 'budget'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.price_ranges),
      head_count_ranges:
        filterKey == 'headCount'
          ? JSON.stringify(filteredData)
          : JSON.stringify(segre.head_count_ranges),
      ratings_filter: filterKey == 'rating' ? JSON.stringify(filteredData) : JSON.stringify(segre?.ratings_filter),
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      pincode: location.pincode,
      place_id: location.place_id,
      limit: limit,
      current_page: page,
    };
    try {
      const res = await getCatererSearchService({params, dispatch, filterKey});
      if (filterKey == 'servingType') {
        dispatch(updateServing(updated_response));
      } else if (filterKey == 'budget') {
        dispatch(updateBudget(updated_response));
      } else if (filterKey == 'headCount') {
        dispatch(updateHeadCount(updated_response));
      } else if (filterKey == 'cuisine') {
        dispatch(updateCuisine(updated_response));
      } else if (filterKey == 'service') {
        dispatch(updateservice(updated_response));
      } else if (filterKey == 'occasion') {
        dispatch(updateOccassion(updated_response));
      } else if (filterKey == 'sort') {
        dispatch(updateSort(updated_response));
      } else if (filterKey == 'mealTime') {
        dispatch(updateMeal(updated_response));
      } else if (filterKey == 'kitchenTypes') {
        dispatch(updateKitchen(updated_response));
      } else if (filterKey == 'rating') {
        dispatch(updateRating(updated_response));
      }

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
  },
  reducers: {
    clearSearch: (state, action) => {
      state.searchData = [];
      state.locationData = [];
    },
    clearCaterers: (state, action) => {
      state.caterersData = [];
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
} = searchSlice.actions;
export default searchSlice.reducer;
