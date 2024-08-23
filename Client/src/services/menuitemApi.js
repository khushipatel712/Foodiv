// API configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuitemApi = createApi({
  reducerPath: 'menuitemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
  endpoints: (builder) => ({
    fetchMenuItems: builder.query({
      query: () => 'menu-items',
    }),
    getMenuItemsByAdminId: builder.query({
        query: (adminId) => `menu-items/admin/${adminId}`, // Adjust URL as necessary
      }),
    updateMenuItemStatus: builder.mutation({
      query: ({ id, show }) => ({
        url: `menu-items/update/${id}`, 
        method: 'PUT',
        body: { show },
      }),
    }),
  }),
});

export const { useFetchMenuItemsQuery, useUpdateMenuItemStatusMutation, useGetMenuItemsByAdminIdQuery } = menuitemApi;
