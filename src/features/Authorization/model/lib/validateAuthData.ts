import { emailRegex } from '@/shared/const/const'
import { IAuthData } from '../types/authSchema'

export const validateAuthData = ({
  email,
  password,
  confirmPassword,
}: IAuthData): Array<Partial<IAuthData>> => {
  const errors = []
  if (password && password.length < 5) {
    errors.push({ password: 'Пароль должен быть более 5 символов' })
  }
  if (email && !emailRegex.test(email)) {
    errors.push({ email: 'Некорректный формат почты' })
  }
  if (confirmPassword && confirmPassword !== password) {
    errors.push(
      { password: 'Введенные пароли не совпадают' },
      { confirmPassword: ' ' }
    )
  }
  return errors
}
