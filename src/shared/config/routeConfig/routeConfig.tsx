import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage/ui/ResetPasswordPage'
import { SetNewPasswordPage } from '@/pages/SetNewPasswordPage'
import { Navigate, RouteProps } from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export const routeConfig: Record<string, AppRoutesProps> = {
  main: {
    path: '/',
    element: <Navigate to={'/profile'} />,
  },

  profile: {
    path: '/profile',
    element: <div>Profile page</div>,
    authOnly: true,
  },

  login: {
    path: '/login',
    element: <LoginPage />,
  },

  register: {
    path: '/register',
    element: <RegisterPage />,
  },

  resetPassword: {
    path: '/resetPassword',
    element: <ResetPasswordPage />,
  },

  setNewPassword: {
    path: '/setNewPassword',
    element: <SetNewPasswordPage />,
  },

  notFound: {
    path: '/*',
    element: <NotFoundPage />,
  },
}
