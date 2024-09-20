import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: User | any;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { loginSuccess, loginFail, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
