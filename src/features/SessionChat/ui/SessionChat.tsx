import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionChat.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'

interface SessionChatProps {
  className?: string
}

export const SessionChat = ({ className }: SessionChatProps) => {
  const { t } = useTranslation()

  return (
    <Card className={classNames(cls.sessionchat, {}, [className])}>
      <div className={cls.block} />
    </Card>
  )
}
