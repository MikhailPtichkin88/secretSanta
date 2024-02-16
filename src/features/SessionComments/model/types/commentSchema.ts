import { User } from '@/entities/User'

export interface CommentSchema {
  comments: IComment[]
  error: string
  isLoading: boolean
}

export interface IComment {
  _id: string
  session_id: string
  createdAt: string
  updatedAt: string
  text: string
  user: Pick<User, '_id' | 'avatarUrl' | 'fullName'>
}
