import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsSearch = (state: StateSchema) =>
  state?.profileSessions?.filters?.search
