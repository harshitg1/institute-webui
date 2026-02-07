import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'
import type {
  User,
  UserRequest,
  Organization,
  CreateOrganizationRequest,
  Role,
  CreateRoleRequest,
  Course,
  CreateCourseRequest,
  Lesson,
  CreateLessonRequest,
  Enrollment,
  CreateEnrollmentRequest,
  VideoProgress,
  CreateVideoProgressRequest,
} from '../types/models'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use it for all authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Organization', 'Role', 'Course', 'Lesson', 'Enrollment', 'VideoProgress'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<User, UserRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, { id: string; data: UserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),

    // Organizations
    getOrganizations: builder.query<Organization[], void>({
      query: () => '/organizations',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Organization' as const, id })),
              { type: 'Organization', id: 'LIST' },
            ]
          : [{ type: 'Organization', id: 'LIST' }],
    }),
    getOrganization: builder.query<Organization, string>({
      query: (id) => `/organizations/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Organization', id }],
    }),
    createOrganization: builder.mutation<Organization, CreateOrganizationRequest>({
      query: (body) => ({
        url: '/organizations',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
    updateOrganization: builder.mutation<Organization, { id: string; data: CreateOrganizationRequest }>({
      query: ({ id, data }) => ({
        url: `/organizations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Organization', id }],
    }),
    deleteOrganization: builder.mutation<void, string>({
      query: (id) => ({
        url: `/organizations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),

    // Roles
    getRoles: builder.query<Role[], void>({
      query: () => '/roles',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Role' as const, id })),
              { type: 'Role', id: 'LIST' },
            ]
          : [{ type: 'Role', id: 'LIST' }],
    }),
    getRole: builder.query<Role, string>({
      query: (id) => `/roles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Role', id }],
    }),
    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (body) => ({
        url: '/roles',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),
    updateRole: builder.mutation<Role, { id: string; data: CreateRoleRequest }>({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Role', id }],
    }),
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),

    // Courses
    getCourses: builder.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Course'],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
    createCourse: builder.mutation<Course, CreateCourseRequest>({
      query: (body) => ({
        url: '/courses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<Course, { id: string; data: CreateCourseRequest }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Course', id }],
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),

    // Lessons
    getLessons: builder.query<Lesson[], void>({
      query: () => '/lessons',
      providesTags: ['Lesson'],
    }),
    getLesson: builder.query<Lesson, string>({
      query: (id) => `/lessons/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Lesson', id }],
    }),
    createLesson: builder.mutation<Lesson, CreateLessonRequest>({
      query: (body) => ({
        url: '/lessons',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lesson'],
    }),
    updateLesson: builder.mutation<Lesson, { id: string; data: CreateLessonRequest }>({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Lesson', id }],
    }),
    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),

    // Enrollments
    getEnrollments: builder.query<Enrollment[], void>({
      query: () => '/enrollments',
      providesTags: ['Enrollment'],
    }),
    createEnrollment: builder.mutation<Enrollment, CreateEnrollmentRequest>({
      query: (body) => ({
        url: '/enrollments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Enrollment'],
    }),
    updateEnrollment: builder.mutation<Enrollment, { id: string; data: CreateEnrollmentRequest }>({
      query: ({ id, data }) => ({
        url: `/enrollments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Enrollment'],
    }),
    deleteEnrollment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enrollment'],
    }),

    // Video Progress
    getVideoProgress: builder.query<VideoProgress[], void>({
      query: () => '/video-progress',
      providesTags: ['VideoProgress'],
    }),
    createVideoProgress: builder.mutation<VideoProgress, CreateVideoProgressRequest>({
      query: (body) => ({
        url: '/video-progress',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VideoProgress'],
    }),
    updateVideoProgress: builder.mutation<VideoProgress, { id: string; data: CreateVideoProgressRequest }>({
      query: ({ id, data }) => ({
        url: `/video-progress/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['VideoProgress'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
  useGetVideoProgressQuery,
  useCreateVideoProgressMutation,
  useUpdateVideoProgressMutation,
} = apiSlice
