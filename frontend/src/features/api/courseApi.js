import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = 'http://localhost:3000/api/v1/course';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  tagTypes:['RefetchCreatorCourse'],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: '',
        method: 'POST',
        body: { courseTitle, category },
      }),
      invalidatesTags:[`RefetchCreatorCourse`]
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags:[`RefetchCreatorCourse`]
    }),
  }),
});

export const { useCreateCourseMutation, useGetCreatorCoursesQuery } = courseApi;
