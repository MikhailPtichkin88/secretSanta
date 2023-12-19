import { StateSchema } from '@/app/providers/StoreProvider'

export const getAuthPassword = (state: StateSchema) =>
  state?.auth?.password ?? ''
