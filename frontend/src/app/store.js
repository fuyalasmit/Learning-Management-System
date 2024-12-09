import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';
import { authApi } from '@/features/api/authApi.js';

export const appStore = configureStore({
  reducer: rootReducer, // Combines all reducers (state logic).
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware), // Add API middleware for RTK Query.
});

//kinavane harek choti refresh garda gayeb huna vayena
const inititalizeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
inititalizeApp();
// Default Middleware: Handles Redux’s basic functionality (e.g., async actions).
// authApi.middleware: Adds RTK Query functionality like:  Automatic caching of API results. Invalidating old data when new API calls are made.
