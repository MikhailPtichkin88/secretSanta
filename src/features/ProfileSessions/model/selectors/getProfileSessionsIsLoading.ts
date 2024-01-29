import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSessionsIsLoading = (state: StateSchema) =>
  state?.profileSessions?.isLoading || false
