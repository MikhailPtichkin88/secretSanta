import { User } from '@/entities/User'

export interface CardsBlockSchema {
  cards: ICard[]
  totalParticipants: number
  error?: string
  isLoading: boolean
}

export interface ICard {
  _id: string
  title: string
  card_img?: string
  card_info?: string
  created_by?: string
  session_id?: string
  selected_by?: string
  user?: Partial<User>
}
