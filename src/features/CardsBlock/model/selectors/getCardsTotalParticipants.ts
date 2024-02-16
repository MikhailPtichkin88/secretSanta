import { StateSchema } from '@/app/providers/StoreProvider'

export const getCardsTotalParticipants = (state: StateSchema) =>
  state?.cardsBlock?.totalParticipants ?? 0
