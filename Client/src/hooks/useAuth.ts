import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail, logoutSuccess } from '../store/user/userSlice';
import { useCheckAuthQuery, useLogoutMutation } from '../store/user/userApi';
import { AppDispatch } from '../store/store';

export const useAuth = () => {
    const dispatch: AppDispatch = useDispatch();
    
    const { data: userData,  isLoading, isError } = useCheckAuthQuery({});
    
    const [logout] = useLogoutMutation();

    useEffect(() => {
        if (userData && !isError) {
            dispatch(loginSuccess(userData)); 
        } else if (isError && !userData) {
            dispatch(loginFail('Not authenticated'));
        }
    }, [userData, isError, dispatch]);

    const handleLogout = async () => {
        try {
            await logout({}).unwrap(); 
            dispatch(logoutSuccess()); 
        } catch (err) {
            console.error('Logout failed', err); 
        }
    };

    return {
        isAuthenticated: !!userData, 
        user: userData,
        loading: isLoading,
        error: isError, 
        logout: handleLogout,
    };
};
