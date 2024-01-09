import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'
import cls from './ErrorPage.module.scss'
import { Card } from '@/shared/ui/Card'
interface ErrorPageProps {
  className?: string
}

const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation()
  const reloadPage = () => {
    location.reload()
  }
  return (
    <div className={classNames(cls.errorPage, {}, [className])}>
      <Card className={cls.card}>
        <h2 className={cls.title}>{t('Произошла ошибка')}</h2>
        <Button
          className={cls.button}
          outlined
          theme="secondary"
          onClick={reloadPage}
        >
          {t('Обновить страницу')}
        </Button>
      </Card>
    </div>
  )
}
export default ErrorPage
