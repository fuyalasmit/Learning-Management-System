import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';
import { authApi } from '../features/api/authApi.js';
import { courseApi } from '@/features/api/courseApi.js';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // Handles API state (e.g., loading, success).
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authReducer, // Handles user state.
});

export default rootReducer;


// authReducer: Manages the auth slice, like storing user info and login state.
// authApi.reducerPath: Manages API-related data (like caching results or loading states).