import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { getSearchFilters } from './SearchController';

export const setSearchHomeJson = async ({
  latitude,
  longitude,
  city,
  pincode,
  place_id,
  from,
  selectedStartDate,
  selectedEndDate,
  foodTypeData,
  subData,
  cuisines_filter,
  occasions_filter,
  searchTerm,
  selected_vendor,
  order_by,
  price_ranges,
  kitchen_types_filter,
  meal_times_filter
}) => {
  try {
    let food_types_filter = await foodTypeData?.map(e => ({
      id: parseInt(e.id),
      selected: e.selected,
    }));
    const subscription_types_filter = await subData?.map(e => ({
      subscription_type_id: parseInt(e.id),
      selected: e.selected,
    }));
    let params = { 
      search_term: searchTerm?searchTerm:'',
      save_filter: 1,
      vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
      app_type: 'app',
      start_date: moment(selectedStartDate).format('YYYY-MM-DD'),
      end_date: moment(selectedEndDate).format('YYYY-MM-DD'),
      latitude: latitude,
      longitude: longitude,
      city: city,
      pincode: pincode,
      place_id: place_id,
      food_types_filter: JSON.stringify(food_types_filter),
      subscription_types_filter: JSON.stringify(subscription_types_filter),
      cuisines_filter: cuisines_filter?.length ? cuisines_filter : [],
      occasions_filter: occasions_filter?.length ? occasions_filter : [],
      selected_vendor:selected_vendor,
      order_by:order_by?order_by:"",
      price_ranges:price_ranges?.length?price_ranges:[],
      kitchen_types_filter:kitchen_types_filter?.length?kitchen_types_filter:[],
      meal_times_filter:meal_times_filter?.length?meal_times_filter:[],
    };
    await AsyncStorage.setItem('searchJson', JSON.stringify(params));
  } catch (error) {
    console.log('error in searchHome Json', error);
  }
};

export const setSearchFilter=async({params,dispatch})=>{
  await AsyncStorage.setItem("searchFilterJson",JSON.stringify(params))
  dispatch(getSearchFilters({params}))
}
