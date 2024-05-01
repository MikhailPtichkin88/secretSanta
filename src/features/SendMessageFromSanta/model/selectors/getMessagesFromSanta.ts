import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessagesFromSanta = (state: StateSchema) =>
  state?.messagesFromSanta?.messages ?? []
