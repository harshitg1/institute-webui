import { lazy } from 'react'

// Lazy load components
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardHome = lazy(() => import('@/features/dashboard/pages/DashboardHome'))
const DashboardLearn = lazy(() => import('@/features/dashboard/pages/DashboardLearn'))
const DashboardUsers = lazy(() => import('@/features/dashboard/pages/DashboardUsers'))
const CoursePlayer = lazy(() => import('@/features/dashboard/pages/CoursePlayer'))

// User Roles
export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ORG_ADMIN: 'ORG_ADMIN',
  TUTOR: 'TUTOR',
  STUDENT: 'STUDENT',
  GUEST: 'GUEST'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

// Granular Permissions  
export const Permission = {
  // User Management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // Course Management
  COURSE_CREATE: 'course:create',
  COURSE_PUBLISH: 'course:publish',
  COURSE_VIEW: 'course:view',
  COURSE_ENROLL: 'course:enroll',
  
  // Organization Management
  ORG_CREATE: 'org:create',
  ORG_MANAGE: 'org:manage',
  
  // Reports & Analytics
  REPORT_VIEW: 'report:view',
  REPORT_EXPORT: 'report:export',
  
  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',
} as const

export type Permission = (typeof Permission)[keyof typeof Permission]

// Role -> Permissions Mapping (Hierarchical)
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission) as Permission[], // All permissions
  
  [UserRole.ORG_ADMIN]: [
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.COURSE_CREATE,
    Permission.COURSE_PUBLISH,
    Permission.COURSE_VIEW,
    Permission.REPORT_VIEW,
    Permission.REPORT_EXPORT,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_UPDATE,
  ],
  
  [UserRole.TUTOR]: [
    Permission.COURSE_CREATE,
    Permission.COURSE_VIEW,
    Permission.REPORT_VIEW,
    Permission.SETTINGS_VIEW,
  ],
  
  [UserRole.STUDENT]: [
    Permission.COURSE_VIEW,
    Permission.COURSE_ENROLL,
    Permission.SETTINGS_VIEW,
  ],
  
  [UserRole.GUEST]: [],
}

// Route Configuration Interface
export interface RouteConfig {
  path: string
  name: string
  component?: React.ComponentType<any>
  layout?: 'auth' | 'dashboard' | 'default'
  requiredRoles?: UserRole[]
  requiredPermissions?: Permission[]
  isPublic?: boolean
  children?: RouteConfig[]
  icon?: string
  showInNav?: boolean
}

// Centralized Route Configuration
export const routeConfig: RouteConfig[] = [
  // Public Routes
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    layout: 'default',
    isPublic: true,
    showInNav: false,
  },
  
  // Auth Routes
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    layout: 'auth',
    isPublic: true,
    showInNav: false,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    layout: 'auth',
    isPublic: true,
    showInNav: false,
  },
  
  // Super Admin Routes
  {
    path: '/dashboard/super-admin',
    name: 'Super Admin',
    component: DashboardHome,
    layout: 'dashboard',
    requiredRoles: [UserRole.SUPER_ADMIN],
    showInNav: true,
    icon: 'shield',
    children: [
      {
        path: 'orgs',
        name: 'Organizations',
        component: DashboardHome, // Placeholder
        requiredPermissions: [Permission.ORG_MANAGE],
        showInNav: true,
        icon: 'business',
      },
    ],
  },
  
  // Organization Admin Routes
  {
    path: '/dashboard/admin',
    name: 'Dashboard',
    component: DashboardHome,
    layout: 'dashboard',
    requiredRoles: [UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN],
    showInNav: true,
    icon: 'dashboard',
  },
  {
    path: '/dashboard/users',
    name: 'User Management',
    component: DashboardUsers,
    layout: 'dashboard',
    requiredRoles: [UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN],
    requiredPermissions: [Permission.USER_READ],
    showInNav: true,
    icon: 'people',
  },
  {
    path: '/dashboard/courses',
    name: 'Course Management',
    component: lazy(() => import('@/pages/course')),
    layout: 'dashboard',
    requiredRoles: [UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN, UserRole.TUTOR],
    requiredPermissions: [Permission.COURSE_CREATE, Permission.COURSE_VIEW],
    showInNav: true,
    icon: 'menu_book',
  },
  
  // Tutor Routes
  {
    path: '/dashboard/tutor',
    name: 'Tutor Dashboard',
    component: DashboardHome,
    layout: 'dashboard',
    requiredRoles: [UserRole.TUTOR],
    showInNav: true,
    icon: 'school',
    children: [
      {
        path: 'learn',
        name: 'My Courses',
        component: DashboardLearn,
        requiredPermissions: [Permission.COURSE_CREATE],
        showInNav: true,
        icon: 'menu_book',
      },
    ],
  },
  
  // Student Routes
  {
    path: '/dashboard/student',
    name: 'Student Dashboard',
    component: DashboardHome,
    layout: 'dashboard',
    requiredRoles: [UserRole.STUDENT],
    showInNav: true,
    icon: 'person',
    children: [
      {
        path: 'learn',
        name: 'My Learning',
        component: DashboardLearn,
        requiredPermissions: [Permission.COURSE_VIEW],
        showInNav: true,
        icon: 'auto_stories',
      },
      {
        path: 'learn/course/:courseId/lesson/:lessonId',
        name: 'Course Player',
        component: CoursePlayer,
        requiredPermissions: [Permission.COURSE_VIEW],
        showInNav: false,
      },
    ],
  },
]

// Helper: Get dashboard path by role
export const getDashboardPathByRole = (role: string): string => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return '/dashboard/super-admin'
    case UserRole.ORG_ADMIN:
      return '/dashboard/admin'
    case UserRole.TUTOR:
      return '/dashboard/tutor'
    case UserRole.STUDENT:
      return '/dashboard/student'
    default:
      return '/dashboard'
  }
}

// Helper: Check if user can access route
export const canAccessRoute = (
  route: RouteConfig,
  userRole?: string,
  userPermissions?: Permission[]
): boolean => {
  // Public routes are always accessible
  if (route.isPublic) return true
  
  // No user, can't access protected routes
  if (!userRole) return false
  
  // Check role requirements
  if (route.requiredRoles && !route.requiredRoles.includes(userRole as UserRole)) {
    return false
  }
  
  // Check permission requirements
  if (route.requiredPermissions && userPermissions) {
    return route.requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    )
  }
  
  return true
}
