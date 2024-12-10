import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload);
            state.isAuthenticated = true;
        },
        loginFail: (state) => {
            // localStorage.removeItem('token');
            // state.isAuthenticated = false;
        },
        logoutSuccess: (state) => {
            // localStorage.removeItem('token');
            // state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, loginFail, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
