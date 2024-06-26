import {endpoints} from '../../../endpoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReviews } from '../controllers/ReviewController';
import { showMessage } from 'react-native-flash-message';

//   =======GET REVIEW======//
export const getReviewService = async ({page, limit, vendor_id}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}user-get-vendor-reviews?limit=${limit}&current_page=${page}&vendor_id=${vendor_id}&order_by=newest_first`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

//   =======CREATE REVIEW======//
export const createReviewService = async ({body,dispatch}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}user-create-vendor-review`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
	if (res.data.status == 'success') {
		showMessage({
		  message: 'Success!',
		  description: 'Review added Successfully.',
		  type: 'success',
		});
	  }
	dispatch(getReviews({vendor_id:body.vendor_id,limit:3,page:1}))
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
