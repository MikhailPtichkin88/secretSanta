export interface authSchema {
  email: string
  password: string
  newPassword: string
  rememberMe: boolean
  isLoading: boolean
  error: string | undefined
  isAuthResult: boolean
}

export interface IAuthData {
  email?: string
  password?: string
  confirmPassword?: string
}
