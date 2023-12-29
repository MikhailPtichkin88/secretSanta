import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsAuthResult = (state: StateSchema) =>
  state?.auth?.isAuthResult ?? false
