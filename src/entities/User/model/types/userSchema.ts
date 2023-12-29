export interface UserSchema {
  _inited?: boolean
  user: User
}

export interface User {
  id?: string
  fullName?: string
  email?: string
  avatarUrl?: string
}

export interface LoginOrRegisterRes {
  userData: User
  token?: string
}
