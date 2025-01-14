import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const USER_API = 'http://localhost:3000/api/v1/user/';

export const authApi = createApi({
  reducerPath: 'authApi', // Slice name for RTK Query.
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API, // Backend API URL.
    credentials: 'include', // Send cookies (if any).
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      //mutation for post, query for get
      query: (inputData) => ({
        url: 'register', // API endpoint for registration.
        method: 'POST',
        body: inputData, // Send user input data (name, email, password) to backend.
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: 'login', // API endpoint for login.
        method: 'POST',
        body: inputData, // Send user input data (email, password).
      }),
      //This is a hook that runs when the API call starts.
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; //Once the API responds (queryFulfilled), it updates the Redux state with the logged-in user’s data.
          dispatch(userLoggedIn({ user: result.data.user })); // Dispatch the logged-in action with user data.
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut()); // Dispatch the logged-out action.
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; //Once the API responds (queryFulfilled), it updates the Redux state with the logged-in user’s data.
          dispatch(userLoggedIn({ user: result.data.user })); // Dispatch the logged-in action with user data.
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: 'profile/update',
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation
} = authApi; //At the bottom, you export hooks to use these mutations in components.
// useRegisterUserMutation: Use this in components to call the register API.
// useLoginUserMutation: Use this in components to call the login API.



// [] for mutation, {} for query