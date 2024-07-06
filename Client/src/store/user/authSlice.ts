import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}


const initialState  = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem('token') ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { setUser, logout, setToken } = authSlice.actions;

export default authSlice.reducer;