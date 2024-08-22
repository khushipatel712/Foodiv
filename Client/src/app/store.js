import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';
import { categoryApi } from '../services/categoryApi';
import adminReducer from '../slice/adminSlice';
import categoryReducer from '../slice/categorySlice';

const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    admin: adminReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware).concat(categoryApi.middleware),
});

export default store;
