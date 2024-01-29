import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsCurrentPage = (state: StateSchema) =>
  state?.profileSessions?.pagination.currentPage || 1
