import { RegisterForm } from '@/features/Authorization'
import cls from './RegisterPager.module.scss'

interface RegisterPageProps {
  className?: string
}

const RegisterPage = ({ className }: RegisterPageProps) => {
  return (
    <div className={cls.registerpage}>
      <RegisterForm />
    </div>
  )
}
export default RegisterPage
