import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsPageLimit = (state: StateSchema) =>
  state?.profileSessions?.pagination.limit || 10
