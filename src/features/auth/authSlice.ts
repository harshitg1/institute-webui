import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Permission, rolePermissions, UserRole } from '@/config/routes.config'

interface User {
  id: string // mapped from sub (email) or need decoding? Wait, mapping logic sets this.
  email: string
  role: string
  organizationId?: string
  permissions?: Permission[] // Add permissions array
}

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ 
        accessToken: string; 
        refreshToken: string; 
        organizationId: string; 
        role: string; 
        id?: string;
        email?: string;
        permissions?: Permission[];
      }>
    ) => {
      const { accessToken, refreshToken, organizationId, id, email, permissions } = action.payload
      const role = action.payload.role.toUpperCase()
      
      state.token = accessToken
      state.refreshToken = refreshToken
      
      // Get permissions from role if not explicitly provided
      const userPermissions = permissions || rolePermissions[role as UserRole] || []
      
      state.user = {
        id: id || 'derived-from-token',
        email: email || 'derived-from-token',
        role,
        organizationId,
        permissions: userPermissions
      }
      
      state.loading = false
      state.error = null
      
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.loading = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setCredentials, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
