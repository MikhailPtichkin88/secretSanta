import { ICard } from '@/features/CardsBlock'

export interface CardSchema {
  card: ICard
  isLoading: boolean
  error: string
}
