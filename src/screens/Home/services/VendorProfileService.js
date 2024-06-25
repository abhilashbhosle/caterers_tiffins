import {endpoints} from '../../../endpoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startLoader} from '../../../redux/CommonSlicer';

//   =======GET CITIES======//
export const getVendorProfileService = async ({
  vendor_id,
  branch_id,
  dispatch,
}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}user-get-vendor-show-details?branch_id=${branch_id}&vendor_id=${vendor_id}`,
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
  }finally{
	dispatch(startLoader(false))
  }
};
