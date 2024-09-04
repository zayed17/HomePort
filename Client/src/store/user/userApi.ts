import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/api/user'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost',
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
      signUp: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/signup`,
          method: 'POST',
          body: credentials,
        }),
      }),  
      otpVerify: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/verifyOtp`,
          method: 'POST',
          body: credentials,
        }),
      }), 
      googleSign: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/google`,
          method: 'POST',
          body: credentials,
        }),
      }),  
      getUser: builder.query({
        query:()=>`${URL}/getUser`,
        keepUnusedDataFor:60,
      }), 
      updateUser: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/updateProfile`,
          method: 'PUT',
          body: credentials,
        }),
      }), 
      resendOTP: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/resendOTP`,
          method: 'POST',
          body: credentials,
        }),
      }), 
      uploadPic: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/uploadImage`,
          method: 'POST',
          body: credentials,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      }), 
      verifyEmail: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/verifyEmail`,
          method: 'POST',
          body: credentials,
        }),
      }), 
      forgotPassword: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/forgetPassword`,
          method: 'PUT',
          body: credentials,
        }),
      }), 
      changePassword: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/changePassword`,
          method: 'PUT',
          body: credentials,
        }),
      }), 
      findAllUsers: builder.query({
        query: () => `${URL}/findAll`,  
        keepUnusedDataFor: 60, 
      }),
      blockAndUnblock: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/block-unblock`,
          method: 'PATCH',
          body: credentials,
        }),
      }), 
      getUserAdminDashboard: builder.query({
        query: () => `${URL}/admin-dashboard`,  
        keepUnusedDataFor: 60, 
      }),
  }),
});

export const { useLoginInMutation  ,useSignUpMutation, useOtpVerifyMutation,useGetUserQuery , useGoogleSignMutation,useUpdateUserMutation , useUploadPicMutation,useResendOTPMutation,useVerifyEmailMutation,useForgotPasswordMutation,useChangePasswordMutation,useFindAllUsersQuery,useBlockAndUnblockMutation,useGetUserAdminDashboardQuery} = userApi;

export default userApi;
