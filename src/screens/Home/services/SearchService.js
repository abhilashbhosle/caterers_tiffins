import axios from 'axios';
import {GOOGLE_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../../endpoints';
import { getFoodTypes } from '../controllers/FilterMainController';

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

//=======GET CATERERS SEARCH SERVICES=======//
export const getCatererSearchService = async ({params, dispatch,filterKey}) => {
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
    console.log("error in search",error)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }

};

