export interface UserSchema {
  _inited?: boolean
  error?: string
  isLoading?: boolean
  user: User
}

export interface User {
  _id?: string
  fullName?: string
  email?: string
  avatarUrl?: string
  age?: number
  city?: string
}

export interface LoginOrRegisterRes {
  userData: User
  token?: string
}
