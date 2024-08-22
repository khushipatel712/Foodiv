import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [], // List of categories
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload; // Set categories from payload
    },
    toggleCategoryShow(state, action) {
      const { id } = action.payload; // Extract id from action payload
      const category = state.categories.find(cat => cat._id === id); // Find category by id
      if (category) {
        category.show = !category.show; // Toggle show field
      }
    },
  },
});

export const { setCategories, toggleCategoryShow } = categorySlice.actions;
export default categorySlice.reducer;
