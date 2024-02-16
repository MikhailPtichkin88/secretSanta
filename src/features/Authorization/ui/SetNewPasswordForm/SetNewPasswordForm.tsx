import SuccessIcon from '@/shared/assets/icons/success_circle.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { validateAuthData } from '../../model/lib/validateAuthData'
import { getAuthError } from '../../model/selectors/getAuthError'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { getIsAuthResult } from '../../model/selectors/getIsAuthResult'
import { setNewPassword } from '../../model/services/setNewPassword'
import { authActions } from '../../model/slice/authSlice'
import { IAuthData } from '../../model/types/authSchema'
import cls from './SetNewPasswordForm.module.scss'

interface SetNewPasswordFormProps {
  className?: string
}

export const SetNewPasswordForm = ({ className }: SetNewPasswordFormProps) => {
  const { t } = useTranslation()
  const isPasswordChanged = useSelector(getIsAuthResult)
  const error = useSelector(getAuthError)
  const isLoading = useSelector(getAuthIsLoading)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getTokenFromQueryString = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('token')
  }

  const token = getTokenFromQueryString()

  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  const [errors, setErrors] = useState<Array<Partial<IAuthData>>>([])

  const onChangeHandler = (value: string, type: 'password' | 'confirm') => {
    if (errors.length) {
      setErrors([])
    }
    if (type === 'password') {
      setPasswordValue(value)
    } else {
      setConfirmPasswordValue(value)
    }
  }

  const onSubmitHandler = async () => {
    if (!passwordValue || !confirmPasswordValue) {
      return setErrors([{ password: t('Введите пароль') }])
    }
    const errors = validateAuthData({
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    })

    if (errors.length) {
      return setErrors(errors)
    }
    if (!token) {
      return setErrors([{ password: 'Отсутствует токен доступа' }])
    }
    dispatch(
      setNewPassword({
        password: passwordValue,
        token,
      })
    )
  }

  useEffect(() => {
    if (error && confirmPasswordValue && passwordValue) {
      setErrors([{ email: ' ' }, { password: error }])
    }
  }, [error])

  useEffect(() => {
    return () => {
      dispatch(authActions.resetAuthError())
    }
  }, [])

  return (
    <Card className={classNames(cls.setnewpasswordform, {}, [className])}>
      {/* показываем форму до отправки запроса */}
      {!isPasswordChanged ? (
        <>
          <h2 className={cls.title}>{t('Создание нового пароля')}</h2>
          <span className={cls.passwordLabel}>{t('Пароль')}</span>
          <Input
            value={passwordValue}
            onChange={(value) => onChangeHandler(value, 'password')}
            className={cls.passwordInput}
            placeholder={t('Пароль')}
            state={errors.find((error) => error.password) ? 'error' : null}
            marginBottom={20}
            passwordMode
            onPressEnter={onSubmitHandler}
            errorMessage={t(
              `${errors.find((error) => error.password)?.password ?? ''}`
            )}
          />
          <span className={cls.passwordLabel}>{t('Подтвердите пароль')}</span>
          <Input
            value={confirmPasswordValue}
            onChange={(value) => onChangeHandler(value, 'confirm')}
            className={cls.passwordInput}
            placeholder={t('Подтвердите пароль')}
            state={errors.find((error) => error.password) ? 'error' : null}
            marginBottom={20}
            passwordMode
            errorMessage={t(
              `${errors.find((error) => error.password)?.password ?? ''}`
            )}
            onPressEnter={onSubmitHandler}
          />

          <div className={cls.loginLinkBlock}>
            <span>{t('Уже есть учетная запись?')}</span>
            <NavLink to="/login" className={cls.regLink}>
              {t('Вход')}
            </NavLink>
          </div>
          <Button
            disabled={isLoading}
            theme="secondary"
            onClick={onSubmitHandler}
          >
            {t('Отправить')}
          </Button>
        </>
      ) : (
        <>
          {/* показываем уведомление и кнопку с редиректом если запрос прошел */}
          <h2 className={cls.title}>{t('Восстановление пароля')}</h2>
          <div className={cls.noticeBlock}>
            <SuccessIcon className={cls.successIcon} />
            <p className={cls.noticeText}>
              {t('Ваш пароль был успешно изменен')}
            </p>
          </div>
          <Button
            disabled={isLoading}
            theme="secondary"
            onClick={() => navigate('/login')}
          >
            {t('Вход')}
          </Button>
        </>
      )}
    </Card>
  )
}
