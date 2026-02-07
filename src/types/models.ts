export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  organizationId?: string
}

export interface UserRequest {
  email: string
  password?: string
  firstName?: string
  lastName?: string
  role?: string
  organizationId?: string
}

export interface Organization {
  id: string
  name: string
  createdBy?: string
}

export interface CreateOrganizationRequest {
  name: string
}

export interface Role {
  id: string
  name: string
}

export interface CreateRoleRequest {
  name: string
}

export interface Course {
  id: string
  title: string
  organizationId?: string
}

export interface CreateCourseRequest {
  title: string
  organizationId?: string
}

export interface Lesson {
  id: string
  title: string
  organizationId?: string
}

export interface CreateLessonRequest {
  title: string
  organizationId?: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  organizationId?: string
}

export interface CreateEnrollmentRequest {
  userId: string
  courseId: string
  organizationId?: string
}

export interface VideoProgress {
  id: string
  userId: string
  lessonId: string
  secondsWatched: number
}

export interface CreateVideoProgressRequest {
  userId: string
  lessonId: string
  secondsWatched: number
}

export interface RefreshToken {
  id: string
  userId: string
  token: string
}

export interface PasswordResetOtp {
  id: string
  userId: string
  otp: string
}
