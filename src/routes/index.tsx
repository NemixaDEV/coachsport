import { Navigate, RouteObject } from 'react-router-dom'
import InitialRedirect from '../pages/common/InitialRedirect'
import { RutasPublicas } from './RutasPublicas'
import { RutasSuscriptor } from './RutasSuscriptor'
import { RutasAdmin } from './RutasAdmin'
import { RutasProtegidas } from './RutasProtegidas'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <InitialRedirect />,
  },
  ...RutasPublicas,
  ...RutasSuscriptor,
  ...RutasAdmin,
  ...RutasProtegidas,
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
