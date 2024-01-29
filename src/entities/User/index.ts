import { deleteUserAvatar } from './model/services/deleteUserAvatar'
import { updateUser } from './model/services/updateUser'
import { userActions } from '@/entities/User/model/slice/userSlice'
export type { UserSchema } from './model/types/userSchema'
export { getUserAvatar } from './model/selectors/getUserAvatar'
export { getUserIsInited } from './model/selectors/getUserIsInited'
export { getUserData } from './model/selectors/getUserData'
export { getUserId } from './model/selectors/getUserId'
export { getUserIsLoading } from './model/selectors/getUserIsLoading'
export { userReducer } from './model/slice/userSlice'
export { userActions }
export { updateUser }
export { deleteUserAvatar }
export type { User } from './model/types/userSchema'
