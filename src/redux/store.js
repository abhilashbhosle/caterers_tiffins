import { configureStore } from '@reduxjs/toolkit'
import commonreducer from './CommonSlicer'
import AuthController from '../screens/Onboarding/controllers/AuthController'
import ExploreCuisineController from '../screens/Home/controllers/ExploreCuisineController'
import ExploreIndiaController from '../screens/Home/controllers/ExploreIndiaController'
import OccassionController from '../screens/Home/controllers/OccassionController'
import FilterMainController from '../screens/Home/controllers/FilterMainController'
export const store = configureStore({
  reducer: {
	common:commonreducer,
	auth:AuthController,
	cuisine:ExploreCuisineController,
	city:ExploreIndiaController,
	occassion:OccassionController,
	filterCater:FilterMainController
  },
})