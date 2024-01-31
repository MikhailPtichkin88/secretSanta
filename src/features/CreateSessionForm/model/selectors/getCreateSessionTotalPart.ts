import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionTotalPart = (state: StateSchema) =>
  state?.createSession?.totalParticipants ?? null
