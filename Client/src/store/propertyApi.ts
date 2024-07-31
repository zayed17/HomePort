import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = '/property';

const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5003',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addProperty: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/add-property`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getProperties: builder.query<any, void>({
      query: () => `${URL}/list-properties`,  
      keepUnusedDataFor: 60, 
    }),
    getPendingProperties: builder.query<any, void>({
      query: () => `${URL}/properties/pending`,
      keepUnusedDataFor: 60, 
    }),
    verifyProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${URL}/properties/verify/${propertyId}`,
        method: 'POST',
      }),
    }),
    rejectProperty: builder.mutation({
      query: ({ propertyId, reason }) => ({
        url: `${URL}/properties/reject/${propertyId}`,
        method: 'POST',
        body:{reason},
      }),
    }),
  }),
});

export const { useAddPropertyMutation, useGetPropertiesQuery ,useGetPendingPropertiesQuery,useRejectPropertyMutation,useVerifyPropertyMutation} = propertyApi;

export default propertyApi;