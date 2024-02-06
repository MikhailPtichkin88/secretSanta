import { ISession } from '@/entities/ProfileSessionsTable'

export type TSessionUpdateData = Pick<
  ICurrentSessionData,
  'title' | 'total_participants' | 'session_info'
>

export interface ICurrentSessionData extends Omit<ISession, 'cards'> {
  cards: object[]
  participants: object[]
}

export interface CurrentSessionSchema {
  session: ICurrentSessionData
  error: string | undefined
  isLoading: boolean
}
