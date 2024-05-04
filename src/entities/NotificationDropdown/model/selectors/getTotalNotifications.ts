import { StateSchema } from '@/app/providers/StoreProvider'

export const getTotalNotifications = (state: StateSchema) =>
  state?.notifications?.total ?? 0
