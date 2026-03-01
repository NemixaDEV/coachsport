import { Navigate, RouteObject } from 'react-router-dom'
import InitialRedirect from '../pages/common/InitialRedirect'
import { authRoutes } from './authRoutes'
import { clientRoutes } from './clientRoutes'
import { adminRoutes } from './adminRoutes'
import { commonRoutes } from './commonRoutes'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <InitialRedirect />,
  },
  ...authRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...commonRoutes,
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
