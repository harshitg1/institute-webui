import { client } from './client'
import { setCredentials, logout } from '../features/auth/authSlice'

import { catchAsync } from '../utils/asyncUtils'
import axios from 'axios'

export const login = (credentials: any) => 
  catchAsync(async (dispatch) => {
    const response = await client.post('/auth/login', credentials)
    dispatch(setCredentials(response.data))
    return response.data
  }, 'Login failed')

export const register = (credentials: any) => 
  catchAsync(async (dispatch) => {
    const response = await client.post('/auth/register', credentials)
    dispatch(setCredentials(response.data))
    return response.data
  }, 'Registration failed')

export const refreshToken = () => 
  catchAsync(async (dispatch) => {
    try {
      const response = await client.post('/auth/refresh')
      dispatch(setCredentials(response.data))
      return response.data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logout())
      }
      // Handle the case where the interceptor converts the error or 400 is returned
      if (error.message === 'Refresh token not found in cookies') {
        dispatch(logout())
      }
      throw error
    }
  }, 'Session expired')
