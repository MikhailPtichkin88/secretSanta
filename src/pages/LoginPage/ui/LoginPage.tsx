import { LoginForm } from '@/features/Authorization/ui/LoginForm/LoginForm'
import cls from './LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={cls.loginPage}>
      <LoginForm />
    </div>
  )
}
export default LoginPage
