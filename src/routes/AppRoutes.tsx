import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import AuthLayout from '@/components/layout/AuthLayout'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import RoleRoute from './RoleRoute'
import { UserRole } from '@/config/routes.config'
import Students from '@/pages/student'

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardLayout = lazy(() => import('@/features/dashboard/layouts/DashboardLayout'))
const DashboardHome = lazy(() => import('@/features/dashboard/pages/DashboardHome'))
const DashboardLearn = lazy(() => import('@/features/dashboard/pages/DashboardLearn'))
const DashboardUsers = lazy(() => import('@/features/dashboard/pages/DashboardUsers'))
const CoursePlayer = lazy(() => import('@/features/dashboard/pages/CoursePlayer'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const DashboardRedirect = lazy(() => import('@/features/dashboard/pages/DashboardRedirect'))
const CourseManagement = lazy(() => import('@/pages/course'))
const CourseDetailPage = lazy(() => import('@/pages/course/CourseDetailPage'))
const CreateCoursePage = lazy(() => import('@/pages/course/CreateCoursePage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes accessible by anyone */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes (Login/Register) - Only for unauthenticated users */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* Protected Routes - Role Based - Production Ready */}
        
        {/* Super Admin Routes */}
        <Route element={<RoleRoute allowedRoles={[UserRole.SUPER_ADMIN]} />}>
          <Route path="/dashboard/super-admin" element={<DashboardLayout />}>
             <Route index element={<DashboardHome />} />
             <Route path="orgs" element={<DashboardHome />} /> {/* Placeholder */}
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN, UserRole.TUTOR]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/admin" element={<DashboardHome />} />
            <Route path="/dashboard/users" element={<Students />} />
            <Route path="/dashboard/courses" element={<CourseManagement />} />
            <Route path="/dashboard/courses/create" element={<CreateCoursePage />} />
            <Route path="/dashboard/courses/:id" element={<CourseDetailPage />} />
          </Route>
        </Route>

        {/* Tutor Routes */}
        <Route element={<RoleRoute allowedRoles={[UserRole.TUTOR]} />}>
          <Route path="/dashboard/tutor" element={<DashboardLayout />}>
             <Route index element={<DashboardHome />} />
             <Route path="learn" element={<DashboardLearn />} />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<RoleRoute allowedRoles={[UserRole.STUDENT]} />}>
          <Route path="/dashboard/student" element={<DashboardLayout />}>
             <Route index element={<DashboardHome />} />
             <Route path="learn" element={<DashboardLearn />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[UserRole.STUDENT, UserRole.TUTOR, UserRole.ORG_ADMIN, UserRole.SUPER_ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/student/learn/course/:courseId/lesson/:lessonId" element={<CoursePlayer />} />
          </Route>
        </Route>

        {/* Fallback/Legacy Dashboard (Optional, or redirect to role path) */}
        <Route element={<PrivateRoute />}>
           <Route element={<DashboardLayout />}>
             <Route path="/dashboard/personal-settings" element={<ProfilePage />} />
           </Route>
           <Route path="/dashboard" element={<DashboardRedirect />} />
        </Route>

        {/* Security Feedback */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
