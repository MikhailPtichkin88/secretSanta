export interface CreateSessionSchema extends ICreateSessionData {
  isLoading: boolean
  error: string | undefined
  createdSessionId: null | string
}

export interface ICreateSessionData {
  title: string
  totalParticipants: number
  sessionInfo?: string
}
