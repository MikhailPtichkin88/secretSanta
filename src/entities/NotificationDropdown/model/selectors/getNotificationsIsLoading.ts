import { StateSchema } from '@/app/providers/StoreProvider'

export const getNotificationsIsLoading = (state: StateSchema) =>
  state?.notifications?.isLoading ?? false
