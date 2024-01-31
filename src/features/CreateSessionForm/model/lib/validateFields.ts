import { ICreateSessionData } from '../types/CreateSessionSchema'

export const validateFields = ({
  title,
  totalParticipants,
}: ICreateSessionData) => {
  const errors: Array<keyof ICreateSessionData> = []
  if (!title || title.length < 3) {
    errors.push('title')
  }
  if (!totalParticipants || totalParticipants < 3) {
    errors.push('totalParticipants')
  }
  return errors
}
