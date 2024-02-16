import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardInfo = (state: StateSchema) =>
  state?.card?.card?.card_info || ''
