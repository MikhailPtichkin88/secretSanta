import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionError = (state: StateSchema) =>
  state?.currentSession?.error
