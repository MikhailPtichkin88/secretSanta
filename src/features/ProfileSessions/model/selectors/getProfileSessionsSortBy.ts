import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsSortBy = (state: StateSchema) =>
  state?.profileSessions?.filters.sortBy
