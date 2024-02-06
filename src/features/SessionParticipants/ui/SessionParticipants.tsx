import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionParticipants.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'

interface SessionParticipantsProps {
  className?: string
}

export const SessionParticipants = ({
  className,
}: SessionParticipantsProps) => {
  const { t } = useTranslation()

  return (
    <Card className={classNames(cls.sessionparticipants, {}, [className])}>
      <div className={cls.block} />
    </Card>
  )
}
