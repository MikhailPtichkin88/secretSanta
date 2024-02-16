import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardsData = (state: StateSchema) =>
  state?.cardsBlock?.cards ?? []
