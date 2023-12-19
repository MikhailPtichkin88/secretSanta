import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { emailRegex } from '@/shared/const/const'
import { useSelector } from 'react-redux'
import { getAuthError } from '../../model/selectors/getAuthError'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const loginError = useSelector(getAuthError)
  const isLoading = useSelector(getAuthIsLoading)

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [emailInputState, setEmailInputState] = useState<'success' | 'error'>(
    null
  )
  const [passwordInputState, setPasswordInputState] = useState<
    'success' | 'error'
  >(null)

  const onEmailChangeHandler = (value: string) => {
    if (emailRegex.test(value) && emailInputState !== 'success') {
      setEmailInputState('success')
    }
    setEmailValue(value)
  }
  const onPasswordChangeHandler = (value: string) => {
    if (value.length >= 5 && passwordInputState !== 'success') {
      setPasswordInputState('success')
    }
    setPasswordValue(value)
  }

  return (
    <Card className={classNames(cls.loginform, {}, [className])}>
      <h2 className={cls.title}>{t('Вход')}</h2>
      <span className={cls.emailLabel}>{t('Почта')}</span>
      <Input
        className={cls.emailInput}
        placeholder={'example@gmail.com'}
        state={emailInputState}
        value={emailValue}
        onChange={onEmailChangeHandler}
        errorMessage={t('Некорректный формат почты')}
      />
      <span className={cls.passwordLabel}>{t('Пароль')}</span>
      <Input
        value={passwordValue}
        onChange={onPasswordChangeHandler}
        className={cls.passwordInput}
        placeholder={t('Пароль')}
        state={loginError ? 'error' : null}
        passwordMode
        errorMessage={t('Пароль должен быть более 5 символов')}
      />
      <Button type="secondary">{t('Продолжить')}</Button>
    </Card>
  )
}
