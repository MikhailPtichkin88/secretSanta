import { SetNewPasswordForm } from '@/features/Authorization'
import cls from './SetNewPasswordPage.module.scss'
// interface SetNewPasswordPageProps {
//   className?: string
// }

const SetNewPasswordPage = () =>
  // { className }: SetNewPasswordPageProps
  {
    return (
      <div className={cls.setNewPasswordPage}>
        <SetNewPasswordForm />
      </div>
    )
  }
export default SetNewPasswordPage
