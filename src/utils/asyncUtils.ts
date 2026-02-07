import type { AppDispatch } from '../store/store';
import { setError, setLoading } from '../features/auth/authSlice';

export const catchAsync = (
  fn: (dispatch: AppDispatch) => Promise<any>,
  customErrorMessage?: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      // We return the result of the function so the caller can use it if needed
      return await fn(dispatch);
    } catch (error: any) {
      dispatch(setError(error.message || customErrorMessage || 'An unexpected error occurred'));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
