import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsStatus = (state: StateSchema) =>
  state?.profileSessions?.filters.status || 'all'
