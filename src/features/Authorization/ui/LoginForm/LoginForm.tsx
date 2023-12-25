import { emailRegex } from '@/shared/const/const'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getAuthError } from '../../model/selectors/getAuthError'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { login } from '../../model/services/loginOrRegister'
import cls from './LoginForm.module.scss'
import { NavLink } from 'react-router-dom'
import { Checkbox } from '@/shared/ui/Checkbox'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const loginError = useSelector(getAuthError)
  const isLoading = useSelector(getAuthIsLoading)
  const dispatch = useAppDispatch()

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMessage, setErrorMessage] = useState(loginError)

  const onEmailChangeHandler = (value: string) => {
    if (errorMessage) {
      setErrorMessage(null)
    }
    setEmailValue(value)
  }
  const onPasswordChangeHandler = (value: string) => {
    if (errorMessage) {
      setErrorMessage(null)
    }
    setPasswordValue(value)
  }

  const onSubmitHandler = async () => {
    if (passwordValue.length < 5 || !emailRegex.test(emailValue)) {
      return setErrorMessage('Некорректный логин или пароль')
    }
    const res = dispatch(
      login({
        email: emailValue,
        passwordHash: passwordValue,
        rememberMe,
      })
    )
  }

  return (
    <Card className={classNames(cls.loginform, {}, [className])}>
      <h2 className={cls.title}>{t('Вход')}</h2>
      <span className={cls.emailLabel}>{t('Почта')}</span>
      <Input
        className={cls.emailInput}
        placeholder={'example@gmail.com'}
        state={errorMessage ? 'error' : null}
        value={emailValue}
        onChange={onEmailChangeHandler}
        errorMessage=""
      />
      <span className={cls.passwordLabel}>{t('Пароль')}</span>
      <Input
        value={passwordValue}
        onChange={onPasswordChangeHandler}
        className={cls.passwordInput}
        placeholder={t('Пароль')}
        state={errorMessage ? 'error' : null}
        passwordMode
        errorMessage={errorMessage}
      />
      <Checkbox
        className={cls.rememberMe}
        label={t('Запомнить меня')}
        checked={rememberMe}
        onChange={setRememberMe}
      />
      <div className={cls.regLinkBlock}>
        <span>{t('Нет учетной записи?')}</span>
        <NavLink to="/register" className={cls.regLink}>
          {t('Регистрация')}
        </NavLink>
      </div>
      <Button disabled={isLoading} type="secondary" onClick={onSubmitHandler}>
        {t('Продолжить')}
      </Button>
    </Card>
  )
}
