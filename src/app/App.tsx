import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import SunIcon from '@/shared/assets/icons/sun.svg'
import { Navbar } from '@/widgets/Navbar'
import { AppRouter } from './providers/router'

export const App = () => {
  const { theme } = useTheme()

  // делаем эффект с me запросом
  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <div className="container">
        <AppRouter />
      </div>
    </div>
  )
}
