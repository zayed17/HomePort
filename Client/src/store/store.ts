import { configureStore } from '@reduxjs/toolkit';
import userApi from './user/userApi';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userApi: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;