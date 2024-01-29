import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsTotalPages = (state: StateSchema) =>
  state?.profileSessions?.pagination.totalPages
