import { ProfileSchema } from './model/types/profileSchema'
export type { ProfileSchema }

export { profileReducer } from './model/slice/profileSlice'
export { profileActions } from './model/slice/profileSlice'
export { ProfileForm } from './ui/ProfileForm'
export { getProfileData } from './model/selectors/getProfileData'
