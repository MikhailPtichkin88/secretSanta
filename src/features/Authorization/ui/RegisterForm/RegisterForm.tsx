import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { validateAuthData } from '../../model/lib/validateAuthData'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { getIsAuthResult } from '../../model/selectors/getIsAuthResult'
import { register } from '../../model/services/loginOrRegister'
import { authActions } from '../../model/slice/authSlice'
import { IAuthData } from '../../model/types/authSchema'
import cls from './RegisterForm.module.scss'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

interface RegisterFormProps {
  className?: string
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const { t } = useTranslation()
  const isRegistered = useSelector(getIsAuthResult)
  const isLoading = useSelector(getAuthIsLoading)

  const dispatch = useAppDispatch()
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<Array<Partial<IAuthData>>>([])
  const location = useLocation()

  const onChangeHandler = (
    value: string,
    type: 'email' | 'password' | 'confirm'
  ) => {
    if (errors.length) {
      setErrors([])
    }
    if (type === 'email') {
      setEmailValue(value)
    } else if (type === 'password') {
      setPasswordValue(value)
    } else {
      setConfirmPasswordValue(value)
    }
  }

  const onSubmitHandler = () => {
    if (!emailValue) {
      return setErrors([{ email: t('Введите почту') }])
    }
    if (!passwordValue || !confirmPasswordValue) {
      return setErrors([{ password: t('Введите пароль') }])
    }
    const errors = validateAuthData({
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    })
    if (errors.length) {
      return setErrors(errors)
    }

    dispatch(
      register({
        email: emailValue,
        passwordHash: passwordValue,
        rememberMe,
      })
    )
  }

  useEffect(() => {
    return () => {
      dispatch(authActions.setAuthResult(false))
      dispatch(authActions.resetAuthError())
      setErrors([])
    }
  }, [])

  if (isRegistered) {
    const redirectPath = localStorage.getItem('redirectPath')

    if (redirectPath) {
      localStorage.removeItem('redirectPath')
      alertMessage({
        type: 'success',
        message: 'Учетная запись успешно создана',
      })
      return (
        <Navigate to={redirectPath} state={{ from: location }} replace={true} />
      )
    }
  }

  return (
    <Card className={classNames(cls.registerform, {}, [className])}>
      <h2 className={cls.title}>{t('Регистрация')}</h2>
      <span className={cls.emailLabel}>{t('Почта')}</span>
      <Input
        className={cls.emailInput}
        placeholder={'example@gmail.com'}
        state={errors.find((error) => error.email) ? 'error' : null}
        value={emailValue}
        onChange={(value) => onChangeHandler(value, 'email')}
        errorMessage={t(`${errors.find((error) => error.email)?.email ?? ''}`)}
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
        errorMessage={t(
          `${errors.find((error) => error.password)?.password ?? ''}`
        )}
        onPressEnter={onSubmitHandler}
      />
      <span className={cls.passwordLabel}>{t('Подтвердите пароль')}</span>
      <Input
        value={confirmPasswordValue}
        onChange={(value) => onChangeHandler(value, 'confirm')}
        className={cls.passwordInput}
        placeholder={t('Подтвердите пароль')}
        state={errors.find((error) => error.password) ? 'error' : null}
        passwordMode
        errorMessage={t(
          `${errors.find((error) => error.password)?.password ?? ''}`
        )}
        onPressEnter={onSubmitHandler}
      />
      <Checkbox
        className={cls.rememberMe}
        label={t('Запомнить меня')}
        checked={rememberMe}
        onChange={setRememberMe}
      />
      <div className={cls.regLinkBlock}>
        <span>{t('Уже есть учетная запись?')}</span>
        <NavLink to="/login" className={cls.regLink}>
          {t('Вход')}
        </NavLink>
      </div>
      <Button disabled={isLoading} theme="secondary" onClick={onSubmitHandler}>
        {t('Продолжить')}
      </Button>
    </Card>
  )
}
