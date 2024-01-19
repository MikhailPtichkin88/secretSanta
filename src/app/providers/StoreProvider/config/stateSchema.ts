import { ProfileSchema } from '@/entities/ProfileForm'
import { UserSchema } from '@/entities/User'
import { authSchema } from '@/features/Authorization'
import { AxiosInstance } from 'axios'

export interface StateSchema {
  auth: authSchema
  user: UserSchema
  profile: ProfileSchema
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
