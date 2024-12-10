import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { loginSuccess ,logoutSuccess} from './user/userSlice';


export const createBaseQueryWithReauth = (baseUrl: string): BaseQueryFn => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  });

  return async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      console.warn('Access token expired. Attempting to refresh...');


      const refreshResult = await baseQuery(
        {
          url: '/api/user/refresh-token', 
          method: 'POST',
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const newAccessToken = (refreshResult.data as any).newAccessToken 

        api.dispatch(loginSuccess(newAccessToken));

        console.info('Token refreshed successfully. Retrying original request...');

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error('Refresh token expired or invalid. Logging out...');
        api.dispatch(logoutSuccess());
      }
    }

    return result;
  };
};
