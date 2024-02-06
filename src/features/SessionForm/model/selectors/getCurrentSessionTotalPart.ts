import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionTotalPart = (state: StateSchema) =>
  state?.currentSession?.session?.total_participants
