import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileEmail = (state: StateSchema) =>
  state?.profile?.email ?? ''
