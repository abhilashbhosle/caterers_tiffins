import { updateBudget, updateServing } from './FilterMainController';
import {getCaterersSearch} from './SearchController';

// =====SETTING PARENT CUISINES=======//
export const handleParentCuisines = ({
  index,
  cuisine,
  setCuisine,
  ssd,
  sse,
  location,
  from,
  dispatch,
  segre,
  setSegre
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
  setSegre({...segre,cuisines_filter:temp})
  if (temp?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'cuisine',
        filteredData: temp,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:updatedData
      }),
    );
  }
};
// =====SETTING CHILDREN CUISINES=======//
export const handleChildrenCuisines = ({
  pi,
  i,
  cuisine,
  setCuisine,
  ssd,
  sse,
  location,
  from,
  dispatch,
  segre,
  setSegre
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
  setSegre({...segre,cuisines_filter:temp})
  if (temp?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'cuisine',
        filteredData: temp,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:updated_data
      }),
    );
  }
};
const handleSelection = async (arr, setData, index) => {
  const updatedFoodTypes = await arr.map((item, i) =>
    i === index
      ? {...item, selected: item.selected ='1'}
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
  dispatch,
  setSegre,
  segre,
}) => {
  const data = [...serving];
  const res = await handleSelection(data, setServing, index);
  setSegre({...segre, serving_types_filter: res});
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'servingType',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
  }
};

//=====HANDLE HEADCOUNTS======//
export const handleCount = async ({
  index,
  headCount,
  setHeadCount,
  serving,
  ssd,
  sse,
  location,
  from,
  dispatch,
  segre,
  setSegre,
}) => {
  const data = [...headCount];
  let res = await handleSelection(data, setHeadCount, index);
  let updated = await res.filter((e, i) => e.selected == 1);
  setSegre({...segre, head_count_ranges: updated?.length ? updated : []});
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'headCount',
        filteredData: updated,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
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
  dispatch,
  segre,
  setSegre
}) => {
  let data = [...budget];
  let res = await handleSelection(data, setBudget, index);
  let updated= await res
  ?.filter(e => e.selected == 1)
  ?.map(e => ({
    id: parseInt(e.id),
    start_price: parseInt(e.start_price),
    end_price: parseInt(e.end_price),
  }));
  setSegre({...segre,price_ranges:res})
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'budget',
        filteredData: updated,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
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
  dispatch,
  segre,
  setSegre
}) => {
  let data = [...service];
  let res = await handleSelection(data, setService, index);
  setSegre({...segre,service_types_filter:res})
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'service',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
  }
};
//==== HANDLE OCCASSIONS======//
export const handleOccassion = ({
  index,
  setOccasion,
  occasion,
  ssd,
  sse,
  location,
  from,
  dispatch,
  segre,
  setSegre
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
  setSegre({...segre,occasions_filter:occasions_filter})
  if (updated?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'occasion',
        filteredData: occasions_filter,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        setSegre,
        updated_response:updated
      }),
    );
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
  dispatch,
  segre,
  setSegre
}) => {
  let data = [...sort];
  let res = await handleSelection(data, setSort, index);
  setSegre({...segre,order_by_filter:res})
  const order_by_filter = await res?.filter(e => e.selected === 1)
  .map(e => ({id: e.id, value: e.sort_text}));

  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'sort',
        filteredData: order_by_filter,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
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
  dispatch,
  segre,
  setSegre
}) => {
  let data = [...mealTime];
  let updated = data?.map((e, i) =>
    index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
  );
  setSegre({...segre,meal_times_filter:updated})
  if (updated?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'mealTime',
        filteredData: updated,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:updated
      }),
    );
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
  dispatch,
  segre,
  setSegre
}) => {
  let data = [...kitchen];
  let res = await handleSelection(data, setKitchen, index);
  setSegre({...segre,kitchen_types_filter:res})
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'kitchenTypes',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        segre,
        updated_response:res
      }),
    );
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
  setSegre
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
