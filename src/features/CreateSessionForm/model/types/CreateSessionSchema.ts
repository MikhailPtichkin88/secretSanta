export interface CreateSessionSchema extends ICreateSessionData {
  isLoading: boolean
  error: string | undefined
}

export interface ICreateSessionData {
  title: string
  totalParticipants: number
  sessionInfo?: string
}
