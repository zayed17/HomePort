import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../store/user/userApi';

export const useUserDetails = () => {
  const { data: { userDetails } = {}, isLoading, isError, error } = useGetUserQuery({});
  const [hasLoggedError, setHasLoggedError] = useState(false);

  useEffect(() => {
    if (isError && !hasLoggedError) {
      console.error('Error fetching user details:', error);
      setHasLoggedError(true); 
    }
  }, [isError, error, hasLoggedError]);

  return { userDetails, isLoading, isError };
};
