import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsData = (state: StateSchema) =>
  state?.profileSessions?.data ?? []
