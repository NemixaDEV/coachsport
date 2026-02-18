import { Navigate, RouteObject } from 'react-router-dom'
import SplashScreen from '../pages/SplashScreen'
import { authRoutes } from './authRoutes'
import { clientRoutes } from './clientRoutes'
import { adminRoutes } from './adminRoutes'
import { commonRoutes } from './commonRoutes'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SplashScreen />,
  },
  ...authRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...commonRoutes,
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]
