import { endpoints } from "../../../endpoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

//   =======GET CUISINE======//
export const getCuisineService = async () => {
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}get-all-cuisines`,
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
