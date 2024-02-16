import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { Loader } from '../PageLoader'

export type ButtonType = 'primary' | 'accent' | 'secondary' | 'danger'
export type ButtonSize = 'size_s' | 'size_m' | 'size_l'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonType
  size?: ButtonSize
  outlined?: boolean
  fullWidth?: boolean
  disabled?: boolean
  children: ReactNode
  loading?: boolean
}

export const Button = forwardRef(
  (
    {
      className,
      theme = 'primary',
      size = 'size_m',
      outlined = false,
      fullWidth = true,
      type = 'button',
      disabled,
      loading,
      children,
      ...props
    }: ButtonProps,
    innerRef: React.MutableRefObject<HTMLButtonElement>
  ) => {
    const mods: Mods = {
      [cls.fullWidth]: fullWidth,
      [cls.disabled]: disabled,
      [cls[`${theme}_outlined`]]: outlined,
    }
    return (
      <button
        className={classNames(cls.button, mods, [
          className,
          cls[theme],
          cls[size],
        ])}
        ref={innerRef}
        type={type}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader
            className={`${cls.loader} ${
              theme === 'danger' ? cls.whiteFill : ''
            }`}
          />
        ) : (
          children
        )}
      </button>
    )
  }
)
