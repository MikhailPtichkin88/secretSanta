import { StateSchema } from '@/app/providers/StoreProvider'

export const getParticipantsIsLoading = (state: StateSchema) =>
  state?.participants?.isLoading
