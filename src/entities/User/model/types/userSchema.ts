export interface UserSchema {
  _inited?: boolean
  user: User
}

export interface User {
  id?: string
  fullName?: string
  email?: string
  avatarUrl?: string
  token?: string
}
