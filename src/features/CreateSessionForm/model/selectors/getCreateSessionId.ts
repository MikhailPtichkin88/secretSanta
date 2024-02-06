import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionId = (state: StateSchema) =>
  state?.createSession?.createdSessionId ?? null
