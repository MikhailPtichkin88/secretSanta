import { INotificationSchema } from './../../../../entities/NotificationDropdown/model/types/notificationsSchema'
import { CreateSessionSchema } from '@/features/CreateSessionForm'
import { ProfileSchema } from '@/entities/ProfileForm'

import { UserSchema } from '@/entities/User'
import { authSchema } from '@/features/Authorization'
import { ProfileSessionsSchema } from '@/features/ProfileSessions'
import { AxiosInstance } from 'axios'
import { CurrentSessionSchema } from '@/features/SessionForm'
import { ParticipantsSchema } from '@/features/SessionParticipants'
import { CardsBlockSchema } from '@/features/CardsBlock'
import { CardSchema } from '@/features/CardEditForm'
import { CommentSchema } from '@/features/SessionComments'
import { OnboardingSchema } from '@/entities/Onboarding'
import { IMessagesFromSantaSchema } from '@/features/SendMessageFromSanta'
import { IMessageToSantaSchema } from '@/features/SendMessageToSanta'

export interface StateSchema {
  auth: authSchema
  user: UserSchema
  profile: ProfileSchema
  profileSessions: ProfileSessionsSchema
  createSession: CreateSessionSchema
  currentSession: CurrentSessionSchema
  participants: ParticipantsSchema
  cardsBlock: CardsBlockSchema
  card: CardSchema
  comment: CommentSchema
  onboarding: OnboardingSchema
  messagesFromSanta: IMessagesFromSantaSchema
  messagesToSanta: IMessageToSantaSchema
  notifications: INotificationSchema
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
