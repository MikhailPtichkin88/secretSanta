import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessagesError = (state: StateSchema) =>
  state?.messagesToSanta?.error
