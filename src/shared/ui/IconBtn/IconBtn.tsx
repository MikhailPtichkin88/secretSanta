import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './IconBtn.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { TTooltipPlacement, Tooltip } from '../Tooltip'

interface DownloadBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  ghost?: boolean
  fullWidth?: boolean
  children: ReactNode
  tooltipTitle?: string
  tooltipPlacement?: TTooltipPlacement
  tooltipClassName?: string
}

export const IconBtn = ({
  className,
  children,
  tooltipTitle,
  tooltipPlacement,
  tooltipClassName,
  ghost,
  fullWidth,
  ...props
}: DownloadBtnProps) => {
  const mods: Mods = {
    [cls.ghost]: ghost,
    [cls.fullWidth]: fullWidth,
  }

  if (tooltipTitle) {
    return (
      <Tooltip
        title={tooltipTitle}
        placement={tooltipPlacement}
        className={tooltipClassName}
      >
        <button
          className={classNames(cls.iconBtn, mods, [className])}
          {...props}
        >
          {children}
        </button>
      </Tooltip>
    )
  }
  return (
    <button className={classNames(cls.iconBtn, mods, [className])} {...props}>
      {children}
    </button>
  )
}
