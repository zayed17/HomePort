import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = '/admin';
const URL1 = '/subscriptions';

const userApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5002', 
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    loginIn: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/login`,  
        method: 'POST',
        body: credentials,
      }),
    }),
    addSubscription: builder.mutation({
      query: (subscription) => ({
        url: `${URL1}/add-subscription`,  
        method: 'POST',
        body: subscription,
      }),
    }),
    getSubscriptions: builder.query({
      query: () => `${URL1}/subscriptions`,  
      keepUnusedDataFor: 60, 
    }),
  }),
});

export const { useLoginInMutation, useAddSubscriptionMutation,useGetSubscriptionsQuery } = userApi;

export default userApi;