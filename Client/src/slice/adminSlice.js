import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    online: false, // Initial state for the online status
  },
  reducers: {
    toggleOnlineStatus(state) {
      state.online = !state.online; // Toggles the boolean value
    },
  },
});

export const { toggleOnlineStatus } = adminSlice.actions;
export default adminSlice.reducer;
