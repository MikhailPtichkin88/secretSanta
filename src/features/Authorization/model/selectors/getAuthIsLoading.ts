import { StateSchema } from '@/app/providers/StoreProvider'

export const getAuthIsLoading = (state: StateSchema) =>
  state?.auth?.isLoading ?? false
