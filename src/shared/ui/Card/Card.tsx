import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'
import { ReactNode } from 'react'

interface CardProps {
  className?: string
  children: ReactNode
}

export const Card = ({ className, children }: CardProps) => {
  return <div className={classNames(cls.card, {}, [className])}>{children}</div>
}
