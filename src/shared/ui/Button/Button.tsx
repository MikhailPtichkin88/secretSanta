import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react'

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
}

export const Button = ({
  className,
  theme = 'primary',
  size = 'size_m',
  outlined = false,
  fullWidth = true,
  type = 'button',
  disabled,
  children,
  ...props
}: ButtonProps) => {
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
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
