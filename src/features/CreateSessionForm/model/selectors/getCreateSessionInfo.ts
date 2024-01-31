import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionInfo = (state: StateSchema) =>
  state?.createSession?.sessionInfo ?? ''
