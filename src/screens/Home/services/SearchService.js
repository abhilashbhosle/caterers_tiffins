import axios from "axios";
import {GOOGLE_KEY} from '@env';

  //=======GET LOCATION SERVICES=======//
  export const getLocationService= async (searchText) => {
	try {
	  let res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${GOOGLE_KEY}`);
	  return res.data.results;
	} catch (error) {
	  if (error.response && error.response.data) {
		throw new Error(error.response.data.message);
	  } else {
		throw new Error(error.message);
	  }
	}
  };