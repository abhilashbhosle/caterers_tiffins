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
  if (updatedData?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'cuisine',
        filteredData: updatedData,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
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
  if (updated_data?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'cuisine',
        filteredData: updated_data,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
      }),
    );
  }
};
const handleSelection = async (arr, setData, index) => {
  const updatedFoodTypes = await arr.map((item, i) =>
    i === index
      ? {...item, selected: item.selected === '1' ? '0' : '1'}
      : {...item, selected: '0'},
  );

  setData(updatedFoodTypes);
  return updatedFoodTypes;
};
// ======HANDLE SERVICES==========//
export const handleServing = async ({
  index,
  setServing,
  serving,
  ssd,
  sse,
  location,
  from,
  dispatch,
}) => {
  const data = [...serving];
  const res = await handleSelection(data, setServing, index);
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
        screen: 'filter',
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
}) => {
  const data = [...headCount];
  let res = await handleSelection(data, setHeadCount, index);
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'headCount',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
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
}) => {
  let data = [...budget];
  let res = await handleSelection(data, setBudget, index);
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'budget',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
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
}) => {
  let data = [...service];
  let res = await handleSelection(data, setService, index);
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
        screen: 'filter',
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
}) => {
  let data = [...occasion];
  let updated = data?.map((e, i) =>
    index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
  );
  setOccasion(updated);
  if (updated?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'occasion',
        filteredData: updated,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
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
}) => {
  let data = [...sort];
  let res = await handleSelection(data, setSort, index);
  if (res?.length) {
    dispatch(
      getCaterersSearch({
        filterKey: 'sort',
        filteredData: res,
        from,
        ssd,
        sse,
        location,
        page: 1,
        limit: 5,
        screen: 'filter',
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
}) => {
  let data = [...mealTime];
  let updated = data?.map((e, i) =>
    index == i ? {...e, selected: e.selected == 1 ? 0 : 1} : e,
  );
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
        screen: 'filter',
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
}) => {
  let data = [...kitchen];
  let res = await handleSelection(data, setKitchen, index);
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
        screen: 'filter',
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
  segre,
  setVendorData,
  ssd,
  sse,
  location,
  from,
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
