import { configureStore } from '@reduxjs/toolkit';
import userApi from './user/userApi'; 
import authReducer from './user/authSlice'
const store = configureStore({
  reducer: {
    auth:authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


