import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonType = 'primary' | 'accent' | 'secondary' | 'danger'
export type ButtonSize = 'size_s' | 'size_m' | 'size_l'
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string
  type?: ButtonType
  size?: ButtonSize
  outlined?: boolean
  fullWidth?: boolean
  disabled?: boolean
  children: ReactNode
}

export const Button = ({
  className,
  type = 'primary',
  size = 'size_m',
  outlined = false,
  fullWidth = true,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.disabled]: disabled,
    [cls[`${type}_outlined`]]: outlined,
  }
  return (
    <button
      className={classNames(cls.button, mods, [
        className,
        cls[type],
        cls[size],
      ])}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
