import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { getDashboardPath } from '@/utils/routeUtils'
import { refreshToken } from '@/api/authApi'

export default function DashboardRedirect() {
  const { user, token, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token && !user) {
      dispatch(refreshToken())
    }
  }, [token, user, dispatch])

  if (loading || (token && !user)) {
     return (
       <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
       </div>
     )
  }

  if (user) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  // Fallback if not authenticated or no user (though PrivateRoute usually handles this)
  return <Navigate to="/login" replace />
}
