import { SetNewPasswordForm } from './ui/SetNewPasswordForm/SetNewPasswordForm';
import { authMe } from './model/services/authMe'
import { ResetPasswordForm } from './ui/ResetPasswordForm/ResetPasswordForm'
import { RegisterForm } from './ui/RegisterForm/RegisterForm'
import { getAuthEmail } from './model/selectors/getAuthEmail'
import { getAuthRememberMe } from './model/selectors/getAuthRememberMe'
import { getAuthIsLoading } from './model/selectors/getAuthIsLoading'
import { getAuthNewPassword } from './model/selectors/getAuthNewPassword'
import { getAuthPassword } from './model/selectors/getAuthPassword'
import { getAuthError } from './model/selectors/getAuthError'

export { authReducer } from './model/slice/authSlice'
export type { authSchema } from './model/types/authSchema'
export {
  getAuthError,
  getAuthPassword,
  getAuthNewPassword,
  getAuthIsLoading,
  getAuthRememberMe,
  getAuthEmail,
}

export { RegisterForm }
export { ResetPasswordForm }
export {SetNewPasswordForm}
export { authMe }
