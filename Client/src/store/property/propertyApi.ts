// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const URL = '/property';

// const createGetQuery = (url:string) => ({
//   query: () => `${URL}${url}`,
//   keepUnusedDataFor: 60,
// });

// const createMutation = (url:string, method = 'POST') => ({
//   query: (body:any) => ({
//     url: `${URL}${url}`,
//     method,
//     body,
//   }),
// });

// const propertyApi = createApi({
//   reducerPath: 'propertyApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost',
//     credentials: 'include',
//   }),
//   endpoints: (builder) => ({
//     addProperty: builder.mutation(createMutation('/add-property')),

//     getProperties: builder.query(createGetQuery('/list-properties')),

//     getPublicProperties: builder.query(createGetQuery('/list-properties-public')),

//     getPendingProperties: builder.query(createGetQuery('/properties/pending')),

//     verifyProperty: builder.mutation(createMutation('/properties/verify')),

//     rejectProperty: builder.mutation(createMutation('/properties/reject', 'POST')),

//     getProperty: builder.query({
//       query: (id) => `${URL}/property/${id}`,
//     }),

//     getAllProperties: builder.query(createGetQuery('/properties')),

//     getAdminProperties: builder.query(createGetQuery('/adminProperties')),

//     blockAndUnblock: builder.mutation(createMutation('/block-unblock', 'PATCH')),

//     toggleFavorite: builder.mutation(createMutation('/favorite-update', 'PATCH')),

//     getFavourites: builder.query(createGetQuery('/favourite-property')),

//     reportProperty: builder.mutation(createMutation('/report-property')),

//     getReports: builder.query(createGetQuery('/reports')),

//     updateProperty: builder.mutation(createMutation('/update-property')),

//     createPaymentIntent: builder.mutation(createMutation('/payment-intent')),

//     getDashboard: builder.query(createGetQuery('/dashboard-properties')),

//     getAdminDashboard: builder.query(createGetQuery('/admin-dashboard')),

//   }),
// });

// export const {  useAddPropertyMutation, useGetPublicPropertiesQuery, useGetPropertiesQuery,  useGetPendingPropertiesQuery, useRejectPropertyMutation, useVerifyPropertyMutation,  useGetPropertyQuery, useGetAllPropertiesQuery, useGetAdminPropertiesQuery,  useBlockAndUnblockMutation, useToggleFavoriteMutation, useGetFavouritesQuery,  useReportPropertyMutation, useGetReportsQuery, useUpdatePropertyMutation,  useCreatePaymentIntentMutation, useGetDashboardQuery, useGetAdminDashboardQuery } = propertyApi;

// export default propertyApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/api/property';
// console.log(import.meta.env.VITE_API_URL)
const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.VITE_API_URL}`,
    baseUrl:"http://localhost:5003",
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
      query: ({ page, limit }) => `${URL}/list-properties?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 60, 
    }),
    getPublicProperties: builder.query({
      query: ({ page, limit }) => `${URL}/list-properties-public?page=${page}&limit=${limit}`,
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
      query: ({ page, limit }) => `${URL}/properties?page=${page}&limit=${limit}`,
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
    reportProperty: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/report-property`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getReports: builder.query({
      query: () => `${URL}/reports`,  
      keepUnusedDataFor: 60, 
    }),
    // updateProperty: builder.mutation({
    //   query: (credentials) => ({
    //     url: `${URL}/favorite-update`,
    //     method: 'PATCH',
    //     body: credentials,
    //   }),
    // }),

    updateProperty: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/update-property`,
        method: 'POST',
        body: credentials,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (credentials) => ({
        url: `${URL}/payment-intent`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getDashboard: builder.query({
      query: () => `${URL}/dashboard-properties`,  
      keepUnusedDataFor: 60, 
    }),
    getAdminDashboard: builder.query({
      query: () => `${URL}/admin-dashboard`,  
      keepUnusedDataFor: 60, 
    }),
  }),
});

export const { useAddPropertyMutation, useGetPublicPropertiesQuery,useGetPropertiesQuery ,useGetPendingPropertiesQuery,useRejectPropertyMutation,useVerifyPropertyMutation,useGetPropertyQuery,useGetAllPropertiesQuery,useGetAdminPropertiesQuery,useBlockAndUnblockMutation,useToggleFavoriteMutation,useGetFavouritesQuery,useReportPropertyMutation,useGetReportsQuery,useUpdatePropertyMutation,useCreatePaymentIntentMutation,useGetDashboardQuery,useGetAdminDashboardQuery} = propertyApi;

export default propertyApi;