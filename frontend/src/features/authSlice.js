import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // No user logged in initially.
  isAuthenticated: false, // User is not authenticated by default.
};

const authSlice = createSlice({
  name: 'authSlice', // Name for this slice of state.
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user; // Save the user info.
      state.isAuthenticated = true; // Set authenticated to true.
    },
    userLoggedOut: (state) => {
      state.user = null; // Clear user info.
      state.isAuthenticated = false; // Set authenticated to false.
    },
  },
});


export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
