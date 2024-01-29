import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsRole = (state: StateSchema) =>
  state?.profileSessions?.filters.role ?? 'creator'
