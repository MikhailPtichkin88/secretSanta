import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessagesToSanta = (state: StateSchema) =>
  state?.messagesToSanta?.messages ?? []
