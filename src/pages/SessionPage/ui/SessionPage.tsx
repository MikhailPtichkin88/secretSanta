import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionPage.module.scss'
import { useTranslation } from 'react-i18next'
import { SessionForm } from '@/features/SessionForm'
import { CardsBlock } from '@/features/CardsBlock'
import { SessionParticipants } from '@/features/SessionParticipants'
import { SessionControlls } from '@/features/SessionControlls'
import { SessionChat } from '@/features/SessionChat'

interface SessionPageProps {
  className?: string
}

export const SessionPage = ({ className }: SessionPageProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.sessionpage, {}, [className])}>
      <SessionForm className={cls.sessionForm} />
      <CardsBlock className={cls.cardsBlock} />
      <SessionParticipants className={cls.sessionParticipants} />
      <SessionControlls className={cls.sessionControlls} />
      <SessionChat className={cls.sessionChat} />
    </div>
  )
}
