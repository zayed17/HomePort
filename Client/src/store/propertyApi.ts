import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/property'

const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5003',
    credentials:'include',
    }), 
  endpoints: (builder) => ({  
    addProperty: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/add-property`,  
          method: 'POST',
          body: credentials,
        }),
      }),
      
     
  }),
});

export const {useAddPropertyMutation} = propertyApi;

export default propertyApi;
