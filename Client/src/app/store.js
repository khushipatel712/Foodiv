import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';
import { categoryApi } from '../services/categoryApi';
import { menuitemApi } from '../services/menuitemApi';
import adminReducer from '../slice/adminSlice';
import categoryReducer from '../slice/categorySlice';
import menuitemReducer from '../slice/menuitemSlice';

const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [menuitemApi.reducerPath]: menuitemApi.reducer,
    admin: adminReducer,
    categories: categoryReducer,
    menuitems: menuitemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(categoryApi.middleware)
      .concat(menuitemApi.middleware),
});

export default store;
