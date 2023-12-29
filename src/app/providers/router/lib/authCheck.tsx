import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { AppRoutesProps } from '@/shared/config/routeConfig/routeConfig'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const AuthCheck = (route: AppRoutesProps) => {
  //TODO replace with ReduxToolkit auth selector
  const inited = useSelector(getUserIsInited)
  const location = useLocation()

  if (!inited) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return route.element
}
