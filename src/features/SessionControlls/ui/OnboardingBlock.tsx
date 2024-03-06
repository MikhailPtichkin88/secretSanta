import { Card } from '@/shared/ui/Card'
import cls from './SessionControlls.module.scss'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'
interface IProps {
  onboardingStep: number
}
export const OnboardingBlock = ({ onboardingStep }: IProps) => {
  const { t } = useTranslation()
  return (
    <Card className={cls.sessioncontrolls}>
      <h3>{t('Управление')}</h3>
      <div className={cls.buttonWrapper}>
        <div className={cls.buttonWrapper + ' session_page_onboarding_step_1'}>
          {onboardingStep <= 1 && <Button>{t('Участвовать')}</Button>}
        </div>

        <div className={cls.buttonWrapper + ' session_page_onboarding_step_2'}>
          {onboardingStep === 2 && (
            <Button outlined>{t('Создать карточку')}</Button>
          )}
        </div>

        <div className={cls.buttonWrapper + ' session_page_onboarding_step_5'}>
          {onboardingStep > 1 && (
            <Button theme="secondary" outlined>
              {t('Скопировать ссылку')}
            </Button>
          )}
        </div>

        <div className={cls.buttonWrapper + ' session_page_onboarding_step_8'}>
          {onboardingStep === 8 && <Button>{t('Провести жеребьевку')}</Button>}
        </div>
      </div>
    </Card>
  )
}
