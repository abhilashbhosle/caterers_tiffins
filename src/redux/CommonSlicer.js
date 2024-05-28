import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  asyncToken:null,
  logout:false,
  currentLocation:[]
};
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    startLoader: (state, action) => {
      state.loading = action.payload;
    },
    asyncToken:(state,action)=>{
      state.asyncToken=action.payload
    },
    logout:(state,action)=>{
      state.logout=action.payload
    },
    setLocation:(state,action)=>{
      state.currentLocation=action.payload
    },
    
  },
});

export const {getFlow, startLoader,asyncToken,logout,setLocation} = commonSlice.actions;
export default commonSlice.reducer;
