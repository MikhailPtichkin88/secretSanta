import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionError = (state: StateSchema) =>
  state?.createSession?.error
