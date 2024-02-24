import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionStatus = (state: StateSchema) =>
  state?.currentSession?.session?.status
