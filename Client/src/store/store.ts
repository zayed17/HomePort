import { configureStore } from '@reduxjs/toolkit';
import userApi from './user/userApi';
import adminApi from './admin/adminApi';
import userReducer from './user/userSlice';
import propertyApi from './propertyApi';

const store = configureStore({
  reducer: {
    user: userReducer,  
    [userApi.reducerPath]: userApi.reducer, 
    [propertyApi.reducerPath]: propertyApi.reducer, 
    [adminApi.reducerPath]: adminApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware) 
      .concat(propertyApi.middleware)  
      .concat(adminApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;