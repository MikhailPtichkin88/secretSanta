import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardTitle = (state: StateSchema) =>
  state?.card?.card?.title || ''
