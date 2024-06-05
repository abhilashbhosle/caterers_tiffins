// =====SETTING PARENT CUISINES=======//
export const handleParentCuisines = (index, cuisine, setCuisine) => {
  console.log(index);
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
};
// =====SETTING CHILDREN CUISINES=======//
export const handleChildrenCuisines = (pi, i, cuisine, setCuisine) => {
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
};
const handleSelection=(arr,setData,index)=>{
	const updatedFoodTypes = arr.map((item, i) =>
		i === index
		  ? {...item, selected: item.selected === '1' ? '0' : '1'}
		  : {...item, selected: '0'},
	  );
	  setData(updatedFoodTypes)
}
// ======HANDLE SERVICES==========//
export const handleServing = ({index, setServing, serving}) => {
  const data = [...serving];
  handleSelection(data,setServing,index)
};

//=====HANDLE HEADCOUNTS======//
export const handleCount=({index,headCount,setHeadCount})=>{
	const data=[...headCount]
	handleSelection(data,setHeadCount,index)
}

// =====HANDLE BUDGET=======//
export const handleBudget=({index,setBudget,budget})=>{
	let data=[...budget]
	handleSelection(data,setBudget,index)
}

// =====HANDLE SERVICE=======//
export const handleService=({index,setService,service})=>{
	let data=[...service]
	handleSelection(data,setService,index)
}
//==== HANDLE OCCASSIONS======//
export const handleOccassion=({index,setOccasion,occasion})=>{
	let data=[...occasion]
	let updated=data?.map((e,i)=>index==i?{...e,selected:e.selected==1?0:1}:e)
	setOccasion(updated)
}

//==== HANDLE SORT=======//
export const handleSort=({index,setSort,sort})=>{
	let data=[...sort]
	handleSelection(data,setSort,index)
}

// ======HANDLE MEALTIME=====//
export const handleMeal=({index,mealTime,setMealTime})=>{
	let data=[...mealTime]
	let updated=data?.map((e,i)=>index==i?{...e,selected:e.selected==1?0:1}:e)
	setMealTime(updated)
}

export const handleKitchen=({index,setKitchen,kitchen})=>{
	let data=[...kitchen]
	handleSelection(data,setKitchen,index)
}