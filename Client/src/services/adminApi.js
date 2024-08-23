import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

// Define a baseQuery function with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5001/api',
  prepareHeaders: (headers) => {
 
    const token = Cookies.get('token');
    //  console.log('api:',token)
    if (token) {
      headers.set('Authorization', token);
    }
    
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: '/login',
        method: 'POST',
        body: formData,
      }),
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: '/profile',
        headers: {
          Authorization: token,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),


    getProfileById: builder.query({
      query: (id) => ({
        url: `/profilebyid/${id}`, // Fetch profile by ID
        method: 'GET',
      }),
    }),

    updateStatus: builder.mutation({
    query: () => ({
      url: '/update-status',
      method: 'PUT',
    
    }),
  }),
  }),
});



export const { useLoginMutation, useGetProfileQuery, useUpdateProfileMutation, useUpdateStatusMutation, useGetProfileByIdQuery, } = adminApi;
