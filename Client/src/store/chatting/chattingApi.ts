import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = '/api/chat';

const chattingApi = createApi({
  reducerPath: 'chattingApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => `${URL}/chats`,
      keepUnusedDataFor: 60,
    }),
    getChatMessages: builder.query({
      query: (chatId) => `${URL}/${chatId}/messages`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetChatsQuery, useGetChatMessagesQuery } = chattingApi;

export default chattingApi;