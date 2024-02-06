import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionInfo = (state: StateSchema) =>
  state?.currentSession?.session?.session_info
