import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessagesIsLoading = (state: StateSchema) =>
  state?.messagesToSanta?.isLoading ?? false
