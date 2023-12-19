import { StateSchema } from '@/app/providers/StoreProvider'

export const getAuthRememberMe = (state: StateSchema) =>
  state?.auth?.rememberMe ?? false
