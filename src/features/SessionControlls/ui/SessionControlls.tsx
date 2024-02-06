import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionControlls.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'

interface SessionControllsProps {
  className?: string
}

export const SessionControlls = ({ className }: SessionControllsProps) => {
  const { t } = useTranslation()

  return (
    <Card className={classNames(cls.sessioncontrolls, {}, [className])}>
      <div className={cls.block} />
    </Card>
  )
}
