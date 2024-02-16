import { SessionParticipants } from './ui/SessionParticipants'
export { SessionParticipants }

export {
  participantsActions,
  participantsReducer,
} from './model/slice/participantsSlice'
export type {
  IParticipant,
  ParticipantsSchema,
} from './model/types/participantsSchema'

export { getParticipantsData } from './model/selectors/getParticipantsData'

export { createSessionParticipant } from './model/services/createSessionParticipant'
