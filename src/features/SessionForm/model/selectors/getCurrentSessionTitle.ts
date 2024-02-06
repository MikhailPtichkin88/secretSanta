import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionTitle = (state: StateSchema) =>
  state?.currentSession?.session?.title
