import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { endpoints } from "../../../endpoints";

//=======GET SERVICES=======//
export const getTiffinServService= async () => {
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}get-all-service-types?current_page=1&limit=100`,
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

//=======GET MEAL SERVICES=======//
  export const getMealService= async () => {
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}get-all-meal-times?current_page=1&limit=100`,
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

  //=======GET KITCHEN SERVICES=======//
  export const getKitchenService= async () => {
	try {
	  let token = await AsyncStorage.getItem('token');
	  let res = await axios.get(
		`${endpoints.baseUrl}get-all-kitchen-types?current_page=1&limit=100`,
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