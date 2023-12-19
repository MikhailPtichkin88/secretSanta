export interface authSchema {
  email: string
  password: string
  newPassword: string
  rememberMe: boolean
  isLoading: boolean
  error: string | undefined
}
