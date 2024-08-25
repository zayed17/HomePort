import { useEffect } from 'react';
import { useGetUserQuery } from '../store/user/userApi';

export const useUserDetails = () => {
  const { data: { userDetails } = {}, isLoading, isError, error } = useGetUserQuery({});

  useEffect(() => {
    if (isError) {
      console.error('Error fetching user details:', error);
    }
  }, [isError, error]);

  return { userDetails, isLoading, isError };
};