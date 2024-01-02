import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { authMe, getAuthIsLoading } from '@/features/Authorization'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { PageLoader } from '@/shared/ui/PageLoader'
import { Navbar } from '@/widgets/Navbar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRouter } from './providers/router'
import { ErrorBoundary } from './providers/ErrorBoundary'

export const App = () => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const inited = useSelector(getUserIsInited)
  const isLoading = useSelector(getAuthIsLoading)

  useEffect(() => {
    if (!inited) {
      dispatch(authMe())
    }
  }, [])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <ErrorBoundary>
        <div className="container">
          {isLoading ? <PageLoader /> : <AppRouter />}
        </div>
      </ErrorBoundary>
    </div>
  )
}
