// import { useEffect } from 'react';
// import { useGetUserQuery } from '../store/user/userApi';

// export const useUserDetails = () => {
//   const { data: { userDetails } = {}, isLoading, isError, error } = useGetUserQuery({});

//   useEffect(() => {
//     if (isError) {
//       console.error('Error fetching user details:', error);
//     }
//   }, [isError, error]);

//   return { userDetails, isLoading, isError };
// };

import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../store/user/userApi';

export const useUserDetails = () => {
  const { data: { userDetails } = {}, isLoading, isError, error } = useGetUserQuery({});
  const [hasLoggedError, setHasLoggedError] = useState(false);

  useEffect(() => {
    if (isError && !hasLoggedError) {
      console.error('Error fetching user details:', error);
      setHasLoggedError(true); // Set the flag to true to avoid re-logging the same error
    }
    // Optionally, you might want to reset the flag if `isError` is false again
  }, [isError, error, hasLoggedError]);

  return { userDetails, isLoading, isError };
};
