import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { refreshToken } from '@/api/authApi'
import { logout } from '@/features/auth/authSlice'
import type { Permission } from '@/config/routes.config'
import { UserRole } from '@/config/routes.config'
import { canPerformAction, getUserPermissions } from '@/utils/routeUtils'

interface RoleRouteProps {
  allowedRoles?: UserRole[] | string[]
  requiredPermissions?: Permission[]
}

export default function RoleRoute({ allowedRoles, requiredPermissions }: RoleRouteProps) {
  const { user, token, loading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    // Initial session restore if we have a token but no user
    if (token && !user) {
      dispatch(refreshToken())
    }

    const handleFocus = () => {
      if (token) {
        dispatch(refreshToken())
      }
    }

    if (token) {
       window.addEventListener('focus', handleFocus)
       return () => window.removeEventListener('focus', handleFocus)
    }
  }, [token, user, dispatch])

  // Show loading state during authentication check
  // Only show spinner if loading is true AND we don't have an error yet
  if ((loading || (token && !user)) && !error) {
     return (
       <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
       </div>
     )
  }

  // Handle session restore error
  if (error && token && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive font-medium">Session Error: {error}</p>
        <button 
          onClick={() => dispatch(refreshToken())}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Retry
        </button>
        <button 
          onClick={() => dispatch(logout())}
          className="px-4 py-2 border border-input rounded hover:bg-accent"
        >
          Back to Login
        </button>
      </div>
    )
  }

  // Not authenticated - redirect to login with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Get user's permissions
  const userPermissions = user.permissions || getUserPermissions(user.role)
  
  // Check if user can access this route
  const canAccess = canPerformAction(
    user.role,
    userPermissions,
    allowedRoles as UserRole[],
    requiredPermissions
  )

  if (!canAccess) {
    // Audit log for unauthorized access attempts
    console.warn('[SECURITY] Unauthorized access attempt', {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      attempt: {
        path: location.pathname,
        requiredRoles: allowedRoles,
        requiredPermissions,
        userPermissions: userPermissions.map(p => p.toString()),
      },
      timestamp: new Date().toISOString(),
    })

    // TODO: Send to backend audit log API
    // auditLog.logUnauthorizedAccess({ user, location, requirements })

    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
