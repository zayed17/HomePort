import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image:string
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  userToken: string | null;
  role: string[]; 
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  userToken: localStorage.getItem('userToken') ?? null,
  role: [],
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.userToken = null;
      state.role = [];
      localStorage.removeItem('userToken');
    },
    setToken(state, action: PayloadAction<string>) {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
  },
});

export const { setUser, logout, setToken } = authSlice.actions;

export default authSlice.reducer;