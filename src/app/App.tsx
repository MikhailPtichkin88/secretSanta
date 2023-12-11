import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppRouter from './providers/router/ui/AppRouter'

export const App = () => {
  const { theme } = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <AppRouter />
    </div>
  )
}
