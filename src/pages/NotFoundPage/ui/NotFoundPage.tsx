import { Card } from '@/shared/ui/Card'
import cls from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'
import { useNavigate } from 'react-router-dom'
import notFoundImg from '@/shared/assets/img/not_found.jpeg'
export const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className={cls.notfoundpage}>
      <Card className={cls.card}>
        <img
          className={cls.img}
          src={notFoundImg}
          alt="Suprised Joye from Friends series"
        />
        <h2 className={cls.title}>{t('Страница не найдена')}</h2>
        <Button outlined theme="secondary" onClick={() => navigate('/')}>
          {t('На главную')}
        </Button>
      </Card>
    </div>
  )
}
