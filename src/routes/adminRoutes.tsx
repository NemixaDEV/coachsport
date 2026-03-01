import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { AdminGuard } from './guards/AdminGuard'

const AdminDashboardScreen = lazy(
  () => import('../pages/admin/AdminDashboardScreen'),
)
const AdminClientsScreen = lazy(
  () => import('../pages/admin/AdminClientsScreen'),
)
const AdminExercisesScreen = lazy(
  () => import('../pages/admin/AdminExercisesScreen'),
)

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminGuard />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboardScreen />,
      },
      {
        path: '/admin/clients',
        element: <AdminClientsScreen />,
      },
      {
        path: '/admin/exercises',
        element: <AdminExercisesScreen />,
      },
    ],
  },
]
