import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { refreshToken } from '@/api/authApi'

export default function PrivateRoute() {
  const { token } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleFocus = () => {
      if (token) {
        dispatch(refreshToken())
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [token, dispatch])

  return token ? <Outlet /> : <Navigate to="/login" replace />
}
