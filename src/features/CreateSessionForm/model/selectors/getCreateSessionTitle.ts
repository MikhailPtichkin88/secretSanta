import { StateSchema } from '@/app/providers/StoreProvider'

export const getCreateSessionTitle = (state: StateSchema) =>
  state?.createSession?.title ?? ''
