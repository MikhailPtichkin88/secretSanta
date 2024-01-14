import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import { validateAuthData } from '../../model/lib/validateAuthData'
import { getAuthError } from '../../model/selectors/getAuthError'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { login } from '../../model/services/loginOrRegister'
import { authActions } from '../../model/slice/authSlice'
import { IAuthData } from '../../model/types/authSchema'
import cls from './LoginForm.module.scss'
import { getUserId } from '@/entities/User'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const inited = useSelector(getUserIsInited)
  const userId = useSelector(getUserId)
  const error = useSelector(getAuthError)
  const isLoading = useSelector(getAuthIsLoading)
  const dispatch = useAppDispatch()

  const location = useLocation()

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<Array<Partial<IAuthData>>>([])

  const onChangeHandler = (value: string, type: 'email' | 'password') => {
    if (errors.length) {
      setErrors([])
    }
    if (type === 'email') {
      setEmailValue(value)
    } else {
      setPasswordValue(value)
    }
  }

  const onSubmitHandler = async () => {
    if (!emailValue) {
      return setErrors([{ email: t('Введите почту') }])
    }
    if (!passwordValue) {
      return setErrors([{ password: t('Введите пароль') }])
    }
    const errors = validateAuthData({
      email: emailValue,
      password: passwordValue,
    })
    if (errors.length) {
      return setErrors(errors)
    }
    dispatch(
      login({
        email: emailValue,
        passwordHash: passwordValue,
        rememberMe,
      })
    )
  }

  useEffect(() => {
    if (error) {
      setErrors([{ email: ' ' }, { password: error }])
    }
  }, [error])

  useEffect(() => {
    setErrors([])
    return () => {
      dispatch(authActions.resetAuthError())
      setErrors([])
    }
  }, [])

  if (inited) {
    return (
      <Navigate to={`/profile/${userId}`} state={{ from: location }} replace />
    )
  }

  return (
    <Card className={classNames(cls.loginform, {}, [className])}>
      <h2 className={cls.title}>{t('Вход')}</h2>
      <span className={cls.emailLabel}>{t('Почта')}</span>
      <Input
        className={cls.emailInput}
        placeholder={'example@gmail.com'}
        state={errors.find((error) => error.email) ? 'error' : null}
        value={emailValue}
        onChange={(value) => onChangeHandler(value, 'email')}
        errorMessage={t(`${errors.find((error) => error.email)?.email}`)}
        onPressEnter={onSubmitHandler}
      />
      <span className={cls.passwordLabel}>{t('Пароль')}</span>
      <Input
        value={passwordValue}
        onChange={(value) => onChangeHandler(value, 'password')}
        className={cls.passwordInput}
        placeholder={t('Пароль')}
        state={errors.find((error) => error.password) ? 'error' : null}
        passwordMode
        errorMessage={t(`${errors.find((error) => error.password)?.password}`)}
        onPressEnter={onSubmitHandler}
      />
      <Checkbox
        className={cls.rememberMe}
        label={t('Запомнить меня')}
        checked={rememberMe}
        onChange={setRememberMe}
      />
      <div className={cls.regLinkBlock}>
        <span>{t('Забыли пароль?')}</span>
        <NavLink to="/resetPassword" className={cls.regLink}>
          {t('Восстановление пароля')}
        </NavLink>
      </div>
      <div className={cls.regLinkBlock}>
        <span>{t('Нет учетной записи?')}</span>
        <NavLink to="/register" className={cls.regLink}>
          {t('Регистрация')}
        </NavLink>
      </div>

      <Button disabled={isLoading} theme="secondary" onClick={onSubmitHandler}>
        {t('Продолжить')}
      </Button>
    </Card>
  )
}
