import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from '../store'
const USER_URL = '/user'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5001',
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
      const token = (getState() as RootState).auth.token;
      if(token){
        headers.set('Authorization',`Bearer ${token}`)
      }
      headers.set('Content-Type','application/json')
      return headers
    }
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
      otpVerify: builder.mutation({
        query: (credentials) => ({
          url: `${USER_URL}/verifyOtp`,
          method: 'POST',
          body: credentials,
        }),
      }), 
      getUser: builder.mutation({
        query: () => ({
          url: `${USER_URL}/getUser`,
          method: 'GET',
        }),
      }), 
      updataUser: builder.mutation({
        query: () => ({
          url: `${USER_URL}/updateUser`,
          method: 'PUT',
        }),
      }), 
  }),
});

export const { useLoginInMutation, useSignUpMutation, useOtpVerifyMutation,useGetUserMutation , useUpdataUserMutation} = userApi;

export default userApi;
