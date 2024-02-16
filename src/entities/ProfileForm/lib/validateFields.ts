import { emailRegex } from '@/shared/const/const'
import { ProfileSchema } from '../model/types/profileSchema'

export const validateFields = (fields: ProfileSchema) => {
  const errors: (keyof ProfileSchema)[] = []
  if (fields.fullName.trim().length < 2 || fields.fullName.trim().length > 50) {
    errors.push('fullName')
  }
  if (!emailRegex.test(fields.email)) {
    errors.push('email')
  }
  if (
    fields.city &&
    (fields.city.trim().length < 2 || fields.city.trim().length > 50)
  ) {
    errors.push('city')
  }
  if (
    !Number.isNaN(fields.age) &&
    (Number(fields.age) <= 0 || Number(fields.age) >= 100)
  ) {
    errors.push('age')
  }
  return errors
}
