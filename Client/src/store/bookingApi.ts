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
      query: () => `${URL}/get-booking`,
      keepUnusedDataFor: 60,
    }),
    getBookedPropertyById: builder.query({
      query: (id) => `${URL}/get-booking/${id}`,
    }),
    closeDeal: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/close-deal`,
        method: 'PATCH',
        body: credentials,
      }),
    }),
  }),
});

export const { useMakePaymentMutation, useGetBookedPropertiesQuery,useGetBookedPropertyByIdQuery,useCloseDealMutation } = bookingApi;

export default bookingApi;