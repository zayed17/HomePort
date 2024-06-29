import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_URL = '/user'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5001',
    credentials:'include'
    }), 
  endpoints: (builder) => ({  
    loginIn: builder.mutation({
        query: (credentials) => ({
          url: `${USER_URL}/login`,
          method: 'POST',
          body: credentials,
        }),
      }),
      signUp: builder.mutation({
        query: (credentials) => ({
          url: `${USER_URL}/signup`,
          method: 'POST',
          body: credentials,
        }),
      }),  
  }),
});

export const { useLoginInMutation, useSignUpMutation} = userApi;

export default userApi;
