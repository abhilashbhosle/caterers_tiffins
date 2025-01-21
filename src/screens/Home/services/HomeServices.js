import {endpoints} from '../../../endpoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startLoader} from '../../../redux/CommonSlicer';
import {
  getCuisines,
  updateCuisine,
} from '../controllers/ExploreCuisineController';
import {
  getOccassions,
  updateOccassion,
} from '../controllers/OccassionController';
import {
  getFoodTypes,
  updateSubscriptions,
} from '../controllers/FilterMainController';

//   =======UPDATE SEARCH SERVICE======//
export const updateSearchService = async ({
  dispatch,
  navigation,
  params,
  ssd,
  sse,
  from,
  updated_response,
  filterKey,
}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors-update`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    if (res?.data) {
      if (filterKey == 'cuisine') {
        await dispatch(getCuisines());
        await dispatch(updateCuisine(updated_response));
        navigation.navigate(
          'PageStack',
          {
            screen: 'SearchMain',
            params: {
              from,
              ssd,
              sse,
            },
          }
        );
      } else if (filterKey == 'occassion') {
        await dispatch(getOccassions());
        await dispatch(updateOccassion(updated_response));

        navigation.navigate(
          'PageStack',
          {
            screen: 'SearchMain',
            params: {
              from,
              ssd,
              sse,
            },
          },
        );
      } else if (filterKey == 'subscription') {
        await dispatch(getFoodTypes());
        await dispatch(updateSubscriptions(updated_response));
        navigation.navigate(
          'PageStack',
          {
            screen: 'SearchMain',
            params: {
              from,
              ssd,
              sse,
            },
          },
        );
      }
      //   console.log(token, JSON.parse(params.cuisines_filter));
    }
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  } finally {
    setTimeout(() => {
      dispatch(startLoader(false));
    }, 1000);
  }
};

// =======GET BRANDED SERVICE=======//

export const getHomePageService = async ({params}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendors-home-page`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  } finally {
  }
};

// =======GET SIMILAR TIFFINS SERVICE=======//

export const getSimilarTiffinService = async ({params}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}search-vendors`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res.data;
  } catch (error) {
    console.log("error in tiffins near you",error)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  } finally {
  }
};
