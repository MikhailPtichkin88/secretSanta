import { StateSchema } from '@/app/providers/StoreProvider'

export const getAuthNewPassword = (state: StateSchema) =>
  state?.auth?.newPassword ?? ''
