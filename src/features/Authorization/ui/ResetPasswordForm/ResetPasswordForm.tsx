import SuccessIcon from '@/shared/assets/icons/success_circle.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { validateAuthData } from '../../model/lib/validateAuthData'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { getIsAuthResult } from '../../model/selectors/getIsAuthResult'
import { resetPassword } from '../../model/services/resetPassword'
import { authActions } from '../../model/slice/authSlice'
import { IAuthData } from '../../model/types/authSchema'
import cls from './ResetPasswordForm.module.scss'

interface RestorePasswordFormProps {
  className?: string
}

export const ResetPasswordForm = ({ className }: RestorePasswordFormProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [emailValue, setEmailValue] = useState('')
  const [errors, setErrors] = useState<Array<Partial<IAuthData>>>([])

  const isLetterSent = useSelector(getIsAuthResult)
  const isLoading = useSelector(getAuthIsLoading)

  const onChangeHandler = (value: string) => {
    if (errors.length) {
      setErrors([])
    }
    setEmailValue(value)
  }

  const onSubmitHandler = () => {
    if (!emailValue) {
      return setErrors([{ email: t('Введите почту') }])
    }
    const errors = validateAuthData({
      email: emailValue,
    })
    if (errors.length) {
      return setErrors(errors)
    }
    dispatch(resetPassword({ email: emailValue }))
  }

  useEffect(() => {
    return () => {
      dispatch(authActions.setAuthResult(false))
      dispatch(authActions.resetAuthError())
    }
  }, [])
  return (
    <Card className={classNames(cls.restorepasswordform, {}, [className])}>
      {/* показываем форму до отправки письма */}
      {!isLetterSent ? (
        <>
          <h2 className={cls.title}>{t('Восстановление пароля')}</h2>
          <span className={cls.emailLabel}>{t('Почта')}</span>
          <Input
            className={cls.emailInput}
            placeholder={'example@gmail.com'}
            state={errors.find((error) => error.email) ? 'error' : null}
            value={emailValue}
            onChange={(value) => onChangeHandler(value)}
            errorMessage={t(
              `${errors.find((error) => error.email)?.email ?? ''}`
            )}
            marginBottom={25}
            onPressEnter={onSubmitHandler}
          />
          <p className={cls.loginLinkBlock}>
            {t(
              'На почту будет отправлено письмо с ссылкой на востановление пароля'
            )}
          </p>
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
          {/* показываем уведомление и кнопку с редиректом после отправки письма */}
          <h2 className={cls.title}>{t('Восстановление пароля')}</h2>
          <div className={cls.noticeBlock}>
            <SuccessIcon className={cls.successIcon} />
            <p className={cls.noticeText}>
              {t(
                'Для восстановления пароля перейдите по ссылке в отправленном письме'
              )}
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
