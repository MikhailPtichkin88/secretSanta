import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsSortOrder = (state: StateSchema) =>
  state?.profileSessions?.filters.sortOrder
