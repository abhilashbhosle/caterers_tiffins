import { configureStore } from '@reduxjs/toolkit'
import commonreducer from './CommonSlicer'
import AuthController from '../screens/Onboarding/controllers/AuthController'
import ExploreCuisineController from '../screens/Home/controllers/ExploreCuisineController'
import ExploreIndiaController from '../screens/Home/controllers/ExploreIndiaController'
import OccassionController from '../screens/Home/controllers/OccassionController'
import FilterMainController from '../screens/Home/controllers/FilterMainController'
import FilterTiffinController from '../screens/Home/controllers/FilterTiffinController'
import SearchController from '../screens/Home/controllers/SearchController'
import VendorProfileController from '../screens/Home/controllers/VendorProfileController'
import ReviewController from '../screens/Home/controllers/ReviewController'
import WishListController from '../screens/Home/controllers/WishListController'
import HomeController from '../screens/Home/controllers/HomeController'
import InquiryController from '../screens/Home/controllers/InquiryController'
export const store = configureStore({
  reducer: {
	common:commonreducer,
	auth:AuthController,
	cuisine:ExploreCuisineController,
	city:ExploreIndiaController,
	occassion:OccassionController,
	filterCater:FilterMainController,
	filterTiffin:FilterTiffinController,
	location:SearchController,
	vendor:VendorProfileController,
	review:ReviewController,
	wish:WishListController,
	home:HomeController,
	inquiry:InquiryController,
  },
})