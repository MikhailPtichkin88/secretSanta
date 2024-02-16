import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardIsLoading = (state: StateSchema) =>
  state?.card?.isLoading || false
