import { ISession } from '@/entities/ProfileSessionsTable'

export const validateFields = (fields: Partial<ISession>) => {
  const errors: (keyof ISession)[] = []
  if (fields.title.trim().length < 2 || fields.title.trim().length > 50) {
    errors.push('title')
  }

  if (
    !Number.isNaN(fields.total_participants) &&
    (Number(fields.total_participants) <= 0 ||
      Number(fields.total_participants) >= 25)
  ) {
    errors.push('total_participants')
  }
  return errors
}
