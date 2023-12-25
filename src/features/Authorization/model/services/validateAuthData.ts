import { emailRegex } from '@/shared/const/const'
import { IAuthData } from '../types/authSchema'

export const validateAuthData = ({
  email,
  password,
}: IAuthData): Array<Partial<IAuthData>> => {
  const errors = []
  if (password.length < 5) {
    errors.push({ email: 'Пароль должен быть более 5 символов' })
  }
  if (!emailRegex.test(email)) {
    errors.push({ password: 'Некорректный формат почты' })
  }
  return errors
}
