import { ISession } from '@/entities/ProfileSessionsTable'
import { ICard } from '@/features/CardsBlock'
import { IParticipant } from '@/features/SessionParticipants'

export type TSessionUpdateData = Pick<
  ICurrentSessionData,
  'title' | 'total_participants' | 'session_info'
>

export interface ICurrentSessionData extends Omit<ISession, 'cards'> {
  cards: ICard[]
  participants: IParticipant[]
}

export interface CurrentSessionSchema {
  session: ICurrentSessionData
  error: string | undefined
  isLoading: boolean
}
