import {
  AppRoutesProps,
  routeConfig,
} from '@/shared/config/routeConfig/routeConfig'
import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthCheck } from '../lib/authCheck'
import { PageLoader } from '@/shared/ui/PageLoader'

const AppRouter = () => {
  const memorizedRender = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    )
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? AuthCheck(route) : element}
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(memorizedRender)}</Routes>
}

export default memo(AppRouter)
