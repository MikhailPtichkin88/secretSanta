import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'
import { SessionPage } from '@/pages/SessionPage'

import { SetNewPasswordPage } from '@/pages/SetNewPasswordPage'
import { Navigate, RouteProps } from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export const routeConfig: Record<string, AppRoutesProps> = {
  main: {
    path: '/',
    element: <Navigate to={'/login'} />,
  },

  profile: {
    path: '/profile/:id',
    element: <ProfilePage />,
    authOnly: true,
  },

  session: {
    path: '/session/:id',
    element: <SessionPage />,
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
