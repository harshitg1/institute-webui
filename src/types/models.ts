export interface Page<T> {
  content: T[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponse<T> {
  status: 'SUCCESS' | 'ERROR';
  data: T;
  message: string | null;
  code: string | null;
  errors: any | null;
  timestamp: string;
}

// User / Auth
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  organizationId?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string | string[];
  organizationId?: string;
}

export interface CreateUserRequest {
  email: string;
  roles: string;
  firstName: string;
  lastName: string;
  password?: string;
}

// Organizations
export interface Organization {
  id: string;
  name: string;
  active: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrganizationRequest {
  name: string;
  adminEmail: string;
  adminPassword?: string;
  adminFirstName: string;
  adminLastName: string;
}

export interface UpdateOrganizationRequest {
  name: string;
  active: boolean;
}

// Students
export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'GRADUATED';
  batchId?: string;
  batchName?: string;
  courses?: any[];
  createdAt?: string;
}

export interface CreateStudentRequest {
  email: string;
  firstName: string;
  lastName: string;
  batchId?: string;
  courseIds?: string[];
}

// Batches
export interface Batch {
  id: string;
  name: string;
  instructorId?: string;
  duration?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
}

export interface BatchRequest {
  name: string;
  instructorId?: string;
  duration?: string;
  startTime?: string;
  endTime?: string;
}

export interface AttendanceRecordRequest {
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
}

export interface AttendanceRequest {
  batchId: string;
  date: string;
  records: AttendanceRecordRequest[];
}

// Courses — matches backend CourseDto
export interface Course {
  id: string;
  title: string;
  description?: string;
  price: number;
  thumbnailUrl?: string;
  durationHours?: number;
  published?: boolean;
  enrollmentCount?: number;
  organizationId?: string;
  createdAt?: string;
}

// Matches backend CourseRequest — title and price are required
export interface CourseRequest {
  title: string;
  description?: string;
  price: number;
  thumbnailUrl?: string;
  durationHours?: number;
  published?: boolean;
}

// Roles / Lessons (Keeping older ones just in case)
export interface Role {
  id: string;
  name: string;
}

export interface CreateRoleRequest {
  name: string;
}

export interface Lesson {
  id: string;
  title: string;
  organizationId?: string;
}

export interface CreateLessonRequest {
  title: string;
  organizationId?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  organizationId?: string;
}

export interface CreateEnrollmentRequest {
  userId: string;
  courseId: string;
  organizationId?: string;
}

export interface VideoProgress {
  id: string;
  userId: string;
  lessonId: string;
  secondsWatched: number;
}

export interface CreateVideoProgressRequest {
  userId: string;
  lessonId: string;
  secondsWatched: number;
}
