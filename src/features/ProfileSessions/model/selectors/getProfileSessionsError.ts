import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsError = (state: StateSchema) =>
  state?.profileSessions?.error
