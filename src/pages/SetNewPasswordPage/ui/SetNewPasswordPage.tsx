import { SetNewPasswordForm } from '@/features/Authorization'
import cls from './SetNewPasswordPage.module.scss'
interface SetNewPasswordPageProps {
  className?: string
}

export const SetNewPasswordPage = ({ className }: SetNewPasswordPageProps) => {
  return (
    <div className={cls.setNewPasswordPage}>
      <SetNewPasswordForm />
    </div>
  )
}
