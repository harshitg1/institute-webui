import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'
import { API_BASE_URL } from '../config/api'
import type {
  Page,
  UserResponse,
  CreateUserRequest,
  Organization,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  Student,
  CreateStudentRequest,
  Batch,
  BatchRequest,
  Course,
  CourseRequest,
  ApiResponse
} from '../types/models'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Organization', 'Student', 'Batch', 'Course'],
  endpoints: (builder) => ({
    // ---- Super Admin: Organizations ----
    getOrganizations: builder.query<Page<Organization>, { pageIndex?: number; pageSize?: number } | void>({
      query: (params) => {
        const p = params || { pageIndex: 0, pageSize: 10 };
        return `/superadmin/organizations?page=${p.pageIndex}&size=${p.pageSize}`;
      },
      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map(({ id }) => ({ type: 'Organization' as const, id })),
              { type: 'Organization', id: 'LIST' },
            ]
          : [{ type: 'Organization', id: 'LIST' }],
    }),
    getOrganization: builder.query<Organization, string>({
      query: (id) => `/superadmin/organizations/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Organization', id }],
    }),
    createOrganization: builder.mutation<Organization, CreateOrganizationRequest>({
      query: (body) => ({
        url: '/superadmin/organizations',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getOrganizations', undefined, (draft) => {
            if (draft?.content) {
              draft.content.unshift({
                id: `temp-${Date.now()}`,
                name: body.name,
                active: true,
                createdAt: new Date().toISOString(),
              });
            }
          })
        )
        try { await queryFulfilled } catch { patchResult.undo() }
      },
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
    updateOrganization: builder.mutation<Organization, { id: string; data: UpdateOrganizationRequest }>({
      query: ({ id, data }) => ({
        url: `/superadmin/organizations/${id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getOrganizations', undefined, (draft) => {
            if (draft?.content) {
              const idx = draft.content.findIndex(o => o.id === id);
              if (idx !== -1) {
                draft.content[idx] = { ...draft.content[idx], name: data.name, active: data.active };
              }
            }
          })
        )
        try { await queryFulfilled } catch { patchResult.undo() }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Organization', id }],
    }),
    deleteOrganization: builder.mutation<void, string>({
      query: (id) => ({
        url: `/superadmin/organizations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
    getPlatformAdmins: builder.query<Page<UserResponse>, void>({
      query: () => '/superadmin/organizations/admins',
    }),

    // ---- Org Admin: Users ----
    getUsers: builder.query<Page<UserResponse>, { pageIndex?: number; pageSize?: number } | void>({
      query: (params) => {
        const p = params || { pageIndex: 0, pageSize: 10 };
        return `/org/users?page=${p.pageIndex}&size=${p.pageSize}`;
      },
      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    createUser: builder.mutation<UserResponse, CreateUserRequest>({
      query: (body) => ({
        url: '/org/users',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            if (draft?.content) {
              draft.content.unshift({
                id: `temp-${Date.now()}`,
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                roles: body.roles
              });
            }
          })
        )
        try { await queryFulfilled } catch { patchResult.undo() }
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // ---- Admin: Students ----
    getStudents: builder.query<ApiResponse<Student[]>, { pageIndex?: number; pageSize?: number } | void>({
      query: (params) => {
        const p = params || { pageIndex: 0, pageSize: 10 };
        return `/admin/students?page=${p.pageIndex}&size=${p.pageSize}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudent: builder.query<Student, string>({
      query: (id) => `/admin/students/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),
    createStudent: builder.mutation<ApiResponse<Student>, CreateStudentRequest>({
      query: (body) => ({
        url: '/admin/students',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getStudents', undefined, (draft) => {
            if (draft?.data) {
              draft.data.unshift({
                id: `temp-${Date.now()}`,
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                status: 'ACTIVE',
              } as Student);
            }
          })
        )
        try { await queryFulfilled } catch { patchResult.undo() }
      },
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    updateStudent: builder.mutation<ApiResponse<Student>, { id: string; data: CreateStudentRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/students/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Student', id }],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    // ---- Admin: Batches ----
    getBatches: builder.query<Batch[], void>({
      query: () => '/admin/batches',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Batch' as const, id })),
              { type: 'Batch', id: 'LIST' },
            ]
          : [{ type: 'Batch', id: 'LIST' }],
    }),
    createBatch: builder.mutation<Batch, BatchRequest>({
      query: (body) => ({
        url: '/admin/batches',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Batch', id: 'LIST' }],
    }),

    // ---- Courses ----
    // Public catalog: GET /api/courses — returns ApiResponse<Course[]>
    getCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => '/courses',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Course' as const, id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),
    // Admin catalog: GET /api/courses/admin — returns ApiResponse<Course[]>
    getAdminCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => '/courses/admin',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Course' as const, id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),
    // Single course: GET /api/courses/{id} — returns ApiResponse<Course>
    getCourse: builder.query<ApiResponse<Course>, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
    // Student courses: GET /api/courses/student/my-courses
    getStudentCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => '/courses/student/my-courses',
      providesTags: ['Course'],
    }),
    // Create: POST /api/courses — body: CourseRequest, response: ApiResponse<Course>
    createCourse: builder.mutation<ApiResponse<Course>, CourseRequest>({
      query: (body) => ({
        url: '/courses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),
    // Update: PUT /api/courses/{id}
    updateCourse: builder.mutation<ApiResponse<Course>, { id: string; data: CourseRequest }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Course', id },
        { type: 'Course', id: 'LIST' },
      ],
    }),
    // Delete: DELETE /api/courses/{id} — may return 400 COURSE_HAS_ENROLLMENTS
    deleteCourse: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),
  }),
})

export const {
  // Organizations
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetPlatformAdminsQuery,
  
  // Users
  useGetUsersQuery,
  useCreateUserMutation,
  
  // Students
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  
  // Batches
  useGetBatchesQuery,
  useCreateBatchMutation,
  
  // Courses
  useGetCoursesQuery,
  useGetAdminCoursesQuery,
  useGetCourseQuery,
  useGetStudentCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = apiSlice
