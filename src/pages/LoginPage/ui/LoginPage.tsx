import { LoginForm } from '@/features/Authorization/ui/LoginForm/LoginForm'
import cls from './LoginPage.module.scss'
import { Switch } from '@/shared/ui/Switch'

export const LoginPage = () => {
  return (
    <div className={cls.loginPage}>
      <LoginForm />
    </div>
  )
}
