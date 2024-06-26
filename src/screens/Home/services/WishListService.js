import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import { endpoints } from '../../../endpoints';

//   =======CREATE REVIEW======//
export const updateWishListService = async ({branch_id, status, vendor_type}) => {
  let body = {
    branch_id,
    status,
    vendor_type,
  };
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}user-add-update-wishlist`,
      body,
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
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};


//   =======CATERERS WISH=====//
export const getCaterersWishService = async ({limit,page}) => {
	
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}user-get-wishlist?limit=${limit}&current_page=${page}&vendor_type=Caterer`,
		{
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
	  return res.data;
	} catch (error) {
		console.log(error)
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		  } else {
			throw new Error(error.message);
		  }
	}
  };

  //   =======TIFFINS WISH=====//
export const getTiffinssWishService = async ({limit,page}) => {
	
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}user-get-wishlist?limit=${limit}&current_page=${page}&vendor_type=Tiffin`,
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
