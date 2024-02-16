import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardUserAvatar = (state: StateSchema) =>
  state?.card?.card?.user?.avatarUrl || ''
