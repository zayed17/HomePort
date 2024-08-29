import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = '/booking';

const createGetQuery = (url: string) => ({
  query: () => `${URL}${url}`,
  keepUnusedDataFor: 60,
});

const createMutation = (url: string, method = 'POST') => ({
  query: (body: any) => ({
    url: `${URL}${url}`,
    method,
    body,
  }),
});

const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    makePayment: builder.mutation(createMutation('/make-payment')),
    getBookedProperties: builder.query(createGetQuery('/get-booking')),
    getBookedPropertyById: builder.query({
      query: (id) => `${URL}/get-booking/${id}`,
    }),
    closeDeal: builder.mutation(createMutation('/close-deal', 'PATCH')),
  }),
});



export const { useMakePaymentMutation, useGetBookedPropertiesQuery,useGetBookedPropertyByIdQuery,useCloseDealMutation } = bookingApi;

export default bookingApi;