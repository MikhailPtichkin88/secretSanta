import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSession = (state: StateSchema) =>
  state?.currentSession?.session
