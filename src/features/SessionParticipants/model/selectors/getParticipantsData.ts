import { StateSchema } from '@/app/providers/StoreProvider'

export const getParticipantsData = (state: StateSchema) =>
  state?.participants?.participants
