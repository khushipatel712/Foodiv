import { createSlice } from '@reduxjs/toolkit';

const menuItemSlice = createSlice({
  name: 'menuitems',
  initialState: {
    menuitems: [], // List of menu items
  },
  reducers: {
    setMenuItems(state, action) {
      state.menuitems = action.payload; // Set menu items from payload
    },
    toggleMenuItemShow(state, action) {
      const { id } = action.payload; // Extract id from action payload
      const menuItem = state.menuitems.find(item => item._id === id); // Find menu item by id
      if (menuItem) {
        menuItem.show = !menuItem.show; // Toggle show field
      }
    },
  },
});

export const { setMenuItems, toggleMenuItemShow } = menuItemSlice.actions;
export default menuItemSlice.reducer;
