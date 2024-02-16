export interface ParticipantsSchema {
  participants: IParticipant[]
  error: string
  isLoading?: boolean
}

export interface IParticipant {
  _id: string
  has_picked_own_card: boolean
  has_picked_random_card: boolean
  user: {
    _id: string
    fullName: string
    avatarUrl: string
  }
}
