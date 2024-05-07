import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsHaveToSantaMessages = (state: StateSchema) =>
  state?.messagesToSanta?.messages?.length > 0 ?? false
