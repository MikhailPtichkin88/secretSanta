import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionIsLoading = (state: StateSchema) =>
  state?.createSession?.isLoading ?? false
