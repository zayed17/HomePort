import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/booking';

const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5004', 
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/make-payment`,  
        method: 'POST',
        body: credentials,
      }),
    }),
    getBookedProperties: builder.query({
        query: () => `${URL}/get-booked`,  
        keepUnusedDataFor: 60, 
      }),
  }),
});

export const { useMakePaymentMutation,useGetBookedPropertiesQuery } = bookingApi;

export default bookingApi;