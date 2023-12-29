import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ResetPasswordPage.module.scss'
import { ResetPasswordForm } from '@/features/Authorization'
interface ResetPasswordPageProps {
  className?: string
}

export const ResetPasswordPage = ({ className }: ResetPasswordPageProps) => {
  return (
    <div className={cls.resetpasswordpage}>
      <ResetPasswordForm />
    </div>
  )
}
