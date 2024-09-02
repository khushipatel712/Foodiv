import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    online: false, // Initial state for the online status
  },
  reducers: {
    setOnlineStatus(state, action) {
      state.online = action.payload; // Set the online status from the payload
    },
    toggleOnlineStatus(state) {
      state.online = !state.online; // Toggles the boolean value
    },
  },
});

export const { setOnlineStatus, toggleOnlineStatus } = adminSlice.actions;
export default adminSlice.reducer;
