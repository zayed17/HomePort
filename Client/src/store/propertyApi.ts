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
    getProperties: builder.query({
      query: () => `${URL}/list-properties`,  
      keepUnusedDataFor: 60, 
    }),
    getPendingProperties: builder.query({
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
    getProperty: builder.query({
      query: (id) => `${URL}/property/${id}`,  
      keepUnusedDataFor: 60, 
    }),
    getAllProperties: builder.query({
      query: () => `${URL}/properties`,  
      keepUnusedDataFor: 60, 
    }),
    getAdminProperties: builder.query({
      query: () => `${URL}/adminProperties`,  
      keepUnusedDataFor: 60, 
    }),
    blockAndUnblock: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/block-unblock`,
        method: 'PATCH',
        body: credentials,
      }),
    }), 
    toggleFavorite: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/favorite-update`,
        method: 'PATCH',
        body: credentials,
      }),
    }),
    getFavourites:builder.query({
      query: () => `${URL}/favourite-property`,  
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useAddPropertyMutation, useGetPropertiesQuery ,useGetPendingPropertiesQuery,useRejectPropertyMutation,useVerifyPropertyMutation,useGetPropertyQuery,useGetAllPropertiesQuery,useGetAdminPropertiesQuery,useBlockAndUnblockMutation,useToggleFavoriteMutation,useGetFavouritesQuery} = propertyApi;

export default propertyApi;