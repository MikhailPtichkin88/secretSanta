import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserAvatar = (state: StateSchema) =>
  state?.user?.user?.avatarUrl ?? ''
