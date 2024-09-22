import { configureStore } from '@reduxjs/toolkit';
import userApi from './user/userApi';
import adminApi from './admin/adminApi';
import bookingApi from './booking/bookingApi'
import authReducer from './user/userSlice';
import propertyApi from './property/propertyApi';
import chattingApi from './chatting/chattingApi';
// import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    [userApi.reducerPath]: userApi.reducer, 
    [propertyApi.reducerPath]: propertyApi.reducer, 
    [adminApi.reducerPath]: adminApi.reducer,  
    [bookingApi.reducerPath]: bookingApi.reducer,
    [chattingApi.reducerPath]: chattingApi.reducer,    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware) 
      .concat(propertyApi.middleware)  
      .concat(adminApi.middleware)
      .concat(bookingApi.middleware)
      .concat(chattingApi.middleware),
      // .concat(logger), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;