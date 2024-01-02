import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import { useTranslation } from 'react-i18next'
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import SuccessCircleIcon from '@/shared/assets/icons/success_circle.svg'
import ErrorCircleIcon from '@/shared/assets/icons/error_circle.svg'

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size'
>

interface InputProps extends HtmlInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  state?: 'success' | 'error' | null
  errorMessage?: string
  size?: 'size_s' | 'size_m' | 'size_l'
  bordered?: boolean
  placeholder?: string
  autoFocus?: boolean
  readonly?: boolean
  passwordMode?: boolean
  marginBottom?: number
  onPressEnter?: () => void
}

export const Input = ({
  className,
  value,
  onChange,
  placeholder,
  autoFocus,
  readonly,
  bordered = true,
  passwordMode = false,
  size = 'size_m',
  state,
  errorMessage,
  marginBottom,
  onPressEnter,
  ...otherProps
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const { t } = useTranslation()
  // блок для скрытия пароля
  const [isPasswordMode, setPasswordMode] = useState(passwordMode)

  const inputRef = useRef<HTMLInputElement>(null)

  const mods: Mods = {
    [cls.bordered]: bordered,
    [cls.readonly]: readonly,
    [cls[state]]: Boolean(state),
  }
  const onEnterPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter()
    }
  }

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true)
      inputRef?.current?.focus()
    }
  }, [autoFocus])

  return (
    <div
      className={cls.inputWrapper}
      style={{ marginBottom: marginBottom ?? 'unset' }}
    >
      <input
        className={classNames(cls.input, mods, [className, cls[size]])}
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={isPasswordMode ? 'password' : 'text'}
        placeholder={placeholder}
        readOnly={readonly}
        autoFocus={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onEnterPressHandler}
        {...otherProps}
      />
      {passwordMode && (
        <EyeIcon
          width={16}
          height={16}
          onClick={() => setPasswordMode(!isPasswordMode)}
          className={cls.eyeIcon}
        />
      )}
      {state === 'error' && (
        <p className={cls.errorMessage}>
          {errorMessage ?? t('Невалидные данные')}
        </p>
      )}
      {state === 'success' && (
        <SuccessCircleIcon width={16} height={16} className={cls.successIcon} />
      )}
      {state === 'error' && !passwordMode && (
        <ErrorCircleIcon width={16} height={16} className={cls.errorIcon} />
      )}
    </div>
  )
}
