import { emailRegex } from '@/shared/const/const'
import { IAuthData } from '../types/authSchema'

export const validateAuthData = ({
  email,
  fullName,
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
  if (fullName && fullName.length < 2) {
    errors.push({ fullName: 'Слишком короткое имя' })
  }
  if (confirmPassword && confirmPassword !== password) {
    errors.push(
      { password: 'Введенные пароли не совпадают' },
      { confirmPassword: ' ' }
    )
  }
  return errors
}

export const validateRegisterData = ({
  email,
  fullName,
  password,
  confirmPassword,
}: IAuthData): Array<Partial<IAuthData>> => {
  const errors = []

  if (email && !emailRegex.test(email)) {
    errors.push({ email: 'Некорректный формат почты' })
  }
  if (!email) {
    errors.push({ email: 'Обязательное поле' })
  }
  if (fullName && fullName.length < 3) {
    errors.push({ fullName: 'Слишком короткое имя' })
  }
  if (!fullName) {
    errors.push({ fullName: 'Обязательное поле' })
  }
  if (password && password.length < 5) {
    errors.push({ password: 'Пароль должен быть более 5 символов' })
  }
  if (!password) {
    errors.push({ password: 'Обязательное поле' })
  }
  if (confirmPassword && confirmPassword !== password) {
    errors.push(
      { password: 'Введенные пароли не совпадают' },
      { confirmPassword: ' ' }
    )
  }
  if (!confirmPassword) {
    errors.push({ confirmPassword: 'Обязательное поле' })
  }
  return errors
}
