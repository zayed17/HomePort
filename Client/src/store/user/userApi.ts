import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = '/user'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5001',
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
      getUser: builder.mutation({
        query: () => ({
          url: `${URL}/getUser`,
          method: 'GET',
        }),
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
      findAllUsers: builder.mutation({
        query: () => ({
          url: `${URL}/findAll`,
          method: 'GET',
        }),
      }), 
      blockAndUnblock: builder.mutation({
        query: (credentials) => ({
          url: `${URL}/block-unblock`,
          method: 'PATCH',
          body: credentials,
        }),
      }), 
  }),
});

export const { useLoginInMutation  ,useSignUpMutation, useOtpVerifyMutation,useGetUserMutation , useUpdateUserMutation , useUploadPicMutation,useResendOTPMutation,useVerifyEmailMutation,useForgotPasswordMutation,useChangePasswordMutation,useFindAllUsersMutation,useBlockAndUnblockMutation} = userApi;

export default userApi;
