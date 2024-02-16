import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardsIsLoading = (state: StateSchema) =>
  state?.cardsBlock?.isLoading ?? false
