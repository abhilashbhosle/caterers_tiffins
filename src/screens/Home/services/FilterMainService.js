import {endpoints} from '../../../endpoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../../redux/CommonSlicer';
import {
  getBudget,
  getHeadCount,
  getRatings,
  getService,
  getServing,
  getSort,
} from '../controllers/FilterMainController';
import {getKitchen, getMeal} from '../controllers/FilterTiffinController';
import { getOccassions } from '../controllers/OccassionController';
import { getCuisines } from '../controllers/ExploreCuisineController';

//   =======GET SERVING======//
export const getServingService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-serving-types?current_page=1&limit=100`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

//=======GET SERVICES=======//
export const getServService = async ({type}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    console.log(token)
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-service-types?current_page=1&limit=100&vendor_type=${type}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("service data res",res.data)
    return res.data;
  } catch (error) {
    console.log("error in get service data",error)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
//=======GET BUDGET SERVICES=======//
export const getBudgetService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-price-ranges?current_page=1&limit=100`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
//=======GET HEAD COUNT  SERVICES=======//
export const getHeadCountService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-head-count-ranges?current_page=1&limit=100`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
//=======GET SORT BY  SERVICES=======//
export const getSortService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-sort-orders?current_page=1&limit=100`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
//=======CLEAR FILTER  SERVICES=======//
export const clearFilterService = async ({dispatch,from}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(`${endpoints.baseUrl}clear-all-filters`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    if(!from){
    showMessage({
      message: 'Success!',
      description: 'Filters cleared successfully!',
      type: 'success',
    });
    setTimeout(() => {
     
    }, 1000);
  }
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  } finally {
    if(!from){
    dispatch(getServing());
    dispatch(getService());
    dispatch(getBudget());
    dispatch(getHeadCount());
    dispatch(getSort());
    dispatch(getKitchen());
    dispatch(getMeal());
    dispatch(getOccassions())
    dispatch(getCuisines())
    dispatch(getRatings())
    }
    dispatch(startLoader(false));

  }
};
//=======GET FOOD TYPE  SERVICES=======//
export const getFoodTypesService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-food-types?current_page=1&limit=3`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
// =======GET SUBSCRIPTION TYPES======//
export const getSubscriptionService = async ({from}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}user-get-subscription-types?current_page=1&limit=100&vendor_type=${from=="Caterers"?"Caterer":"Tiffin"}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// =======GET RATINGS======//
export const getRatingsService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-all-ratings?limit=10&current_page=1`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};