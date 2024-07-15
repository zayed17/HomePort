import { createSlice } from '@reduxjs/toolkit';


const initialState  = {
  user: null,
  isLoggedIn: false,
  userToken: localStorage.getItem('userToken') ?? null,
  role:[]
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.role = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.userToken = null;
      state.role = []
      localStorage.removeItem('userToken');
    },
    setToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
  },
});

export const { setUser, logout, setToken } = authSlice.actions;

export default authSlice.reducer;