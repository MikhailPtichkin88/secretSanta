import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { AppRoutesProps } from '@/shared/config/routeConfig/routeConfig'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const AuthCheck = (route: AppRoutesProps) => {
  const inited = useSelector(getUserIsInited)
  const location = useLocation()

  if (!inited) {
    // редирект после авторизации для приглашенных по ссылке

    const currentUrl = window.location.href?.toString()
    if (currentUrl?.includes('session')) {
      const path = new URL(currentUrl).pathname
      localStorage.setItem('redirectPath', path)
    }

    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return route.element
}
