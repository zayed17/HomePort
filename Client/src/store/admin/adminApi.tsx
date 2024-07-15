import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/admin'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5002',
    credentials:'include',
    }), 
  endpoints: (builder) => ({  
    loginIn: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/login`,  
          method: 'POST',
          body: credentials,
        }),
      }),
  }),
});

export const { useLoginInMutation} = userApi;

export default userApi;
