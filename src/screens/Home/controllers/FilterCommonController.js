import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateBudget, updateServing} from './FilterMainController';
import {getCaterersSearch} from './SearchController';
import {setSearchFilter} from './SearchCommonController';
import moment from 'moment';
import { updateCuisine } from './ExploreCuisineController';

// =====SETTING PARENT CUISINES=======//
export const handleParentCuisines = async ({
  index,
  cuisine,
  setCuisine,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...cuisine];
  const updatedData = data.map((item, i) => {
    if (i === index) {
      return {...item, selected: item.selected == '0' ? '1' : '0'};
    }
    return item;
  });
  const updatedChilds = data[index].children.map((item, i) => {
    return {
      ...item,
      selected: updatedData[index].selected == '1' ? '1' : '0',
    };
  });
  updatedData[index].children = updatedChilds;
  setCuisine(updatedData);
  let temp = [];
  updatedData.map((e, i) => {
    temp.push({id: Number(e.id), selected: Number(e.selected)});
    e.children.map(item => {
      temp.push({
        id: Number(item.id),
        selected: Number(item.selected),
      });
    });
  });
  if (temp?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, cuisines_filter: JSON.stringify(temp)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        occasions_filter: occassionData?.length ? occassionData : [],
        cuisines_filter:JSON.stringify(temp),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};
// =====SETTING CHILDREN CUISINES=======//
export const handleChildrenCuisines = async ({
  pi,
  i,
  cuisine,
  setCuisine,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...cuisine];
  let da = data[pi].children.map((e, ind) => {
    return {
      ...e,
      selected:
        i == ind
          ? data[pi].children[i].selected == '0'
            ? '1'
            : '0'
          : data[pi].children[ind].selected,
    };
  });
  let updated_data = data.map((e, ind) => {
    return {
      ...e,
      children: ind == pi ? da : data[ind].children,
    };
  });

  setCuisine(updated_data);

  // setCuisineData(data)
  // ===IF SINGLE CHECKBOX IS CHECKED MARKING PARENT AS CHECKED IF SINGLE CHILD IS UNCHECKED MAKING PARENT AS UNCHECKED=======//
  let check = updated_data[pi].children.filter((e, i) => {
    return e.selected == '1';
  });
  if (check.length == updated_data[pi].children.length) {
    updated_data.map((e, i) => {
      if (i == pi) {
        e.selected = '1';
      }
    });
    setCuisine(updated_data);
  } else {
    updated_data[pi].selected == '0';
    updated_data.map((e, i) => {
      if (i == pi) {
        e.selected = '0';
      }
    });
    setCuisine(updated_data);
  }
  let temp = [];
  updated_data.map((e, i) => {
    temp.push({id: Number(e.id), selected: Number(e.selected)});
    e.children.map(item => {
      temp.push({
        id: Number(item.id),
        selected: Number(item.selected),
      });
    });
  });
  if (temp?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, cuisines_filter: JSON.stringify(temp)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        occasions_filter: occassionData?.length ? occassionData : [],
        cuisines_filter: JSON.stringify(temp),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};
const handleSelection = async (arr, setData, index) => {
  const updatedFoodTypes = await arr.map((item, i) =>
    i === index
      ? {...item, selected: (item.selected = '1')}
      : {...item, selected: '0'},
  );

  setData(updatedFoodTypes);
  return updatedFoodTypes;
};

// ======HANDLE SERVING==========//
export const handleServing = async ({
  index,
  setServing,
  serving,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  const data = [...serving];
  const res = await handleSelection(data, setServing, index);
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, serving_types_filter: JSON.stringify(res)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        serving_types_filter: JSON.stringify(res),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

//=====HANDLE HEADCOUNTS======//
export const handleCount = async ({
  index,
  headCount,
  setHeadCount,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  const data = [...headCount];
  let res = await handleSelection(data, setHeadCount, index);
  let updated = await res.filter((e, i) => e.selected == 1);
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, head_count_ranges: JSON.stringify(updated)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        head_count_ranges: JSON.stringify(updated),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

// =====HANDLE BUDGET=======//
export const handleBudget = async ({
  index,
  setBudget,
  budget,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...budget];
  let res = await handleSelection(data, setBudget, index);
  let updated = await res
    ?.filter(e => e.selected == 1)
    ?.map(e => ({
      id: parseInt(e.id),
      start_price: parseInt(e.start_price),
      end_price: parseInt(e.end_price),
    }));
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, price_ranges: JSON.stringify(updated)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        price_ranges:JSON.stringify(updated),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

// =====HANDLE SERVICE=======//
export const handleService = async ({
  index,
  setService,
  service,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...service];
  let res = await handleSelection(data, setService, index);
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, service_types_filter: JSON.stringify(res)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        service_types_filter: JSON.stringify(res),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};
//==== HANDLE OCCASSIONS======//
export const handleOccassion = async ({
  index,
  setOccasion,
  occasion,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...occasion];
  let updated = data?.map((e, i) =>
    index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
  );
  setOccasion(updated);
  const occasions_filter = updated.map(e => ({
    id: parseInt(e.occasion_id),
    selected: e.selected,
  }));
  if (updated?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, occasions_filter:  JSON.stringify(updated)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: JSON.stringify(updated),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

//==== HANDLE SORT=======//
export const handleSort = async ({
  index,
  setSort,
  sort,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...sort];
  let res = await handleSelection(data, setSort, index);
  const order_by_filter = await res
    ?.filter(e => e.selected === 1)
    .map(e => ({id: e.id, value: e.sort_text}));

  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, order_by_filter: JSON.stringify(order_by_filter)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        order_by_filter: JSON.stringify(order_by_filter),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

// ==========HANDLE RATINGS==========//
export const handleRating = async ({
  index,
  setRating,
  rating,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...rating];
  let res = await handleSelection(data, setRating, index);
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, ratings_filter: JSON.stringify(res)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        ratings_filter: JSON.stringify(res),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

// ======HANDLE MEALTIME=====//
export const handleMeal = async ({
  index,
  mealTime,
  setMealTime,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...mealTime];
  let updated = data?.map((e, i) =>
    index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
  );
  if (updated?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, meal_times_filter: JSON.stringify(updated)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        meal_times_filter: JSON.stringify(updated),
      };
      await setSearchFilter({params,dispatch});
    }
  }
  setMealTime(updated);
};

// ======HANDLE KITCHENTYPES======//
export const handleKitchen = async ({
  index,
  setKitchen,
  kitchen,
  ssd,
  sse,
  location,
  from,
  subData,
  foodTypeData,
  occassionData,
  cuisineData,
  dispatch
}) => {
  let data = [...kitchen];
  let res = await handleSelection(data, setKitchen, index);
  setSegre({...segre, kitchen_types_filter: res});
  if (res?.length) {
    let asyncData = await AsyncStorage.getItem('searchFilterJson');
    if (asyncData?.length) {
      let parsed = JSON.parse(asyncData);
      let params = {...parsed, kitchen_types_filter: JSON.stringify(res)};
      await setSearchFilter({params,dispatch});
    } else {
      let params = {
        search_term: '',
        save_filter: 0,
        vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
        app_type: 'app',
        start_date: moment(ssd).format('YYYY-MM-DD'),
        end_date: moment(sse).format('YYYY-MM-DD'),
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: location?.city,
        pincode: location?.pincode,
        place_id: location?.place_id,
        food_types_filter: foodTypeData,
        subscription_types_filter: subData,
        cuisines_filter: cuisineData?.length ? cuisineData : [],
        occasions_filter: occassionData?.length ? occassionData : [],
        kitchen_types_filter: JSON.stringify(res),
      };
      await setSearchFilter({params,dispatch});
    }
  }
};

// ======HANDLE FOODTYPES====//
export const handleFoodType = async ({
  index,
  setFoodType,
  foodType,
  dispatch,
  setVendorData,
  ssd,
  sse,
  location,
  from,
  segre,
  setSegre,
}) => {
  let data = [...foodType];
  let res = await handleSelection(data, setFoodType, index);
  setSegre({...segre, food_types_filter: res});
  if (res?.length) {
    setVendorData([]);
    dispatch(
      getCaterersSearch({
        filterKey: 'foodType',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        setVendorData,
      }),
    );
  }
};

// =======HANDLE SUBSCRIPTION TYPES======//
export const handleSubType = async ({
  index,
  subType,
  setSubType,
  segre,
  setVendorData,
  ssd,
  sse,
  location,
  setPage,
  dispatch,
  from,
  setSegre,
}) => {
  let data = [...subType];
  let result = await handleSelection(data, setSubType, index);
  const subscription_types_filter = await result.map(e => ({
    subscription_type_id: parseInt(e.id),
    selected: e.selected,
  }));

  if (subscription_types_filter?.length) {
    setVendorData([]);
    setSegre({...segre, subscription_types_filter: subscription_types_filter});
    dispatch(
      getCaterersSearch({
        filterKey: 'subscription',
        filteredData: subscription_types_filter,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        setVendorData,
      }),
    );
  }
};
