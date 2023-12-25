import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RegisterForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { useSelector } from 'react-redux'
import { getAuthError } from '../../model/selectors/getAuthError'
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading'
import { Checkbox } from '@/shared/ui/Checkbox'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { register } from '../../model/services/loginOrRegister'
import { validateAuthData } from '../../model/services/validateAuthData'
import { IAuthData } from '../../model/types/authSchema'

interface RegisterFormProps {
  className?: string
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const { t } = useTranslation()
  const error = useSelector(getAuthError)
  const isLoading = useSelector(getAuthIsLoading)

  const dispatch = useAppDispatch()
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<Array<Partial<IAuthData>>>([])

  const onSubmitHandler = () => {
    const errors = validateAuthData({
      email: emailValue,
      password: passwordValue,
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

  return (
    <Card className={classNames(cls.registerform, {}, [className])}>
      <h2 className={cls.title}>{t('Регистрация')}</h2>
      <span className={cls.emailLabel}>{t('Почта')}</span>
      <Input
        className={cls.emailInput}
        placeholder={'example@gmail.com'}
        state={errors.find((error) => error.email) ? 'error' : null}
        value={emailValue}
        onChange={setEmailValue}
        errorMessage={t(`${errors.find((error) => error.email)?.email}`)}
      />
      <span className={cls.passwordLabel}>{t('Пароль')}</span>
      <Input
        value={passwordValue}
        onChange={setPasswordValue}
        className={cls.passwordInput}
        placeholder={t('Пароль')}
        state={errors.find((error) => error.password) || error ? 'error' : null}
        passwordMode
        errorMessage={
          t(`${errors.find((error) => error.password)?.password}`) || error
        }
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
      <Button disabled={isLoading} type="secondary" onClick={onSubmitHandler}>
        {t('Продолжить')}
      </Button>
    </Card>
  )
}
