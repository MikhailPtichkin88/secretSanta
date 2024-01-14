import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tooltip.module.scss'
import { ReactNode, useState } from 'react'

export type TTooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  title: string
  placement?: TTooltipPlacement
  children: ReactNode
  className?: string
}

export const Tooltip = ({
  className,
  children,
  placement = 'top',
  title,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <span
      className={cls.tooltipRelativeWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={classNames(
          cls.tooltipAbsoluteWrapper,
          { [cls.visible]: isVisible },
          [className, cls[placement]]
        )}
      >
        {title}
      </div>
      {children}
    </span>
  )
}
