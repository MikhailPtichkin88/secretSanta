import { AppRoutesProps } from '@/shared/config/routeConfig/routeConfig'
import { Navigate, useLocation } from 'react-router-dom'

export const AuthCheck = (route: AppRoutesProps) => {
  //TODO replace with ReduxToolkit auth selector
  const auth = false
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return route.element
}
