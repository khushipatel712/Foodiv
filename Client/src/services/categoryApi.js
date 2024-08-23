// API configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => 'categories',
    }),
    updateCategoryStatus: builder.mutation({
      query: ({ id, show }) => ({
        url: `update/${id}`, // Using category name as ID
        method: 'PUT',
        body: { show },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`, // Adjust URL according to your backend
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFetchCategoriesQuery, useUpdateCategoryStatusMutation, useDeleteCategoryMutation } = categoryApi;
