import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = 'http://localhost:3000/api/v1/course';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  tagTypes: ['RefetchCreatorCourse'],
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
      invalidatesTags: [`RefetchCreatorCourse`],
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: [`RefetchCreatorCourse`],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: [`RefetchCreatorCourse`],
      // Effect: When a mutation with invalidatesTags is executed, it will invalidate the specified tags. This triggers a re-fetch of any queries that provide these tags, ensuring that the data is up-to-date.
      // Usage: Typically used after a mutation that changes data, such as creating, updating, or deleting a resource.
    }),
    getCourseById: builder.query({
      query: ({ courseId }) => ({
        url: `${courseId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
} = courseApi;
