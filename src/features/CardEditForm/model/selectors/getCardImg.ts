import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardImg = (state: StateSchema) =>
  state?.card?.card?.card_img || ''
