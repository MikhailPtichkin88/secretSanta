import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionIsLoading = (state: StateSchema) =>
  state?.currentSession?.isLoading
