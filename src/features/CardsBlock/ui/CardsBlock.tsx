import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CardsBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'

interface CardsBlockProps {
  className?: string
}

export const CardsBlock = ({ className }: CardsBlockProps) => {
  const { t } = useTranslation()

  return (
    <Card className={classNames(cls.cardsblock, {}, [className])}>
      <div className={cls.block} />
    </Card>
  )
}
