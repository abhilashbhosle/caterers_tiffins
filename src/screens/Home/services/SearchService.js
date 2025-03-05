import axios from 'axios';
import {GOOGLE_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../../endpoints';
import {
  getFoodTypes,
  getSubscription,
} from '../controllers/FilterMainController';

//=======GET LOCATION SERVICES=======//
export const getLocationService = async searchText => {
  try {
    let res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${GOOGLE_KEY}`,
    );
    return res.data.results;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
//=======GET VENDOR SEARCH SERVICES=======//
export const getSearchVendorsService = async ({params}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors-list`, {
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

//=======GET CATERERS SEARCH SERVICES=======//
export const getCatererSearchService = async ({params}) => {
  // console.log("params",params)
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors`, {
      params: {...params, save_filter: 1},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// ======GET CATERERS FILTER SEARCH SERVICE=========//
export const getSearchFilterService = async ({params}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors`, {
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const updateSubscriptionFilter = async ({
  subscription_types_filter,
  from,
  dispatch,
}) => {
  try {
    let params = {
      vendor_type: from == 'Caterers' ? 'Caterer' : 'Tiffin',
      subscription_types_filter: JSON.stringify(subscription_types_filter),
      app_type: 'app',
    };
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors-update`, {
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('result in updated subscription', res.data.data.request);
    // if (res?.data?.status == 'success') {
      setTimeout(async () => {
        await dispatch(getSubscription({from}));
      }, 2000);
    // }
    return res.data;
  } catch (error) {
    console.log('error in update subfilter', error);
  }
};
